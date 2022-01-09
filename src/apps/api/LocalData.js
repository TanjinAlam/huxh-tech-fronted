/**
 * @name getadminType
 * @desc It is use for getting Admin type list
 * @param values {object}
 * @return object
 * @created_at  3rd March 2021
 * @created_by  Jubaidul Alam
 */

export const getAdminTypeList = async () => {
    return [
        { id: '1', name: 'Superadmin' },
        { id: '2', name: 'Admin' },
        { id: '3', name: 'Contributor' },
        { id: '4', name: 'Manager' }
    ]
}

export const getShopType = async () => {
    return [
        { id: '1', name: 'Dispensary' },
        { id: '2', name: 'Pharmacy' },
    ]
}

export const getFamilyRelationType = async () => {
    return [
        { id: '1', name: 'Wife' },
        { id: '2', name: 'Husband' },
        { id: '3', name: 'Son' },
        { id: '4', name: 'Daughter' },
        { id: '5', name: 'Mother' },
        { id: '6', name: 'Mother' },
        { id: '7', name: 'Brother' },
        { id: '8', name: 'Sister' },
        { id: '9', name: 'Relative' },
        { id: '10', name: 'Friend' }
    ]
}



export const getGenderType = async () => {
    return [
        { id: 'Male', name: 'Male' },
        { id: 'Female', name: 'Female' },
        { id: 'Other', name: 'Other' },
    ]
}



export const getStatus = async () => {
    return [
        { id: '1', name: 'Activate' },
        { id: '0', name: 'Inactive' },
    ]
}



export const getYesNo = async () => {
    return [
        { id: '1', name: 'YES' },
        { id: '0', name: 'NO' },
    ]
}

export const getQuestionOptionsType = async () => {
    return [
        { id: '0', name: 'Radio Button' },
        { id: '1', name: 'Check Box' },
        { id: '2', name: 'Drop Down' },
        { id: '3', name: 'Text' },
        { id: '4', name: 'Image' },
        { id: '5', name: 'Audio' },
    ]
}

export const Discount_Type = async () => {
    return [
        { id: '1', name: 'Percentage Discount' },
        { id: '2', name: 'Fixed Product Discount' },
    ]
}
export const Coupon_Type = async () => {
    return [
        { id: '1', name: 'Selected User' },
        { id: '2', name: 'All User' },

    ]
}

export const getGenderList = async () => {
    return [
        { id: 'Male', name: 'Male' },
        { id: 'Female', name: 'Female' },
    ]
}

