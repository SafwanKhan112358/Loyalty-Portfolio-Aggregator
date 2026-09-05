import {apiUrl} from "../api";
import { use, useState } from "react";
import {useNavigate} from "react-router-dom";

function Signup(){
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function signupHandler(e){
        e.preventDefault();
        try{
            const result = await fetch(`${apiUrl}/signup`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, password})
            });

            const data = await result.json();

            if (!result.ok){
                setError(data.message);
                setSuccess("");
                return;
            }

            setSuccess("Sign up successful");
            setError("");

            setTimeout(()=>{
                navigate("/login");
            },3000);

            
        }catch(e){
            setError("Something went wrong. Please try again");
            setSuccess("");
        }
    }
    return(
    <>
        <h1>Signup</h1>

        <form onSubmit={signupHandler}>
            <h2>Name</h2>
            <input 
                value={name}
                onChange={
                    (e) => {
                        setName(e.target.value);
                    }
                }
            />

            <h2>Email</h2>
            <input
                value={email}
                onChange={
                    (e) => {
                        setEmail(e.target.value);
                    }
                }
            />

            <h2>Password</h2>
            <input 
                type="password"
                value={password}
                onChange={
                    (e)=>{
                        setPassword(e.target.value);
                    }
                }
            />

            <button>Sign up</button>

        </form>

        {success && <h3>{success}</h3>}
        {error && <h3>{error}</h3>}
    </>
    );
}

export default Signup;