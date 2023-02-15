import { useSelector } from "react-redux";
import DropDowns from "./DropDowns";
import Spinner from "./Spinner";

const SelectCurrency = (props) => {
    const isLoading = useSelector((state) => state.currency.isLoaded);
    const currencyList = useSelector((state) => state.currency.currencyList)

    if(!isLoading){
        return (
            <Spinner />
        )
    }
    return (
        <DropDowns labelName="Currency" optionList={currencyList} update={props.update}/>
    )
}

export default SelectCurrency;