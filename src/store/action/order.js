import * as actionType from './actionType';
import orderAxios from '../../axios-order';


const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START,
    }
}

const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        orderAxios.post('/orders.json?auth='+ token, orderData)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
                dispatch(purchaseBurgerFailed(error))
            })
    }
}


export const initPurchase = () => {
    return {
        type: actionType.INIT_PURCHASE
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders
    }
}

const fetchOrdersFailed = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAILED,
        error
    }
}

const fetchOrderStart = () =>{
    return {
        type: actionType.FETCH_ORDERS_START
    }
}

export const fetchOrder = (token,userId) =>{
    return dispatch=>{
        dispatch(fetchOrderStart);
        orderAxios.get('/orders.json?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"')
        .then(response=>{
            const fetchData=[];
            for(let key in response.data) {
                fetchData.push({
                    id: key,
                    ...response.data[key]
                })
            }
            dispatch(fetchOrdersSuccess(fetchData));
        })
        .catch(error=>{
            dispatch(fetchOrdersFailed(error))
        })
    }
}