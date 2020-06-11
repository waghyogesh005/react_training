import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = (props) => {

    const tranformedIngredients = Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])]
        .map((_,index)=>{
            return <BurgerIngredient key={igKey+index} type={igKey}></BurgerIngredient>
        })
    }).reduce((updatedArray,ele)=>{
        return updatedArray.concat(ele);
    },[])
    // reduce take 2 ele one is updated array, second is start ele,aand last is after },comma is empty
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
                    { tranformedIngredients.length > 0 ? tranformedIngredients : <p>Please Select Ingredients</p>}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default Burger;
