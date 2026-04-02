import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone?.slice(2) || "", // remove 91
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    // update localStorage only (simple version)
    const updatedUser = {
      ...userData,
      name: formData.name,
      phone: "91" + formData.phone,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile updated ✅");
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">

        <h1 className="text-2xl font-bold text-gray-800">
          My Profile
        </h1>

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg mt-1"
          />
        </div>

        {/* EMAIL (readonly) */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="text"
            value={formData.email}
            disabled
            className="w-full border px-4 py-2 rounded-lg mt-1 bg-gray-100"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm text-gray-600">Phone</label>

          <div className="flex border rounded-lg overflow-hidden mt-1">
            <span className="px-3 bg-gray-100 flex items-center">
              +91
            </span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
              className="w-full px-4 py-2 outline-none"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
};

export default Profile;