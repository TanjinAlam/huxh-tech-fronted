import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  initialValues,
  onSubmiting,
} from "../../components/forms/Login/LoginFormFields";
import TextError from "../../components/forms/Notification/TextError";
import { LoadingContext } from "../../../App";
import { notification } from "../../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import Cookies from 'universal-cookie';

function LoginPage() {
    const cookies = new Cookies();
  const [type, setType] = useState("");
  const userData = [
    {
      id: 1,
      type: '1',
      email: "bappy@shafa.care",
      password: "123456",
    },
    {
      id: 2,
      type: '2',
      email: "bappy@shafa.care",
      password: "123456",
    },
    {
      id: 3,
      type: '3',
      email: "bappy@shafa.care",
      password: "123456",
    },
  ];
  const roles = [
    {
      label: "Manufacturer",
      id: "1",
    },
    {
      label: "Courier",
      id: "2",
    },
    {
      label: "Retailer",
      id: "3",
    },
  ];

  // init page loader context
  const pageLoader = React.useContext(LoadingContext)

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
      let flag = '-1'
    // start page loading
    pageLoader.loadingState(true)
    if(type) values.type = type.id;

    console.log("ccc", values);


    onSubmiting(values)
    .then((res)=>{

        pageLoader.loadingState(false)
        if(res.status === 200){
            notification('success', 'Login Successfully. Redirecting.. ')
            console.log('Success status :: ', res.data.data.userType)
            setTimeout(()=>{
                // admin data get successfully, redirect to admin dashboard
              if(res.data.data.userType == 1)
              window.location.href = '/item/list'
              if(res.data.data.userType == 2)
                window.location.href = '/home'
                if(res.data.data.userType == 3)
                window.location.href = '/order/pending'

            }, 2000)
        }else{
            console.log('Fail status :: ', res.msg)
            notification('fail', res.msg)
        }
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
        // end page loading
        pageLoader.loadingState(false)
    })
  };

  return (
    <>
      <ToastContainer></ToastContainer>
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
          <div className="main-wrapper account-wrapper">
            <div className="account-page">
              <div className="account-center">
                <div className="account-box">
                  <Form>
                    <div className="account-logo">
                        <h1>Signin</h1>
                    </div>

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

                    {/* <div className="form-group">
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
                        name="type"
                        options={roles}
                        onChange={(event) => setType(event)}
                      />
                      <ErrorMessage name="role" component={TextError} />
                    </div> */}

                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn btn-primary account-btn"
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                  <p className="text-center">If don't have any account, Please <Link to='/signup'>sign up</Link> .</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default LoginPage;
