import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      
      {/* IMAGE */}
      <div className="h-72 bg-gray-100 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        
        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {item.title}
        </h2>

        {/* CATEGORY + TYPE */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            {item.category}
          </span>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.type === "Borrow"
                ? "bg-blue-100 text-blue-600"
                : item.type === "Lend"
                ? "bg-green-100 text-green-600"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            {item.type}
          </span>
        </div>

        {/* BUTTON */}
        <Link
          to={`/item/${item._id}`}
          className="block text-center bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ItemCard;