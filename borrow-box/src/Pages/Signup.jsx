import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // allow only numbers
      const cleaned = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        phone: cleaned,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: "91" + formData.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Account created 🎉");
      // store user
      localStorage.setItem("user", JSON.stringify(data.user));
      
      navigate("/login");
    } catch {
      toast.error("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      
      <div className="bg-white rounded-2xl shadow-lg flex w-[800px] overflow-hidden">
        
        {/* LEFT IMAGE */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="illustration"
            className="w-48"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 p-8">
          
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border px-4 py-2 rounded-lg"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded-lg"
              onChange={handleChange}
              required
            />

            <div className="flex border rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 flex items-center text-gray-600">
                +91
              </span>
              <input
                type="text"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className="w-full px-4 py-2 outline-none"
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-lg"
              onChange={handleChange}
              required
            />

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Sign Up
            </button>
          </form>

          <p className="text-sm mt-4 text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;