import React from "react";
import * as Yup from "yup";
import { ADMIN } from "../../../api/APIEndPoint";
import { AdminFieldValidation as AdminField } from "../../../helpers/Text/FormFieldValidationText"
// import axios from 'axios';
import axios from 'axios'
import { formData } from '../FormHelper'

import { LoadingContext } from '../../../../App'
import { notification } from '../../../helpers/Confirm/ConfirmAction'


/**
 * @name form inputs
 * @desc Login Form Fields
 * @created_at  28th February 2021
 * @created_by  Jubaidul
 */
export const initialValues = {
  firstName: '',
  lastName:'',
  contactNo: '',
  email: '',
  address: '',
  password: '',
  role:'1'
}

/**
 * @name validationSchema
 * @desc login form fields schema validation
 * @created_at  3rd March 2021
 * @created_by  Muhammad Hasan
 */
export const validationSchema = Yup.object({
  name: Yup.string().required(AdminField.name_required),
  email: Yup.string().required(AdminField.email_required),
  role: Yup.string().required(AdminField.role_required),
  status: Yup.string().required(AdminField.status_required),
  password: Yup.string().required(AdminField.password_required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], AdminField.confirmPassword_required)
})

/**
 * @name onSubmit
 * @desc executed when hospital form submit
 * @param values {object}
 * @return object
 * @created_at  3rd March 2021
 * @created_by  Jubaidul Alam
 */

export const onSubmit = async (values) => {
  console.log("ggg",values)
  try {
    return await axios.post("http://localhost:3003/admin/insert",{values})
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}

/**
 * @name onSubmit
 * @desc executed when hospital form submit for Update
 * @param values {object}
 * @return object
 * @created_at  3rd March 2021
 * @created_by  Jubaidul Alam
 */

export const onUpdate = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
  try {
    await axios.post(ADMIN.update, formData(values))
  } catch (error) {
    return error
  }
}

