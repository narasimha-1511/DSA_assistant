function extractQuestionName(url) {
  // remov the trailing slash
  url = url.endsWith("/") ? url.slice(0, -1) : url;

  // split the url
  const parts = url.split("/");

  // Count parts from the start until 'problems'
  let startIndex = parts.findIndex((part) => part === "problems");
  if (startIndex === -1) {
    // 'problems' not found, return null or handle the error as needed
    return null;
  }

  // Increment startIndex to skip 'problems' and get the question name
  startIndex++;

  const problemName = parts.slice(startIndex).join("-");
  return problemName;
}

export default extractQuestionName;
