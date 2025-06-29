export async function fetchPageFromApi(id, baseDomain) {
  //Set base values for the API endpoint
  const baseURL = "https://cms." + baseDomain;
  const apiVersion = "v2";
  const apiNamespace = "wp-json/wp/" + apiVersion + "/pages";

  //Structure the API url
  const apiUrl = baseURL + "/" + apiNamespace + "/" + id;

  //Call for the data and return
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching date:", error);
    return null;
  }
}
