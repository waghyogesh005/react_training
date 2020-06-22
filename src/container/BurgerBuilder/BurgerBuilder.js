import React, {
    useState,
    useEffect,
    useCallback
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
    connect,
    useSelector,
    useDispatch
} from 'react-redux';



const BurgerBuilder = props => {

    const burgerState = useSelector(state=>{
        return state.burger;
    })
    const authState = useSelector(state=>{
        return state.auth;
    })

    const _ings = burgerState.ingredients;
    const _totalPrice = burgerState.totalPrice;
    const _error = burgerState.error;
    const _isAuth = authState.token !== null;

    const dispatch = useDispatch();
    const onInitIngredients_ = useCallback(() => dispatch(actionCreator.initIngredients()),[dispatch]);
    const onIngredientAdded_ = (ingName) => dispatch(actionCreator.addIngredient(ingName));
    const onIngredientRemoved_ = (ingName) => dispatch(actionCreator.removeIngredient(ingName));
    const onInitPurchased_ = () => dispatch(actionCreator.initPurchase());
    const onSetAuthRedirectPath_ = (path) => dispatch(actionCreator.setAuthRedirectPath(path));



    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        onInitIngredients_()
    }, [onInitIngredients_])

    const updatePurchaseState = (ingredients) => {
        let sum = 0;
        Object.keys(ingredients).map(igKey => {
            sum = sum + ingredients[igKey];
        })
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (!_isAuth) {
            onSetAuthRedirectPath_('/checkout')
            props.history.push('/auth')
        } else {
            setPurchasing(true)
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchased_();
        props.history.push('/checkout')
    }


    const disabledInfo = {
        ..._ings
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] == 0
    }

    let OrderSummaryEle = null;
    let burger = _error ? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
    if(_ings) {
        burger = (
            <Aux>
                    <Burger ingredients={_ings}></Burger>
                    <BuildControls
                    totalPrice = {_totalPrice}
                    ingredientAdded = {onIngredientAdded_}
                    ingredientRemoved = {onIngredientRemoved_}
                    disabledInfo = {disabledInfo}
                    purchasable = {updatePurchaseState(_ings)}
                    ordered = {purchaseHandler}
                    isAuthenticated = {_isAuth}
                    ></BuildControls>
                    yogesh wagh
            </Aux>
        );
        OrderSummaryEle =  <OrderSummary
        ingredients={_ings}
        purchaseCancelHandler = {purchaseCancelHandler}
        purchaseContinueHandler = {purchaseContinueHandler}
        price ={_totalPrice}
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

export default connect()(withErrorHandler(BurgerBuilder, orderAxios));