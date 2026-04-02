import Navbar from "./Navbar";


const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="max-w-6xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;