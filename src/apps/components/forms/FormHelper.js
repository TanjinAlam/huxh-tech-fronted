/**
 * @param {object} values
 * @return {FormData} data
 * @name formData
 * @desc It help to convert form value to FormData type
 */
export function formData(values) {

    const data = new FormData()
    Object.keys(values).forEach((key) => {

        if (Array.isArray(values[key])) {
            values[key].map(item => {
                
                data.append(key, JSON.stringify(item))
            })
        } else {
            data.append(key, values[key])
        }

    })
    
    return data
}

