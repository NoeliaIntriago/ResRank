import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import EditRestaurant from "./pages/EditRestaurantPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RestaurantList from "./pages/RestaurantListPage";
import Locations from "./pages/RestaurantLocationsPage";
import Reviews from "./pages/ReviewPage";
import UserList from "./pages/UserListPage";
import { Roles } from "./utils/global";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurants" element={<RestaurantList />} />

          {/* Rutas protegidas para dueños y admins */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={[Roles.DUENO]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Ruta protegida para editar restaurante (dueños) */}
          <Route
            path="/restaurant/edit/:id"
            element={
              <PrivateRoute roles={[Roles.DUENO]}>
                <EditRestaurant />
              </PrivateRoute>
            }
          />

          {/* Ruta protegida para dejar opiniones (estudiantes) */}
          <Route
            path="/restaurant/:id/review"
            element={
              <PrivateRoute roles={[Roles.ESTUDIANTE]}>
                <Reviews />
              </PrivateRoute>
            }
          />

          {/* Ruta protegida para visualizar ubicaciones de restaurantes (solo estudiantes) */}
          <Route
            path="/locations"
            element={
              <PrivateRoute roles={[Roles.ESTUDIANTE]}>
                <Locations />
              </PrivateRoute>
            }
          />

          {/* Ruta protegida para visualizar la lista de usuarios (solo admins) */}
          <Route
            path="/users"
            element={
              <PrivateRoute roles={[Roles.ADMIN]}>
                <UserList />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
