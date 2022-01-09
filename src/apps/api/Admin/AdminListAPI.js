// import axios from 'axios';
import axios from '../../../authAxios'
import { ADMIN } from "../APIEndPoint";


/**
 * @name onSubmit
 * @desc executed when Admin form submit
 * @param values {object}
 * @return object
 * @created_at  3rd March 2021
 * @created_by  Jubaidul Alam
 */

export const getAdminList = async () => {
    return await axios.post(ADMIN.list)
        .then(response => {
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