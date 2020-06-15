import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state ={
        ingredients:null,
        price: 0
    } 

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            
            if(param[0]!== 'price'){
                ingredients[param[0]] = +param[1];
            }else {
               price = +param[1];
            }
        }
       this.setState({
           ingredients: ingredients,
           price: price
       })
    }

    onCheckoutCancelledHandler = ()=>{
        this.props.history.goBack("/")
    }
    onCheckoutContinueHandler = ()=>{
        this.props.history.replace(this.props.match.path+"/contact-data")
    }
    render() {
        return (
            <div>
                   <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.onCheckoutCancelledHandler}
                    checkoutContinued={this.onCheckoutContinueHandler}
                    ></CheckoutSummary>
                    <Route
                    path= {this.props.match.path+"/contact-data"}
                    render ={ (props)=>{
                       return <ContactData  { ...props}
                       ingredients={this.state.ingredients}
                       totalPrice={this.state.price}
                       ></ContactData>
                    }}
                    ></Route>
            </div>
        );
    }
}

export default Checkout;
