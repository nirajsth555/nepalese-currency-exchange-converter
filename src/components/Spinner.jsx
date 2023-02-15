import spinner from "./img/spinner.gif";
const image = {
    "marginBottom": "30px",
    "width": "60px"
}

const Spinner = () => {
   return(<div className='text-center'>
            <img src={spinner} alt="" style={image} />
        </div>
   )
};

export default Spinner;