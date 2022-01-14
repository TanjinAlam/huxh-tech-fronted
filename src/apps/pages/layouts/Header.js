import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function SideBar() {

    const logOut = (e) => {
      console.log("logout")
      window.location.href = "/home";
      cookies.remove('data', {path:"/"})
  }

  return (
    <>
    <div className="main-nav">
      <div className="container h-100">
        <div className="row d-flex justify-content-between align-items-center nav-bar">
          <div className="left-nav">
            <NavLink to='/home'>Home</NavLink>
          </div>
          <div className="right-nav">
            <NavLink to='/order-process'>Order processing</NavLink>
            <NavLink to='/' onClick={logOut}>Logout</NavLink>

          </div>
        </div>
      </div>
    </div>
    </>          
  );
}
