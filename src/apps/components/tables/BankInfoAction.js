import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoadingContext } from "../../../App";
import { DataContext } from "./Table";
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer } from 'react-toastify';
import { notification } from '../../helpers/Confirm/ConfirmAction'
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../../../authAxios"

import {
    HOSPITAL as hospitals,
    ADMIN as users,
    SPECIALIST as specialist,
    COMMON_SYMPTOM as commonSymptom,
    DOCTORBANNER as doctorBanner,
    DOCTOR as doctors,
    QUESTION
} from "../../api/APIEndPoint";

function ApiPoint(flag) {
    let APIObject = null
    switch (flag) {
        case 'users':
            APIObject = users
            break
        case 'commonSymptom':
            APIObject = commonSymptom
            break
        case 'specialist':
            APIObject = specialist
            break
        case 'hospitals':
            APIObject = hospitals
            break
        case 'DoctorBanner':
            APIObject = doctorBanner
            break
        case 'questions':
            APIObject = QUESTION
            break
        default:
            APIObject = null
    }

    return APIObject
}

export const BankInfoAction = ({ page, data }) => {

    const apiEndPoint = ApiPoint(page)

    // set table row id
    const id = data.row.values.id
    // set table row status
    const status = data.row.values.status
    // // get table status keys
    // const status_key = Object.keys(statusList)
    // // get table status values
    // const status_index = Object.values(statusList)

    // init page loader context
    const pageLoader = useContext(LoadingContext)

    const hospitalDataContext = useContext(DataContext)

    // const rowDelete = (e) => {
    //     e.preventDefault()
    //     confirmAlert({
    //         title: `Delete ${page}`,
    //         message: 'Are you sure to delete this item?',
    //         closeOnClickOutside: false,
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 className: 'btn btn-success',
    //                 onClick: async () => {
    //                     // show loading page
    //                     pageLoader.loadingState(true)
    //                     // api request form data
    //                     const rowId = { id: e.target.dataset.id }
    //                     await axios.post(apiEndPoint.delete, rowId)
    //                         .then((res) => {
    //                             let status = 'status' in res
    //                             if (!status) {
    //                                 res.status = 401
    //                                 pageLoader.loadingState(false)
    //                                 notification('fail', res.data.msg)
    //                                 return res
    //                             } else {
    //                                 pageLoader.loadingState(false)
    //                                 notification('success', res.data.msg)
    //                             }
    //                         })
    //                         .catch((err) => console.log(err))
    //                 }
    //             },
    //             {
    //                 label: 'No',
    //                 className: 'btn btn-danger',
    //                 onClick: () => {}
    //             }
    //         ]
    //     });
    // }

    // const changeStatus = (e) => {
    //     e.preventDefault()
    //     confirmAlert({
    //         title: `Change ${page} Status`,
    //         message: 'Do you change status?',
    //         closeOnClickOutside: false,
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: async () => {
    //                     pageLoader.loadingState(true)
    //                     const statusInfo = {
    //                         id: e.target.dataset.id,
    //                         status: e.target.dataset.status
    //                     }
    //                     await axios.post(apiEndPoint.change_status, statusInfo)
    //                         .then((res) => {
    //                             let status = 'status' in res
    //                             if (!status) {
    //                                 res.status = 401
    //                                 pageLoader.loadingState(false)
    //                                 notification('fail', res.data.msg)
    //                                 return res
    //                             } else {
    //                                 pageLoader.loadingState(false)
    //                                 notification('success', res.data.msg)
    //                                 return res
    //                             }
    //                         })
    //                         .catch((err) => console.log(err))
    //                 }
    //             },
    //             {
    //                 label: 'No',
    //                 onClick: () => { }
    //             }
    //         ]
    //     })
    // }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="dropdown dropdown-action">
                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end">

                    {/* {status_key.map((value, index) => {
                        // skip, when row status are matched with existing status
                        if (status_index[index] == status) { } else {
                            return (
                                <NavLink className="dropdown-item"
                                    to={`/admin/${page}/change-status/${id}`}
                                    onClick={changeStatus} data-id={`${id}`} data-status={`${status_index[index]}`} >
                                    <i className="fa fa-flag m-r-5"></i>
                                    {`Change Status To ${status_key[index].replace('_', '-')}`}
                                </NavLink>  .
                            );
                        }
                    }
                    )} */}


                    <NavLink to={{
                        pathname: `/admin/doctorInfo/${id}`,
                        state: data.row.values
                        }} className="dropdown-item">
                        <i class="fa fa-info mr-2"></i>
                        Bank Info
                    </NavLink>


                    <NavLink to={{
                        pathname: `/admin/${page}/update/${id}`,
                        state: data.row.values
                    }} className="dropdown-item">
                        <i className="fa fa-pencil m-r-5"></i> Edit
                    </NavLink>

                    {/* <NavLink to={`/admin/${page}/delete`} onClick={rowDelete} data-id={`${id}`} data-status={`${status}`} className="dropdown-item">
                        <i className="fa fa-trash-o m-r-5"></i> Delete
                    </NavLink> */}

                </div>
            </div>

        </>
    );
}
