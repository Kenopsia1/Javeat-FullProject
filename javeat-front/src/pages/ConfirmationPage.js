import style from "../style/confirmation_page.css";
import check from "../background/check_5610944.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { loggedUser } from '../App';
import { subTotalGlobal } from './DetailsRestaurant';
import { useAtom } from "jotai";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


export default function ConfirmationPage(){
  const [userIn] = useAtom(loggedUser);
  const [dishes, setDishes] = useState([]);
  const [subTotal] = useAtom(subTotalGlobal); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deliveryTime = queryParams.get('deliveryTime');
  const note = queryParams.get('note');

  return(
<>
<Navbar/>
    <div className="bg d-flex justify-content-around align-items-center" >
      <div className="ms-card"  data-bs-theme="dark" >
        <h1>Summary</h1>
        <div class="alert alert-success" role="alert">
          Order completed successfully!
        </div>
        <div className="card__body">
        <div className="card__submsg">
            <h5>Your preferences:</h5>
            <span>{note}</span>
          </div>
          <div className="card__submsg">
            <h5>Estimated Time of Arrival:</h5>
            <span>{deliveryTime}</span>
          </div>
        

        </div>
      </div>

      <div className="ms-card">
        <div><img className="card__success" src={check} alt="check" /></div>
        <h1 className="card__msg">Payment Complete</h1>
        <div className="card__body">
          <div className="card__recipient-info">
            <h2 className="card__submsg">Thank you for your transfer</h2>
            <p className="card__email"><FontAwesomeIcon icon={faUser} size="sm" /> {userIn.mail}</p>
          </div>
          <div className="card__price">
            <span>€</span>{subTotal}<span>.00</span>
          </div>
       
          <p className="card__method">Payment method</p>
          <div className="card__payment">
            <img src="https://seeklogo.com/images/V/VISA-logo-F3440F512B-seeklogo.com.png" className="card__credit-card" alt="credit card"/>
            <div className="card__card-details">
              <p className="card__card-type">Credit / debit card</p>
              <p className="card__card-number">Visa ending in **89</p>
            </div>
          </div>
        </div>
        <div className="card__tags">
          <span className="card__tag">completed</span>
          <span className="card__tag">#123456789</span>
        </div>
      </div>
    </div>
    </>
  );
}
