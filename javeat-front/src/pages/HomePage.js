import React from 'react';
import { useAtom } from "jotai";
import { loggedUser } from '../App';
import { Link } from 'react-router-dom';
import background_homepage from "../background/background_homepage.jpg"
import Navbar from '../navbar/Navbar';
import MapPage from './MapPage';
import homepage_style from "../style/homepage_style.css"
import baldurs_map from "../background/baldurs_map.png"





export default function  HomePage() {
  const [userIn, setUser] = useAtom(loggedUser);
 

  function logout() {
    if (userIn) {
      setUser(null);
      localStorage.clear();
    }
  }


  return (<>
    <div className="ms_container" style={{
      backgroundImage: `url(${background_homepage})`,
      width: "100%",
      height: "100%",
      minHeight: "100vh",
      backgroundSize: "cover"
    }}>
  
       
        
  <nav className="navbar navbar-dark " style={{backgroundColor: "#21252900"}}>
            <div className="container d-flex justify-content-around">
            
           
            </div>
        </nav>
     <div className="d-flex justify-content-around">
      <div className="ms_container_buttons">
        <div className="ms_title" style={{paddingLeft: "10px", fontSize: "2rem"}} >
          <h1>Welcome to Baldur's gate</h1>
          <h1>on-line food delivery</h1>
        </div>
        {!userIn ? (
          <>
          
            <Link className="btn btn-warning me-3" to="/users/login">Login</Link>
            <Link className="btn btn-warning" to="/register">Register</Link>
          </>
        ) : (
          <>
          <button className='btn btn-danger' onClick={logout}>Logout</button>
          <Link className="btn btn-info" to="/all-restaurants" style={{marginLeft:"10px", color: "white"}}> Show List of restaurants </Link>

          </>
         

         

        )}
      </div>

      <div className="ms_map">
        {userIn && <MapPage/>}
      </div>
      </div>
    </div>

  </>
  );
}

