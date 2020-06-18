import React, { Component } from 'react';
import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreator from './store/action/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp_();
  }
  render() {
    let authRoute = (
      <Switch>
        <Route path ="/auth" component={Auth}></Route>
        <Route path ="/"  exact component={BurgerBuilder}></Route>
        <Redirect to='/'/>
    </Switch>
    )
    if(this.props.isAuth) {
      authRoute = <Switch>
          <Route path ="/checkout" component={Checkout}></Route>
          <Route path ="/orders" component={Orders}></Route>
          <Route path ="/logout" component={Logout}></Route>
          <Route path ="/auth" component={Auth}></Route>
          <Route path ="/"  component={BurgerBuilder}></Route>
          <Redirect to='/'/>
      </Switch>
    }
    return (
      <div>
        <Layout>
          {authRoute}
        </Layout>
      </div>
    );
  }
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