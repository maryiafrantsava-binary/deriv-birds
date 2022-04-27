import React from "react";
import './HomePage.css'

export const HomePage = () => {
    return (
        <div className="main">
            <div>
                <h1>Welcome to Bird’s Game</h1>
                <p className="description">Game description</p>
                <button className="game-button">Play a game</button>
            </div>

            <div className="score-container" />
        </div>
    )
}
