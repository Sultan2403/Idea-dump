import axios from "axios"

export default async function useIdeas() {
  const url = "http://localhost:5000/ideas";
  try {
    console.log("fetching...");
    const fetchedIdeas = (await axios.get(url)).data;
    console.log(fetchedIdeas);
  } catch (error) {

  }
}

useIdeas();
