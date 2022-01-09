import React from 'react'
import { removeCookies } from '../../helpers/Cookies/AdminCookies'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function TopBar(){
    const get_cookies = cookies.get('data')

    console.log("daaa",get_cookies)

    const logOut = (e) => {
        cookies.remove('data', {path:"/"})
    }

    return(
        <>
            <div className="header">
                <div className="header-left">
                    <a href="/" className="logo">
                        <span>Dashboard</span>
                    </a>
                </div>
                <a id="toggle_btn" href="javascript:void(0);"><i className="fa fa-bars"></i></a>
                <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar"><i className="fa fa-bars"></i></a>
                <ul className="nav user-menu float-right">
                    <li className="nav-item dropdown has-arrow">
                        <a href="#" className="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                        <span className="user-img">
							<img className="rounded-circle" src="../../assets/img/user.jpg" width="24" alt="Admin" />
							<span className="status online"></span>
						</span>
                        {
                            get_cookies && get_cookies.userName?
                            <span>{get_cookies.userName}</span>:
                            <span>Admin</span>
                        }
                            
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="profile.html">My Profile</a>
                            <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                            <a className="dropdown-item" href="settings.html">Settings</a>
                            <a className="dropdown-item" href="/" onClick={logOut}>Logout</a>
                        </div>
                    </li>
                </ul>
                <div className="dropdown mobile-user-menu float-right">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i
                        className="fa fa-ellipsis-v"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="profile.html">My Profile</a>
                        <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                        <a className="dropdown-item" href="settings.html">Settings</a>
                        <a className="dropdown-item" href="/" onClick={logOut}>Logout</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar