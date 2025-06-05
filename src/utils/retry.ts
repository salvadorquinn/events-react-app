interface RetryConfig {
  maxAttempts: number;
  initialDelay: number; // in milliseconds
  maxDelay: number; // in milliseconds
  backoffFactor: number;
  retryableErrors?: Array<string | number>;
}

interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: any;
  attempts: number;
}

export const retryOperation = async <T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<RetryResult<T>> => {
  const defaultConfig: RetryConfig = {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2,
    retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 429, 503, 504],
  };

  const finalConfig = { ...defaultConfig, ...config };
  let attempts = 0;
  let delay = finalConfig.initialDelay;

  while (attempts < finalConfig.maxAttempts) {
    try {
      attempts++;
      const data = await operation();
      return { success: true, data, attempts };
    } catch (error: any) {
      const errorCode = error.code || error.status || error.statusCode;
      const shouldRetry = finalConfig.retryableErrors?.includes(errorCode) ||
                         finalConfig.retryableErrors?.includes(error.message);

      if (attempts === finalConfig.maxAttempts || !shouldRetry) {
        return { success: false, error, attempts };
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));

      // Exponential backoff with jitter
      delay = Math.min(
        delay * finalConfig.backoffFactor * (0.8 + Math.random() * 0.4),
        finalConfig.maxDelay
      );
    }
  }

  // This should never happen due to the while loop condition
  return { success: false, error: new Error('Max attempts reached'), attempts };
}; 