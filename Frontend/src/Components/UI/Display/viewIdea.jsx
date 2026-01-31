import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useIdeas from "../../../Hooks/useIdeas";
import Button from "@mui/material/Button";
import InputField from "../Input/inp-field";

export default function ViewIdea() {
  const { ideaId } = useParams();
  const { result: idea, loading, error, getOneIdea, updateIdea } = useIdeas();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  // Sync local text state with loaded idea
  useEffect(() => {
    if (idea) {
      setText(idea.text || "");
      setIsEditing(false);
    }
  }, [idea]);

  const getIdea = () => {
    getOneIdea(ideaId);
  };

  // Fetch idea on mount / ideaId change
  useEffect(() => {
    getIdea();
  }, [ideaId]);

  const prevText = useMemo(() => idea?.text || "", [idea]);
  const isEdited = useMemo(
    () => text.trim() !== prevText.trim(),
    [text, prevText],
  );

  const saveIdea = () => {
    if (!idea) return;
    const updateData = {
      text: text.trim(),
      //  title: for later
    };
    try {
      updateIdea({ id: idea._id, updateIdea: updateData });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading idea...</div>;

  if (error)
    return (
      <div className="p-4 text-red-500">
        Failed to load idea. Check your internet connection and try again.
        <Button onClick={getIdea}>Try again</Button>
      </div>
    );

  return (
    <div className="p-6 flex flex-col space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold">{idea?.title}</h1>
      

      {/* Content */}
      <p className="text-gray-700 whitespace-pre-wrap">Preview: {idea?.text}</p>

      {/* Edit Button / Input */}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
      ) : (
        <>
          <InputField value={text} setValue={setText} />
          <Button disabled={!isEdited} onClick={saveIdea}>
            Save edits
          </Button>
        </>
      )}
    </div>
  );
}
