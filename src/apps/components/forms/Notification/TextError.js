import React from "react"

function TextError(props){
    return(
        <div className='form-error'>
            {props.children}
        </div>
    )
}
export default TextError