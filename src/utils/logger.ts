type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In development, also log to console
    if (this.isDevelopment) {
      const consoleMethod = console[entry.level] || console.log;
      consoleMethod(
        `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`,
        entry.data || ''
      );
    }
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      this.addLog(this.formatMessage('debug', message, data));
    }
  }

  info(message: string, data?: any): void {
    this.addLog(this.formatMessage('info', message, data));
  }

  warn(message: string, data?: any): void {
    this.addLog(this.formatMessage('warn', message, data));
  }

  error(message: string, error?: Error | any): void {
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error;

    this.addLog(this.formatMessage('error', message, errorData));
  }

  getLogs(level?: LogLevel): LogEntry[] {
    return level ? this.logs.filter(log => log.level === level) : this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 