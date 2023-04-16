import moment from "moment";

export const formatDate = (date) => {
    const today = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    return [month, day, year].join(" ");
}

export const timeSincePost = (date) => {
    const startDate = moment(date)
  const endDate  = moment();

  const diffInMilliseconds = endDate.diff(startDate); // difference in milliseconds
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // difference in minutes
  const diffInHours = Math.floor(diffInMilliseconds / 3600000); // difference in hours
  const diffInDays = Math.floor(diffInMilliseconds / 86400000); // difference in days

  let diffText = "";
  if (diffInDays > 0) {
    diffText = `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInHours > 0) {
    diffText = `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes > 0) {
    diffText = `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else {
    diffText = "just now";
  }

  return diffText
}