import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboardPage";
import EditRestaurant from "./pages/EditRestaurantPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboardPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RestaurantList from "./pages/RestaurantListPage";
import Locations from "./pages/RestaurantLocationsPage";
import Reviews from "./pages/ReviewPage";
import { Roles } from "./utils/global";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/restaurants" element={<RestaurantList />} />

    <Route
      path="/restaurant-management"
      element={
        <PrivateRoute roles={[Roles.DUENO]}>
          <OwnerDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/restaurant/edit/:id"
      element={
        <PrivateRoute roles={[Roles.DUENO]}>
          <EditRestaurant />
        </PrivateRoute>
      }
    />
    <Route
      path="/restaurant/new"
      element={
        <PrivateRoute roles={[Roles.DUENO]}>
          <EditRestaurant />
        </PrivateRoute>
      }
    />
    <Route
      path="/restaurant/:id/review"
      element={
        <PrivateRoute roles={[Roles.ESTUDIANTE]}>
          <Reviews />
        </PrivateRoute>
      }
    />
    <Route
      path="/locations"
      element={
        <PrivateRoute roles={[Roles.ESTUDIANTE]}>
          <Locations />
        </PrivateRoute>
      }
    />
    <Route
      path="/users"
      element={
        <PrivateRoute roles={[Roles.ADMIN]}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
