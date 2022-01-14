import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function SideBar() {
     

  return (
    <>
        <div className="footer">
          <div className="container">
            <div className="row">
              <p className="w-100 text-center">                
                @2021 huxhtech.com. All rights reserved by huxhtech.com .
              </p>
            </div>
          </div>
        </div>
    </>
  );
}
