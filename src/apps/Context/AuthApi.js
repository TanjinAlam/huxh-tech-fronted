import React from "react"

const AuthApi = React.createContext({
    auth: false,
    authControl: () => {}
})

export default AuthApi