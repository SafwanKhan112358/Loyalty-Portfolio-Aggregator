import { Link } from "react-router-dom";

function Landing(){
    return(
        <section id="center">
        
        <Link to="/signup">
          <button>Sign up</button>
        </Link>

        <Link to="/login">
          <button>Login</button>
        </Link>
        <div>
          <h1>Loyalty Portfolio Aggregator</h1>
        </div>
        
      </section>
    )
}

export default Landing;