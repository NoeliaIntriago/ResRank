import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShowOwners from "./pages/owner/ShowOwners";
import Owner  from './pages/owner/Owner';
import ShowStudents from './pages/student/ShowStudents';
import Student from './pages/student/Student';
import Register from './pages/Register';
import RegisterOwner from './pages/register/RegisterOwner';
import RegisterStudent from './pages/register/RegisterStudent';
import Login from './pages/Login';
import LoginOwner from './pages/login/LoginOwner';
import LoginStudent from './pages/login/LoginStudent';
import Local from './pages/local/Local';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Login </Link>
          <Link to="/register"> Register </Link>
          <Link to="/owners"> Owners </Link>
          <Link to="/students"> Students </Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/owners" exact element={<ShowOwners/>}/>
          <Route path="/owner/:id" exact element={<Owner/>}/>
          <Route path="/students" exact element={<ShowStudents/>}/>
          <Route path="/student/:id" exact element={<Student/>}/>
          <Route path="/register/owner" exact element={<RegisterOwner/>}/>
          <Route path="/register/student" exact element={<RegisterStudent/>}/>
          <Route path="/login/owner" exact element={<LoginOwner/>}/>
          <Route path="/login/student" exact element={<LoginStudent/>}/>
          <Route path="/local/:id" exact element={<Local/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
