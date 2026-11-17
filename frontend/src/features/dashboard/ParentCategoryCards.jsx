import { formatMoney } from "../../utils/formatValues";

function ParentCategoryCards({parentCategories}){
    return(
        <div>
            {parentCategories.map((element) =>{
                return <Card key={element["name"]} parentCategory={element["name"]} total={element["total"]} />
            })}
        </div>
    );
}

function Card({parentCategory, total}){
    return(
         <div>
            {parentCategory}
            <h3>{formatMoney(total)}</h3>
         </div>
    );
}

export default ParentCategoryCards;