import { useContext, useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LoadingContext } from "../../../App";
import { DataContext } from "./Table";
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer } from 'react-toastify';
import { notification } from '../../helpers/Confirm/ConfirmAction'
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../../../authAxios"
import { deleteDataRow } from './DeleteRow'
import Cookies from 'universal-cookie';
import { AcceptOrder } from "../forms/Item/ItemAddFormFields";


import {
    HOSPITAL as hospitals,
    ADMIN as users,
    SPECIALIST as specialist,
    COMMON_SYMPTOM as commonSymptom,
    DOCTORBANNER as doctorBanner,
    DOCTOR as doctors,
    QUESTION
} from "../../api/APIEndPoint";

const cookies = new Cookies();

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

export const FormAction = ({ page, data, statusList, endpoint, flag }) => {
    const get_cookies = cookies.get('data')

    const apiEndPoint = ApiPoint(page)
    // set table row id
    let id 
    if(data.row.values.id) id = data.row.values.id
    if(data.row.values.user_id)id = data.row.values.user_id
    console.log("data.row.values",data.row.values)
    
    // set table row status
    const status = data.row.values.status
    // // get table status keys
    const status_key = Object.keys(statusList)
    // get table status values
    const status_index = Object.values(statusList)

    // init page loader context
    const pageLoader = useContext(LoadingContext)

    // const hospitalDataContext = useContext(DataContext)
    const dataContext = useContext(DataContext)
    useEffect(() => {
        if(data.row.values.id) id = data.row.values.id
        if(data.row.values.user_id)id = data.row.values.user_id
      }, []);

    // const dataContext = React.useContext(DataContext)


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

    const deleteRow = (e) => {
        // return true
        confirmAlert({
            title: 'Delete....',
            message: 'Are you sure to delete this item?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: "Yes",
                    className: 'btn btn-success',
                    onClick: () => {
                        // start page loading indicator...
                        pageLoader.loadingState(true)

                        let row_info = {
                            row_id: e.target.dataset.id,
                            action: 'delete',
                            module: endpoint,
                            endPoint: endpoint
                        }

                        // updateList(list.slice(list.indexOf(e.target.name, 1)))

                        let res = deleteDataRow(row_info)

                        res.then((result) => {
                            console.log("result", result);
                            dataContext.resetData(row_info.row_id)
                            pageLoader.loadingState(false)
                            notification('success', result.data.msg)
                            // history.goBack()
                        }).catch((err) => {
                            pageLoader.loadingState(false)
                            notification('fail', err.data.msg)
                        })
                    }
                },
                {
                    label: 'No',
                    className: 'btn btn-danger',
                    onClick: () => { }
                }
            ]
        })
    }


    const changeStatus = (e) => {
        e.preventDefault()
        confirmAlert({
            title: `Change ${page} Status`,
            message: 'Do you change status?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        pageLoader.loadingState(true)
                        const statusInfo = {
                            id: e.target.dataset.id,
                            status: Number(e.target.dataset.status)
                        }
                        await axios.post(endpoint.change_status, statusInfo)
                            .then((res) => {
                                let status = res.status
                                if (status != 200) {
                                    res.status = 401
                                    pageLoader.loadingState(false)
                                    notification('fail', res.data.msg)
                                    return res
                                } else {
                                    pageLoader.loadingState(false)
                                    if (flag == true) dataContext.resetData(statusInfo.id)
                                    else dataContext.changeStatus(statusInfo)
                                    notification('success', res.data.msg)
                                    return res
                                }
                            })
                            .catch((err) => console.log(err))
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        })
    }

    function onClicked(id){
        const values = {
            contractAddress:data.row.values.contractAddress,
            privateKey:get_cookies.walletKey,
            walletAddress:data.row.values.walletAddress,
            productId:id

        }
        console.log("data",values)

        pageLoader.loadingState(true)
        AcceptOrder(values).then(res => {
            console.log("rrrrrr",res)
            if (res.status == 200) {
                pageLoader.loadingState(false)
                notification('success', res.data.msg)
                // window.location.reload(true)
            } else {
                pageLoader.loadingState(false)
                notification('fail', res.data.msg)
            }
        }).catch(error => {
            notification('fail', error)
        })

        // console.log("hi",values,get_cookies)
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="dropdown dropdown-action">
                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v"></i>
                </a>

                <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end">

                    {status!=null && status!=undefined && status_key.map((value, index) => {
                        // skip, when row status are matched with existing status
                        if (status_index[index] == status) { } else {
                            return (
                                <NavLink className="dropdown-item"
                                    to={`/admin/${page}/change-status/${id}`}
                                    onClick={changeStatus} data-id={`${id}`} data-status={`${status_index[index]}`} >
                                    <i className="fa fa-flag m-r-5"></i>
                                    {`Change Status To ${status_key[index].replace('_', '-')}`}
                                </NavLink>
                            );
                        }
                    }
                    )}

                    

                    <button onClick={() => onClicked(data.row.values.id)} className="dropdown-item">
                        <i className="fa fa-pencil m-r-5"></i> Accept order
                    </button>

                </div>
            </div>

        </>
    );
}
