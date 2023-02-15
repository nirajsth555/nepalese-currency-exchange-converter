import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import DropDowns from "../components/DropDowns";
import InputText from "../components/InputText";
import { addCurrencyList, addRateList, updateAction, updateSelectedCurrency } from "../store/features/currency/currencySlice";
import { fetchRates } from "./../services/apiservice";
import moment from "moment";
import SelectCurrency from "../components/SelectCurrency";
import ConvertResult from "../components/ConvertResult";

const ConvertCurrency = () => {
    const [displayResult, setDisplayResult] = useState(false);
    const [amountToConvert, setAmountToConvert] = useState(0);
    const [amountLabel, setAmountLabel] = useState("NPR Amount");
    const [convertedAmount, setConvertedAmount] = useState({
        amount: 0,
        rate: 0,
        unit: 0
    })


    const dispatch = useDispatch();

    const { data, status } = useQuery(
        'rates', 
        async () => await fetchRates({
            perPage: 1,
            fromDate: moment().format("YYYY-MM-DD"),
            toDate: moment().format("YYYY-MM-DD"),
            page: 1,
        })
    );

    useEffect(() => {
        if (data) {
          const response = {"payload": [ ...data.data.data.payload ]};
          const iso3Array = response.payload[0].rates.map(rate => rate.currency.iso3);
          dispatch(addRateList(response.payload[0].rates));
          dispatch(addCurrencyList(iso3Array));
          dispatch(updateSelectedCurrency(iso3Array[0]));
        }
      }, [data]);

    const currencyActions = useSelector((state) => state.currency.actions);
    const selectedAction = useSelector((state) => state.currency.selectedAction);
    const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
    const currencyRates = useSelector((state) => state.currency.rateList);

    useEffect(() => {
        switch(selectedAction){
            case "Buy":
                setAmountLabel("NPR Amount");
                break;
            case "Sell":
                setAmountLabel(selectedCurrency + " Amount");
                break;
            default:
                setAmountLabel("NPR Amount");
        }
    }, [selectedAction, selectedCurrency]);

    const changeAmount = (event) => {
        setAmountToConvert(event.target.value)
    }

    const convertAmount = () => {
        const currencyRateList = [...currencyRates];
        const amount = amountToConvert;
        const currency = selectedCurrency;
        const index = currencyRateList.findIndex(x => x.currency.iso3 === currency);
        const rate = currencyRateList[index];
        const action = selectedAction;
        const unit = rate.currency.unit;
        let convertedAmount = 0;
        let conversionRate = 0;
        if(action === "Buy"){
            const sellingRate = rate.sell;
            const sellingRatePerUnit = sellingRate / unit;
            conversionRate = sellingRate;
            convertedAmount = amount / sellingRatePerUnit;
            convertedAmount = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
        }
        if(action === "Sell"){
            const buyingRate = rate.buy;
            const buyingRatePerUnit = buyingRate / unit;
            conversionRate = buyingRate;
            convertedAmount = amount * buyingRatePerUnit;
            convertedAmount = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
        }
        setConvertedAmount({
            amount: convertedAmount,
            rate: conversionRate,
            unit
        });
        setDisplayResult(true);
    }

    const reset = () => {
        setAmountToConvert(0);
        setDisplayResult(false);
    }

    return (
        <>
            <div className="container-fluid shadow">
                <div className="fromdrop">
                    <DropDowns
                        labelName="What do you want to do?"
                        optionList={currencyActions}
                        value='asd'
                        update={(event) => dispatch(updateAction(event.target.value))}
                    />
                </div>
                <div className="fromdrop">
                    <SelectCurrency update={(event) => dispatch(updateSelectedCurrency(event.target.value))}/>
                </div>
                <div className="fromdrop">
                    <InputText
                        placeholder="Enter Amount"
                        value={amountToConvert}
                        type="number"
                        labelName={amountLabel}
                        updateAmount={changeAmount}
                    />
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-rcolor btn-lg-shadow" onClick={convertAmount}>
                        Convert
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <button className="btn btn-rcolor btn-lg shadow" text="Reset" onClick={reset}>
                        Reset
                        <i className="fas fa-redo-alt"></i>
                    </button>
                </div>
                <div className="mt-5 mb-2 text-center">
                {displayResult ? 
                    <ConvertResult
                        result={convertedAmount.amount}
                        rate={convertedAmount.rate}
                        unit={convertedAmount.unit}
                    /> : 
                    null
                }
                </div>
            </div>
        </>
    )
};

export default ConvertCurrency