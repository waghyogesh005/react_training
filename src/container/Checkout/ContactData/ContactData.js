import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import orderAxios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        console.log("asdasd===", this.props.ingredients)
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer:{
                name: "yogesh wagh  123",
                country: "india"
            },
            deliveryMethod: "fastest"
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
    render() {
        let form =    <form>
                    <input type="text"className={classes.Input} placeholder="name"></input>
                    <input type="text"className={classes.Input} placeholder="email"></input>
                    <input type="text"className={classes.Input} placeholder="street"></input>
                    <input type="text"className={classes.Input} placeholder="postalCode"></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
