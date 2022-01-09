import {MEDIA} from "../../api/APIEndPoint";
// import axios from "../../../authAxios";
import axios from "axios"

export const LoadImageFile = (value) =>{

    if(value.img){
        try{
            let url = `${MEDIA.url}${value.img}`
            let u = ''
             axios.get(
                 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9'
                 )
                  .then((response)=>{
                      const resp=  new Buffer(response.data, 'binary').toString('base64')
                      u = resp
                      console.log('Worked', response.data)
                  })
                 .catch((err)=>console.log('Enable to load image. ::', err))
             return <img height={'34px'} width={'50px'} src={`data:image/jpg;base64,${u}`} />
        }catch(err){
            console.log(err)
        }

    } else {
        return 'Not found'
    }
}