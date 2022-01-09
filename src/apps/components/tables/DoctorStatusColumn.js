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
export const DoctorStatusColumn = ({ data, buttons, endpoint, DataContext, flag }) => {
    // buttons 
    const statusButton = buttons.status
    // const statusButton = buttons.status

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
    let statusChangeValue;
    if (flag == "pendingDoctor") {
        statusValue = {
            0: 'Approved',
            1: 'Rejeceted'
        }
        statusChangeValue = {
            0: 1,
            1: 2
        }
    } else if (flag == "blockedDoctor") {
        statusValue = {
            0: 'Approved',
            1: 'Rejeceted'
        }
        statusChangeValue = {
            0: 1,
            1: 2
        }
    } else if (flag == "rejectedDoctor") {
        statusValue = {
            0: 'Approved',
            1: 'Blocked'
        }
        statusChangeValue = {
            0: 1,
            1: 3
        }
    } else if (flag == "approvedDoctor") {
        statusValue = {
            0: 'Rejeceted',
            1: 'Blocked'
        }
        statusChangeValue = {
            0: 2,
            1: 3
        }
    }


    const classname = {
        0: 'status-red',
        1: 'status-green'
    }

    // change show in home status
    const changeStatus1 = async (e) => {
        // show loader
        pageLoader.loadingState(true)

        // generate request data
        const value = {
            id: e.target.dataset.id,
            status: statusChangeValue[0]
        }  // set field for showHome field

        // make api request for change (show in home) value
        await axios.post(endpoint.update, value)
            .then((res) => {
                dataContext.resetData(value.id)
                pageLoader.loadingState(false)
                notification('success', res.data.msg)
            })
            .catch((err) => {
                pageLoader.loadingState(false)
                notification('fail', err)
            })
        // updateList(list.slice(list.indexOf(e.target.name, 1)))
        setTimeout(() => {
            pageLoader.loadingState(false)
        }, 2000)
    }

    // change show in home status
    const changeStatus2 = async (e) => {
        // show loader
        pageLoader.loadingState(true)

        // generate request data
        const value = {
            id: e.target.dataset.id,
            status: statusChangeValue[1]
        }  // set field for showHome field

        // make api request for change (show in home) value
        await axios.post(endpoint.update, value)
            .then((res) => {
                dataContext.resetData(value.id)
                pageLoader.loadingState(false)
                notification('success', res.data.msg)
            })
            .catch((err) => {
                pageLoader.loadingState(false)
                notification('fail', err)
            })
        setTimeout(() => {
            pageLoader.loadingState(false)
        }, 2000)
    }


    return (
        <>
            <span
                title="Click For Change Status"
                className={`custom-badge ${classname[1]}`}
                data-id={data.row.values.id}
                data-status={state}
                onClick={changeStatus1}
                style={{ 'cursor': 'pointer' }}>
                {statusValue[0]}
            </span>

            <br />

            <span
                title="Click For Change Status"
                className={`custom-badge status-red`}
                data-id={data.row.values.id}
                data-status={state}
                onClick={changeStatus2}
                style={{ 'cursor': 'pointer', 'margin-top': '10px' }}>
                {statusValue[1]}
            </span>
        </>
    );
}