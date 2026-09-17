import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard(){
    const {user} = useContext(AuthContext);

    return <h1>Welcome {user.name}</h1>;
}

export default Dashboard;