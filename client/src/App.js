import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/owner").then((res) => {
      setOwners(res.data);
    })
  }, [])
  return (
    <div className="App">
      {owners.map((value, key) => { 
        return (
          <div className="owner">
            <div className="name"> {value.name} {value.lastName} </div>
            <div className="cellphone"> {value.cellphone} </div>
            <div className="email"> {value.email} </div>
            <div className="password"> {value.password} </div>
          </div> 
        );
      })}
    </div>
  );
}

export default App;
