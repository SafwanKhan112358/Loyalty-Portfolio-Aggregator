import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Nav from "./Nav";

function Dashboard(){
    const {user} = useContext(AuthContext);

    return(
        <>
            <Nav />
            <h1>Welcome {user.name}</h1>
        </>);
}

export default Dashboard;