import React, {useContext, useEffect, useState} from "react";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/Auth.context';
import BirdOne from '../assets/images/birds_success2.svg';
import BirdTwo from '../assets/images/bird_success1.svg';
import './Auth.css';

export const AuthPage = () => {
   // const config = require('config');
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        username:'',email: '', password: ''
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
            const data = await request(`https://deriv-birds.herokuapp.com/api/auth/register`, 'POST', {...form})
            message(data.message);
            setisIsLogin(true);
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request(`https://deriv-birds.herokuapp.com/api/auth/login`, 'POST', {...form})
            auth.login(data.token, data.userId);
            localStorage.setItem("uerId",data.userId)
        } catch (e) {}
    }
    return (<div className="auth-wrapper">
       <img className="bird-1" src={BirdOne} alt="bird-1"/>    
        <div className="row login-container" id="loginform">       
            {
                isLogin ? <>
                    <h2 id="headerTitle">Login</h2>
                    <div className="row">
                        <label htmlFor="email">Username or Email</label>
                        <input
                            placeholder="Username/Email"
                            id="email"
                            type="text"
                            name="email"
                            value={form.email}
                            className="validate"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="password"
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
                    >Log In</button>
                </> :
                    <>
                        <h2 id="headerTitle">Sign Up</h2>
                        <div className="row">
                            <label htmlFor="username">Username</label>
                            <input
                                placeholder="username"
                                id="username"
                                type="text"
                                name="username"
                                value={form.username}
                                className="validate"
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="email"
                                id="email"
                                type="text"
                                name="email"
                                value={form.email}
                                className="validate"
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="row">
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
            {isLogin ? 
                <div className="back-block">
                    <span>Not registered yet? </span>
                    <button 
                        onClick={signinHandler}
                        disabled={loading}
                    >
                        Register</button>
                </div> : 
                <div className="back-block">
                    <span>Already have any account? </span>
                    <button
                        onClick={backtoLogin}
                        disabled={loading}
                    >
                       Log In</button>
                </div>   

            }
        </div>
        <img className="bird-2" src={BirdTwo} alt="bird-2"/>
    </div> 
    )
}