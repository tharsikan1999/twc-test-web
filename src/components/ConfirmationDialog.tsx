import React from "react";

// Define the prop types for the component
interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) {
    return null; // Return null if the modal is not open
  }

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel(); // Close the modal
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 "
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="bg-white p-6 text-center lg:w-[842px] w-3/4 lg:h-[215px] flex flex-col justify-center rounded-[30px]">
        <p className="mb-4 font-normal lg:text-[30px] text-[20px] leading-8">
          {message}
        </p>
        <div className=" mt-8">
          {" "}
          <button
            className="sm:w-[111px] sm:h-[59px] w-[80px] h-[39px] bg-customGreen text-white rounded-[50px] text-[18px] lg:text-[28px] py-1 px-[10px]"
            onClick={handleConfirm}
          >
            Yes
          </button>
          <button
            className="sm:w-[133px] sm:h-[59px] w-[80px] h-[39px] bg-white text-customGreen border-2 border-customGreen ml-7 rounded-[50px] text-[18px] lg:text-[28px] py-1 px-[10px]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
