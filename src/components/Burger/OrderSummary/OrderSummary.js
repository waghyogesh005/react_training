import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    let ingredients = Object.keys(props.ingredients).map(
        igKey=> <li key={igKey}> <strong>{igKey}: </strong> {props.ingredients[igKey]}</li>
   )
   return (
       <div>
           <h3>Your Order</h3>
               <ul>
                   {ingredients}
               </ul>
                   <p><strong>Total Price</strong>: {props.price.toFixed(2)}</p>
               <p>Continue to checkout..</p>
               <Button btnType='Danger' clicked={props.purchaseCancelHandler}>
                   Cancel
               </Button>
               <Button btnType='Success' clicked={props.purchaseContinueHandler}>
                   Continue
               </Button>
       </div>
   );
}
export default OrderSummary;
