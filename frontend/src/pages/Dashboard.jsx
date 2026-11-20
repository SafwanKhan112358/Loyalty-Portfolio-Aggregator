import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import Nav from "../components/Nav";
import { apiUrl, authFetch } from "../api";
import { formatMoney } from "../utils/formatValues";
import { categoryIcons, giftIcon } from "../utils/categoryIcons";
import DashHeader from "../features/dashboard/DashHeader";
import ParentCategoryCards from "../features/dashboard/ParentCategoryCards";
import AddProgramButton from "../components/buttons/AddProgramButton";
import AddProgramModal from "../components/modals/AddProgramModal";
import ParentCategorySection from "../features/dashboard/ParentCategorySection";

function Dashboard(){
    const {user, token} = useContext(AuthContext);
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [addProgramModal, setAddProgramModal] = useState(false);

    const Icon1 = categoryIcons["Grocery"];
    const Icon2 = giftIcon;

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
            <DashHeader name={dashData["user"][0]["name"]} total={dashData["total"]} />
            <ParentCategoryCards parentCategories={dashData["parentCategories"]} />

            <AddProgramButton clickMethod={() => setAddProgramModal(true)}/>
            {addProgramModal && <AddProgramModal clickMethod={() => setAddProgramModal(false)}/>}

            {dashData["parentCategories"].map((element)=>{
                return <ParentCategorySection key={element["name"]} name={element["name"]} total={element["total"]}/>
                })
            }

            <Icon1 />
            <Icon2 />
        </>);
}

export default Dashboard;