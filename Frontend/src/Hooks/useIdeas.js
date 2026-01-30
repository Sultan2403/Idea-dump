import { useState } from "react";
import ideasApi from "../Apis/api.ideas";

export default function useIdeas() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // single executor
  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall;
      setResult(data);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const methods = {
    getAll: () => execute(() => ideasApi.getAll()),
    getOne: (id) => execute(() => ideasApi.getOne(id)),
    create: (payload) => execute(() => ideasApi.create(payload)),
    update: ({ id, payload }) => execute(() => ideasApi.update({ id, payload })),
    remove: (id) => execute(() => ideasApi.remove(id)),
  };

  return { result, loading, error, ...methods };
}
