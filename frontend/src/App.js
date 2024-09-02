import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantPage from "./pages/RestaurantPage";
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
          <Route path="/restaurant/:id" element={<RestaurantPage />} />

          {/* Rutas protegidas para dueños y admins */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={[Roles.DUENO]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Ruta protegida para editar restaurante */}
          <Route
            path="/restaurant/edit/:id"
            element={
              <PrivateRoute roles={[Roles.DUENO]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Ruta para dejar opiniones, protegida para estudiantes */}
          <Route
            path="/restaurant/:id/review"
            element={
              <PrivateRoute roles={[Roles.ESTUDIANTE]}>
                <Dashboard />
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
