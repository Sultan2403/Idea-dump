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
   <div className="min-h-screen bg-cream p-4 md:p-6">
     <div className="max-w-3xl mx-auto space-y-6">
       <div className="flex items-center justify-between pb-4 border-b border-borderGray">
         <div className="h-4 w-32 bg-borderGray rounded animate-pulse" />
         <div className="h-6 w-20 bg-borderGray rounded-full animate-pulse" />
       </div>

       <div className="bg-offwhite border border-borderGray rounded-lg p-6 space-y-4 animate-pulse">
         <div className="h-6 bg-borderGray rounded w-2/3" />
         <div className="h-40 bg-borderGray rounded" />
       </div>
     </div>
   </div>
 );
  }

  if (error?.response?.data?.message === "Idea not found") {
    return (
      <div className="min-h-screen bg-cream p-4 md:p-6 text-secondaryText">
        Idea not found.
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream p-4 md:p-6">
        <div className="max-w-3xl mx-auto bg-offwhite border border-borderGray rounded-lg p-6">
          <p className="text-secondaryText mb-4">Failed to load idea.</p>
          <Button
            startIcon={<RefreshCcwIcon />}
            onClick={() => getOneIdea(ideaId)}
            variant="contained"
            className="!bg-softBrown !text-offwhite hover:opacity-90"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-borderGray">
          <NavLink
            to={`/idea/${ideaId}`}
            className="text-sm font-medium text-secondaryText hover:text-primaryText transition-colors"
          >
            ← Back to idea
          </NavLink>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-cream border border-borderGray text-secondaryText">
            Editing
          </span>
        </div>

        {/* Editor */}
        <div className="bg-offwhite border border-borderGray rounded-lg shadow-sm p-6 md:p-8">
          <Idea_Editor idea={data?.idea} />
        </div>
      </div>
    </div>
  );
}