import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { sendOrder, safePayment } from "./forms/User/UserAddFormFields";

import { notification } from "../helpers/Confirm/ConfirmAction";
import Cookies from "universal-cookie";
import { LoadingContext } from "../../App";
const cookies = new Cookies();

function AdminAddPage({ data }) {
  const get_cookies = cookies.get("data");

  const pageLoader = React.useContext(LoadingContext);

  function onButtonClick(id) {
    let values = {
      privateKey: get_cookies.walletKey,
      id: data.id,
      walletAddress: get_cookies.walletAddress,
      goods: data.name,
      quantity: data.quantity,
      photoURL: data.img,
      videoURL: "",
      contractAddress: data.contractAddress,
    };
    if (data.videoURL) values.videoURL = data.videoURL;
    console.log("console", values);

    pageLoader.loadingState(true);
    sendOrder(values)
      .then((res) => {
        console.log(res.data.status);
        pageLoader.loadingState(false);
        if (res.data.status === 200) {
          notification("success", "Successfully submited. Redirecting.. ");
        } else {
          notification("fail", res.msg);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // end page loading
        pageLoader.loadingState(false);
      });
  }

  return (
    <div className="col-md-3">
      <NavLink
        className="dropdown-item"
        to={{
          pathname: `/admin/order-processing/${data.id}`,
          state: data,
        }}
      >
        <div className="single-card">
          <img src={data.img} alt="item" />
          <p>Name: {data.name}</p>
          <p>Price : {data.price}</p>
          <div className="text-center"></div>
        </div>
      </NavLink>
    </div>
  );
}
export default AdminAddPage;
