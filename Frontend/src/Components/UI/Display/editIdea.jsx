import { useParams, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useIdeas from "../../../Hooks/useIdeas";
import InputField from "../Input/inp-field";
import Button from "@mui/material/Button";
import { RefreshCcwIcon } from "lucide-react";

export default function Edit_Idea() {
  const { ideaId } = useParams();
  const { result: idea, loading, error, getOneIdea, updateIdea } = useIdeas();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const updatedIdea = idea?.updated;

  const updateSuccess = idea?.message === "Idea updated successfully";

  const updateErr = idea?.message === "An error occured";

  const isEdited = useMemo(() => {
    const base = updatedIdea || idea;

    if (!base) return false;

    return (
      base?.title?.trim() !== title.trim() || base?.text?.trim() !== text.trim()
    );
  }, [idea, updatedIdea, title, text]);

  const update = () => {
    const updated = {
      text: text.trim(),
      title: title.trim(),
    };
    updateIdea({ id: idea._id, update: updated });
  };

  const fetchIdea = () => {
    getOneIdea(ideaId);
  };

  useEffect(() => {
    fetchIdea();
  }, [ideaId]);

  useEffect(() => {
    if (idea) {
      setTitle(idea?.title || "");
      setText(idea?.text || "");
    }
  }, [idea]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream p-6">
        <div className="max-w-3xl space-y-4 animate-pulse">
          <div className="h-8 bg-borderGray rounded w-2/3" />
          <div className="h-40 bg-borderGray rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-cream p-6 text-secondaryText">
          Failed to load idea. Check your internet connection and try again.
        </div>
        <Button
          fullWidth
          startIcon={<RefreshCcwIcon />}
          onClick={fetchIdea}
          loading={loading}
          variant="contained"
          className="!bg-softBrown text-white hover:bg-softBrown/90"
        >
          Refresh
        </Button>
      </>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-cream p-6 text-secondaryText">
        Idea not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="p-6 max-w-3xl flex flex-col space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <NavLink
            to={`/idea/${ideaId}`}
            className="text-secondaryText hover:text-primaryText"
          >
            ← Back
          </NavLink>

          <span className="text-sm text-secondaryText">Editing</span>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled idea"
          className="
            bg-transparent
            text-3xl
            font-serif
            font-semibold
            text-primaryText
            outline-none
            placeholder-secondaryText
          "
        />

        {/* Divider */}
        <div className="border-t border-borderGray" />

        {/* Content */}
        <InputField value={text} setValue={setText} />

        {/* Action bar */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-borderGray">
          <NavLink to={`/idea/${ideaId}`}>
            <Button variant="outlined">Cancel</Button>
          </NavLink>

          {/* You wire this up */}
          <Button
            variant="contained"
            onClick={update}
            loading={loading}
            disabled={!isEdited}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
