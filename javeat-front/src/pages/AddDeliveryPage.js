import React, { useState } from 'react';
import style from '../style/payment_style.scss'
import cashorcard from "../background/kisspng-currency-credit-card-exchange-rate-money-foreign-e-travel-money-card-using-cash-passport-as-a-trave-5b65ddc4683b49.1660119115334025644269.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons'; 
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


 
export default function AddDeliveryPage() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  function handleConfirmation() {
      const note = document.getElementById("note").value;
      navigate(`/confirmed?deliveryTime=${selectedValue}&note=${note}`);
  }

  const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
  };

  return (
      <>
      <Navbar/>
          <div className="slide-container">
              <div className="wrapper">
                  <div className="clash-card barbarian">
                      <div className="clash-card__image clash-card__image--barbarian">
                          <img src={cashorcard} alt="cash or card" />
                      </div>
                      
                      <div className="container-icons d-flex align-items-center justify-content-evenly">
                          <div style={{ verticalAlign: "middle" }}>CHOOSE YOUR PAYMENT METHOD:</div>
                          <div className="clash-card__unit-description">
                              <FontAwesomeIcon icon={faCreditCard} size="2x" />
                              <div className="icon-shadow"></div>
                          </div>
                          <div className="clash-card__unit-description">
                              <FontAwesomeIcon icon={faMoneyBill1} size="2x"/>
                              <div className="icon-shadow"></div>
                          </div>
                      </div>

                      <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
                          <div className="one-half no-border">
                              <div className="stat">Note</div>
                              <div className="input-group">
                                  <textarea id="note" className="form-control m-3" placeholder='Please tell us about any preferences and/or allergies'></textarea>
                              </div>
                          </div>
                          <div className="one-half">
                              <div className="stat">Delivery time</div>
                              <div className="stat-value m-3">
                                  <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
                                      <option selected>Select the preferred delivery time</option>
                                      <option value="10:15-10:30">10:15-10:30</option>
                                      <option value="10:45-11:00">10:45-11:00</option>
                                      <option value="11:15-11:30">11:15-11:30</option>
                                  </select>
                              </div>
                          </div>

                          <button className="btn btn-light mb-3" onClick={handleConfirmation}>CONFIRM</button>

                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}
