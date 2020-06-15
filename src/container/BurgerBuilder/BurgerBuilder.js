import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import orderAxios from '../../axios-order';
const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount(){
        orderAxios.get('/ingredients.json')
        .then(response=>{
            this.setState({
                ingredients: response.data
            })
        }).catch(error=>{
            this.setState({error: true})
        })
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
            loading: true
        })

        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: "yogesh wagh",
                country: "india"
            },
            deliveryMethod: "fastest"
        }
        orderAxios.post('/orders.json',data)
        .then(response=>{
            console.log("BurgerBuilder::purchaseContinueHandler::response");
            this.setState({
                loading: false,
                purchasing: false
            })
        }).catch(error=>{
            this.setState({
                loading: false,
                purchasing: false
            })
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

        let OrderSummaryEle = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
        if(this.state.ingredients) {
            burger = (
                <Aux>
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
            );
            OrderSummaryEle =  <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelHandler = {this.purchaseCancelHandler}
            purchaseContinueHandler = {this.purchaseContinueHandler}
            price ={this.state.totalPrice}
            ></OrderSummary>;
        }

        if(this.state.loading){
            OrderSummaryEle = <Spinner></Spinner>
        }


        return (
            <div>
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                        {OrderSummaryEle}
                    </Modal>
                    {burger}
                </Aux>
            </div>
        );
    }
}

export default  withErrorHandler(BurgerBuilder,orderAxios);
