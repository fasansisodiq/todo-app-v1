import React, { useState, useEffect } from "react";

function CountdownToFutureDate({ targetDateString }) {
  let [years, setYears] = useState(0);
  let [months, setMonths] = useState(0);
  let [days, setDays] = useState(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const today = new Date();
      const futureDate = new Date(targetDateString);

      const timeDifference = futureDate.getTime() - today.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      const calculatedYears = Math.floor(totalDays / 365.25);
      const remainingDaysAfterYears = totalDays % 365.25;
      const calculatedMonths = Math.floor(remainingDaysAfterYears / 30.44);
      const calculatedDays = Math.ceil(remainingDaysAfterYears % 30.44);
      if (totalDays === 0) {
        setDays(0);
        setMonths(0);
        setYears(0);
      } else if (totalDays < 0 && totalDays > -30.44) {
        setDays(calculatedDays);
        setMonths(0);
        setYears(0);
      } else if (totalDays < 0 && totalDays >= -30.44 && totalDays > -365.25) {
        setDays(calculatedDays);
        setMonths(calculatedMonths);
        setYears(0);
      } else if (totalDays < 0 && totalDays >= -30.44 && totalDays >= -365.25) {
        setDays(calculatedDays);
        setMonths(calculatedMonths);
        setYears(calculatedYears);
      } else if (totalDays > 0 && totalDays < 30.44) {
        setDays(calculatedDays);
        setMonths(0);
        setYears(0);
      } else if (totalDays > 0 && totalDays > 30.44 && totalDays < 365.25) {
        setDays(calculatedDays);
        setMonths(calculatedMonths);
        setYears(0);
      } else if (totalDays > 0 && totalDays > 30.44 && totalDays >= 365.25) {
        setDays(calculatedDays);
        setMonths(calculatedMonths);
        setYears(0);
      }
      console.log(totalDays);
    };

    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000 * 60 * 60 * 24); // Update daily

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetDateString]);
  function handleDueDate() {
    console.log(typeof days);
    if (years === 0 && months === 0 && days === 0) {
      return "today";
    } else if (years > 0 && months > 0 && days > 0) {
      return `${years} years, ${months} months, ${days} days left`;
    } else if (years === 0 && months > 0 && days > 0) {
      return ` ${months} months, ${days} days left`;
    } else if (years === 0 && months === 0 && days > 0) {
      return ` ${days} days left`;
    } else if (years === 0 && months === 0 && days < 0) {
      return ` ${Math.abs(days)} days overdue`;
    } else if (years > 0 && months < 0 && days < 0) {
      return ` ${Math.abs(months)} months, ${Math.abs(days)} days overdue`;
    } else if (years < 0 && months < 0 && days < 0) {
      return `${Math.abs(years)} years, ${Math.abs(months)} months, ${Math.abs(
        days
      )} days overdue`;
    }
  }
  return (
    <div>
      <p>
        {/* {years} years, {months} months, {days} days left */}
        {handleDueDate()}
      </p>
    </div>
  );
}

export default CountdownToFutureDate;
