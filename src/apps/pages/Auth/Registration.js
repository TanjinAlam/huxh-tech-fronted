import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  initialValues,
  onSubmiting,
} from "../../components/forms/Login/RegistrationFormFields";
import TextError from "../../components/forms/Notification/TextError";
import { LoadingContext } from "../../../App";
import { notification } from "../../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import Cookies from "universal-cookie";

function LoginPage() {
  const [type, setType] = useState("");
  const roles = [
    {
      label: "Manufacturer",
      id: "1",
    },
    {
      label: "Courier",
      id: "3",
    },
    {
      label: "Retailer",
      id: "2",
    },
  ];

  // init page loader context
  const pageLoader = React.useContext(LoadingContext);

  // const onSubmiting = async (values) => {
  //     const data = {
  //         contact_number: values.phone,
  //         password: values.password
  //     }
  //     return await axios
  //       .post("http://localhost:3003/admin/signin",{data})
  //       .then((response) => {
  //         let status = "status" in response;
  //         if (!status) {
  //           response.status = 401;
  //           return response;
  //         }
  //         return response.data.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return [];
  //       });
  //   };

  // submit login form
  const onSubmit = (values) => {
    if(values.password == values.confirmPass){
      if(type) values.userType = type.id
    let flag = '-1'
  // start page loading
  pageLoader.loadingState(true)

  console.log("ccc", values);


  onSubmiting(values)
  .then((res)=>{
    console.log('rrrr',res.data)
      pageLoader.loadingState(false)
      if(res.data.status === 200){
          notification('success', 'Registration Successfully. Redirecting.. ')
          console.log('Success status :: ', res)
          setTimeout(()=>{
              // admin data get successfully, redirect to admin dashboard

              window.location.href = '/login'

          }, 2000)
      }else{
          console.log('Fail status :: ', res.data.msg)
          notification('fail', res.data.msg)
      }
      console.log(res)
  })
  .catch((err)=>{
      console.log(err)
      // end page loading
      pageLoader.loadingState(false)
  })
}
else{
  notification('fail', 'Incorrect password..')
}
};

  return (
    <>
      <div className="content">
        <ToastContainer></ToastContainer>
        <div className="row">
          <div className="col-lg-8 offset-lg-2"></div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            setFieldValue,
            resetForm,
            handleBlur,
            enableReinitialize = true,
          }) => (
            <div className="row">
              <div className="col-lg-6 offset-lg-3 sign-up-field">
                <h4 className="page-title">Sign Up</h4>
                <Form encType="multipart/form-data">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Name :</label>
                        <ErrorMessage name="userName" component={TextError} />
                        <Field
                          type="text"
                          id="userName"
                          name="userName"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email :</label>
                        <ErrorMessage name="email" component={TextError} />
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Wallet Address :</label>
                        <ErrorMessage
                          name="walletAddress"
                          component={TextError}
                        />
                        <Field
                          type="text"
                          id="walletAddress"
                          name="walletAddress"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Wallet Key :</label>
                        <ErrorMessage name="walletKey" component={TextError} />
                        <Field
                          type="text"
                          id="walletKey"
                          name="walletKey"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password :</label>
                        <ErrorMessage name="password" component={TextError} />
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="form-group">
                      <label>Confirm Password :</label>
                      <ErrorMessage name="confirmPass" component={TextError} />
                      <Field
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Role <span className="text-danger">*</span>
                      </label>
                      <Select
                        // defaultValue={}
                        placeholder={
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <div className="plaseholder__">
                              <span>Select</span>
                            </div>{" "}
                          </div>
                        }
                        className="w-100"
                        name="userType"
                        options={roles}
                        onChange={(event) => setType(event)}
                      />
                      <ErrorMessage name="userType" component={TextError} />
                    </div>
                  </div>
                  </div>
                  

                  <div className="m-t-20 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default LoginPage;
