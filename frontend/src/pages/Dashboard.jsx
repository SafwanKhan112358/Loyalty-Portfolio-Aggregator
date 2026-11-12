import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import Nav from "../components/Nav";
import { apiUrl, authFetch } from "../api";
import { formatMoney } from "../utils/formatValues";

function Dashboard(){
    const {user, token} = useContext(AuthContext);
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashData = async () => {
        try{
            const res = await authFetch(`${apiUrl}/api/dashboard`, token);
            const data = await res.json();

            if (!res.ok){
                setError(data.message);
                return;
            }

            setDashData(data);

        }catch(err){
            setError("Failed to fetch dashboard data");
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashData();
    },[]);

    if (loading){
        return <p>Loading ...</p>;
    }
    if (error){
        return <p>{error}</p>;
    }
    if (!dashData){
        return null;
    }
    return(
        <>
            <Nav />
            <p>Welcome {dashData["user"][0]["name"]}</p>
            <p>Total portfolio value: {formatMoney(dashData["total"])}</p>
        </>);
}

export default Dashboard;