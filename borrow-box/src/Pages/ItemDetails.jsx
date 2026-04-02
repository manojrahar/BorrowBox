import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [requested, setRequested] = useState(false);

  const fetchItem = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
      const data = await res.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching item", error);
    }
  };

  const handleRequest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      setRequested(true);
      console.log("SENDING REQUEST:");
      console.log("itemId:", item._id);
      console.log("requesterId:", user._id);
      console.log("ownerId:", item.user?._id);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: item._id,
          requesterId: user._id,
          ownerId: item.user._id,
          message: "I want this item",
        }),
      });

      console.log("Response:", res);
      console.log("ITEM FULL:", item);
console.log("OWNER:", item.user); //❤️

      if (!res.ok) {
        toast.error("Request failed");
        return;
      }

      toast.success("Request sent 🚀");
    } catch (err) {
      console.log(err);
      toast.error("Error sending request");
    }
  };

  const handleContact = () => {
    const phone = item.user?.phone;
    const message = `Hi, I'm interested in your item: ${item.title}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (!item) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-sm">

        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl flex items-center justify-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full object-cover rounded-xl"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-gray-800">
            {item.title}
          </h1>

            <div className="flex flex-col gap-6">
            {/* CATEGORY + TYPE */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                {item.category}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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

            {/* OWNER INFO */}
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                {item.user?.name?.charAt(0) || "U"}
              </div>

              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <h3 className="font-semibold text-gray-800">
                  {item.user?.name || "Unknown"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  +{item.user?.phone}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
  onClick={handleRequest}
  disabled={!item?.user?._id}
  className={`flex-1 py-3 rounded-lg ${
    !item?.user
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-blue-500 text-white hover:bg-blue-600"
  }`}
>
  Request Item
</button>

            <button onClick={handleContact} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                Contact Owner
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ItemDetails;