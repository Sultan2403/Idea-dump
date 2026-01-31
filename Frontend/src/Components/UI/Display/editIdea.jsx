import { useParams } from "react-router-dom";
import useIdeas from "../../../Hooks/useIdeas";

export default function Edit_Idea() {
  const { ideaId } = useParams();
  const { result: idea, loading, error, getOneIdea } = useIdeas();
}
