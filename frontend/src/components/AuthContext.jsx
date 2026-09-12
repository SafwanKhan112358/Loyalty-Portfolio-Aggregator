import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{token, user, login}}>
            {children}
        </AuthContext.Provider>
    );
}
