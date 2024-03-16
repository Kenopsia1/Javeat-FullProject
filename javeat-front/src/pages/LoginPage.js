import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { loggedUser } from '../App';
import Navbar from '../navbar/Navbar';


function LoginPage() {
  const [user, setUser] = useAtom(loggedUser);
  const [mail, setMail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

  function userLogin(e) {
    e.preventDefault(); // Previene il refresh della pagina

    const userLogin = {
      "mail": mail,
      "password": password
    };

    axios.post("/users/login", userLogin)
      .then(response => {
        if (response.data && response.status === 200) {
          setUser(response.data) // Se necessario aggiornare lo stato dell'utente
           navigate("/");
        }
      })
      .catch(error => {
        console.error('Errore durante il login:', error);
        alert('Credenziali errate. Riprova.');
      });
  }

  return (
    <>
    <Navbar/>
  <div className="container mt-3" data-bs-theme="dark">
  <div className="card border-dark " style={{backgroundColor: "#000000ed"}}>
  <div className="card-body text-center mb-2">
  <div>
        <h2>Login</h2>
  </div>
      <form onSubmit={userLogin}>
        <div className=" input-group mb-3">
          <span htmlFor="exampleInputEmail1" className="input-group-text">Email address</span>
          <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        
        </div>
        <div className=" input-group mb-3">
          <span htmlFor="exampleInputPassword1" className="input-group-text">Password</span>
          <input 
            type="password" 
            className="form-control" 
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-warning">Submit</button>
      </form>
    </div>
    </div>
    </div>
</>
  );
}

export default LoginPage;
