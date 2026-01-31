import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Display() {
  const [text, setText] = useState("");
  return (
    <div className="px-10 py-8 bg-offwhite min-h-[400px] rounded-lg shadow-soft">
      <h2 className="text-2xl font-serif font-medium text-softBrown mb-6">
        Never lose a thought again
      </h2>

      <TextField
        placeholder="Start typing your idea or speak it out instead :)"
        multiline
        minRows={4}
        maxRows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        variant="standard"
        slotProps={{
          htmlInput: {
            disableUnderline: true,
            className: "text-lg text-primaryText leading-relaxed",
          },
        }}
        className="bg-transparent"
      />
    </div>
  );
}
