/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    console.log(user)
    console.log(accessToken)

    return(
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
} 

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
    
export { AuthProvider, useAuthContext };
