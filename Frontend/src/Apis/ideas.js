import axios from "axios";

export default async function getIdeas() {
  try {
    const url = "http://localhost:5000/ideas";
    const fetchedIdeas = await axios.get(url)
    return fetchedIdeas.data
  } catch (error) {
    console.error(error, error.message)
    return error.message
  }
}
