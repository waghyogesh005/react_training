import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import orderAxios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionCreator from '../../store/action/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    state = {
        orders:[],
        loading: true
    }

    componentDidMount(){
        this.props.onFetchOrders_(this.props.token_);
    }
    render() {
        return (
            <div>
           {
              this.loading_ ? <Spinner></Spinner> :
              this.props.orders_.map(order=>(
                <Order key={order.id}
                ingredients= {order.ingredients}
                price={order.price.toFixed(1)}
                ></Order>
            ))
           }
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        orders_ : state.order.orders,
        loading_: state.order.loading,
        token_: state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders_ :(token_) => dispatch(actionCreator.fetchOrder(token_))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, orderAxios))
