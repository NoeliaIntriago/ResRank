import { Route, Routes } from "react-router-dom";
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboardPage";
import OwnerDashboard from "../../features/dashboard/pages/OwnerDashboardPage";
import Profile from "../../features/profile/pages/Profile";
import EditRestaurant from "../../features/restaurants/pages/EditRestaurantPage";
import RestaurantList from "../../features/restaurants/pages/RestaurantListPage";
import Locations from "../../features/restaurants/pages/RestaurantLocationsPage";
import Reviews from "../../features/reviews/pages/ReviewPage";
import PrivateRoute from "../components/PrivateRoute";
import { Roles } from "../utils/global";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Register />} />
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
      path="/restaurant/review/:id"
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
