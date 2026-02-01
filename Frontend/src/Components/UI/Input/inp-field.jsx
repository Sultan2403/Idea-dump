import TextField from "@mui/material/TextField";

export default function InputField({ value = "", setValue, props }) {
  return (
    <>
      <TextField
        placeholder="Start typing your idea or speak it out instead :)"
        multiline
        minRows={4}
        maxRows={8}
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
        fullWidth
        variant="standard"
        slotProps={{
          htmlInput: {
            className: "text-lg text-primaryText leading-relaxed",
          },
        }}
        {...props}
        className="bg-transparent"
      />
    </>
  );
}
