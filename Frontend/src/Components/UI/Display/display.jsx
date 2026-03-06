import InputField from "../Input/inp-field";
import Button from "@mui/material/Button";
import useIdeas from "../../../Hooks/useIdeas";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../Modal/customModal";
import getUserData from "../../../Helpers/Utils/jwt.util";

export default function Display() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [saveErr, setSaveErr] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const { result: data, loading, error, createIdea } = useIdeas();

  const userData = getUserData();

  const saveIdea = () => {
    const idea = { text, title };

    if (!text || !title) {
      setSaveErr("Text and title are required.");
      return;
    } else if (text.length < 3) {
      setSaveErr("Minimum length for text is three characters");
    } else if (title.length < 3) {
      setSaveErr("Minimum length for title is three characters");
    }

    setSaveErr(null);
    createIdea(idea);
  };

  useEffect(() => {
    if (error) {
      setSaveErr(
        error?.response?.data?.message ||
          "An error occured while saving. Please try again later.",
      );
    }
  }, [error]);

  useEffect(() => {
    if (saveErr) {
      setTimeout(() => {
        setSaveErr(null);
      }, 3000);
    }
  }, [saveErr]);

  useEffect(() => {
    if (data.success) {
      setSaveErr(null);
      setText("");
      setTitle("");
      setSaveSuccess(true);
      setRedirecting(true);
      setTimeout(() => {
        navigate(`/idea/${data.idea.id}`);
      }, 800); // 0.8s for UX
    }
  }, [data]);

  return (
    <div className="px-10 py-8 bg-offwhite min-h-[400px] rounded-lg shadow-soft">
      <h2 className="text-2xl font-serif font-medium text-softBrown mb-6">
        {userData?.username
          ? `Welcome back, ${userData?.username}`
          : "Welcome Guest"}
      </h2>
      <h2 className="text-2xl font-serif font-medium text-softBrown mb-6">
        Never lose a thought again
      </h2>

      <input
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled idea"
        name="title"
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

      <InputField value={text} name={"text"} setValue={setText} />

      <div className="my-2">
        <Button
          className={`${loading ? "!bg-gray-400" : "!bg-softBrown"} !text-offwhite`}
          disabled={Boolean(loading)}
          loading={loading}
          loadingPosition="start"
          onClick={saveIdea}
        >
          {loading ? "Saving" : "Save Idea"}
        </Button>
        {saveErr && <p className="text-red-500 mt-2">{saveErr}</p>}
        {saveSuccess && <p className="text-green-500 mt-2">Idea saved!</p>}
        {redirecting && (
          <CustomModal>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg">
              Redirecting...
            </div>
          </CustomModal>
        )}
      </div>
    </div>
  );
}
