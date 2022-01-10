import React from "react";
import * as Yup from "yup";
import { USER } from "../../../api/APIEndPoint";
import { UserFormFieldValidation as UserField } from "../../../helpers/Text/FormFieldValidationText"
import MethodHeader from "../../../api/MethodHeader";
import { getCookies } from '../../../helpers/Cookies/AdminCookies';
import { toast } from 'react-toastify';
// import axios from 'axios';
import axios from 'axios'
import { formData } from '../FormHelper'

export const initialValues = {
    name: '',
    img:'',
    price: '',
    userId: '',
  }
  
  /**
   * @name onSubmit
   * @desc executed when hospital form submit
   * @param values {object}
   * @return object
   * @created_at  3rd March 2021
   * @created_by  Jubaidul Alam
   */
  
  export const onSubmit = async (values) => {
    try {
      return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/insertProduct",values)
      // pageLoader.loadingState(false)
    } catch (error) {
      return error
    }
  }
  
  export const onDeploy = async (values) => {
    try {
      return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/deployContract",values)
      // pageLoader.loadingState(false)
    } catch (error) {
      return error
    }
  }
  export const AcceptOrder = async (values) => {
    try {
      return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/accpetOrders",values)
      // pageLoader.loadingState(false)
    } catch (error) {
      return error
    }
  }
