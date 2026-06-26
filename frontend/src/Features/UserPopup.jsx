const UserPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          <button onClick={onClose} className="text-2xl hover:text-red-500">
            ✕
          </button>
        </div>

        {/* Body */}
        <form className="p-6 space-y-5">
          {/* Profile Image */}
          <div>
            <label className="block mb-2 font-medium">Profile Picture</label>

            <input type="file" className="w-full border rounded-lg p-2" />
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-lg p-3"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Facebook URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Instagram URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="GitHub URL"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows={4}
            placeholder="About Me"
            className="w-full border rounded-lg p-3"
          />

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPopup;
