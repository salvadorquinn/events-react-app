import { logger } from './logger';

export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self' https://*.supabase.co",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

export const security = {
  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  validateOrigin: (origin: string): boolean => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://your-production-domain.com'
    ];
    return allowedOrigins.includes(origin);
  },

  generateNonce: (): string => {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  },

  hashPassword: async (password: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch (error) {
      logger.error('Error hashing password', error);
      throw error;
    }
  },

  validateToken: (token: string): boolean => {
    try {
      // Basic JWT structure validation
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }

      // Check if the token has expired
      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      if (Date.now() >= exp) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error('Error validating token', error);
      return false;
    }
  },

  // Add security headers to fetch requests
  createSecureHeaders: (additionalHeaders: Record<string, string> = {}): Headers => {
    const headers = new Headers();
    Object.entries({ ...securityHeaders, ...additionalHeaders })
      .forEach(([key, value]) => headers.append(key, value));
    return headers;
  }
}; 