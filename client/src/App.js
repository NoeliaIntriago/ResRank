import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShowOwners from "./pages/owner/ShowOwners";
import Owner  from './pages/owner/Owner';
import Register from './pages/Register';
import RegisterOwner from './pages/register/RegisterOwner';
import RegisterStudent from './pages/register/RegisterStudent';
import Login from './pages/Login';
import LoginOwner from './pages/login/LoginOwner';
import LoginStudent from './pages/login/LoginStudent';

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
          <Route path="/register/owner" exact element={<RegisterOwner/>}/>
          <Route path="/register/student" exact element={<RegisterStudent/>}/>
          <Route path="/login/owner" exact element={<LoginOwner/>}/>
          <Route path="/login/student" exact element={<LoginStudent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
