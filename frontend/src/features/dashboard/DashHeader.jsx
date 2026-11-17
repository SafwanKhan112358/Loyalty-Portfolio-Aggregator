import { formatMoney } from "../../utils/formatValues"

function DashHeader({name, total}){
    return (
        <header>
            <h1>Welcome {name}</h1>
            <p>Your total portfolio value</p>
            <h2>{formatMoney(total)}</h2>
        </header>
    );
}

export default DashHeader;