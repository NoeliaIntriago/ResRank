import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "./authContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
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
