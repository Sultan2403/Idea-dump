import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { RefreshCcwIcon } from "lucide-react";
import useIdeas from "../../../Hooks/useIdeas";
import Idea_Editor from "./idea_editor";

export default function Edit_Idea() {
  const { ideaId } = useParams();
  const { result: data, loading, error, getOneIdea } = useIdeas();

  useEffect(() => {
    getOneIdea(ideaId);
  }, [ideaId]);

  if (loading) {
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

  if (error?.response?.data?.message === "Idea not found") {
    return (
      <div className="min-h-screen bg-cream p-6 text-secondaryText">
        Idea not found.
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream p-6">
        <p className="text-secondaryText mb-4">Failed to load idea.</p>
        <Button
          startIcon={<RefreshCcwIcon />}
          onClick={() => getOneIdea(ideaId)}
          variant="contained"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-3xl space-y-8">
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

        {/* Editor */}
        <Idea_Editor idea={data?.idea} />
      </div>
    </div>
  );
}
