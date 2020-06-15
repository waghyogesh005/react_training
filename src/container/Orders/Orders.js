import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import orderAxios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        orders:[],
        loading: true
    }

    componentDidMount(){
        orderAxios.get('/orders.json')
        .then(response=>{
            const fetchData=[];
            for(let key in response.data) {
                fetchData.push({
                    id: key,
                    ...response.data[key]
                })
            }
            this.setState({orders:fetchData,loading: false});
        })
        .catch(error=>{
            this.setState({loading: false});
        })
    }
    render() {
        return (
            <div>
           {
               this.state.orders.map(order=>(
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

export default withErrorHandler(Orders, orderAxios);
