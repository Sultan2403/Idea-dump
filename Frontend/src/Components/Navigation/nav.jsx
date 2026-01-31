import { NavLink } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";
import Button from "@mui/material/Button";
import useIdeas from "../../Hooks/useIdeas";
import { useEffect } from "react";

export default function Nav() {
  const ideasHook = useIdeas();
  const { result, error, loading } = ideasHook;

  useEffect(() => {
    ideasHook.getAll();
  }, []);

  return (
    <nav className="bg-cream border-r border-borderGray min-h-screen w-full p-4 flex flex-col">
      <h2 className="text-xl font-semibold text-softBrown mb-6">
        Idea Dump :)
      </h2>
      <p className="">Never lose a thought again.</p>
      <div className="mt-4 mb-6 space-y-2">
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
      {error && <p className="text-red-500 text-sm">Failed to load ideas</p>}

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
