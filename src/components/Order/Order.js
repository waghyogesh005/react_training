import React from 'react';

import classes from './Order.module.css'
const Order = (props) => {
    
    const ingredients=[];
    Object.keys(props.ingredients).map(key=>{
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    });

    const ingredientsOutput = ingredients.map(igKey=>{
    return <span key={igKey.name}> {igKey.name} ({igKey.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD: {props.price}</strong></p>
        </div>
    );
}

export default Order;
