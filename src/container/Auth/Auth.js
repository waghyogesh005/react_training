import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actionCreator from '../../store/action/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const Auth = props => {

    const [controls, setControls] = useState({
        name:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder: 'Enter Email'
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder: 'Enter Password'
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(()=>{
        if(!props.buildingBurger_ && props.authRedirectPath_!=='/'){
            props.onSetAuthRedirectPath_('/')
        }
    },[])

    const checkValidity= (value,rules) =>{
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid
    }


    const inputChangeHandler = (event, inputIdentifier) =>{
        const eleValue = event.target.value
        const updatedControls = { ...controls};
        updatedControls[inputIdentifier].value = eleValue;
        updatedControls[inputIdentifier].valid = checkValidity(eleValue, updatedControls[inputIdentifier].validation )
        updatedControls[inputIdentifier].touched = true;

        let formIsValid = true;
        for( let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].valid && formIsValid
        }
        setControls(updatedControls);
        setFormIsValid(formIsValid);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault()
        const details = controls;
        props.onAuth_(details.name.value, details.password.value, isSignUp)
    }

    const onSwitchSignInHandler = () =>{
        setIsSignUp(!isSignUp);
    }

    const formElementsArray = [];

    for(let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    const form =    formElementsArray.map(formElement=>{
                    return  <Input
                                key = {formElement.id}
                                elementType= {formElement.config.elementType}
                                elementConfig= {formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid ={!formElement.config.valid}
                                shouldValidate = {formElement.config.validation}
                                touched= {formElement.config.touched}
                                changed= {(event)=>inputChangeHandler(event, formElement.id)}
                            ></Input>
                });


    let formEle = (
        <Aux>
         <form onSubmit={onSubmitHandler}>
             use : a@a.com
                {form}
                <Button btnType="Success" disabled={!formIsValid} >SUBMIT</Button>

            </form>

    </Aux>
    );

    if(props.loading_) {
        formEle = <Spinner></Spinner>
    }
    let errorMessage = props.error_ ? <p style={{color:'red'}}>{props.error_.message}</p> : null;
    
    let authRedirect = null;
    if (props.isAuth_) {
        authRedirect = <Redirect to={props.authRedirectPath_}/>
    }

    return (
        <div className={classes.Auth}>
           {authRedirect}
            {formEle}
            {errorMessage}
            <Button btnType="Danger"  clicked={onSwitchSignInHandler}>
                {` SWITCH TO ${isSignUp ?  'SIGN IN' : 'SIGN UP'}`}
            </Button>
        </div>
    );
}

const mapStateToProps = props => {
    return {
        loading_: props.auth.loading,
        error_: props.auth.error,
        isAuth_: props.auth.token!==null,
        buildingBurger_: props.burger.building,
        authRedirectPath_: props.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth_: (email,password, isSignup) => dispatch(actionCreator.auth(email,password,isSignup)),
        onSetAuthRedirectPath_ : (path)=> dispatch(actionCreator.setAuthRedirectPath(path))

    }
}

//withErrorHandler
export default  connect(mapStateToProps,mapDispatchToProps)(Auth);

