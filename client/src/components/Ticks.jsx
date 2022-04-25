import React from "react";

const Ticks = () => {
    const WS = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");
    const [tick, setTick] = React.useState(null);

    React.useEffect(() => {
        WS.onopen = function (evt) {
            WS.send(JSON.stringify({ ticks: "R_100" }));
        };

        WS.onmessage = function (msg) {
            const data = JSON.parse(msg.data);
            console.log(data);
            setTick(data.tick.ask);
        };
    }, []);

    return <div className={""}>Tick: {tick}</div>;
};

export default Ticks;