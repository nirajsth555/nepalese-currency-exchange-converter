const label = {
    "width": "325px",
    "color": "white",
    "fontSize": "21px"
}

const InputText = (props) => {
    return (
        <>
            <label className="dropdown" style={label}>
                {props.labelName}
                <input 
                    className="form-control-lg shadow amount bg-dark"
                    placeholder={props.placeholder}
                    value={props.value}
                    type={props.type}
                    onChange={props.updateAmount}
                />
            </label>
        </>
    )
}

export default InputText;