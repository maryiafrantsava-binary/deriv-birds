import React from "react";
import './BFlyerPage.scss';

export const BFlyerPage = () => {

const amountTicks = 5;

const app_id = 1089;

const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=' + app_id);

const token = 'yH0zE22oYeoUN5l';

React.useEffect(() => {
    ws.onopen = function (evt) {
        ws.send(JSON.stringify({ "authorize": token }))
    };

    ws.onmessage = function (msg) {
        var data = JSON.parse(msg.data);
        // console.log('Response: %o', data); // Uncomment this to see full response data. 
        if (data.error !== undefined) {
            console.log(data.error.message);
            ws.close();
        } else if (data.msg_type == 'authorize') {
            ws.send(JSON.stringify({
                "buy": 1,
                "subscribe": 1,
                "price": 10,
                "parameters": {   
                                "amount": 10, 
                                "basis": "stake", 
                                "contract_type": "CALL", 
                                "currency": "USD",
                                "duration": 5, 
                                "duration_unit": "t", 
                                "symbol": "R_10" 
                              }
            }));
        } else if (data.msg_type == 'buy') {
            console.log("Contract Id " + data.buy.contract_id + "\n");
            console.log("Details " + data.buy.longcode + "\n");
        } else if (data.msg_type == 'proposal_open_contract') {
            var isSold = data.proposal_open_contract.is_sold;
            if (isSold) {
                console.log("Contract " + data.proposal_open_contract.status + "\n");
                console.log("Profit " + data.proposal_open_contract.profit + "\n");
                ws.close();
            } else {
                var currentSpot = data.proposal_open_contract.current_spot;
                var entrySpot = 0;
                if (typeof (data.proposal_open_contract.entry_tick) != 'undefined') {
                    entrySpot = data.proposal_open_contract.entry_tick;
                }
                console.log("Entry spot " + entrySpot + "\n");
                console.log("Current spot " + currentSpot + "\n");
                console.log("Difference " + (currentSpot - entrySpot) + "\n");
            }
        }
    };
}, []);


    return (
        <div className={"bflyer"}>
            <h1>BFlyer</h1>
            <div className={"bflyer_container"}>
                <div className={"settings_block"}>
block 1
                </div>
                <div className={"game_container"}>
                    {/* <Ticks/> */}
block 2
                </div>
            </div>
        </div>
    )
}
