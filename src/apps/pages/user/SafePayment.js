import React, { useEffect, useState } from "react";
import { ProcessingItemList } from "../../components/forms/User/UserAddFormFields";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { notification } from "../../helpers/Confirm/ConfirmAction";
import { LoadingContext } from "../../../App";
import {
  safePayment,
  verifyPhotoUser,
} from "../../components/forms/Admin/AdminAddFormFields";

const cookies = new Cookies();

function AdminAddPage() {
  const get_cookies = cookies.get("data");

  let location = useLocation();

  const initialValues = {
    amount: "",
  };
  const [verify, setVerify] = useState();

  useEffect(async () => {
    const userId = get_cookies.id;
    setVerify(location.state.photoVerifiedByUser);
    console.log("location", location.state);
    console.log("cookies", get_cookies);
  }, []);

  function getdate(unix_timestamp) {
    var date_variable = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var year = date_variable.getFullYear();
    var month = date_variable.getMonth() + 1;
    var day = date_variable.getDate();
    return year + "-" + month + "-" + day;
  }
  const pageLoader = React.useContext(LoadingContext);

  const onSubmitHandle = (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    values.id = location.state.id;
    values.orderNo = location.state.orderNo;
    values.privateKey = get_cookies.walletKey;
    values.walletAddress = get_cookies.walletAddress;
    values.contractAddress = location.state.contractAddress;

    console.log("admin ", values);

    pageLoader.loadingState(true);
    safePayment(values)
      .then((res) => {
        console.log("rrrrrr", res);
        if (res.status == 200) {
          location.state.safePayment = 1;
          pageLoader.loadingState(false);
          notification("success", res.data.msg);
          resetForm({});
          setStatus({ success: true });
        } else {
          pageLoader.loadingState(false);
          notification("fail", res.data.msg);
        }
      })
      .catch((error) => {
        notification("fail", error.message);
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
      });
  };

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
    verifyPhotoUser(values)
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
      <div className="container pt-5 pb-5 safe-payment">
        <div className="row">
          <div className="col-md-6 left">
            <div className="left-card">
              <img src={location.state.img} alt="img" />
              <p className="pt-3 txt-bg">{location.state.name}</p>
              <p>Price: {location.state.price}</p>
              {location.state.deliveryDate ? (
                <p>Delivery Date: {getdate(location.state.deliveryDate)}</p>
              ) : null}
              <p>
                Delivery status:
                {location.state.deliveryDone == 0 ? (
                  <span className="text-warning"> incomplate</span>
                ) : (
                  <span className="text-success"> complate</span>
                )}
              </p>
            </div>
          </div>

          <div className="col-md-6 right">
            <div className="right-card">
              {location.state.productPrice &&
              location.state.shipmentPrice ? null : (
                <p>
                  <span>Status:</span>waiting for admin approval
                </p>
              )}
              {location.state.productPrice ? (
                <p>Product price: {location.state.productPrice}</p>
              ) : null}
              {location.state.shipmentPrice ? (
                <p>Shipment price: {location.state.shipmentPrice}</p>
              ) : null}
              {location.state.shipmentPrice &&
              location.state.productPrice &&
              location.state.safePayment == 0 ? (
                <div className="d-flex">
                  <p className="mt-3">Safe payment</p>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmitHandle}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      resetForm,
                      handleBlur,
                      enableReinitialize = true,
                    }) => (
                      <Form
                        encType="multipart/form-data"
                        className="d-flex pl-3 align-items-center"
                      >
                        <div className="form-group">
                          <Field
                            className="form-control"
                            type="text"
                            name="amount"
                          />
                        </div>

                        <button type="submit" className="btn">
                          Submit
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : null}
              {verify == 0 &&
              location.state.photoVerifiedBySeller &&
              location.state.photoVerifiedByCourier ? (
                <p>
                  Photo verify{" "}
                  <button onClick={PhotoVerifyFun} className="btn">
                    Confirm
                  </button>
                </p>
              ) : (
                <>
                  {verify &&
                  location.state.photoVerifiedBySeller &&
                  location.state.photoVerifiedByCourier ? (
                    <p>Photo varification by user <span className="text-success">done</span></p>
                  ) : null}
                </>
              )}
              {location.state.invoiceNo ? null : (
                <p>Note: waiting for invoice.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAddPage;
