import axios from './../../../authAxios'

/**
 * 
 * @param {*} data 
 */
export async function deleteDataRow(data){
    console.log("delete",data)
    let response;
    // request data object
    const requestData = {id:data.row_id}
    // delete request
    await axios.post(data.endPoint, requestData)
    // delete success
    .then((res)=>{
        response = res
    })
    // delete fail
    .catch((err)=>{
        console.log('Delete Error:: ', data)
        response= err
    })
    return response
}