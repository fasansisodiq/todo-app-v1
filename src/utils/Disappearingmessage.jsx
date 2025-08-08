import { useState, useEffect } from "react";

function DisappearingMessage({ message, timeout = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the message after the specified duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    // Clear the timeout if the component unmounts or the timeout prop changes
    return () => clearTimeout(timer);
  }, [timeout]); // Re-run effect if timeout prop changes

  return isVisible ? (
    <div
      className=""
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <p>{message}</p>
    </div>
  ) : null;
}

export default DisappearingMessage;
