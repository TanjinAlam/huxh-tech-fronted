import React from 'react'
import { Route, Redirect } from "react-router-dom"

export const ProtectedRoute = ({auth, component: Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render = { props => {
                if(auth){
                    return <Component {...props} />
                }else{
                    return <Redirect to= {{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                    />
                }
            }}
        />
    )
}