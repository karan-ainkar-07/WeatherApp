import { useEffect } from "react";

export default function CustomAlert({ message, onClose }) {
  // Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-[#7F8CAA] dark:bg-gray-700 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 animate-slide-in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M12 8h.01" />
        </svg>
        <span className="text-sm sm:text-base">{message}</span>
        <button onClick={onClose} className="ml-auto text-white font-bold">
          ✖
        </button>
      </div>
    </div>
  );
}