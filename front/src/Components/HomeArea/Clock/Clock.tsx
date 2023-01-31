import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {

    const [now, setNow] = useState<string>();

    useEffect(() => {
        const intervalId = setInterval(() => {
            let time = new Date();
            // now = time.toLocaleTimeString(); 
            setNow(time.toLocaleTimeString());
            console.log(time.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId)

    }, [])


    return (
        <div className="Clock Box">
            {now}
        </div>
    );
}

export default Clock;
