import { useRef, useState } from "react";

export default function AudioRecorder() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [audioUrl, setAudioUrl] = useState(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    };

    mediaRecorder.start();
  };

  const stop = () => {
    mediaRecorderRef.current.stop();
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>

      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
}
