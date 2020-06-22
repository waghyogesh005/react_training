import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {
    Route,
    Redirect
} from 'react-router-dom';

import {
    connect
} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

const Checkout = props => {
    const onCheckoutCancelledHandler = () => {
        props.history.goBack("/")
    }
    const onCheckoutContinueHandler = () => {
        props.history.replace(props.match.path + "/contact-data")
    }

    return (
        <div>
        {
                   props.ings_== null || props.purchased_ ? <Redirect to = '/'/> :
                <Aux>
                    <CheckoutSummary
                   ingredients={props.ings_}
                   checkoutCancelled={onCheckoutCancelledHandler}
                   checkoutContinued={onCheckoutContinueHandler}
                   ></CheckoutSummary>
                   <Route
                   path= {props.match.path+"/contact-data"}
                   component = {ContactData}
                   ></Route>
                </Aux>
               
        }
    </div>
    );
}

const mapStateToProps = state => {
    return {
        ings_: state.burger.ingredients,
        purchased_: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);