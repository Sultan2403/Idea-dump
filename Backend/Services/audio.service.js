const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function transcribeAudio(audioFile) {
  const prompt = `
  Process the audio file and generate a detailed transcription.

  Requirements:
  1. Clean text formatting where segments/paragraph of the core idea/theme are seperated with 2-3 newline chars
`;

  const response = await ai.interactions.create({
    input: [
      { type: "text", text: prompt },
      {
        type: "audio",
        data: audioFile,
        mime_type: "audio/webm",
      },
    ],
  });
  console.log(response.output_text);
  return response;
}

module.exports = { transcribeAudio };
