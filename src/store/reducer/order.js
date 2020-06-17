import * as actionType from '../action/actionType';


const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,
}


const reducer = (state= initialState, action) => {
    switch (action.type) {

        case actionType.INIT_PURCHASE: 
            return {
                ...state,
                purchased: false,
            }
        case actionType.PURCHASE_BURGER_START: 
            return {
                ...state,
                loading: true,
            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            }
             return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
            }
        case actionType.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                error: false
        }

        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
                error: false
        }
        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                error: false,
                loading: false
        }
        case actionType.FETCH_ORDERS_FAILED:
            return {
                ...state,
                error: true,
                loading: false
        }
        default:
            return state;
    }
}

export default reducer;