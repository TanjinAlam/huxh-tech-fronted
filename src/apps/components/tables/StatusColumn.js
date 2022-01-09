import React from 'react';
import { LoadingContext } from '../../../App'
import axios from '../../../authAxios'
import { confirmAlert } from 'react-confirm-alert';
import { notification } from '../../helpers/Confirm/ConfirmAction'
import { deleteDataRow } from './DeleteRow'
import { useHistory } from 'react-router-dom'


/**
 *
 * @param data
 * @returns {JSX.Element}
 * @constructor
 * @des change show in home value
 */
export const StatusColumn = ({ data, buttons, endpoint, DataContext, flag }) => {
    // buttons 
    const statusButton = buttons.status
    const deleteButton = buttons.delete

    // browsing history
    let history = useHistory();

    // init page loader context
    const pageLoader = React.useContext(LoadingContext)
    const dataContext = React.useContext(DataContext)
    const [state, setState] = React.useState(data.row.values.status)  // status values : 0 or 1

    // const statusValue = {
    //     0: 'In-Active',
    //     1: 'Active',
    // }
    let statusValue;
    if(flag == "doctor"){
        statusValue = {
            0: 'Pending',
            1: 'Approved',
            2: 'Rejected',
            3: 'Blocked'
        }
    } else if(flag == "pendingDoctor"){
        statusValue = {
            1: 'Approved',
            2: 'Rejeceted'
        }
    } else if(flag == "cashWithDraw") {
        statusValue = {
            0: 'Pending',
            1: 'Approved',
            2: 'Done',
            3: 'Rejected'
        }
    } else  if (flag == true) {
        statusValue = {
            0: 'Pending',
            1: 'Approved',
        }
    } else {
        statusValue = {
            0: 'In-Active',
            1: 'Active',
        }
    }

    const classname = {
        0: 'status-blue',
        1: 'status-green',
        2: 'status-blue',
        3: 'status-red',
        4: 'status-red',
    }

    // change show in home status
    const changeStatus = async (e) => {
        // show loader
        pageLoader.loadingState(true)

        // generate request data
        const value = {
            id: e.target.dataset.id,
            status: (e.target.dataset.status == 1) ? 0 : 1
        }  // set field for showHome field

        // make api request for change (show in home) value
        await axios.post(endpoint.update, value)
            .then((res) => {
                if(flag == true) dataContext.resetData(value.id)
                pageLoader.loadingState(false)
                notification('success', res.data.msg)
            })
            .catch((err) => {
                pageLoader.loadingState(false)
                notification('fail', err)
            })

        let st = state
        if (state == 1) {
            st = 0
        }
        else if (state == 0) {
            st = 1
        }
        else {
            st = 0
        }
        setState(st)
        setTimeout(() => {
            pageLoader.loadingState(false)
        }, 2000)
    }

    // delete row
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
                            endPoint: endpoint.delete
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


    return (
        <>
            {(statusButton) ? (
                <span
                    title="Click For Change Status"
                    className={`custom-badge ${classname[data.row.values.status]}`}
                    data-id={data.row.values.id}
                    data-status={data.row.values.status}
                    // onClick={changeStatus}
                    style={{ 'cursor': 'pointer' }}>
                    {statusValue[data.row.values.status]}
                </span>
            ) : ''}

            <br />

            {/* {(deleteButton) ? (
                <span
                    title="Click For delete"
                    className='custom-badge status-red'
                    data-id={data.row.values.id}
                    data-status={state}
                    onClick={deleteRow}
                    style={{ 'cursor': 'pointer', 'margin-top': '10px' }}>
                    Delete
                </span>
            ) : ''} */}
        </>
    );
}