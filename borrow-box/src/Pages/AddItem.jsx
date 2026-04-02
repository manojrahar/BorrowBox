import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "Borrow",
    description: "",
    image: null,
  });

  const uploadImage = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "borrowbox");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dnhxfwdlr/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const result = await res.json();
  console.log(result);
  return result.secure_url;
};

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          type: formData.type,
          ownerPhone: user.phone,
          description: formData.description,
          image: imageUrl,
          userId: user?._id, 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to add item");
        return;
      }

      toast.success("Item added successfully 🎉");

      navigate("/my-listings"); // or "/explore"
      // setTimeout(() => {
      // }, 1000);
      // reset form
      setFormData({
        title: "",
        category: "",
        type: "Borrow",
        description: "",
        image: null,
      });
      setPreview(null);
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm space-y-6">
        
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            List a New Item
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Share something useful with others
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-600">Item Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter item name"
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select Category</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Clothing</option>
              <option>Stationery</option>
              <option>Others</option>
            </select>
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Type</label>

            <div className="flex gap-3">
              {["Borrow", "Lend", "Donate"].map((t) => (
                <label
                  key={t}
                  className={`px-4 py-2 border rounded-full cursor-pointer text-sm ${
                    formData.type === t
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={formData.type === t}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your item..."
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Upload Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="text-sm"
            />

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 rounded-xl object-cover border"
                />
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Item
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddItem;
