import React, {
    useState
} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import orderAxios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {
    connect
} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../../store/action/index';


const ContactData = props => {
    const [formIsValid, setFormIsValid]= useState(false)
    const [orderForm, setOrderForm] = useState(
        {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        }
    )

    const getFormData = () => {
        const formData = {};
        for (let eleIdentifier in orderForm) {
            formData[eleIdentifier] = orderForm[eleIdentifier].value;
        }
        return formData;
    }

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid
    }

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = getFormData();
        const data = {
            ingredients: props.ings_,
            price: props.totalPrice_,
            orderData: formData,
            userId: props.userId_
        }

        props.onOrderBurger_(data, props.token_);
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        const eleValue = event.target.value
        const updatedOrderForm = {
            ...orderForm
        };
        updatedOrderForm[inputIdentifier].value = eleValue;
        updatedOrderForm[inputIdentifier].valid = checkValidity(eleValue, updatedOrderForm[inputIdentifier].validation)
        updatedOrderForm[inputIdentifier].touched = true;

        let formIsValid = true;
        for (let identifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[identifier].valid && formIsValid
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid)
    }
    const formElementsArray = [];

    for(let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
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
                            changed= {(event)=>inputChangeHandler(event, formElement.id)}
                        ></Input>
            })
        }
               
                <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>ORDER</Button>
            </form>

            if(props.loading_) {
                form = <Spinner></Spinner>
            }
    return (
        <div className={classes.ContactData}>
            <h1>Enter Your Contact Data</h1>
                {form}
        </div>
    );
}


const mapStateToProps = state => {
    return {
        ings_: state.burger.ingredients,
        totalPrice_: state.burger.totalPrice,
        loading_: state.order.loading,
        token_: state.auth.token,
        userId_: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger_: (data, token) => dispatch(actionCreator.purchaseBurger(data, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, orderAxios));