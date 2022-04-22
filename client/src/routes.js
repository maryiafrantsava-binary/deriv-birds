import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {GamesPage} from "./pages/GamesPage";
import {HomePage} from "./pages/HomePage";
import {HistoryPage} from "./pages/HistoryPage";
import {AuthPage} from "./pages/AuthPage";
import {AboutUsPage} from "./pages/AboutUsPage";
import {LeaderboardPage} from "./pages/LeaderboardPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/game/:id" exact>
                    <GamesPage />
                </Route>
                <Route path="/history">
                    <HistoryPage />
                </Route>
                <Route path="/about_us">
                    <AboutUsPage />
                </Route>
                <Route path="/leaderboard">
                    <LeaderboardPage />
                </Route>
                
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
