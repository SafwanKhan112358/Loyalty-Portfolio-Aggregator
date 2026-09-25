import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({token, children}){

    const {loggingOut} = useContext(AuthContext);

    if (loggingOut){
        return null;
    }

    if (!token){
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;