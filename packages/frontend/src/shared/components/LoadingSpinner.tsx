interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

function LoadingSpinner({ size = "medium" }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`} />
      <span className="ml-3 text-lg font-medium text-primary">Loading...</span>
    </div>
  );
}

LoadingSpinner.defaultProps = {
  size: "medium",
};

export default LoadingSpinner;
