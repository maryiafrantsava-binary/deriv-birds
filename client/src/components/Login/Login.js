import React from 'react';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import './Form.css';
import Input from './Input';

const Login = ({ touched, errors }) => (
    <div className="login_wrapper">
        <Form className="login_form">
            <h2 className="title">Log In</h2>
            <Input type="text" name="email" placeholder="Username or Email" touched={touched.email} error={errors.email}>Email or Username</Input>
            <Input type="password" name="password" placeholder="Password" touched={touched.password} error={errors.password}>Password</Input>
            <button className="submit_button" type="submit">Log In</button>
        </Form>
        <div>Don't have account? Sign Up</div>
    </div>
)

const LoginPage = withFormik({
    mapPropsToValues: (props) => {
        return {
            email: props.email || '',
            password: props.password || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit: (values) => {
        console.log(values);
    }
})(Login)

export default LoginPage;