import { useState } from "react";
import { formatMoney } from "../../utils/formatValues";

function ParentCategorySection({name, total}){
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => {setOpen(!open)}}>
                <span>{name}</span>
                <span>{formatMoney(total)}</span>
                <span>{">"}</span>
            </button>

            {open && <p>Placeholder</p>}
        </div>
    );
}

export default ParentCategorySection;