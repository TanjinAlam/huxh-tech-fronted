import React, { useEffect, useState } from 'react';
import {ProcessingItemList} from '../../components/forms/User/UserAddFormFields'
import ItemListCard from '../../components/OrderProcessingCard'
import $ from 'jquery';
import Cookies from 'universal-cookie';
const cookies = new Cookies();





function AdminAddPage() {
    const get_cookies = cookies.get('data')
    const [list, setList] = useState([])


    useEffect(async () => {
      const userId = get_cookies.id
      console.log("userId",userId)
      ProcessingItemList(userId).then(res => {
            console.log("rrrrrr",res.data)
            // if(res.data.status == 200)
                setList(res.data.data)
        }).catch(error => {
            console.log("errr",error)
            // notification('fail', error.message)
        })
        
    }, []);

    

    if(list && list.length)
    return (
        <>
        <div className='container pt-5 pb-5'>
            <div className='row'>
                <h1>Order Process item list</h1>
            </div>

            <div className='row'>
        
                  {list
                    ? list.map((item) => {
                        return(<ItemListCard key={item.id} data = {item} />)
                        // return(item.id)
                      })
                    : null}
                    
                    
                </div>
                </div>
             
        
        </>

    )
    else return (<></>)
}

export default AdminAddPage