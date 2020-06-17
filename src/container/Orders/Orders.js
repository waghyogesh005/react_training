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
        this.props.onFetchOrders_();
        // orderAxios.get('/orders.json')
        // .then(response=>{
        //     const fetchData=[];
        //     for(let key in response.data) {
        //         fetchData.push({
        //             id: key,
        //             ...response.data[key]
        //         })
        //     }
        //     this.setState({orders:fetchData,loading: false});
        // })
        // .catch(error=>{
        //     this.setState({loading: false});
        // })
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
        loading_: state.order.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders_ :() => dispatch(actionCreator.fetchOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, orderAxios))
