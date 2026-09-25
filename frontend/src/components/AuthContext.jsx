import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        setLoggingOut(false);
    };

    const logout = () =>{
        setLoggingOut(true);
        setToken("");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout, loggingOut}}>
            {children}
        </AuthContext.Provider>
    );
}
