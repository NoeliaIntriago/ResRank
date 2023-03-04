import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShowOwners from "./pages/owner/ShowOwners";
import Owner  from './pages/owner/Owner';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Login </Link>
          <Link to="/register"> Register </Link>
          <Link to="/owners"> Home Page </Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/owners" exact element={<ShowOwners/>}/>
          <Route path="/owner/:id" exact element={<Owner/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
