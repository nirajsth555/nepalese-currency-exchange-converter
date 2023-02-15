const ConvertResult = (props) => {
    return (
        <>
            <h1 className="result">{props.result}</h1>
            {/* <h4 className="rate">{props.unit}</h4> */}
            <h4 className="rate">{props.rate}</h4>
        </>
    )
}

export default ConvertResult;