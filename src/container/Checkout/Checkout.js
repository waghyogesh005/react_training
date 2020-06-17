import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';

import {connect}  from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import * as actionCreator from '../../store/action/index'; 

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
                {
                           this.props.ings_== null || this.props.purchased_ ? <Redirect to = '/'/> :
                        <Aux>
                            <CheckoutSummary
                           ingredients={this.props.ings_}
                           checkoutCancelled={this.onCheckoutCancelledHandler}
                           checkoutContinued={this.onCheckoutContinueHandler}
                           ></CheckoutSummary>
                           <Route
                           path= {this.props.match.path+"/contact-data"}
                           component = {ContactData}
                           ></Route>
                        </Aux>
                       
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
 return {
    ings_ : state.burger.ingredients,
    purchased_ : state.order.purchased
 }
}

export default connect(mapStateToProps)(Checkout);
