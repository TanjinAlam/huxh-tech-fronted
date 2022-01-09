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
