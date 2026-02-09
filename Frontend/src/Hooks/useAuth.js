import { useState } from "react";
import authApi from "../Apis/api.auth";

export default function useAuth() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall();
      setResult(data);
    } catch (err) {
      setError(err);
      console.error(err, err?.response, err?.data);
    } finally {
      setLoading(false);
    }
  };

  const methods = {
    login: (payload) => execute(authApi.login(payload)),
    register: (payload) => execute(authApi.register(payload)),
  };

  return { result, loading, error, ...methods };
}
