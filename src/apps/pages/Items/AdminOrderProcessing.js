import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { notification } from "../../helpers/Confirm/ConfirmAction";
import { LoadingContext } from "../../../App";
import {setProductPrice,setShipmentPrice,verifyPhotoSeller} from '../../components/forms/Admin/AdminAddFormFields'

import { ToastContainer } from 'react-toastify';
import { id } from "date-fns/locale";

const cookies = new Cookies();

function AdminAddPage() {
  const get_cookies = cookies.get("data");

  let location = useLocation();

  const [verify,setVerify] = useState()

  const initialValues = {
    price: location.state.price,
  };
  const initialValue = {
    price: location.state.price,
  };
  useEffect(async () => {
    if(location.state.productPrice) initialValues.price = location.state.productPrice
    if(location.state.shipmentPrice) initialValue.price = location.state.shipmentPrice
    const userId = get_cookies.id;
    setVerify(location.state.photoVerifiedBySeller)
    console.log("location", location.state);
    console.log("cookies", get_cookies);
  }, []);

  const pageLoader = React.useContext(LoadingContext);

  const onSubmitHandle = (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    values.id = location.state.id
    values.orderNo = location.state.orderNo
    values.privateKey = get_cookies.walletKey
    values.walletAddress = get_cookies.walletAddress
    values.contractAddress = location.state.contractAddress
    values.price = values.price
    
    console.log("admin ", values);

    pageLoader.loadingState(true)
    setProductPrice(values).then(res => {
        console.log("rrrrrr",res)
        if (res.status == 200) {
            pageLoader.loadingState(false)
            notification('success', res.data.msg)
            resetForm({})
            setStatus({ success: true })
        } else {
            pageLoader.loadingState(false)
            notification('fail', res.data.msg)
        }
    }).catch(error => {
        notification('fail', error.message)
        setStatus({ success: false })
        setSubmitting(false)
        setErrors({ submit: error.message })
    })
  };

  const onSubmitShipment= (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    values.id = location.state.id
    values.orderNo = location.state.orderNo
    values.privateKey = get_cookies.walletKey
    values.walletAddress = get_cookies.walletAddress
    values.contractAddress = location.state.contractAddress
    values.price = values.price
    console.log("admin ", values);
    // pageLoader.loadingState({loading: true, text: "something"})
    pageLoader.loadingState(true)
    setShipmentPrice(values).then(res => {
        console.log("rrrrrr",res)
        if (res.status == 200) {
            pageLoader.loadingState(false)
            notification('success', res.data.msg)
            resetForm({})
            setStatus({ success: true })
        } else {
            pageLoader.loadingState(false)
            notification('fail', res.data.msg)
        }
    }).catch(error => {
        notification('fail', error.message)
        setStatus({ success: false })
        setSubmitting(false)
        setErrors({ submit: error.message })
    })
  };

  function PhotoVerifyFun(){
    let values = {
      contractAddress:location.state.contractAddress,
      orderNo:location.state.orderNo,
      id:location.state.id,
      walletAddress:get_cookies.walletAddress,
      privateKey:get_cookies.walletKey,
    }
    console.log("vvv",values)

    pageLoader.loadingState(true)
    verifyPhotoSeller(values).then(res => {
        console.log("rrrrrr",res)
        if (res.status == 200) {
            pageLoader.loadingState(false)
            notification('success', res.data.msg)
            setVerify(1)
        } else {
            pageLoader.loadingState(false)
            notification('fail', res.data.msg)
        }
    }).catch(error => {
        notification('fail', error.message)
    })

  }
  return (
    <>
    <ToastContainer></ToastContainer>
      <div className="container pt-5 pb-5 safe-payment">
        <div className="row">
          <div className="col-md-6 left">
            <div className="left-card">
            <img src={location.state.img} alt="img" />
            <p className="pt-3 txt-bg">{location.state.name}</p>
            <p>Price: {location.state.price}</p>
            {location.state.deliveryDate ? (
              <p>Delivery Date: {location.state.deliveryDate}</p>
            ) : null}
            <p>Delivery status: 
              {
                location.state.deliveryDone == 0?
                <span> incomplate</span>
                :
                <span> complate</span>
              }
              </p>
              </div>
          </div>

          <div className="col-md-6 right">
            <div className="right-card">
            <p className="d-flex">
              Product price:
                <div className="">
                    
                    
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
                        <Form encType="multipart/form-data" className="d-flex pl-3 align-items-center">
                      <div className="form-group">
                        <Field
                          className="form-control"
                          type="text"
                          name="price"
                        />
                      </div>
                    
                  
                  <button type="submit" className="btn">
                    Submit
                  </button>
                  </Form>
                  )}
                  </Formik>
                </div>
            </p>
            <p className="d-flex">
            Shipment price:
                <div className="">
                    
                    
                  <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmitShipment}
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
                        <Form encType="multipart/form-data" className="d-flex pl-3 align-items-center">
                      <div className="form-group">
                        <Field
                          className="form-control"
                          type="text"
                          name="price"
                        />
                      </div>
                    
                  
                  <button type="submit" className="btn">
                    Submit
                  </button>
                  </Form>
                  )}
                  </Formik>
                </div>
            </p>
            {
              verify === 0?
              <p>Photo verify <button onClick={PhotoVerifyFun} className="btn">Confirm</button></p>
              :<p>Photo varification by seller done</p>
            }
            {
              location.state.photoVerifiedByCourier?
              <p>Photo varification by courer done</p>
              :
              <p>Photo varification by courer pending</p>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAddPage;
