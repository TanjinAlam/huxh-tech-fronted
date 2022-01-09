import axios from '../../../authAxios'

/**
 * fetch protected image using by image path.
 * @param {string} path 
 * @returns {object} image
 */
export const LoadProtectedImage = async (path) =>{
    
    if(path!=="" && path !== undefined){
        // make an api request for getting image
        let imageBase64 = await axios.get("file/"+path, {responseType: "arraybuffer"})
        .then(response => {
            let image = btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return {image}
        })
        .catch(err => {
            console.log('LoadImage ::', err)
            return err
        })
        return imageBase64
    }
    return false
}

export const LoadPublicImage = (path) => {
    // write code here... ;)
    return path
}