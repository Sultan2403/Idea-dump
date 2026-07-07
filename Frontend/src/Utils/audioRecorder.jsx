import { useRef, useState } from "react";
import api from "../Apis/Base/api.client";

export default function VoiceTest() {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const [audioUrl, setAudioUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const [data, setData] = useState(null);

  const start = async () => {
    if (recording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });

      streamRef.current?.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    setRecording(true);
  };

  const stop = async () => {
    if (!recording) return;

    mediaRecorderRef.current?.stop();
    setRecording(false);

    const formData = new FormData();
   const audio =  formData.append("audio", new Blob(chunksRef.current, { type: "audio/webm" }), "recording.webm");
    const res = await api.post("/audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setData(res.data);
  };

  return (
    <div>
      <button onClick={start} disabled={recording}>
        Start
      </button>

      <button onClick={stop} disabled={!recording}>
        Stop
      </button>

      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}
