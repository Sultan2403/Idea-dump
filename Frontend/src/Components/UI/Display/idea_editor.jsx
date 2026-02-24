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
  <div className="max-w-3xl mx-auto my-12 p-10 bg-cream rounded-xl shadow-xl flex flex-col space-y-8 border border-borderGray">
    {/* Title */}
    <input
      value={update?.title || ""}
      onChange={handleChange}
      name="title"
      placeholder="Untitled idea"
      className="
        bg-transparent
        text-5xl
        font-serif
        font-bold
        text-primaryText
        placeholder-secondaryText
        outline-none
        w-full
        transition-colors
        focus:text-softBrown
      "
    />

    {/* Divider */}
    <div className="border-t border-borderGray" />

    {/* Content */}
    <InputField
      value={update?.text || ""}
      onChange={handleChange}
      name="text"
      className="min-h-[250px] text-primaryText text-lg leading-relaxed p-4 rounded-lg border border-borderGray bg-offwhite shadow-sm focus:ring-2 focus:ring-softBrown transition-all"
    />

    {/* Action bar */}
    <div className="flex justify-center items-center space-x-4 pt-6 border-t border-borderGray">
      <NavLink to={`/idea/${ideaId}`} className="flex-1">
        <Button
          fullWidth
          variant="outlined"
          className="!text-primaryText !border-borderGray !hover:bg-offwhite !transition-colors"
        >
          Cancel
        </Button>
      </NavLink>

      <Button
        variant="contained"
        onClick={saveUpdates}
        loading={loading}
        disabled={!isEdited || loading}
        className="!bg-softBrown !text-white hover:!bg-softBrown/90 flex-1 shadow-md !transition-colors"
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
