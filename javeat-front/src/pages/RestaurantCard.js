import { useAtom } from "jotai";
import { loggedUser } from '../App';
import { Link } from "react-router-dom";
import imageRestaurant from "../background/baldurs-gate-3-elfsong-room-barkeep.avif";
import React from 'react';
import "../style/style.css"


export default function RestaurantCard({ restaurant}) {
  const [userIn, setUser] = useAtom(loggedUser);
 
  // if (!user || typeof user.positionX === 'undefined' || typeof user.positionY === 'undefined') {
  //   return <div>User information not available</div>;
  // }
  const isOpen = (openingHour, closingHour) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour >= openingHour && currentHour < closingHour;
  };

  const calculateDistance = () => {
    const deltaX = restaurant.positionX - userIn.positionX;
    const deltaY = restaurant.positionY - userIn.positionY;
    //return Math.sqrt(deltaX * deltaX + deltaY * deltaY).toFixed(2); //con due dec dopo la virgola
    return Math.round(Math.sqrt(deltaX * deltaX + deltaY * deltaY)); // con numero intero
  };

  function formattedType(){
    let typesFormatted = "";

    restaurant.foodTypes.forEach(f => {

      let typeWithSpace = f + " ";
      typesFormatted = typesFormatted + typeWithSpace;

    });

    return typesFormatted;
  }
  
  return (
    <>
    
    <div className="col-6 col-sm-4 col-lg-3">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front ">
              <div style={{ backgroundImage: `url(${restaurant.imgUrl})`, height: "100%", width: "100%", backgroundSize: "cover", marginBottom: "10px", borderRadius: "14px"}}  alt="..." />
            </div>
            <div className="flip-card-back">
              <div className="card-body p-3">
                <h5 className="card-title">{restaurant.name}</h5>
                <p>Food type: {formattedType()}</p>
                <div className="mb-3">
                <p className="card-text" >
                {isOpen(restaurant.openingHour, restaurant.closingHour) ? (
                <span >Open</span>
                ) : (
                <span >Closed</span>
                )}
                <br/>
                Distance: {calculateDistance()}
                </p>
                </div>

                <div>
                {
                userIn    
                ?
                <>
                  <button className="btn btn-warning mt-3" type="button">
                  <Link className="nav-link" to={"/restaurants/" + restaurant.id}>Details</Link>
                  </button>

                  
                </> 
                :  
                <>
                <button className="btn btn-warning mt-3" type="button" style={{visibility: "hidden"}}>
                <Link className="nav-link" to={"/restaurants/" + restaurant.id}>Details</Link>
                </button>

                </> 
                }
                </div>
              </div>

            </div>
          </div>
        </div>
    </div>

  </>
  );

}