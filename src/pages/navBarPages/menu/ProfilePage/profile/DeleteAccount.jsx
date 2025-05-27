import { useState } from "react";

function DeleteAccount({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    if (onDelete) onDelete();
    // Place your delete logic here if not using onDelete prop
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={() => setShowConfirm(true)}
      >
        Delete Account
      </button>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="mb-4 text-red-700 font-semibold">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
