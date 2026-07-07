const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

async function transcribeAudio(audioFile) {
  const prompt = `
  Process the audio file and generate a detailed transcription.

  Requirements:
  1. Clean text formatting where segments/paragraph of the core idea/theme are seperated with 2-3 newline chars
`;
const base64Audio = Buffer.isBuffer(audioFile) 
    ? audioFile.toString("base64") 
    : audioFile;

  const response = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: [
      { type: "text", text: prompt },
      {
        type: "audio",
        data: base64Audio,
        mime_type: "audio/wav",
      },
    ],
  });
  console.log(response.output_text);
  return response;
}

module.exports = { transcribeAudio };
