import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext(false)



const UserProvider = ({children}) => {
    const [status, setStatus] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const loadingStatus = (flag)=> setLoading(flag)

    return (
        <>
            <UserContext.provider value={{status, loading, loadingStatus}} >
                {children}
            </UserContext.provider>

        </>
    );
}