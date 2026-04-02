import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // login user in context
      login(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      
      <div className="bg-white rounded-2xl shadow-lg flex w-[800px] overflow-hidden">
        
        {/* LEFT SIDE (IMAGE / COLOR BLOCK) */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="login"
            className="w-52"
          />
        </div>

        {/* RIGHT SIDE (FORM) */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-10 flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mb-6">
            Login to continue
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border px-4 py-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-4 py-2 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account? 
            <span 
              onClick={() => navigate("/signup")} 
              className="text-blue-600 cursor-pointer ml-1"
            >
              Sign up
            </span>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;