import React from 'react';

export function DropdownMenu({ children }) {
  return <div className={`relative ${children?.props?.className || ''}`}>{children}</div>;
}

export function DropdownMenuTrigger({ children }) {
  return <div>{children}</div>;
}

export function DropdownMenuContent({ children }) {
  return <div className="absolute bg-white shadow-md">{children}</div>;
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
