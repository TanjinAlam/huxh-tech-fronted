import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { sendOrder, safePayment } from "./forms/User/UserAddFormFields";

import { notification } from "../helpers/Confirm/ConfirmAction";
import Cookies from "universal-cookie";
import { LoadingContext } from "../../App";
const cookies = new Cookies();

function AdminAddPage({ data }) {
  console.log("dddaaa",data)
  const get_cookies = cookies.get("data");

  const pageLoader = React.useContext(LoadingContext);

  return (
    <div className="col-md-3">
      {
        get_cookies.userType == 3?
        <NavLink
        className="dropdown-item"
        to={{
          pathname: `/courer/order-processing/${data.id}`,
          state: data,
        }}
      >
        <div className="single-card">
          <img src={data.img} alt="item" />
          <p>Names: {data.name}</p>
          <p>Price : {data.price}</p>
          <div className="text-center"></div>
        </div>
      </NavLink>
      :
      <NavLink
        className="dropdown-item"
        to={{
          pathname: `/admin/order-processing/${data.id}`,
          state: data,
        }}
      >
        <div className="single-card">
          <img src={data.img} alt="item" />
          <p>Namess: {data.name}</p>
          <p>Price : {data.price}</p>
          <div className="text-center"></div>
        </div>
      </NavLink>
      }
      
        
    </div>
  );
}
export default AdminAddPage;
