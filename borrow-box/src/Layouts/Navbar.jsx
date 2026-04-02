import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 sm:px-8 py-3 sticky top-0 z-50 shadow-md">
      <div className="flex flex-wrap justify-between items-center gap-3">
        
        {/* LEFT - LOGO */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold tracking-wide"
        >
          BorrowBox
        </Link>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 relative">
          
          <Link
            to="/"
            className="text-sm sm:text-base hover:text-gray-300 transition"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="text-sm sm:text-base hover:text-gray-300 transition"
          >
            Explore
          </Link>

          {user && (
            <>
              {/* ADD ITEM BUTTON */}
              <Link
                to="/add-item"
                className="bg-white text-gray-900 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition"
              >
                + Add Item
              </Link>

              {/* PROFILE DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-sm hover:bg-gray-700 transition"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-32 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/my-listings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Listings
                    </Link>

                    <Link
                      to="/requests"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Requests
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              className="bg-white text-gray-900 px-3 py-2 rounded-lg text-xs sm:text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;