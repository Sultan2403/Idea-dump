import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useIdeas from "../../../Hooks/useIdeas";


export default function ViewIdea() {
  const { ideaId } = useParams();
  const ideasHook = useIdeas();
  const { result, loading, error } = ideasHook;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    ideasHook.getOne(ideaId);
  }, [ideaId]);

  if (loading) return <div className="p-4 text-gray-500">Loading idea...</div>;

  if (error)
    return (
      <div className="p-4 text-red-500">
        Failed to load idea. Check your internet connection and try again.
      </div>
    );

  if (!result) return null; // or skeleton placeholder

  return (
    <div className="p-6 flex flex-col space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold">{result.title}</h1>

      {/* Content */}
      <p className="text-gray-700 whitespace-pre-wrap">{result.text}</p>

      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(true)}
        className="self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit
      </button>
    </div>
  );
}
