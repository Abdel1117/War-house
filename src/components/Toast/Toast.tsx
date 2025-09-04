interface ToastProps {
  type: "success" | "error" | "info" | "warning";
  position:
    | "top-0 left-0"
    | "top-0 right-0"
    | "bottom-0 left-0"
    | "bottom-0 right-0";
  message: string;
  duration: number;
  onClose: () => void;
}

export const Toast = ({
  onClose = () => {},
  type,
  message,
  duration,
  position,
}: ToastProps) => {
  const bgColor = (() => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-300";
      case "error":
        return "bg-red-100 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-800 dark:text-red-300";
      case "info":
        return "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-300";
      case "warning":
        return "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300";
    }
  })();
  return (
    <div
      className={`max-w-xs ${bgColor}   duration-${duration} absolute ${position}`}
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-toast-soft-color-dark-label"
    >
      <div
        id="hs-toast-soft-color-dark-label"
        className="flex align-middle p-4"
      >
        {message}
        <div className="ms-auto">
          <button
            onClick={() => {
              onClose();
            }}
            type="button"
            className="inline-flex  justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100 dark:text-white"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
