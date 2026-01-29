import TextField from "@mui/material/TextField";

export default function Display() {
  return (
    <div className="px-10 py-8">
      {/* Title */}
      <h2 className="text-2xl font-medium text-softBrown mb-6">
        Dump your thoughts
      </h2>

      {/* Idea input */}
      <TextField
        placeholder="Start typing your idea or speak it instead :)"
        multiline
        minRows={4}
        maxRows={8}
        fullWidth
        variant="standard"
        slotProps={{
          htmlInput: {
            disableUnderline: true,
            className: "text-lg text-gray-800 leading-relaxed",
          },
        }}
        className="bg-transparent"
      />

      {/* Subtle hint */}
      <p className="mt-3 text-sm text-gray-400">
        Press Enter to save • Ideas autosave
      </p>
    </div>
  );
}
