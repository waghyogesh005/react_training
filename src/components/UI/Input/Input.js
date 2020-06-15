import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

    let inputClass = classes.InputElement;
    let errorMessage;
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClass = `${classes.InputElement} ${classes.Invalid}`;
        errorMessage = 'Please Enter Valid Details';
    }

    let inputElement;
    switch (props.elementType) {
        case 'input':
                inputElement = <input 
                className={inputClass} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}></input>
            break;
        case 'textarea':
                inputElement = <textarea 
                className={inputClass} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}></textarea>
            break;
        case 'select':
                inputElement = <select 
                className={inputClass} 
                value={props.value} onChange={props.changed}>
                    {
                        props.elementConfig.options.map(option=>{
                            return <option 
                            key={option.value} 
                            value={option.value}>
                                {option.displayValue}
                            </option>
                        })
                    }

                </select>
            break;
    
        default:
            inputElement = <input 
            className={inputClass} 
            {...props.elementConfig} 
            value={props.value} onChange={props.changed}></input>
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
                {inputElement}
               <p style={{textAlign:'left', color:'red'}}> {errorMessage}</p>
        </div>
    );
}

export default Input;
