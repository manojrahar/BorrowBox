import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../Pages/Dashboard";
import AddItem from "../Pages/AddItem";
import Profile from "../Pages/Profile";
import ItemDetails from "../Pages/ItemDetails";
import MyListings from "../Pages/MyListings";
import MainLayout from "../Layouts/MainLayout";
import ProtectedRoute from "../Component/layout/ProtectedRoute";
import Requests from "../Pages/Requests";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES WITH LAYOUT */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/explore"
        element={
          <MainLayout>
            <Explore />
          </MainLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      <Route
        path="/item/:id"
        element={
          <MainLayout>
            <ItemDetails />
          </MainLayout>
        }
      />

      <Route
        path="/my-listings"
        element={
          <MainLayout>
            <MyListings />
          </MainLayout>
        }
      />

      {/* 🔐 PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-item"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AddItem />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Requests />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* AUTH ROUTES WITHOUT LAYOUT */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
