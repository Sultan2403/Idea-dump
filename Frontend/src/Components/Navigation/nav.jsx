import { NavLink, Navigate } from "react-router-dom";
import { PlusCircleIcon, RefreshCwIcon, RefreshCwOff } from "lucide-react";
import Button from "@mui/material/Button";
import useIdeas from "../../Hooks/useIdeas";
import { useEffect } from "react";
import { getToken } from "../../Helpers/Auth/tokens";

export default function Nav() {
  const { result, error, loading, getAllIdeas } = useIdeas();

  const fetchIdeas = () => {
    getAllIdeas();
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  if (error?.status === 401) {
    return <Navigate to="/login" replace />;
  }

  return (
    <nav className="bg-cream border-r border-borderGray min-h-screen w-full p-4 flex flex-col">
      <h2 className="text-xl font-semibold text-softBrown mb-6">
        Idea Dump :)
      </h2>
      <p className="text-sm text-secondaryText font-sans mb-4 leading-relaxed">
        Never lose a thought again.
      </p>
      <div className="mt-4 mb-6 flex flex-col gap-3 space-y-2">
        <Button
          fullWidth
          startIcon={<RefreshCwIcon />}
          onClick={fetchIdeas}
          loading={loading}
          variant="contained"
          className="!bg-softBrown text-white hover:bg-softBrown/90"
        >
          Refresh
        </Button>{" "}
        <NavLink to="/">
          <Button
            fullWidth
            startIcon={<PlusCircleIcon />}
            variant="contained"
            className="!bg-softBrown !text-white hover:!bg-softBrown/90"
          >
            New Idea
          </Button>
        </NavLink>
      </div>

      <h2 className="text-sm uppercase tracking-wide text-secondaryText mb-4">
        Your recent ideas
      </h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-borderGray/70 rounded animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm">
          Failed to load ideas. <br /> Check your internet connection and try
          again.
        </p>
      )}

      {/* Idea List */}
      {!loading && !error && (
        <ul className="flex-1 overflow-y-auto space-y-2">
          {result.length === 0 ? (
            <li className="text-gray-500 text-sm">No ideas yet...</li>
          ) : (
            result.map((idea) => (
              <li key={idea._id}>
                <NavLink
                  to={`/idea/${idea._id}`}
                  className={({ isActive }) =>
                    `block p-2 rounded cursor-pointer transition
     ${isActive ? "bg-borderGray font-medium" : "hover:bg-borderGray"}`
                  }
                >
                  {idea.title}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      )}
    </nav>
  );
}
