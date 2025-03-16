import React from "react";

const Modal = ({ isOpen, onClose, onSave, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        </div>
        <div>{children}</div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 hover:cursor-pointer bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            بستن
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 hover:cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;