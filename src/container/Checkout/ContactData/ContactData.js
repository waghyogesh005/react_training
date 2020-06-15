import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import orderAxios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Zip Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                value:'fastest',
                valid: true
            }
        },
        formIsValid: false,
        loading : false
    }

    getFormData = () =>{
        const formData = {};
        for(let eleIdentifier in this.state.orderForm){
            formData[eleIdentifier] = this.state.orderForm[eleIdentifier].value;
        }
        return formData;
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

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const formData = this.getFormData();
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        orderAxios.post('/orders.json',data)
        .then(response=>{
            console.log("BurgerBuilder::purchaseContinueHandler::response");
            this.setState({
                loading: false,
            });
            this.props.history.push('/')
        }).catch(error=>{
            this.setState({
                loading: false,
            })
        })
    }

    inputChangeHandler = (event, inputIdentifier) =>{
        const eleValue = event.target.value
        const updatedOrderForm = { ...this.state.orderForm};
        updatedOrderForm[inputIdentifier].value = eleValue;
        updatedOrderForm[inputIdentifier].valid = this.checkValidity(eleValue, updatedOrderForm[inputIdentifier].validation )
        updatedOrderForm[inputIdentifier].touched = true;

        let formIsValid = true;
        for( let identifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[identifier].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
        console.log("this", this.state.orderForm);
    }
    render() {
        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = <form>
            {
                formElementsArray.map(formElement=>{
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
                })
            }
                   
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                </form>

                if(this.state.loading) {
                    form = <Spinner></Spinner>
                }
        return (
            <div className={classes.ContactData}>
                <h1>Enter Your Contact Data</h1>
                    {form}
            </div>
        );
    }
}

export default ContactData;
