import React, { useState, useEffect } from "react";

function CountdownToFutureDate({ targetDateString }) {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    function calculateTimeRemaining() {
      const today = new Date();
      const futureDate = new Date(targetDateString);

      // Calculate total days difference
      const timeDifference = futureDate.getTime() - today.getTime();
      const totalDays = Math.round(timeDifference / (1000 * 60 * 60 * 24));

      // Calculate years, months, days
      let y = 0,
        m = 0,
        d = 0;
      let absDays = Math.abs(totalDays);

      y = Math.floor(absDays / 365.25);
      absDays -= y * 365.25;
      m = Math.floor(absDays / 30.44);
      d = Math.round(absDays - m * 30.44);

      // Adjust sign for overdue
      if (totalDays < 0) {
        y = -y;
        m = -m;
        d = -d;
      }

      setYears(y);
      setMonths(m);
      setDays(d);
    }

    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000 * 60 * 60 * 24); // Update daily

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetDateString]);

  function handleDueDate() {
    // Overdue
    if (years < 0 || months < 0 || days < 0) {
      const absY = Math.abs(years);
      const absM = Math.abs(months);
      const absD = Math.abs(days);
      if (absY > 0 && absM > 0 && absD > 0)
        return `${absY} years, ${absM} months, ${absD} days overdue`;
      if (absY === 0 && absM > 0 && absD > 0)
        return `${absM} months, ${absD} days overdue`;
      if (absY === 0 && absM === 0 && absD > 0) return `${absD} days overdue`;
    }
    // Due today
    if (years === 0 && months === 0 && days === 0) {
      return "today";
    }
    // Future
    if (years > 0 && months > 0 && days > 0)
      return `${years} years, ${months} months, ${days} days left`;
    if (years === 0 && months > 0 && days > 0)
      return `${months} months, ${days} days left`;
    if (years === 0 && months === 0 && days > 0) return `${days} days left`;
    return "";
  }

  return (
    <div>
      <p className=" dark:text-yellow-200 dark:opacity-60">{handleDueDate()}</p>
    </div>
  );
}

export default CountdownToFutureDate;
