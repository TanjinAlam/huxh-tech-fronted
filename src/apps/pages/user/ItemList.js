import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  initialValues,
  onSubmiting,
} from "../../components/forms/User/UserAddFormFields";
import TextError from "../../components/forms/Notification/TextError";
import { LoadingContext } from "../../../App";
import { notification } from "../../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
import { useLocation, useHistory } from "react-router-dom";


const cookies = new Cookies();

function AdminListPage() {
    const get_cookies = cookies.get('data')
  // browsing history
  let history = useHistory();
  // get updated form value
  let location = useLocation();

  useEffect(async () => {
    console.log("location", location.state);
  }, []);

  const pageLoader = React.useContext(LoadingContext);

  const onSubmit = (values) => {
    values.userId = get_cookies.id
    values.productId = location.state.id
    values.deployedId = location.state.deployedId
    console.log("vvvvvv", values);

    pageLoader.loadingState(true);
    onSubmiting(values)
      .then((res) => {
          console.log(res.data.status)
        pageLoader.loadingState(false);
        if (res.data.status === 200) {
          notification("success", "Successfully submited. Redirecting.. ");
          setTimeout(() => {
            // admin data get successfully, redirect to admin dashboard
            window.location.href = "/home";
          }, 2000);
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
                    <div className="form-group">
                      <label>Quantity :</label>
                      <ErrorMessage name="quantity" component={TextError} />
                      <Field
                        type="text"
                        id="quantity"
                        name="quantity"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Address :</label>
                      <ErrorMessage name="address" component={TextError} />
                      <Field
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn btn-primary account-btn"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default AdminListPage;
