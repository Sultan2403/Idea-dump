import { useEffect, useMemo } from "react";
import { useParams, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import useIdeas from "../../../Hooks/useIdeas";
import truncateText from "../../../Utils/truncateText";

export default function ViewIdea() {
  const { ideaId } = useParams();
  const { result, loading, error, getOneIdea, removeIdea } = useIdeas();

  const idea = result.idea

  const truncatedText = useMemo(() => truncateText(idea?.text), [idea]);

  const deleteIdea = () => {
    removeIdea(ideaId);
  };

  useEffect(() => {
    getOneIdea(ideaId);
  }, [ideaId]);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;

  if (idea?.message === "Deleted successfuly")
    return <div>Idea deleted successfully.</div>;

  if (error)
    return (
      <div className="p-4 text-red-500 flex flex-col space-y-2">
        <span>
          Failed to load idea. Check your internet connection and try again.
        </span>
        <Button variant="contained" onClick={() => getOneIdea(ideaId)}>
          Try again
        </Button>
      </div>
    );

  if (!idea) return <div className="p-4 text-gray-500">No idea found</div>;

  return (
    <div className="h-full bg-cream">
      <div className="p-6 flex flex-col space-y-6 max-w-3xl">
        {/* Title */}
        <h1 className="text-2xl font-bold text-primaryText border-b-borderGray ">
          {idea?.title}
        </h1>

        {/* Preview Text */}
        <p className="text-secondaryText whitespace-pre-wrap">
          Preview: <br /> {truncatedText}
        </p>

        {/* Edit Button */}
        <NavLink to={`/idea/edit/${idea?._id}`} className="self-start">
          <Button
            className="
          px-4 py-2
          rounded
          !bg-softBrown
          !text-cream
          transition-colors !font-sans
        "
            disabled={loading}
            loading={loading}
          >
            Edit Idea
          </Button>
        </NavLink>

        <Button
          className="
          px-4 py-2
          rounded
          !bg-softBrown
          !text-cream
          transition-colors !font-sans"
          onClick={deleteIdea}
          disabled={loading}
          loading={loading}
        >
          Delete Idea
        </Button>
      </div>
    </div>
  );
}
