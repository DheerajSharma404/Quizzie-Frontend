export const formatDate = (dateString) => {
  // Parse the date string
  const parsedDate = new Date(dateString); // Remove the trailing '3' and parse

  // Define the month names
  const monthNames = [
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
  ];

  // Get the day, month, and year
  const day = ("0" + parsedDate.getDate())?.slice(-2); // Add leading zero if needed
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  // Format the date as "DD MMM, YYYY"
  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
};

export const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(2)}K` : count;
};
