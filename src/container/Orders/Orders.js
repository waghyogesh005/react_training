import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import orderAxios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionCreator from '../../store/action/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props =>{


    useEffect(()=>{
        props.onFetchOrders_(props.token_,props.userId_);
    },[])

    return (
        <div>
       {
          props.loading_ ? <Spinner></Spinner> :
          props.orders_.map(order=>(
            <Order key={order.id}
            ingredients= {order.ingredients}
            price={order.price.toFixed(1)}
            ></Order>
        ))
       }
        </div>
    );
}

const mapStateToProps = state =>{
    return {
        orders_ : state.order.orders,
        loading_: state.order.loading,
        token_: state.auth.token,
        userId_: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders_ :(tokenId,userId) => dispatch(actionCreator.fetchOrder(tokenId,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, orderAxios))
