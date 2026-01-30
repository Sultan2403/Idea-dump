import { useEffect, useState } from "react";
import getIdeas from "../Apis/ideas";

export default function useIdeas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    async function fetchIdeas() {
      setLoading(true);
      try {
        const ideas = await getIdeas();
        setIdeas(ideas);
        setLoading(false);
      } catch (error) {
        setError({ error, msg: error.message });
        setLoading(false);
      }
    }

    fetchIdeas();
  }, []);

  return { loading, error, ideas };
}
