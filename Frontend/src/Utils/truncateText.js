export default function truncateText(text) {
  const truncated =
    text?.length > 200 ? text?.slice(0, 200) + "..." : text;
    console.log(truncated);
    
  return truncated;
}
