interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number; // in milliseconds
}

class RateLimiter {
  private requests: { [key: string]: number[] } = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    if (!this.requests[key]) {
      this.requests[key] = [];
    }

    // Remove old timestamps
    this.requests[key] = this.requests[key].filter(
      timestamp => now - timestamp < this.config.timeWindow
    );

    // Check if we can make a new request
    if (this.requests[key].length < this.config.maxRequests) {
      this.requests[key].push(now);
      return true;
    }

    return false;
  }

  getRemainingTime(key: string): number {
    if (!this.requests[key] || this.requests[key].length === 0) {
      return 0;
    }

    const oldestRequest = Math.min(...this.requests[key]);
    const timeToWait = this.config.timeWindow - (Date.now() - oldestRequest);
    return Math.max(0, timeToWait);
  }

  reset(key: string): void {
    delete this.requests[key];
  }
}

// Create instances for different rate limits
export const apiRateLimiter = new RateLimiter({
  maxRequests: 50,
  timeWindow: 60000 // 1 minute
});

export const authRateLimiter = new RateLimiter({
  maxRequests: 5,
  timeWindow: 300000 // 5 minutes
});

export const userActionRateLimiter = new RateLimiter({
  maxRequests: 10,
  timeWindow: 60000 // 1 minute
}); 