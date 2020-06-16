import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

import {connect}  from 'react-redux';


class Checkout extends Component {
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
                    ingredients={this.props.ings_}
                    checkoutCancelled={this.onCheckoutCancelledHandler}
                    checkoutContinued={this.onCheckoutContinueHandler}
                    ></CheckoutSummary>
                    <Route
                    path= {this.props.match.path+"/contact-data"}
                    component = {ContactData}
                    ></Route>
            </div>
        );
    }
}

const mapStateToProps = state => {
 return {
    ings_ : state.ingredients,
 }
}

export default connect(mapStateToProps)(Checkout);
