"use client";

export default function VisibilityToggle({
  isVisible = true,
  onToggle,
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
        isVisible ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
          isVisible ? "translate-x-8" : "translate-x-1"
        }`}
      />

      <span
        className={`absolute text-[10px] font-semibold uppercase ${
          isVisible
            ? "left-2 text-white"
            : "right-2 text-gray-600"
        }`}
      >
        {isVisible ? "ON" : "OFF"}
      </span>
    </button>
  );
}