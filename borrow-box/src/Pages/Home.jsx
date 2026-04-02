import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 space-y-24 py-10">

      {/* HERO */}
      <section className="bg-blue-100 py-20 rounded-3xl text-center max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-800">
          Share. Borrow. Support.
        </h1>

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          A smart way for students to borrow, lend, and donate items within campus.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/explore"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Explore Items
          </Link>
        </div>
      </section>

      {/* WHAT IS BORROWBOX */}
      <section className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          What is BorrowBox?
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          BorrowBox is a student-powered platform where you can borrow, lend, or donate everyday items.
          Instead of buying new things, you can save money and help your campus community.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How BorrowBox Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-blue-500 text-3xl mb-4">01</div>
            <h3 className="text-lg font-semibold">Browse Items</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Discover items shared by students around you.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-blue-500 text-3xl mb-4">02</div>
            <h3 className="text-lg font-semibold">Send Request</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Connect and request items easily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-blue-500 text-3xl mb-4">03</div>
            <h3 className="text-lg font-semibold">Use & Return</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Use the item and return or donate later.
            </p>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Explore Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

            {["Books", "Electronics", "Accessories", "Stationery", "Clothing", "Others"].map((cat) => (
              <div
                key={cat}
                className="px-6 py-3 bg-white border rounded-full shadow-sm hover:shadow-md hover:bg-blue-50 transition cursor-pointer text-sm font-medium"
              >
                {cat}
              </div>
            ))}

        </div>
      </section>  

      {/* WHY CHOOSE US */}
      <section className="max-w-5xl mx-auto text-center px-4 space-y-10">
        
        <h2 className="text-3xl font-bold text-gray-800">
          Why Students Love BorrowBox
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-semibold text-lg">Save Money</h3>
            <p className="text-gray-500 text-sm mt-2">
              Borrow instead of buying things you rarely use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Sustainable</h3>
            <p className="text-gray-500 text-sm mt-2">
              Reduce waste by sharing resources.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Community Driven</h3>
            <p className="text-gray-500 text-sm mt-2">
              Help and connect with fellow students.
            </p>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="bg-white py-10 rounded-2xl max-w-5xl mx-auto text-center">
        <div className="grid grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">100+</h2>
            <p className="text-gray-500">Items Shared</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">50+</h2>
            <p className="text-gray-500">Students</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">200+</h2>
            <p className="text-gray-500">Requests</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Ready to start sharing?
        </h2>

        {user ? (
          <Link
            to="/add-item"
            className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Add Item
          </Link>
        ) : (
          <Link
            to="/signup"
            className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>
        )}
      </section>

    </div>
  );
};

export default Home;