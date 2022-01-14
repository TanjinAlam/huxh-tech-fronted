import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function SideBar() {
      const get_cookies = cookies.get('data')

      const initialClass = {
        product: 'd-none',
      }
      const [classnm, setclassnm] = useState(initialClass)
      var cl = {
          product:''
      }

      
  useEffect( () => {
      cl.product = 'd-none'
  }, []);
    function setClassNameFun(data) {
        var tempData = initialClass
        if (cl[data] == "d-block")
            cl[data] = "d-none"
        else cl[data] = "d-block"
        setclassnm(tempData)
        // cl.product = tempData.product
    }

  return (
    <>
                <div className="sidebar" id="sidebar">
                    <div className="sidebar-inner slimscroll">
                        <div id="sidebar-menu" className="sidebar-menu side_bar_menu">

                            <ul>

                                {/* {
                                    admin && admin.home ? */}
                                        <li className="active">
                                            <NavLink to="#">
                                                <i class="fa fa-dashboard" aria-hidden="true"></i>
                                                <span>Dashboard</span>
                                            </NavLink>
                                        </li>
                                        {/* : null
                                } */}

                                {
                                    get_cookies && get_cookies.userType == 1 ?
                                        <li className="submenu">
                                            <a href="#" onClick={() => setClassNameFun("product")}>
                                                <i className="fa fa-user-md"></i> <span> Product </span>
                                                {
                                                    classnm.doctor == "d-block" ?
                                                        <span className="menu-arrow" id="menu-bottom-arrow"></span>
                                                        : <span className="menu-arrow" id=""></span>
                                                }
                                            </a>
                                            <ul className={cl.product}>
                                                <li><NavLink to="/item/add">Add</NavLink></li>
                                                <li><NavLink to="/item/list">List</NavLink></li>
                                                <li><NavLink to="/item/deployed-list">Deployed List</NavLink></li>
                                                <li><NavLink to="/item/requested-list">Requested List</NavLink></li>
                                                <li><NavLink to="/item/order-processing">Order Processing</NavLink></li>
                                                <li><NavLink to="/item/assign-courer">Assign Courier</NavLink></li>
                                            </ul>
                                        </li>
                                        : null
                                } 
                                {
                                    get_cookies && get_cookies.userType == 3 ?
                                        <li className="submenu">
                                            <a href="#" onClick={() => setClassNameFun("product")}>
                                                <i className="fa fa-user-md"></i> <span> Orders </span>
                                                {
                                                    classnm.doctor == "d-block" ?
                                                        <span className="menu-arrow" id="menu-bottom-arrow"></span>
                                                        : <span className="menu-arrow" id=""></span>
                                                }
                                            </a>
                                            <ul className={cl.product}>
                                                <li><NavLink to="/order/pending">Pending List</NavLink></li>
                                                {/* <li><NavLink to="/item/list">List</NavLink></li> */}
                                                {/* <li><NavLink to="/item/deployed-list">Deployed List</NavLink></li>
                                                <li><NavLink to="/item/requested-list">Requested List</NavLink></li> */}
                                                <li><NavLink to="/courer/processing-list">Order Processing</NavLink></li>
                                            </ul>
                                        </li>
                                        : null
                                } 



                            </ul>

                        </div>
                    </div>
                </div>
            </>
  );
}
