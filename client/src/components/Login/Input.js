import React from 'react';
import { Field } from 'formik';

const Input = ({type, name, children, placeholder, touched, error}) => (
    <>
        <label className='input_label' htmlFor={name}>{children}</label>
        <div>
            <Field className={touched && error ? 'input_field error' : 'input_field'} type={type} name={name} placeholder={placeholder} />
            {touched && error && <div className="error">{error}</div> }
        </div>
    </>
   )
   
export default Input;