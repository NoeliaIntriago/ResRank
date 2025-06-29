import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import CustomNavbar from "./shared/components/Navbar";
import { AuthProvider } from "./shared/contexts/authContext";
import AppRoutes from "./shared/routes/routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <CustomNavbar />
          <Row>
            <Col>
              <AppRoutes />
              <ToastContainer />
            </Col>
          </Row>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
