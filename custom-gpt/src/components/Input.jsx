import React, {forwardRef, useEffect, useId, useRef } from "react";

function Input({
  type = "text",
  placeholder,
  label,
  className = "",
  inputVal,
  setInputVal,
  handleKeyPress,
  ...props
}, ref) {
  const id = useId();


  return (
    <input
      ref={ref}
      id={id}
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
      className={`p-3 rounded flex justify-center items-start text-white ${className}`}
      type={type}
      placeholder={placeholder}
      name={`${label}`}
      {...props}
    />
  );
}

export default forwardRef(Input);
