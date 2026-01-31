// src/Components/Modal/CustomModal.jsx
import Modal from "@mui/material/Modal";


export default function CustomModal({
  open,
  onClose,
  children,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="bg-offwhite p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col space-y-4">
        {children} {/* <- whatever you pass here */}
      </div>
    </Modal>
  );
}
