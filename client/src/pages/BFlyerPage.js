import React from "react";
import './BFlyerPage.scss'
import Ticks from '../components/Ticks';
import BirdReach from '../assets/images/bird_reach.svg'
import BirdNotReach from '../assets/images/bird_not_reach.svg'
import Game from '../assets/images/game.svg'

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
    }
}, []);


    return (
        <div className={"bflyer"}>
            <div className={"bflyer-common"}>
                <h1>BFlyer</h1>
                <h1 style={{color:"red", fontSize: "2rem"}}> We're sorry, but the game is still in development. You are testing stage of Alpha development.</h1>
                <div className={"bflyer-common_container"}>
                    <div className={"game-demo frame"}><img src={Game} alt="game"/></div>

                    <div className="settings_block">
                        <div className="settings_block_frame">
                            <div className="frame_part1">

                                <div className="duration_title_container">
                                    <label htmlFor="duration_number">Duration: </label>
                                </div>

                                <div className="duration_number_container">
                                    <select 
                                        id="duration_number" 
                                        name="duration_number"
                                        defaultValue={5}>
                                        <option value="5">5</option>
                                        <option value="10" disabled>10</option>
                                        <option value="15" disabled>15</option>
                                    </select>
                                </div>

                                <div className="duration_container">
                                    <select 
                                        id="duration" 
                                        name="duration"
                                        defaultValue={"ticks"}>
                                        <option value="ticks">ticks</option>
                                        <option value="seconds" disabled>seconds</option>
                                    </select>
                                </div>

                            </div>

                            <div className="frame_part2">

                                <div className="barrier_container">
                                    <label htmlFor="duration_number">Barrier: </label>
                                    <input type="text" id="barrier" name="barrier" placeholder="1.000"/>
                                    <span>from 1.000 till 5.000</span>
                                </div>

                            </div>

                            <div className="frame_part3">

                                <div className="bird_coins_container">
                                    <label htmlFor="bird_coins">BirdCoins: </label>
                                    <input type="text" id="bird_coins" name="bird_coins" placeholder="100"/>
                                    <span>from 10 till 300</span>
                                </div>

                            </div>

                        </div>
                        <div className="frame">
                            <img src={BirdReach} alt="bird-reach"/>
                            <button className="button-reach">Purchase</button>
                        </div>
                        <div className="frame">
                            <img className="bird-not-reach" src={BirdNotReach} alt="bird-not-reach"/>
                            <button className="button-not-reach" onClick={()=> console.log('Purchase')}>Purchase</button>
                        </div>
                        {/* <div> */}
                            {/* <Ticks/> */} 
                        {/* </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
