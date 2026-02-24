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
    <>
      {" "}
      {/* Title */}
      <input
        value={update?.title || ""}
        onChange={(e) => handleChange(e)}
        name="title"
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
      <InputField
        value={update?.text || ""}
        onChange={handleChange}
        name="text"
      />
      {/* Action bar */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-borderGray">
        <NavLink to={`/idea/${ideaId}`}>
          <Button variant="outlined">Cancel</Button>
        </NavLink>

        <Button
          variant="contained"
          onClick={saveUpdates}
          loading={loading}
          disabled={!isEdited || loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        {error && (
          <div>
            An error occured while trying to save your changes. Please try
            again.{" "}
            <Button
              onClick={saveUpdates}
              loading={loading}
              disabled={!isEdited || loading}
            >
              Retry
            </Button>
          </div>
        )}

        {data?.success && (
          <div className="bg-green-500">Idea updated successfully.</div>
        )}
      </div>
    </>
  );
}
