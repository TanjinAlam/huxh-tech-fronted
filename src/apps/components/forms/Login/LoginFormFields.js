import * as Yup from "yup";
import { ADMIN } from "../../../api/APIEndPoint"
import MethodHeader from "../../../api/MethodHeader";
import { setCookies, removeCookies } from '../../../helpers/Cookies/AdminCookies'
import axios from 'axios';
import https from 'https'
/**
 * @name form inputs
 * @desc Login Form Fields
 * @created_at  28th February 2021
 * @created_by  Muhammad Hasan
 */
export const initialValues = { email: '', password: '', type:'' }

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
    
    let user_data = {}

    const data = {
        contact_number: values.phone,
        password: values.password
    }
    // data = JSON.stringify(data);
    console.log("vvv",values)

    let baseURL = process.env.REACT_APP_LOCAL_BASE_URL
    if (process.env.REACT_APP_ENVIRONMENT == "production") {
        baseURL = process.env.REACT_APP_PRODUCTION_URL
    } else if (process.env.REACT_APP_ENVIRONMENT == "development") {
        baseURL = process.env.REACT_APP_BASE_URL
    }
    

    let result =  await axios
          .post("https://backend.huxhtech.com/api/v1/huxh-deal/login",values)
          .then((response) => {
            if (response &&!response.status) {
                alert("Submit failed")
              response.status = 401;
              return response;
            }
            return response;
          })
          .catch((err) => {
            console.log(err);
            return [];
          }); 
          
    

          console.log("result",result.data.data)
    if(!result || result.length<1){
        alert("Incorrect password... ")
    }

    else if (result.status === 'undefined') {
        removeCookies('data', { path: '/' })
        return false
    } else {
        // get status 200, when only login success
        if (result.status == 200) {
            

            // get login user data
            user_data = result.data.data

            // set login data to cookies
            setCookies('data', user_data, { path: '/' })

            return result
        } else {
            console.warn("Can't not login.")
            return result
        }
    }
}


