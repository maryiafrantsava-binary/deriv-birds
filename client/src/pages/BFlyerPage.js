import React from "react";
import './BFlyerPage.scss'
import Ticks from '../components/Ticks';

export const BFlyerPage = () => {
    return (
        <div className={"bflyer"}>
            <h1>BFlyer</h1>
            <div className={"bflyer_container"}>
                <div className={"settings_block"}>
block 1
                </div>
                <div className={"game_container"}>
                    <Ticks/>
block 2
                </div>
            </div>
        </div>
    )
}
