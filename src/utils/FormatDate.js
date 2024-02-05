function formatDate(timestamp) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-IN", options);
}

export default formatDate;
