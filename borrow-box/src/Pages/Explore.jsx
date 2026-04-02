import { useEffect, useState } from "react";
import ItemCard from "../Component/items/ItemCard";

const Explore = () => {
  const [items, setItems] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const fetchItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  // 🔥 FILTER LOGIC
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
    
    const matchesCategory =
    selectedCategory === "All" ||
    item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  console.log(items);
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Items
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">
        {["All", "Books", "Electronics", "Accessories", "Clothing", "Stationery", "Others"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm border rounded-full transition ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ITEMS */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No matching items found 😔
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Explore;