import React, {Component} from 'react';
import Button from '../UI/Button/Button';

// const OrderSummary = (props) => {
//     let ingredients = Object.keys(props.ingredients).map(
//          igKey=> <li key={igKey}> <strong>{igKey}: </strong> {props.ingredients[igKey]}</li>
//     )
//     return (
//         <div>
//             <h3>Your Order</h3>
//                 <ul>
//                     {ingredients}
//                 </ul>
//                     <p><strong>Total Price</strong>: {props.price.toFixed(2)}</p>
//                 <p>Continue to checkout..</p>
//                 <Button btnType='Danger' clicked={props.purchaseCancelHandler}>
//                     Cancel
//                 </Button>
//                 <Button btnType='Success' clicked={props.purchaseContinueHandler}>
//                     Continue
//                 </Button>
//         </div>
//     );
// }

// ***************************check upper code for functional component***************************

class OrderSummary extends Component {

    componentWillUpdate(){
        console.log("OrderSummary::componentWillUpdate::")
    }
    render() {
        let ingredients = Object.keys(this.props.ingredients).map(
         igKey=> <li key={igKey}> <strong>{igKey}: </strong> {this.props.ingredients[igKey]}</li>
    )
    return (
        <div>
            <h3>Your Order</h3>
                <ul>
                    {ingredients}
                </ul>
                    <p><strong>Total Price</strong>: {this.props.price.toFixed(2)}</p>
                <p>Continue to checkout..</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelHandler}>
                    Cancel
                </Button>
                <Button btnType='Success' clicked={this.props.purchaseContinueHandler}>
                    Continue
                </Button>
        </div>
    );
    }
}
export default OrderSummary;
