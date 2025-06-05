interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'currentColor',
  className = ''
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (    <div className={`inline-block ${className}`} role="status" aria-label="Loading">
      <svg
        className={`animate-spin ${sizeMap[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="2"
        />
        <circle
          className="opacity-75"
          cx="12"
          cy="12"
          r="10"
          stroke="url(#loading-gradient)"
          strokeWidth="2"
          strokeDasharray="20 50"
        />
        <defs>
          <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b1f62" />
            <stop offset="100%" stopColor="#682161" />
          </linearGradient>
        </defs>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 