import React, { useState } from "react";

export function Select({ defaultValue, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const selectValue = (v) => {
    setValue(v);
    onValueChange(v);
    setOpen(false);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          open,
          setOpen,
          value,
          selectValue,
        })
      )}
    </div>
  );
}

export function SelectTrigger({ open, setOpen, value, children }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full border border-gray-300 px-3 py-2 rounded-lg flex justify-between items-center"
    >
      {children}
    </button>
  );
}

export function SelectValue({ value }) {
  return <span>{value}</span>;
}

export function SelectContent({ open, children }) {
  if (!open) return null;

  return (
    <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow z-20">
      {children}
    </div>
  );
}

export function SelectItem({ children, value, selectValue }) {
  return (
    <div
      onClick={() => selectValue(value)}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
}
