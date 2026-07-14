import Modal from "react-modal";
import CourseForm from "./CourseForm";

Modal.setAppElement("#root");

export default function CourseModal({
  isOpen,
  onClose,
  addCourse,
  editCourse,
  updateCourse,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl p-8 max-w-xl w-full mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
    >
      <CourseForm
        addCourse={addCourse}
        editCourse={editCourse}
        updateCourse={updateCourse}
        onClose={onClose}
      />
    </Modal>
  );
}