const today = new Date();

export const todayDate = today.toLocaleDateString("en-US");

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
const day = String(today.getDate()).padStart(2, "0");

export const formattedTodayDate = `${year}-${month}-${day}`;
// console.log(formattedTodayDate);
