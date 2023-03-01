import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreateOwner  from './pages/CreateOwner';
import Owner  from './pages/Owner';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Home Page </Link>
          <Link to="/createOwner"> Create an owner </Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createOwner" exact element={<CreateOwner/>}/>
          <Route path="/owner/:id" exact element={<Owner/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
