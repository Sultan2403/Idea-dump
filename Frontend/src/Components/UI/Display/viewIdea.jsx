import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import useIdeas from "../../../Hooks/useIdeas";
import truncateText from "../../../Utils/truncateText";
import CustomModal from "../Modal/customModal";

export default function ViewIdea() {
  const { ideaId } = useParams();
  const { result, loading, error, getOneIdea, removeIdea } = useIdeas();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expanded, setExpanded] = useState(false); // toggle full text

  const idea = result?.idea;

  useEffect(() => {
    getOneIdea(ideaId);
  }, [ideaId]);

  const truncatedText = truncateText(idea?.text);

  const deleteIdeaConfirmed = () => {
    removeIdea(ideaId);
    setShowDeleteConfirm(false);
  };

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (result?.message === "Deleted successfuly")
    return <div className="p-4 text-gray-500">Idea deleted successfully.</div>;
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
    <div className="h-full bg-cream flex justify-center overflow-y-auto">
      {/* Delete Modal */}
      {showDeleteConfirm && (
        <CustomModal
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
        >
          <h2 className="text-xl font-semibold text-primaryText">
            Delete Idea?
          </h2>
          <p className="text-secondaryText">
            Are you sure you want to delete this idea? This cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              className="!bg-borderGray !text-primaryText px-4 py-2 rounded font-sans"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              className="!bg-red-600 !text-white px-4 py-2 rounded font-sans"
              onClick={deleteIdeaConfirmed}
            >
              Delete
            </Button>
          </div>
        </CustomModal>
      )}

      {/* Main content card */}
      <div className="w-full max-w-3xl px-3 md:px-6 py-4 md:py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-borderGray p-4 md:p-8 flex flex-col gap-6 max-h-[80vh] overflow-hidden">
          {/* Title */}
          <header className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-primaryText break-words">
              {idea.title}
            </h1>
            <div className="h-px bg-borderGray" />
          </header>

          {/* Preview / Full text */}
          <section className="space-y-3 flex-1 overflow-y-auto pr-2">
            <span className="text-xs uppercase tracking-wider text-secondaryText">
              {expanded ? "Content" : "Preview"}
            </span>
            <p className="text-primaryText whitespace-pre-wrap leading-7">
              {expanded ? idea.text : truncatedText}
            </p>
            {!expanded && idea.text.length > 200 && (
              <button
                className="text-softBrown text-sm font-semibold hover:underline"
                onClick={() => setExpanded(true)}
              >
                Continue reading...
              </button>
            )}
          </section>

          {/* Actions */}
          <footer className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-borderGray">
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
              onClick={() => setShowDeleteConfirm(true)}
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
