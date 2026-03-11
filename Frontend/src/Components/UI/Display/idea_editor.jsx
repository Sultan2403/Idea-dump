import Button from "@mui/material/Button";
import useIdeas from "../../../Hooks/useIdeas";
import { useParams, NavLink } from "react-router-dom";
import InputField from "../Input/inp-field";
import { useState, useMemo, useEffect } from "react";

export default function Idea_Editor({ idea }) {
  const [update, setUpdate] = useState(idea);
  const { ideaId } = useParams();

  const { result: data, loading, error, updateIdea } = useIdeas();

  const isEdited = useMemo(() => {
    if (!idea) return false;

    const base = data?.updated || idea;
    return (
      update?.title?.trim() !== base?.title?.trim() ||
      update?.text?.trim() !== base?.text?.trim()
    );
  }, [update, data, idea]);

  const saveUpdates = () => {
    updateIdea({ id: ideaId, update });
  };

  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setUpdate(data?.updated || idea);
  }, [data]);

  return (
    <div className="flex flex-col space-y-6">
      {/* Title */}
      <input
        value={update?.title || ""}
        onChange={handleChange}
        name="title"
        placeholder="Untitled idea"
        className="
    bg-transparent
    text-3xl md:text-4xl
    font-serif
    font-semibold
    leading-tight
    text-primaryText
    placeholder-secondaryText
    outline-none
    w-full
    transition-colors
    focus:text-softBrown
  "
      />

      {/* Content */}
      <InputField
        value={update?.text || ""}
        onChange={handleChange}
        name="text"
        className="
    min-h-[300px]
    text-primaryText
    text-lg
    leading-relaxed
    bg-transparent
    border-none
    outline-none
    resize-none
    focus:ring-0
  "
      />

      {/* Action bar */}
      <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 pt-8">
        <NavLink to={`/idea/${ideaId}`} className="w-full sm:flex-1">
          <Button
            fullWidth
            variant="text"
            className="!text-secondaryText hover:!text-primaryText"
          >
            Cancel
          </Button>
        </NavLink>

        <Button
          variant="contained"
          onClick={saveUpdates}
          fullWidth
          loading={loading}
          disabled={!isEdited || loading}
          className={`${!isEdited ? "!bg-gray-400 cursor-not-allowed" : "!bg-softBrown"} !text-white hover:!bg-softBrown/90 flex-1 shadow-md !transition-colors`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Feedback messages */}
      {error && (
        <div className="text-center text-red-500 mt-4 font-medium">
          An error occurred while saving.
          <Button
            onClick={saveUpdates}
            loading={loading}
            disabled={!isEdited || loading}
            variant="outlined"
            className="!ml-3 !text-red-500 !border-red-400 hover:!bg-red-50 transition-colors"
          >
            Retry
          </Button>
        </div>
      )}

      {data?.success && (
        <div className="text-center bg-green-500 text-white py-2 rounded-lg font-medium shadow-sm">
          Idea updated successfully.
        </div>
      )}
    </div>
  );
}
