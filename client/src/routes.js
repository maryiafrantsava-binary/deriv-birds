import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                {/*<>*/}
                    <Route exact path="/links" element={<LinksPage/>}/>
                    <Route exact path="/create" element={<CreatePage/>}/>
                    <Route path="/detail/:id" element={<DetailPage/>}/>
                {/*</>*/}
                {/*:*/}
                {/*<Navigate to="/create"/>*/}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<AuthPage/>}/>
            {/*<Navigate to="/"/>*/}
        </Routes>
    )
}
