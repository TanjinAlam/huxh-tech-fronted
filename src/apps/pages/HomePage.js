import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {deployedItemList} from '../components/forms/User/UserAddFormFields'
import ItemListCard from '../components/ItemListCard'
import $ from 'jquery';
const cookies = new Cookies();





function AdminAddPage() {
    const get_cookies = cookies.get('data')
    const [list, setList] = useState([])


    useEffect(async () => {
        deployedItemList().then(res => {
            console.log("rrrrrr",res.data.data)
            if(res.data.status == 200)
                setList(res.data.data)
        }).catch(error => {
            console.log("errr",error)
            // notification('fail', error.message)
        })
        
    }, []);

    function PreDoctorView() {
        console.log("okkkk")
        $(".doctor-sub-nav").animate({ scrollLeft: "+=460" }, 500);
      }
      function nextDoctorView() {
        $(".doctor-sub-nav").animate({ scrollLeft: "-=460" }, 500);
      }

    if(list && list.length)
    return (
        <>
        <div className='container pt-5 pb-5'>
            <div className='row'>
                <h1>Deployed item list</h1>
            </div>
        <div className="row deployed-list w-100 pt-5">
              <button className="nav-prev-arrow " onClick={() => PreDoctorView()}>
                <i className="fa fa-angle-right"></i>
              </button>
              <div className="cata-sub-nav doctor-sub-nav">
                <div className="d-inline-flex">
                  {list
                    ? list.map((item) => {
                        return(<ItemListCard key={item.id} data = {item} />)
                      })
                    : null}
                    
                </div>
              </div>
              <button className="nav-next-arrow" onClick={() => nextDoctorView()}>
                <i className="fa fa-angle-left"></i>
              </button>
            </div>
        </div>
        
        </>

    )
    else return (<></>)
}

export default AdminAddPage