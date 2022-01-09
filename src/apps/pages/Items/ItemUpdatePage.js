
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { validationSchema } from "../../components/forms/Admin/AdminAddFormFields";

import TextError from "../../components/forms/Notification/TextError";
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { LoadProtectedImage } from '../../helpers/Confirm/LoadImage'
import { LoadingContext } from '../../../App'
import { useHistory } from 'react-router-dom'
import axios from "axios"
import { ADMIN } from '../../api/APIEndPoint'
import { formData } from '../../components/forms/FormHelper'
import { notification } from '../../helpers/Confirm/ConfirmAction'
import { getAdminTypeList } from '../../api/LocalData'
import { ToastContainer } from 'react-toastify';




function AdminAddPage() {
    const [roles, setRoles] = useState([]);

   
    const pageLoader = React.useContext(LoadingContext)
    // browsing history
    let history = useHistory();
    // get updated form value
    let location = useLocation();

    // form values stats
    const [initialValues, setInitialValues] = useState('')

    // default image
    const [image, setImage] = useState({ data: '/assets/img/image_not_found.png' })

    // set form existing data
    useEffect(() => {
        loadImage()
        console.log("loca",location.state)
        setInitialValues(location.state)

        setTimeout(async () => {
            let roleData = await getAdminTypeList()
            setRoles(roleData)
        }, 0);
    }, []);


    // image loading
    const loadImage = () => {
        // load image if image path is set.
        if (location.state['file.path'] !== '') {
            // set default loading image
            setImage({ data: "/assets/img/200.gif" })
            // fetch image as base64 bit string
            LoadProtectedImage(location.state['file.path'])
                .then((res) => {
                    // set base64 bit string to the image source
                    if (res.image) setImage({ data: "data:image;base64, " + res.image })
                    else setImage({ data: '/assets/img/image_not_found.png' })

                })
                .catch((err) => {
                    // set default image
                    setImage({ data: '/assets/img/image_not_found.png' })
                })
        }
    }

    // preview uploaded image
    const onChangeHandler = (event) => {
        setImage({ data: URL.createObjectURL(event.target.files[0]) });
    }

    // change status
    const changeStatus = (status) => {
        setInitialValues({ ...initialValues, status })
    }

    // make form update
    const onUpdate = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
        let temp = parseInt(values.price)-parseInt(values.discount)
        values.total_price = temp.toString()
        console.log("tpp",values)
        // start loading 
        pageLoader.loadingState(true)
        // banner update request
        try {
            await axios.post("http://localhost:3003/items/update",{values})
                .then((res) => {
                    pageLoader.loadingState(false)
                    notification('success', `${res.data.msg}. Redirecting....`)
                    setTimeout(() => {
                        history.goBack()
                    }, process.env.REACT_APP_REDIRECT_TIME)
                    return res
                })
                .catch((err) => {
                    console.log(err)
                })
            resetForm({})
            setStatus({ success: true })
        } catch (error) {
            setStatus({ success: false })
            setSubmitting(false)
            setErrors({ submit: error.message })
        }
    }

    return (
        <div className="content">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h4 className="page-title">Update Items</h4>
                </div>
            </div>
            {initialValues ? (
                <Formik initialValues={initialValues} onSubmit={onUpdate} >
                    {({ values, errors, touched, setFieldValue, resetForm, handleBlur, enableReinitialize = true }) => (
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <Form encType="multipart/form-data">
                                    <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Name <span className="text-danger">*</span></label>
                                            <Field className="form-control" type="text" name="name" />
                                            <ErrorMessage name='name' component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Category <span className="text-danger">*</span></label>
                                            <Field className="form-control" type="text" name="category" />
                                            <ErrorMessage name='category' component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Price<span className="text-danger">*</span></label>
                                            <Field className="form-control" type="text" name="price" />
                                            <ErrorMessage name='price' component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Discount</label>
                                            <Field className="form-control" type="text" name="discount" />
                                            <ErrorMessage name='discount' component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <Field className="form-control" type="text" name="quantity" />
                                            <ErrorMessage name='quantity' component={TextError} />
                                        </div>
                                    </div>
                                    </div>

                                    <div className="m-t-20 text-center">
                                        <button className="btn btn-primary submit-btn" >Update Item</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
            ) : null}
        </div>

    )
}

export default AdminAddPage