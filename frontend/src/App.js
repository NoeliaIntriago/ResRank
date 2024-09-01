import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              ResRank
            </Link>
            <div className="nav-links">
              <Link to="/">Login</Link>
              <Link to="/register">Registro</Link>
              <Link to="/home">Home</Link>
              <Link to="/restaurant">Restaurant</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
