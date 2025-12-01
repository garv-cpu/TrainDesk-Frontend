import React, { useState } from "react";

export function Tabs({ defaultValue, className = "", children }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

export function TabsList({ children, value, setValue, className = "" }) {
  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

export function TabsTrigger({ value: tabValue, setValue, children, className = "", value }) {
  const active = value === tabValue;
  return (
    <button
      onClick={() => setValue(tabValue)}
      className={`
        flex-1 px-4 py-2 rounded-md text-sm font-medium
        transition-all
        ${active ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, setValue, className = "", value: tabValue }) {
  return value === tabValue ? (
    <div className={className}>
      {children}
    </div>
  ) : null;
}
