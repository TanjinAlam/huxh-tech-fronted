import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';





function AdminAddPage({ data }) {
  

  function onButtonClick(id){
    console.log(id)
  }

    return (
        <>

        <div className='single-card'>
          <img src={data.img} alt="item" />
          <p>Name: {data.name}</p>
          <p>Price : {data.price}</p>
          <div className='text-center'>
          <NavLink to={{
                        pathname: `/item-list/${data.id}`,
                        state: data
                    }}>Order request</NavLink>
          </div>
        </div>
        </>

    )
}
export default AdminAddPage