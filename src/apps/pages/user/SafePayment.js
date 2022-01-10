import React, { useEffect, useState } from "react";
import { ProcessingItemList } from "../../components/forms/User/UserAddFormFields";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
const cookies = new Cookies();

function AdminAddPage() {
  const get_cookies = cookies.get("data");

  let location = useLocation();

  useEffect(async () => {
    const userId = get_cookies.id;
    console.log("location", location.state);
    console.log("cookies", get_cookies);
  }, []);

  return (
    <>
      <div className="container pt-5 pb-5 safe-payment">
        <div className="row">
          <div className="col-md-6 left">
            <img src={location.state.img} alt="img" />
            <p className="pt-3 txt-bg">{location.state.name}</p>
            <p>Price: {location.state.price}</p>
            { location.state.deliveryDate ? 
            <p>
                Delivery Date: {location.state.deliveryDate}</p>    
            :null
        }
          </div>

          <div className="col-md-6 right">
            {location.state.productPrice &&
            location.state.shipmentPrice ? null : (
              <p>
                <span>Status:</span>waiting for admin approval
              </p>
            )}
            {location.state.productPrice ?
              <p>
                Product price: {location.state.productPrice}
              </p>
              : null
            }
            { location.state.shipmentPrice ? 
            <p>
                Shipment price: {location.state.shipmentPrice}</p>    
            :null
        }
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAddPage;
