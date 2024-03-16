import { useAtom } from "jotai";
import { loggedUser } from '../App';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import "../style/style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../navbar/Navbar"


export default function FilterRestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [availableType, setAvailableType] = useState([]);
  const [filterDist, setFilterDist] = useState("");
  const [user, setUser] = useAtom(loggedUser); // utilizza la posizione dell'utente loggato
 

  useEffect(() => {
    axios.get("/restaurants")
      .then(response => {
        // Assumendo che il backend restituisca già la distanza calcolata o le coordinate per calcolarla
        const updatedRestaurants = response.data.map(restaurant => {
          return {
            ...restaurant,
            distance: calculateDistance(restaurant.positionX, restaurant.positionY, user.positionX, user.positionY)
          };
        });
        setRestaurants(updatedRestaurants);
      })
      .catch(error => console.error("Errore nel recupero dei ristoranti:", error));
  }, [user]); // Aggiungi user alle dipendenze se la sua posizione può cambiare

  function getAvailableType(){

  }

  function calculateDistance(x1, y1, x2, y2) {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    return Math.round(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
  }
  function filteredRestaurants() {
    return restaurants.filter(restaurant => {
      // Verifica se almeno uno dei tipi di cibo nel filtro è presente nell'array foodTypes del ristorante
      const typeMatch = filterType ? restaurant.foodTypes.some(foodType => foodType.includes(filterType)) : true;
      const distMatch = filterDist ? restaurant.distance <= filterDist : true;
      return typeMatch && distMatch;
    });
  }
  
  return (
    <>
    <Navbar/>
      <div className="container mt-3"> 
        <div className="card p-3" data-bs-theme="dark">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group col-2 mt-3">
                <select
                  className="form-select mt-4"
                  aria-label="Default select example"
                  onChange={(e) => setFilterType(e.target.value)}
                  value={filterType}
                > 
                  <option value="">Select a type</option>
                  <option value="Italian">Italian</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Sushi">Sushi</option>
                  <option value="Ramen" >Ramen</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Tacos">Tacos</option>
                  <option value="Burritos">Burritos</option>
                  <option value="Indian">Indian</option>
                  <option value="Curry">Curry</option>
                  <option value="Tandoori">Tandoori</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Gyros">Gyros</option>
                  <option value="Souvlaki">Souvlaki</option>
                </select>
              </div>
              <div className="form-group col-6 mt-3">
                <label>Distanza massima:</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={filterDist} 
                  onChange={(e) => setFilterDist(e.target.value)} 
                />
              </div>
              <button type="button" className="btn btn-warning mt-3" onClick={() => {setFilterType(""); setFilterDist("");}}>Reset Filters</button>
            </div>
          </form>
        </div>
      </div>
      <div className="container-filter d-flex justify-content-around flex-wrap">
        <div className='row w-100 gy-3 gx-2'> 
          {filteredRestaurants().length > 0 ? (
            filteredRestaurants().map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))
          ) : (
            <div class="alert alert-warning" role="alert">
              <FontAwesomeIcon icon={faTriangleExclamation} /> No restaurants found with the selected filters.
            </div>

          
          )}


        </div>
      </div>
    </>
  );

  
}