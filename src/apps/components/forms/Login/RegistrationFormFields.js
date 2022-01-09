import * as Yup from "yup";
import { ADMIN } from "../../../api/APIEndPoint"
import MethodHeader from "../../../api/MethodHeader";
import { setCookies, removeCookies } from '../../../helpers/Cookies/AdminCookies'
import axios from 'axios';

/**
 * @name form inputs
 * @desc Login Form Fields
 * @created_at  28th February 2021
 * @created_by  Muhammad Hasan
 */
export const initialValues = { 
    email: '', password: '', userType:'', userName: '', walletAddress: '' , walletKey: ''
}

/**
 * @name validationSchema
 * @desc login form fields schema validation
 * @created_at  28th February 2021
 * @created_by  Muhammad Hasan
 */
// export const validationSchema = Yup.object({
//     contact_number: Yup.string().required(DoctorField.phone),
//     password: Yup.string()
//         .min(5, 'Must be at least 5 characters')
//         .required('Password is required.')
// })

/**
 * @name onSubmit
 * @desc executed when login form submit
 * @param values {object}
 * @return object
 */
export const onSubmiting = async (values) => {
    
  try {
    return await axios.post("https://backend.huxhtech.com/api/v1/huxh-deal/signup",values)
    // pageLoader.loadingState(false)
  } catch (error) {
    return error
  } 
}


