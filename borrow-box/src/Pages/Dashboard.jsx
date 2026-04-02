import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    totalItems: 0,
    recentItems: [],
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/items/dashboard/${user._id}`
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 text-sm">My Listings</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {data.totalItems}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Borrow Requests</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            0
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Donations</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            0
          </h2>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Listings
        </h2>

        {data.recentItems.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No recent activity yet
          </p>
        ) : (
          <div className="space-y-4">
            {data.recentItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.category}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;