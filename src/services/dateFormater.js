import React from "react";

const DateFormater = () => {
  return <div></div>;
};

export default DateFormater;
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}
