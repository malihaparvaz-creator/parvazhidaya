import React from 'react';

export function Input(props) {
  return (
    <input {...props} className={`border rounded px-4 py-2 ${props.className || ''}`} />
  );
}
