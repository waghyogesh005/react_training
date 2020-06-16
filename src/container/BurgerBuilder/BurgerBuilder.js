import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import orderAxios from '../../axios-order';

import * as actionType from '../../store/action';
import { connect } from 'react-redux';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount(){
        // orderAxios.get('/ingredients.json')
        // .then(response=>{
        //     this.setState({
        //         ingredients: response.data
        //     })
        // }).catch(error=>{
        //     this.setState({error: true})
        // })
    }

    updatePurchaseState = (ingredients) => {
        let sum = 0;
        Object.keys(ingredients).map(igKey=>{
            sum = sum + ingredients[igKey];
        })
       return sum > 0;
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
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
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

const mapStateToProps = state => {
    return {
        _ings: state.ingredients,
        _totalPrice: state.totalPrice
    }
}


const mapDispatchToState = dispatch => {
    return {
        onIngredientAdded_ : (ingName)=> dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved_ : (ingName)=> dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName})
        
    }
}

export default  connect(mapStateToProps,mapDispatchToState)(withErrorHandler(BurgerBuilder,orderAxios));
