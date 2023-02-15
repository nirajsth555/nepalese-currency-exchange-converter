import { useEffect, useState } from "react";
import ConvertResult from "../components/ConvertResult";
import CurrencySelect from "../components/CurrencySelect";
import DropDowns from "../components/DropDowns";
import InputText from "../components/InputText";
import Aux from "../hoc/aux";
// import { fetchRates } from "./../services/apiservice";
import { useSelector } from "react-redux";

const optionList = ['Buy', 'Sell'];


const CurrencyConverter = () => {

    const rateList = useSelector((state) => state.currency.rateList);

    // const [rates, setRates] = useState({});

    const [type, setType] = useState(optionList[0]);

    const [amountLabel, setAmountLabel] = useState("NPR Amount");

    const [amount, setAmount] = useState(0);

    // const [currencyList, setCurrencyList] = useState([]);

    const [currency, setCurrency] = useState("");

    const [convertedAmount, setConvertedAmount] = useState({
        amount: 0,
        rate: 0
    });

    const [displayResult, setDisplayResult] = useState(false);

    // const getRateList = async () => {
    //     const rateList = await fetchRates();
    //     if(!rateList) {

    //     }
    //     const data = {"payload": [ ...rateList.data.data.payload ]};
    //     const iso3Array = data.payload[0].rates.map(rate => rate.currency.iso3);
    //     setCurrencyList(iso3Array);
    //     setRates([...rateList.data.data.payload[0].rates]);
    //     setCurrency(data.payload[0].rates[0].currency.iso3);

        
    // }

    const changeType = (event) => {
        setType(event.target.value);
    }

    const changeAmount = (event) => {
        setAmount(event.target.value)
    };

    const changeAmountLabel = () => {
        const currentType  = type;
        const selectedCurrency = currency;
        switch(currentType){
            case "Buy":
                setAmountLabel("NPR Amount");
                break;
            case "Sell":
                setAmountLabel(selectedCurrency + " Amount");
                break;
            default:
                setAmountLabel("NPR Amount")
        } 
    }

    const updateCurrency = (event) => {
        setCurrency(event.target.value);
        changeAmountLabel();
    }

    const convertAmount = () => {
        // const currencyRates = [...rates];
        const currencyRates = [...rateList];
        const amountToConvert = amount;
        const selectedCurrency = currency;
        const index = currencyRates.findIndex(x => x.currency.iso3 === selectedCurrency);
        const rate = currencyRates[index];
        const selectedType = type;
        const unit = rate.currency.unit;
        let convertedAmount = 0;
        let conversionRate = 0;
        if(selectedType === "Buy"){
            const selingRate = rate.sell;
            const selingRatePerUnit = selingRate / unit;
            conversionRate = selingRate;
            convertedAmount = amountToConvert / selingRatePerUnit;
            convertedAmount = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
        }
        if(selectedType === "Sell"){
            const buyingRate = rate.buy;
            const buyingRatePerUnit = buyingRate / unit;
            conversionRate = buyingRate;
            convertedAmount = amountToConvert * buyingRatePerUnit;
            convertedAmount = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
        }
        setConvertedAmount({
            amount: convertedAmount,
            rate: conversionRate
        });
        setDisplayResult(true);
    }

    const resetForm = () => {
        setDisplayResult(false);
        setAmount(0);
    }

    // useEffect(() => {
    //     getRateList();
    // }, [])

    useEffect(() => {
        const currentType  = type;
        const selectedCurrency = currency;
        switch(currentType){
            case "Buy":
                setAmountLabel("NPR Amount");
                break;
            case "Sell":
                setAmountLabel(selectedCurrency + " Amount");
                break;
            default:
                setAmountLabel("NPR Amount")
        }
    }, [currency, type])

    return (
        <Aux>
            <div className="container-fluid shadow">
                <div className="fromdrop">
                    <DropDowns 
                        labelName="What do you want to do?" 
                        optionList={optionList} 
                        value={type} 
                        update={changeType}
                    />
                </div>
                <div className="fromdrop">
                    <CurrencySelect update={updateCurrency}/>
                    {/* <Spinner /> */}
                    {/* <DropDowns labelName="Currency" optionList={currencyList} update={updateCurrency} value={currencyList[0]}/> */}
                </div>
                <div className="fromdrop">
                    <InputText placeholder="Enter Amount" value={amount} type="number" updateAmount={changeAmount} labelName={amountLabel}/>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-rcolor btn-lg-shadow" onClick={convertAmount}>
                        Convert
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <button className="btn btn-rcolor btn-lg shadow" text="Reset" onClick={resetForm}>
                        Reset
                        <i className="fas fa-redo-alt"></i>
                    </button>
                </div>
                <div className="mt-5 mb-2 text-center">
                    {/* <Spinner /> */}
                    {displayResult ? <ConvertResult
                        result={convertedAmount.amount}
                        rate={convertedAmount.rate}
                    /> : null}
                </div>
            </div>
        </Aux>
    )
}

export default CurrencyConverter;