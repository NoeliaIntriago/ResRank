import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import { Roles } from "./utils/global";

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Decidir si se muestra el Navbar o no
  const shouldShowNavbar = !["/", "/register"].includes(location.pathname);

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };

  return (
    <div className="App">
      {/* Navbar */}
      {shouldShowNavbar && (
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              ResRank
            </Link>
            <div className="nav-links">
              <Link to="/home">Home</Link>
              <Link to="/restaurant">Restaurant</Link>
              <button onClick={handleLogout} className="nav-logout">
                Cerrar sesión
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dueno/dashboard"
          element={
            <PrivateRoute roles={[Roles.DUENO]}>
              <Restaurant />
            </PrivateRoute>
          }
        />
        <Route
          path="/estudiante/dashboard"
          element={
            <PrivateRoute roles={[Roles.ESTUDIANTE]}>
              <Restaurant />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
