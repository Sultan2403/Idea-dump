import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Display() {
  return (
    <div className="p-6 bg-cream min-h-[200px] rounded-xl shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-softBrown">Add a New Idea</h2>
      <TextField
        label="Your idea..."
        variant="outlined"
        fullWidth
        className="bg-white rounded"
      />
      <Button
        variant="contained"
        className="bg-softBrown hover:bg-[#926b49] text-cream"
      >
        Submit
      </Button>
    </div>
  );
}
