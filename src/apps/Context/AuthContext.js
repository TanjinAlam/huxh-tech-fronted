import { createContext, useState } from "react"

const AuthContext = createContext(null)

const AuthContextProvider = (props) => {
    // initial state
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = () => {
        // authentication logic
        setIsAuthenticated(true)
    }

    const logout = () => {
        // your logout logic
        setIsAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider