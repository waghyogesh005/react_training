import React, {
    useState,
    useEffect
} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import orderAxios from '../../axios-order';

import * as actionCreator from '../../store/action/index';
import {
    connect
} from 'react-redux';



const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients_()
    }, [])

    const updatePurchaseState = (ingredients) => {
        let sum = 0;
        Object.keys(ingredients).map(igKey => {
            sum = sum + ingredients[igKey];
        })
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (!props._isAuth) {
            props.onSetAuthRedirectPath_('/checkout')
            props.history.push('/auth')
        } else {
            setPurchasing(true)
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchased_();
        props.history.push('/checkout')
    }


    const disabledInfo = {
        ...props._ings
    }

    for(let key in disabledInfo) {
        disabledInfo[key]= disabledInfo[key] == 0
    }

    let OrderSummaryEle = null;
    let burger = props._error ? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
    if(props._ings) {
        burger = (
            <Aux>
                    <Burger ingredients={props._ings}></Burger>
                    <BuildControls
                    totalPrice = {props._totalPrice}
                    ingredientAdded = {props.onIngredientAdded_}
                    ingredientRemoved = {props.onIngredientRemoved_}
                    disabledInfo = {disabledInfo}
                    purchasable = {updatePurchaseState(props._ings)}
                    ordered = {purchaseHandler}
                    isAuthenticated = {props._isAuth}
                    ></BuildControls>
            </Aux>
        );
        OrderSummaryEle =  <OrderSummary
        ingredients={props._ings}
        purchaseCancelHandler = {purchaseCancelHandler}
        purchaseContinueHandler = {purchaseContinueHandler}
        price ={props._totalPrice}
        ></OrderSummary>;
    }

    return (
        <div>
            <Aux>
                <Modal show={purchasing} modalClosed = {purchaseCancelHandler}>
                    {OrderSummaryEle}
                </Modal>
                {burger}
            </Aux>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        _ings: state.burger.ingredients,
        _totalPrice: state.burger.totalPrice,
        _error: state.burger.error,
        _isAuth: state.auth.token !== null
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients_: () => dispatch(actionCreator.initIngredients()),
        onIngredientAdded_: (ingName) => dispatch(actionCreator.addIngredient(ingName)),
        onIngredientRemoved_: (ingName) => dispatch(actionCreator.removeIngredient(ingName)),
        onInitPurchased_: () => dispatch(actionCreator.initPurchase()),
        onSetAuthRedirectPath_: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxios));