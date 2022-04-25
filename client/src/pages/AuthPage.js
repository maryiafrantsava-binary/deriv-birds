import React, {useContext, useEffect, useState} from "react";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/Auth.context';
import './Auth.css'
export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [isLogin, setisIsLogin] = useState(true);
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const signinHandler = () => {
        setisIsLogin(false)
    }
    const backtoLogin = () => {
        setisIsLogin(true)
    }
    
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message);
            setisIsLogin(true);
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId);
        } catch (e) {}
    }
    return (<>
        <div className="row login-container" id="loginform">
            {
                isLogin ? <>
                    <h2 id="headerTitle">Login</h2>
                    <div class="row">
                        <label htmlFor="email">User name</label>
                        <input
                            placeholder="placeholder1"
                            id="email"
                            type="text"
                            name="email"
                            value={form.email}
                            className="validate"
                            onChange={changeHandler}
                        />
                    </div>
                    <div class="row">
                        <label htmlFor="password">password</label>
                        <input
                            placeholder="placeholder2"
                            id="password"
                            type="password"
                            name="password"
                            className="validate"
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <button className="login-button"
                        onClick={loginHandler}
                        disabled={loading}
                    >login</button>


                </> :
                    <>
                        <h2 id="headerTitle">Sign Up</h2>
                        <div class="row">
                            <label htmlFor="username">User Name</label>
                            <input
                                placeholder="placeholder1"
                                id="username"
                                type="text"
                                name="username"
                                value={form.username}
                                className="validate"
                                onChange={changeHandler}
                            />
                        </div>
                        <div class="row">
                            <label htmlFor="email">Email Id:</label>
                            <input
                                placeholder="placeholder1"
                                id="email"
                                type="text"
                                name="email"
                                value={form.email}
                                className="validate"
                                onChange={changeHandler}
                            />
                        </div>
                        <div class="row">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="placeholder2"
                                id="password"
                                type="password"
                                name="password"
                                className="validate"
                                value={form.password}
                                onChange={changeHandler}
                            />
                        </div>


                        <button className="login-button"
                            onClick={registerHandler}
                            disabled={loading}
                        >Sign up</button>
                    </>



            }
            {isLogin ? <>
                <span>Not registered yet?</span>
                <button
                    onClick={signinHandler}
                    disabled={loading}
                >Register</button>
            </> : <button className="back-login"
                onClick={backtoLogin}
                disabled={loading}
            >Back to login</button>}

        </div>
    </>


        
    )
}