import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css'
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope it test well ! </h1>
            <div style={{width: '100%',height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}
            >Cancel</Button>

                <Button 
                btnType="Success"
                clicked={props.checkoutContinued}
            >Continue</Button>
        </div>
    );
}

export default CheckoutSummary;
