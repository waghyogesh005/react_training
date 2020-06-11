import React from 'react';
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'
const controls = [
    { label : 'Salad', type: 'salad'},
    { label : 'Bacon', type: 'bacon'},
    { label : 'Cheese', type: 'cheese'},
    { label : 'Meat', type: 'meat'},
]
const BuildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p><strong>Curent Price: </strong>{props.totalPrice.toFixed(2)}</p>
           {
               controls.map(ctrl=>{
                   return  <BuildControl
                   key={ctrl.type}
                   label={ctrl.label}
                   added= {()=>props.ingredientAdded(ctrl.type)}
                   removed= {()=>props.ingredientRemoved(ctrl.type)}
                   disabled = {props.disabledInfo[ctrl.type]}
                   ></BuildControl>
               })
           }
           <button className = {classes.OrderButton}
            disabled = {!props.purchasable}
            onClick= { props.ordered}
           >
               Order Now
           </button>
        </div>
    );
}

export default BuildControls;
