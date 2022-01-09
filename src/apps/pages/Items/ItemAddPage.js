import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { initialValues, onSubmit } from "../../components/forms/Item/ItemAddFormFields";
import TextError from "../../components/forms/Notification/TextError";
import { getAdminTypeList } from '../../api/LocalData'
import { BounceLoader, BarLoader, BeatLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { notification } from '../../helpers/Confirm/ConfirmAction'
import { LoadingContext } from '../../../App'
import Cookies from 'universal-cookie';

const cookies = new Cookies();





function AdminAddPage() {
    const [roles, setRoles] = useState([]);
    const get_cookies = cookies.get('data')

    const [file, setFile] = useState({ data: '../../assets/img/user.jpg' })
    const onChangeHandler = event => {
        setFile({ data: URL.createObjectURL(event.target.files[0]) });
    }

    useEffect(async () => {
        // Update the document title using the browser API
        setTimeout(async () => {
            let roleData = await getAdminTypeList()
            setRoles(roleData)
        }, 100);
    }, []);

    const pageLoader = React.useContext(LoadingContext)

    const onSubmitHandle = (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
        
        values.userId = get_cookies.id
        console.log("admin ",values)
        // pageLoader.loadingState({loading: true, text: "something"})
        pageLoader.loadingState(true)
        onSubmit(values).then(res => {
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

    }


    return (
        <div className="content">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h4 className="page-title">Add Item</h4>
                </div>
            </div>
            <Formik initialValues={initialValues}  onSubmit={onSubmitHandle} >
                {({ values, errors, touched, setFieldValue, resetForm, handleBlur, enableReinitialize = true }) => (
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <Form encType="multipart/form-data">
                                <div className="row">
                                <div className="col-sm-6">
                                        <div className="form-group">
                                            <label> Name <span className="text-danger">*</span></label>
                                            <Field className="form-control" type="text" name="name" />
                                            <ErrorMessage name='name' component={TextError} />
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
                                            <label>Image URL<span className="text-danger">*</span></label>
                                            <Field className="form-control" type="text" name="img" />
                                            <ErrorMessage name='img' component={TextError} />
                                        </div>
                                    </div>
                                    
                                    {/* <div className="col-sm-6">
                                        <div className="form-group">
                                            <Field name="filee" type="file" onChange={(event) => {
                                                            setFieldValue("file", event.currentTarget.files[0]);
                                                            onChangeHandler(event)
                                                        }} />
                                                        <ErrorMessage name='file' component={TextError} />
                                        </div>
                                    </div> */}

                                </div>

                                <div className="m-t-20 text-center">
                                    <button type="submit" className="btn btn-primary submit-btn" >Add Item</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>

        </div>

    )
}

export default AdminAddPage