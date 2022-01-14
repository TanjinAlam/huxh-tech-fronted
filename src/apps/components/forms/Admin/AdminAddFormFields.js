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
/**
 * @name onSubmit
 * @desc executed when hospital form submit
 * @param values {object}
 * @return object
 * @created_at  3rd March 2021
 * @created_by  Jubaidul Alam
 */

export const setProductPrice = async (values) => {
  console.log("GGG",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/setProductPrice",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}
export const safePayment = async (values) => {
  console.log("GGG",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/safePayment",values)
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

export const setShipmentPrice = async (values) => {
  console.log("ggg",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/setShipmentPrice",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}

export const verifyPhotoSeller  = async (values) => {
  console.log("ggg",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/verifyPhotoSeller",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}
export const verifyPhotoCourer  = async (values) => {
  console.log("ggg",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/verifyPhotoCourier",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}
export const verifyPhotoUser  = async (values) => {
  console.log("ggg",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/verifyPhotoUser",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}

export const deliveryOrder  = async (values) => {
  console.log("ggg",values)
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/deliveryOrder",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  }
}