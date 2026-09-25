import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Nav(){
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    const handleLogOut = () =>{
        navigate("/");
        logout();
    };

    return(
        <nav>
            <button onClick={handleLogOut}>Log out</button>
        </nav>
    );
}

export default Nav;