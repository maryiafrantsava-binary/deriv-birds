import React from "react";
import './BFlyerPage.scss'
import Ticks from '../components/Ticks';
import BirdReach from '../assets/images/bird_reach.svg'
import BirdNotReach from '../assets/images/bird_not_reach.svg'

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
            <div className={"bflyer-common"}>
                <h2>BFlyer</h2>
                <div className={"bflyer-common_container"}>
                    <div className={"game frame"}>Game</div>

                    <div className="settings_block">
                        <div className="frame">
                            <div>
                                <label htmlFor="duration">Qwe: </label>
                                <select 
                                    id="duration" 
                                    name="duration"
                                    defaultValue={5}>
                                    <option value="5">5</option>
                                    <option value="10" disabled>10</option>
                                    <option value="15" disabled>15</option>
                                </select>
                            </div>
                        </div>
                        <div className="frame">
                            <img src={BirdReach} alt="bird-reach"/>
                            <button className="button-reach">Purchase</button>
                        </div>
                        <div className="frame">
                            <img src={BirdNotReach} alt="bird-not-reach"/>
                            <button className="button-not-reach">Purchase</button>
                        </div>
                        <div className="game_container frame"></div>
                        <div>
                            {/* <Ticks/> */} 
                            block 2
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
