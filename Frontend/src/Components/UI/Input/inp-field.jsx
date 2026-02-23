import TextField from "@mui/material/TextField";

export default function InputField({ value = "", name, setValue, onChange, props }) {
  return (
    <>
      <TextField
        placeholder="Start typing your idea or speak it out instead :)"
        multiline
        name={name}
        minRows={4}
        maxRows={8}
        value={value}
        onChange={(e) => {setValue?.(e.target.value); onChange?.(e)}}
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
