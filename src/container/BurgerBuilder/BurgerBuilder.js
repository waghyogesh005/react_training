import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import orderAxios from '../../axios-order';

import * as actionCreator from '../../store/action/index';
import { connect } from 'react-redux';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        // error: false
    }
    
    componentDidMount(){
        this.props.onInitIngredients_()
    }

    updatePurchaseState = (ingredients) => {
        let sum = 0;
        Object.keys(ingredients).map(igKey=>{
            sum = sum + ingredients[igKey];
        })
       return sum > 0;
    }

    purchaseHandler = () => {
        if(!this.props._isAuth){
            this.props.onSetAuthRedirectPath_('/checkout')
            this.props.history.push('/auth')
        }
        else {
            this.setState({
                purchasing: true
            })
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased_();
        this.props.history.push('/checkout')
    }

//     addIngredientHandler = (type) =>{
//         const oldCount = this.state.ingredients[type];
//         const updatedCount = oldCount+1;
//         const updatedIngredients = { ...this.state.ingredients };
//         const priceAddition = INGREDIENT_PRICE[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice+ priceAddition;
//         updatedIngredients[type]= updatedCount;
//         this.setState({
//             ingredients: updatedIngredients,
//             totalPrice: newPrice
//         })

//         this.updatePurchaseState(updatedIngredients);
//     }

//    removeIngredientHandler = (type) =>{
//         const oldCount = this.state.ingredients[type];
//         if(oldCount>0){
//             const updatedCount = oldCount - 1;
//             const updatedIngredients = { ...this.state.ingredients };
//             updatedIngredients[type]= updatedCount;
//             const priceDeduction = INGREDIENT_PRICE[type];
//             const oldPrice = this.state.totalPrice;
//             const newPrice = oldPrice - priceDeduction;
//             this.setState({
//                 ingredients: updatedIngredients,
//                 totalPrice: newPrice
//             });
//             this.updatePurchaseState(updatedIngredients);
//         }
//     }

    render() {
        const disabledInfo = {
            ...this.props._ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key]= disabledInfo[key] == 0
        }

        let OrderSummaryEle = null;
        let burger = this.props._error ? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
        if(this.props._ings) {
            burger = (
                <Aux>
                        <Burger ingredients={this.props._ings}></Burger>
                        <BuildControls
                        totalPrice = {this.props._totalPrice}
                        ingredientAdded = {this.props.onIngredientAdded_}
                        ingredientRemoved = {this.props.onIngredientRemoved_}
                        disabledInfo = {disabledInfo}
                        purchasable = {this.updatePurchaseState(this.props._ings)}
                        ordered = {this.purchaseHandler}
                        isAuthenticated = {this.props._isAuth}
                        ></BuildControls>
                </Aux>
            );
            OrderSummaryEle =  <OrderSummary
            ingredients={this.props._ings}
            purchaseCancelHandler = {this.purchaseCancelHandler}
            purchaseContinueHandler = {this.purchaseContinueHandler}
            price ={this.props._totalPrice}
            ></OrderSummary>;
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

const mapStateToProps = state => {
    return {
        _ings: state.burger.ingredients,
        _totalPrice: state.burger.totalPrice,
        _error: state.burger.error,
        _isAuth: state.auth.token!==null
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients_: ()=> dispatch(actionCreator.initIngredients()),
        onIngredientAdded_ : (ingName)=> dispatch(actionCreator.addIngredient(ingName)),
        onIngredientRemoved_ : (ingName)=> dispatch(actionCreator.removeIngredient(ingName)),
        onInitPurchased_: ()=> dispatch(actionCreator.initPurchase()),
        onSetAuthRedirectPath_ : (path)=> dispatch(actionCreator.setAuthRedirectPath(path))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,orderAxios));
