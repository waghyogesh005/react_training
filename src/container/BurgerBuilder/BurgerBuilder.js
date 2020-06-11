import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        let sum = 0;
        Object.keys(ingredients).map(igKey=>{
            sum = sum + ingredients[igKey];
        })
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = { ...this.state.ingredients };
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+ priceAddition;
        updatedIngredients[type]= updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

   removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount>0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type]= updatedCount;
            const priceDeduction = INGREDIENT_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key]= disabledInfo[key] == 0
        }

        return (
            <div>
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                        <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelHandler = {this.purchaseCancelHandler}
                        purchaseContinueHandler = {this.purchaseContinueHandler}
                        price ={this.state.totalPrice}
                        ></OrderSummary>
                    </Modal>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                    totalPrice = {this.state.totalPrice}
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabledInfo = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    ></BuildControls>
                </Aux>
            </div>
        );
    }
}

export default BurgerBuilder;
