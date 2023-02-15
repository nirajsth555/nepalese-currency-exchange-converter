import DropDowns from "./DropDowns";
import { useQuery } from 'react-query';
import { fetchRates } from "./../services/apiservice";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addRateList, addCurrencyList } from "./../store/features/currency/currencySlice";
import moment from "moment";

const CurrencySelect = (props) => {
    const dispatch = useDispatch();

    const { isLoading, isError, data, error } = useQuery(
        'rates', 
        () => fetchRates({
            perPage: 1,
            fromDate: moment().format("YYYY-MM-DD"),
            toDate: moment().format("YYYY-MM-DD"),
            page: 1,
        })
        
    );
    if(isLoading){
        return  (
            <Spinner />
        )
    }
    if(isError){
        return <span>Error: {error.message}</span>
    }

    const response = {"payload": [ ...data.data.data.payload ]};
    const iso3Array = response.payload[0].rates.map(rate => rate.currency.iso3);
    dispatch(addRateList(response.payload[0].rates));
    dispatch(addCurrencyList(iso3Array));
    return (
        <DropDowns labelName="Currency" optionList={iso3Array} update={props.update}/>
    )
};


export default CurrencySelect;