import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const position = "bottom-right"
const time = 2000

export function notification(status,data){
    
    let msg = null
    switch(status){
        case 'success':
            msg = toast.success(data, {
                position: position,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break
        case 'fail':
            msg = toast.error(data, {
                position: position,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break
        case 'warning':
            msg = toast.warning(data, {
                position: position,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break
        default:
            msg = toast.info(data, {
                position: position,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
    }
    return msg
}

