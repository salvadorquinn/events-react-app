import { supabase } from '../createClient';
import { logger } from './logger';
import { User } from '../types';

interface SessionData {
  user: User | null;
  lastActivity: number;
}

class SessionManager {
  private static instance: SessionManager;
  private sessionData: SessionData | null = null;
  private readonly sessionTimeout = 30 * 60 * 1000; // 30 minutes
  private activityTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.setupActivityListener();
  }

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  private setupActivityListener(): void {
    if (typeof window !== 'undefined') {
      ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, () => this.updateLastActivity());
      });
    }
  }

  private updateLastActivity(): void {
    if (this.sessionData) {
      this.sessionData.lastActivity = Date.now();
      this.checkSessionTimeout();
    }
  }

  private checkSessionTimeout(): void {
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
    }

    this.activityTimer = setTimeout(async () => {
      if (this.sessionData && 
          Date.now() - this.sessionData.lastActivity > this.sessionTimeout) {
        logger.info('Session timed out due to inactivity');
        await this.clearSession();
        window.location.href = '/LoginPage';
      }
    }, this.sessionTimeout);
  }

  async initSession(user: User): Promise<void> {
    this.sessionData = {
      user,
      lastActivity: Date.now()
    };
    this.checkSessionTimeout();
    logger.info('Session initialized', { userId: user.id });
  }

  async clearSession(): Promise<void> {
    try {
      await supabase.auth.signOut();
      this.sessionData = null;
      if (this.activityTimer) {
        clearTimeout(this.activityTimer);
        this.activityTimer = null;
      }
      logger.info('Session cleared');
    } catch (error) {
      logger.error('Error clearing session', error);
      throw error;
    }
  }

  getUser(): User | null {
    return this.sessionData?.user || null;
  }

  isAuthenticated(): boolean {
    return !!this.sessionData?.user;
  }

  async refreshSession(): Promise<void> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await this.clearSession();
        return;
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || !userData) {
        throw error || new Error('User data not found');
      }

      await this.initSession(userData as User);
    } catch (error) {
      logger.error('Error refreshing session', error);
      await this.clearSession();
    }
  }

  async updateUserData(userData: Partial<User>): Promise<void> {
    if (!this.sessionData?.user) {
      throw new Error('No active session');
    }

    try {
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', this.sessionData.user.id);

      if (error) throw error;

      this.sessionData.user = {
        ...this.sessionData.user,
        ...userData
      };

      logger.info('User data updated', { userId: this.sessionData.user.id });
    } catch (error) {
      logger.error('Error updating user data', error);
      throw error;
    }
  }
}

export const sessionManager = SessionManager.getInstance(); 