import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { notification } from "../../helpers/Confirm/ConfirmAction";
import { LoadingContext } from "../../../App";
import {
  verifyPhotoCourer,
  deliveryOrder,
} from "../../components/forms/Admin/AdminAddFormFields";

import { ToastContainer } from "react-toastify";
import { id } from "date-fns/locale";

const cookies = new Cookies();

function AdminAddPage() {
  const get_cookies = cookies.get("data");

  let location = useLocation();

  const [verify, setVerify] = useState();

  const initialValues = {
    price: "",
  };
  const initialValue = {
    price: "",
  };
  useEffect(async () => {
    unixDate();
    console.log(getdate(1642010400));
    setVerify(location.state.photoVerifiedByCourier);
    console.log("location", location.state);
  }, []);

  const pageLoader = React.useContext(LoadingContext);

  function getdate(unix_timestamp) {
    var date_variable = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var year = date_variable.getFullYear();
    var month = date_variable.getMonth() + 1;
    var day = date_variable.getDate();
    return year + "-" + month + "-" + day;
  }
  function unixDate() {
    var date_variable = new Date();
    var year = date_variable.getFullYear();
    var month = date_variable.getMonth() + 1;
    var day = date_variable.getDate();
    let date = year + "-" + month + "-" + day;

    const UnixDate = new Date(date).getTime() / 1000;
    console.log(UnixDate);
  }

  function PhotoVerifyFun() {
    let values = {
      contractAddress: location.state.contractAddress,
      orderNo: location.state.orderNo,
      id: location.state.id,
      walletAddress: get_cookies.walletAddress,
      privateKey: get_cookies.walletKey,
    };
    console.log("vvv", values);

    pageLoader.loadingState(true);
    verifyPhotoCourer(values)
      .then((res) => {
        console.log("rrrrrr", res.data);
        if (res.data.status == 200) {
          pageLoader.loadingState(false);
          notification("success", res.data.msg);
          setVerify(1);
        } else {
          pageLoader.loadingState(false);
          notification("fail", res.data.msg);
        }
      })
      .catch((error) => {
        notification("fail", error.message);
      });
  }

  function deliveryOrderFun() {
    let values = {
      contractAddress: location.state.contractAddress,
      invoiceNo: location.state.invoiceNo,
      id: location.state.id,
      orderNo:location.state.orderNo,
      walletAddress: get_cookies.walletAddress,
      privateKey: get_cookies.walletKey,
    };
    console.log("vvv", values);

    pageLoader.loadingState(true);
    deliveryOrder(values)
      .then((res) => {
        console.log("rrrrrr", res.data);
        if (res.data.status == 200) {
          pageLoader.loadingState(false);
          notification("success", res.data.msg);
          setVerify(1);
        } else {
          pageLoader.loadingState(false);
          notification("fail", res.data.msg);
        }
      })
      .catch((error) => {
        notification("fail", error.message);
      });
  }
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container pt-5 pb-5 safe-payment">
        <div className="row">
          <div className="col-md-6 left">
            <div className="left-card">
            <img src={location.state.img} alt="img" />
            <p className="pt-3 txt-bg">Title: {location.state.name}</p>
            <p>Prices: {location.state.price}</p>
            {location.state.deliveryDate ? (
              <p>Delivery Date: {getdate(location.state.deliveryDate)}</p>
            ) : null}
            <p>
              Delivery status:
              {location.state.deliveryDone == 0 ? (
                <span> incomplate</span>
              ) : (
                <span> complate</span>
              )}
            </p>
            </div>
          </div>

          <div className="col-md-6 right">
            <div className="right-card">
            {location.state.productPrice ? (
              <p className="d-flex">
                Product price:{location.state.productPrice}
              </p>
            ) : null}
            {location.state.shipmentPrice ? (
              <p className="d-flex">
                Shipment price:{location.state.shipmentPrice}
              </p>
            ) : null}

            {verify == 0 && location.state.invoiceNo ? (
              <p>Photo varification by seller pending</p>
            ) : (
              <p>Photo varification by seller done</p>
            )}
            {verify ? (
              <p>Photo varification by courer done</p>
            ) : (
              <p>
                Photo verify{" "}
                <button onClick={PhotoVerifyFun} className="btn">
                  Confirm
                </button>
              </p>
            )}
            {location.state.invoiceNo &&
            verify &&
            location.state.photoVerifiedBySeller ? (
              <p>
                Confirm delivary:{" "}
                <button className="btn" onClick={deliveryOrderFun}>
                  Delivery
                </button>
              </p>
            ) : null}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAddPage;
