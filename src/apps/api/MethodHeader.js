import { Form } from "formik"

/**
 * @param null
 * @return null
 * @type method
 * @name AnotherMethodHeader
 * @desc If needed then add another method header for api/web request
 */
export function AnotherMethodHeader() { }

/**
 * @param {string} method
 * @param {object} value
 * @param {string} headers_type
 * @type method
 * @name AnotherMethodHeader
 * @desc If needed then add another method header for api/web request
 */
function MethodHeader(method, value, headers_type, token) {
    let  methods
    switch (method) {

        case 'post':
            methods = 'POST'
            break
        case 'get':
            methods = 'GET'
            break
        default:
            methods = 'POST'
    }

    const result = {
        method: methods,
        body: JSON.stringify(value)
    }

    return result
}

export default MethodHeader
