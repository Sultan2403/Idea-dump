// It's very buggy -_-


// I'll get to work on it soon


import { useParams, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useIdeas from "../../../Hooks/useIdeas";
import InputField from "../Input/inp-field";
import Button from "@mui/material/Button";
import { RefreshCcwIcon } from "lucide-react";

export default function Edit_Idea() {
  const { ideaId } = useParams();
  const { result: data, loading, error, getOneIdea, updateIdea } = useIdeas();

  const [update, setUpdate] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateErr, setUpdateErr] = useState(false);

  const idea = data?.idea;
  const isFetching = loading && !idea;

  const isEdited = useMemo(() => {
    if (!idea) return false;

    return update.title !== idea.title || update.text !== idea.text;
  }, [update, idea]);

  useEffect(() => {
    getOneIdea(ideaId);
  }, []);

  useEffect(() => {
    if (idea) {
      setUpdate({
        title: idea.title || "",
        text: idea.text || "",
      });
    }
  }, [idea]);

  useEffect(() => {
    if (!isSaving) return;

    console.log(data)

    if (data?.success && data?.message === "Idea updated successfully") {
      setUpdateSuccess(true);
    } else {
      setUpdateErr(true);
    }

    setIsSaving(false);
  }, [data, isSaving]);

  const fetchIdea = () => {
    getOneIdea(ideaId);
  };

  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveUpdates = () => {
    setIsSaving(true);
    setUpdateErr(false);
    setUpdateSuccess(false);
    updateIdea({ id: ideaId, update });
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-cream p-6">
        <div className="max-w-3xl space-y-4 animate-pulse">
          <div className="h-8 bg-borderGray rounded w-2/3" />
          <div className="h-40 bg-borderGray rounded" />
          Loading editor...
        </div>
      </div>
    );
  }

  if (error) {
    if (error?.response?.data?.message === "Idea not found") {
      return (
        <div className="min-h-screen bg-cream p-6 text-secondaryText">
          <NavLink
            to={`/idea/${ideaId}`}
            className="text-secondaryText hover:text-primaryText"
          >
            ← Back
          </NavLink>
          Idea not found.
        </div>
      );
    } else {
      console.error(error)
      return (
        <>
          <div className="min-h-screen bg-cream p-6 text-secondaryText">
            Failed to load idea. Check your internet connection and try again.{" "}
            <Button
              fullWidth
              startIcon={<RefreshCcwIcon />}
              onClick={fetchIdea}
              loading={loading}
              variant="contained"
              className="!bg-softBrown !text-white hover:bg-softBrown/90"
            >
              Refresh
            </Button>
          </div>
        </>
      );
    }
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
          value={update.title || ""}
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
          value={update.text || ""}
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
            loading={isSaving}
            disabled={!isEdited || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <br />

          {updateSuccess && (
            <p className="text-green-600 text-sm">Saved successfully</p>
          )}

          {updateErr && (
            <p className="text-red-600 text-sm">Failed to save changes</p>
          )}
        </div>
      </div>
    </div>
  );
}
