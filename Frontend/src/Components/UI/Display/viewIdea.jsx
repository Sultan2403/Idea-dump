import { useEffect, useMemo } from "react";
import { useParams, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import useIdeas from "../../../Hooks/useIdeas";
import truncateText from "../../../Utils/truncateText";

export default function ViewIdea() {
  const { ideaId } = useParams();
  const { result, loading, error, getOneIdea, removeIdea } = useIdeas();

  const idea = result?.idea;

  const truncatedText = truncateText(idea?.text);

  const deleteIdea = () => {
    removeIdea(ideaId);
  };

  useEffect(() => {
    getOneIdea(ideaId);
  }, [ideaId]);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;

  if (result?.message === "Deleted successfuly")
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
    <div className="h-full bg-cream flex justify-center">
      <div className="w-full max-w-3xl px-6 py-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-borderGray p-8 flex flex-col gap-8">
          {/* Title */}
          <header className="space-y-3">
            <h1 className="text-3xl font-serif font-semibold text-primaryText">
              {idea.title}
            </h1>
            <div className="h-px bg-borderGray" />
          </header>

          {/* Preview */}
          <section className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-secondaryText">
              Preview
            </span>
            <p className="text-primaryText whitespace-pre-wrap leading-7">
              {truncatedText}
            </p>
          </section>

          {/* Actions */}
          <footer className="flex justify-end gap-3 pt-4 border-t border-borderGray">
            <NavLink to={`/idea/edit/${idea.id}`}>
              <Button
                className="!bg-softBrown !text-cream px-5 py-2 rounded-lg font-sans"
                disabled={loading}
              >
                Edit
              </Button>
            </NavLink>

            <Button
              className="!bg-red-600 !text-white px-5 py-2 rounded-lg font-sans"
              onClick={deleteIdea}
              disabled={loading}
            >
              Delete
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
