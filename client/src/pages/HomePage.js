import React from "react";
import { NavLink } from "react-router-dom";
import './HomePage.scss'

export const HomePage = () => {
    return (
        <div className="main">
            <div>
                <h1 className="main_title">Welcome to Bird’s Game</h1>
                <p className="description">The Game that inspires and can prepare you for real trading!</p>
                <p className="description">Allow you to understand the simplest basics</p> 
                <p className="description">and our beautiful birds will allow you not to be bored.</p>
                <p className="description">Enjoy with birds!</p>
                <button className="game-button"><NavLink to="/game"><span className="game-button-text">Play game</span></NavLink></button>
            </div>

            <div className="score-container" />
        </div>
    )
}
