import { NavLink } from "react-router-dom";
import {  PlusCircleIcon } from "lucide-react";
import Button from "@mui/material/Button";
import useIdeas from "../../Hooks/useIdeas";
import { Fragment } from "react";

export default function Nav() {
  const { ideas, loading, error } = useIdeas();

  return (
    <nav className="bg-cream border-r border-borderGray w-64 min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold text-softBrown mb-6">
        Idea Dump :)
      </h2>
      <NavLink to={"/"}>
        <Button startIcon={<PlusCircleIcon />}>New Idea</Button>
      </NavLink>
      <h2 className="text-xl font-md mb-6 text-primaryText">
        Your recent ideas
      </h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">Failed to load ideas</p>}

      {/* Idea List */}
      {!loading && !error && (
        <ul className="flex-1 overflow-y-auto space-y-2">
          {ideas.length === 0 ? (
            <li className="text-gray-500 text-sm">No ideas yet...</li>
          ) : (
            ideas.map((idea) => (
              <NavLink to={`/idea/${idea._id}`}>
                <li
                  key={idea._id}
                  className="p-2 rounded hover:bg-borderGray cursor-pointer"
                >
                  {idea.title}
                </li>
              </NavLink>
            ))
          )}
        </ul>
      )}
    </nav>
  );
}
