import { useContext, useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LoadingContext } from "../../../App";
import { DataContext } from "./Table";
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer } from 'react-toastify';
import { notification } from '../../helpers/Confirm/ConfirmAction'
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../../../authAxios"
import { DOCTORBANKINFO } from "../../api/APIEndPoint";

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

export const FormActionBank = ({ page, data }) => {

    const apiEndPoint = ApiPoint(page)

    // set table row id
    const bankInfo = data.row.original
    
    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="dropdown dropdown-action">
                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false" >
                    {
                        data.row.values && data.row.values.withdrawType == 1?(
                            <img src={'/assets/img/bank.png'} width={50} height={50} alt="doctor banner"/> ):null
                        
                    }
                    {
                        data.row.values && data.row.values.withdrawType == 2?(
                            <img src={'/assets/img/mobile.png'} width={50} height={50} alt="doctor banner"/> ):null
                    }
                </a>
                <div className="dropdown-menu dropdown-menu-right bank-info-card" x-placement="bottom-end">
                   
                      
                        
                        <div className="d-flex flex-row p-3 w-100">
                        <div>
                            <p className="mr-5">Name : </p>
                            <p className="mr-5">Bank Acc. Name : </p>
                            <p className="mr-5">Bank Acc. No. : </p>
                            <p className="mr-5">Bank  Name : </p>
                            <p className="mr-5">Branch Name : </p>
                            <p className="mr-5">Banking Type : </p>
                        </div>
                        
                       
                            {
                                bankInfo?                              
                                    <div>
                            {
                                bankInfo.doctor ?
                                <p>{bankInfo.doctor.name}</p>:
                                <p>Undefined</p>
                            }
                            {
                                bankInfo.AccountName?
                                <p>{bankInfo.AccountName}</p>:
                                <p>Undefined</p>
                            }
                            {
                                bankInfo.AccountNo?
                                <p>{bankInfo.AccountNo}</p>:
                                <p>Undefined</p>
                            }
                            {
                                bankInfo.bankName?
                                <p>{bankInfo.bankName}</p>:
                                <p>Undefined</p>
                            }
                            {
                                bankInfo.branchName?
                                <p>{bankInfo.branchName}</p>:
                                <p>Undefined</p>
                            }
                            
                            {
                                bankInfo.withdrawType == 1?
                                <p> Bank Transaction</p>:
                                <p> Mobile Banking</p>
                            }
                                
                        </div>
                            :null
                        }
                         
                    </div>

                    
                    
                </div>
            </div>

        </>
    );
}
