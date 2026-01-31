import InputField from "../Input/inp-field";

export default function Display() {
  return (
    <div className="px-10 py-8 bg-offwhite min-h-[400px] rounded-lg shadow-soft">
      <h2 className="text-2xl font-serif font-medium text-softBrown mb-6">
        Never lose a thought again
      </h2>

      <InputField />
    </div>
  );
}
