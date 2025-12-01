import React from "react";

export function Switch({ checked, onCheckedChange }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`
        w-12 h-6 rounded-full relative transition
        ${checked ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      <div
        className={`
          w-5 h-5 bg-white rounded-full absolute top-0.5 transition
          ${checked ? "left-6" : "left-0.5"}
        `}
      />
    </button>
  );
}
