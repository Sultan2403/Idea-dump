import { useRef, useState } from "react";
import { WavRecorder } from "wavtools";


export default function VoiceTest() {
  const [audioUrl, setAudioUrl] = useState(null);

  const start = () => {
    console.log("starting recorder...");
  };

  const stop = () => {
    console.log("Stopping recorder....");
  };
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}
