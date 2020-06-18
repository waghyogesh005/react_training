import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actionCreator from '../../store/action/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls:{
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
        },
        formIsValid: false,
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger_ && this.props.authRedirectPath_!=='/'){
            this.props.onSetAuthRedirectPath_('/')
        }
    }


    checkValidity= (value,rules) =>{
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


    inputChangeHandler = (event, inputIdentifier) =>{
        const eleValue = event.target.value
        const updatedControls = { ...this.state.controls};
        updatedControls[inputIdentifier].value = eleValue;
        updatedControls[inputIdentifier].valid = this.checkValidity(eleValue, updatedControls[inputIdentifier].validation )
        updatedControls[inputIdentifier].touched = true;

        let formIsValid = true;
        for( let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].valid && formIsValid
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        })
    }

    onSubmitHandler = (event) =>{
        event.preventDefault()
        const details = this.state.controls;
        this.props.onAuth_(details.name.value, details.password.value, this.state.isSignUp)
    }

    onSwitchSignInHandler = () =>{
        this.setState(prevState=>{
            return {isSignUp : !prevState.isSignUp}
        })
    }

    render() {

        const formElementsArray = [];

        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                                    changed= {(event)=>this.inputChangeHandler(event, formElement.id)}
                                ></Input>
                    });


        let formEle = (
            <Aux>
             <form onSubmit={this.onSubmitHandler}>
                 use : a@a.com
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>SUBMIT</Button>

                </form>

        </Aux>
        );

        if(this.props.loading_) {
            formEle = <Spinner></Spinner>
        }
        let errorMessage = this.props.error_ ? <p style={{color:'red'}}>{this.props.error_.message}</p> : null;
        
        let authRedirect = null;
        if (this.props.isAuth_) {
            authRedirect = <Redirect to={this.props.authRedirectPath_}/>
        }

        return (
            <div className={classes.Auth}>
               {authRedirect}
                {formEle}
                {errorMessage}
                <Button btnType="Danger"  clicked={this.onSwitchSignInHandler}>
                    {` SWITCH TO ${this.state.isSignUp ?  'SIGN IN' : 'SIGN UP'}`}
                </Button>
            </div>
        );
    }
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

