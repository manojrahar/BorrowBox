import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyListings = () => {
  const [items, setItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyItems = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/items/user/${user._id}`
      );
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
      });

      toast.success("Item deleted");

      // refresh list
      fetchMyItems();
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          My Listings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your shared items
        </p>
      </div>

      {/* CONTENT */}
      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No items added yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              
              {/* LEFT */}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.category}
                </p>

                <span className="text-xs text-blue-500">
                  {item.type}
                </span>
              </div>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item._id)}
                className="text-sm text-red-500 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50 transition"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyListings;