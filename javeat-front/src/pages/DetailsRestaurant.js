import axios from 'axios';
import { currentUser } from '../App';
import { atom, useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; 
import { faMagnifyingGlassLocation, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/Navbar';

import "../style/menu_style.css";

export const subTotalGlobal = atom(0);

export default function DetailsRestaurant() {
  const [restaurant, setRestaurants] = useState({});
  const [dishes, setDishes] = useState([]);
  const [counts, setCounts] = useState({});
  const [prices, setPrices] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [globalSubTotal, setGlobalSubTotal] = useAtom(subTotalGlobal);
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    axios.get(`/restaurants/${id}`)
      .then((response) => {
        setRestaurants(response.data);
        getDishes(response.data.menu.id);
      })
      .catch((error) => {
        console.error("Error retrieving restaurant data:", error);
      });
  }, [id]);

  function getDishes(id) {
    axios.get(`/menus/${id}`)
      .then((response) => {
        setDishes(response.data.dishes);
        const initialCounts = {};
        const initialPrices = {};
        response.data.dishes.forEach(dish => {
          initialCounts[dish.id] = 0;
          initialPrices[dish.id] = dish.price; // assuming the price property exists in your dish object
        });
        setCounts(initialCounts);
        setPrices(initialPrices);
      })
      .catch((error) => {
        console.error("Error retrieving dishes data:", error);
      });
  }

  function increment(id) {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1
    }));
  }

  function decrement(id) {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] - 1
    }));
  }

  function removeAll() {
    const resetCounts = {};
    Object.keys(counts).forEach(id => {
      resetCounts[id] = 0;
    });
    setCounts(resetCounts);
  }

  function handleCheckout() {
    navigate('/add-delivery');
  }

  useEffect(() => {
    let subTotal = 0;
    Object.keys(counts).forEach(id => {
      subTotal += counts[id] * prices[id];
    });
    setSubtotal(subTotal);
    setGlobalSubTotal(subTotal);
  }, [counts, prices, subTotalGlobal]);

  

  return (
    <>
    <Navbar/>
      <div className="card mt-3" style={{ margin: "0 auto", width: "80%" }}>
        <div className='d-flex '>
          <div className="card-body text-light">
            <h5 className="card-title">{restaurant.name}</h5>
            <p className="card-text">
              <FontAwesomeIcon icon={faMagnifyingGlassLocation} />  Max delivery distance: {restaurant.maxDeliveryDistance}
            </p>
            <p className="card-text">
              <FontAwesomeIcon icon={faPhone} />  Contact us: {restaurant.phone}
            </p>
            <p className="card-text">
              <FontAwesomeIcon icon={faClock} />  Opening hour: {restaurant.openingHour}
            </p>
          </div>
          <div class="CartContainer">
            <div class="Header">
              <h2 class="Heading">Our menu</h2>
              <button className="btn btn-danger mt-2" onClick={removeAll}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
            {dishes.map(dish =>
              <div class="Cart-Items" key={dish.id}>
                <div class="about">
                  <span ><strong>{dish.name}</strong></span>
                  <p class="price">Price: {dish.price} €</p>
                </div>
                <div class="counter">
                  <div class="btn" onClick={() => increment(dish.id)}>+</div>
                  <div class="count">{counts[dish.id]}</div>
                  <div class="btn" onClick={() => decrement(dish.id)}>-</div>
                </div>
              </div>
            )}
            <hr />
            <div class="checkout">
              <div class="total">
                <div>
                  <div class="Subtotal">Sub-Total</div>
                
                </div>
                <div class="total-amount">{subtotal} €</div>
              </div>
              <button className="btn btn-warning" onClick={handleCheckout} style={{width: "100%", marginBottom: "10px"}}>BUY</button>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}

