import { useState, useContext } from "react";
import {useNavigate} from "react-router-dom";
import { apiUrl } from "../api";
import { AuthContext } from "./AuthContext";

function Login(){

    const navigate = useNavigate();
    const {login, token} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function loginHandler(e){
        e.preventDefault();

        try{
            const result = await fetch(`${apiUrl}/login`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });

            const data = await result.json();

            if(!result.ok){
                setError(data.message);
                return;
            }

            login(data.token, data.user);
            setError("");

            setTimeout(()=>{
                navigate("/dashboard");
            },3000);
            
        }catch(e){
            setError("Something went wrong. Please try again.");
        }
    }

    return(
        <>
            <h1>Login</h1>

            <form onSubmit={loginHandler}>
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
                        (e) =>{
                            setPassword(e.target.value);
                        }
                    }
                />

                <button>Log in</button>

            </form>

            {token && <h3>Login successful</h3>}
            {error && <h3>{error}</h3>}
        </>
    );
}

export default Login;