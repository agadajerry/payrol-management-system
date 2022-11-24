const date = new Date();
export const years = () => {
  let years = [];
  for (let i = Number(date.getFullYear()); i >= 1976; i--) {
    years.push(i);
  }
  return years;
};

export const monthWord = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((month, index) => {
  return { month, index: index + 1 };
});
