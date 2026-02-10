import { useState } from "react";
import ideasApi from "../Apis/api.ideas";

export default function useIdeas() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall();
      setResult(data);
      console.log(data)
    } catch (err) {
      setError(err);
      console.error(err, err?.response);
    } finally {
      setLoading(false);
    }
  };

  const methods = {
    getAllIdeas: () => execute(() => ideasApi.getAll()),
    getOneIdea: (id) => execute(() => ideasApi.getOne(id)),
    createIdea: (idea) => execute(() => ideasApi.create(idea)),
    updateIdea: ({ id, update }) => execute(() => ideasApi.update({ id, update })),
    removeIdea: (id) => execute(() => ideasApi.delete(id)),
  };

  return { result, loading, error, ...methods };
}
