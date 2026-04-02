import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchRequests = async () => {
    const res = await fetch(
      `http://localhost:5000/api/requests/owner/${user._id}`
    );
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      <h1 className="text-2xl font-bold mb-6">
        Incoming Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <p className="font-semibold">
                {req.requesterId?.name} requested:
              </p>

              <p className="text-gray-600">
                {req.itemId?.title}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Phone: +{req.requesterId?.phone}
              </p>

              <p className="text-sm mt-2">
                Status: {req.status}
              </p>

              <a
                href={`https://wa.me/${req.requesterId?.phone}?text=Hi, regarding your request for ${req.itemId?.title}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Contact on WhatsApp
              </a>
            </div>
            
          ))}
          
        </div>
      )}

    </div>
  );
};

export default Requests;