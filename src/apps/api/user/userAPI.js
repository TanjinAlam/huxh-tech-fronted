// import axios from 'axios';
import axios from '../../../authAxios'
import { USER } from "../APIEndPoint";


/**
 * @name onSubmit
 * @desc executed when hospital form submit
 * @param values {object}
 * @return object
 * @created_at  3rd March 2021
 * @created_by  Jubaidul Alam
 */

export const getUserList = async () => {
    return await axios.post(USER.list)
        .then(response => {
            console.log("RESPONSE",response);
            let status = 'status' in response
            if (!status) {
                response.status = 401
                return response
            }
            return response.data.data
        })
        .catch(err => {
            console.log(err)
            return []
        })
}
