const moneyFormatter = new Intl.NumberFormat("en-CA",{
    style: "currency",
    currency: "CAD"
});

export const formatMoney = (amount) =>{
    return moneyFormatter.format(amount);
}