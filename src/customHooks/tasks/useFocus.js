import { useEffect, useRef, useState } from "react";

export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);

  function useFocusOnMouseOver(targetInput) {
    const inputRef = useRef(null);
    useEffect(() => {
      if (targetInput && inputRef.current) {
        inputRef.current.focus();
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, [targetInput]);
    return inputRef;
  }

  return { isFocused, setIsFocused, useFocusOnMouseOver };
}
