import "./Loading.css";
import loading from "../../../Assets/Images/laoding-gif.gif"

function Loading(): JSX.Element {
    return (
        <div className="Loading">
            <img src={loading} alt={""}/>
        </div>
    );
}

export default Loading;
