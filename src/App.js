import React, { useEffect, Suspense } from 'react';
import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
// import Checkout from './container/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreator from './store/action/index';

const AsyncCheckout = React.lazy(()=>{
  return import('./container/Checkout/Checkout');
})


const AsyncOrders = React.lazy(()=>{
  return import('./container/Orders/Orders');
})

const App = (props) => {
  const {onTryAutoSignUp_} = props;
  useEffect(()=>{
    props.onTryAutoSignUp_();
  },[onTryAutoSignUp_]);

    let authRoute = (
      <Switch>
        <Route path ="/auth" component={Auth}></Route>
        <Route path ="/"  exact component={BurgerBuilder}></Route>
        <Redirect to='/'/>
    </Switch>
    )
    if(props.isAuth) {
      authRoute = <Switch>
          <Route path ="/checkout" render={(props)=> <AsyncCheckout {...props}></AsyncCheckout>}></Route>
          <Route path ="/orders" render={()=> <AsyncOrders></AsyncOrders>}></Route>
          <Route path ="/logout" component={Logout}></Route>
          <Route path ="/auth" component={Auth}></Route>
          <Route path ="/"  component={BurgerBuilder}></Route>
          <Redirect to='/'/>
      </Switch>
    }
    return (
      <div>
        <Layout>
          <Suspense fallback="...loading">{authRoute}</Suspense>
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp_: () => dispatch(actionCreator.authCheckState())
  }
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
