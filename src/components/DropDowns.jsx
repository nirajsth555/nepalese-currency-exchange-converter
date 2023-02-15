import Aux from "../hoc/aux";

const label = {
    "width": "325px",
    "color": "white",
    "fontSize": "21px"
}

const DropDowns = (props) => {
    return(
        <Aux>
            <label className="dropdown" style={label}>
                {props.labelName}
                <select 
                    className="form-select bg-dark custom-select form-select-lg text-white border-dark shadow"
                    onChange={props.update}
                >
                    {props.optionList.map(option =>
                        <option key={option} value={option}>{option}</option>     
                    )}
                </select>
            </label>
        </Aux>
    )
}

export default DropDowns;