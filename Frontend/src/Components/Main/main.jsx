import Nav from "../Navigation/nav";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../Helpers/Auth/tokens";
import { validateAccessToken } from "../../Helpers/Utils/jwt.util";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";

export default function Main() {
  const { data, loading, error, refresh } = useAuth();
  const refreshToken = getRefreshToken();
  const navigate = useNavigate();

  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (!validateAccessToken() && refreshToken && !hasRefreshed) {
      refresh(refreshToken).finally(() => setHasRefreshed(true));
    } else {
      setHasRefreshed(true);
    }
  }, [hasRefreshed]);

  useEffect(() => {
    if (data?.tokens) {
      const { accessToken, refreshToken } = data?.tokens;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate("/");
    }
  }, [data]);

  if (!hasRefreshed || loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="loader rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
        Loading...
      </div>
    );
  }

  // Other errors
  if (error) {
    // Hard auth failure
    console.error(error);
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        An error occurred. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <aside className="w-[20%] h-full overflow-y-auto">
        <Nav />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-cream shadow-soft">
          <h1 className="text-2xl ml-8 font-serif font-semibold text-primaryText">
            Dump Your Thoughts
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
