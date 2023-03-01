import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreateOwner  from './pages/CreateOwner';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createOwner"> Create an owner </Link>
        <Link to="/"> Home Page </Link>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createOwner" exact element={<CreateOwner/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
