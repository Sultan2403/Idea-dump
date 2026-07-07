import { useRef, useState } from "react";
import RecordRTC from "recordrtc";
import api from "../Apis/Base/api.client";

export default function VoiceTest() {
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  const [audioUrl, setAudioUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const [data, setData] = useState(null);

  const start = async () => {
    if (recording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize RecordRTC to capture perfect mono WAV audio across all browsers
      const recorder = new RecordRTC(stream, {
        type: "audio",
        recorderType: RecordRTC.StereoAudioRecorder, // Intercepts PCM raw data
        numberOfAudioChannels: 1, // Mono is ideal for voice synthesis/parsing
        desiredSampRate: 16000, // 16kHz keeps the file footprint super light
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      console.error("Failed to access microphone:", err);
    }
  };

  const stop = async () => {
    if (!recording || !recorderRef.current) return;

    setRecording(false);

    // Stop recording and pass a callback function to capture the final Blob safely
    recorderRef.current.stopRecording(async () => {
      const wavBlob = recorderRef.current.getBlob();

      // 1. Create a local preview URL for your audio element
      const url = URL.createObjectURL(wavBlob);
      setAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });

      // 2. Shut down microphone streams cleanly
      streamRef.current?.getTracks().forEach((track) => track.stop());

      // 3. Securely pack and dispatch to your proxy endpoint
      const formData = new FormData();
      formData.append("audio", wavBlob, "recording.wav");

      try {
        const res = await api.post("/audio", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to upload audio payload:", err);
      } finally {
        // Clean up the instance memory
        recorderRef.current.destroy();
        recorderRef.current = null;
      }
    });
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

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
