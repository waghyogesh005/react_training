import React from 'react';
import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './container/Orders/Orders';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
           <Route path ="/checkout" component={Checkout}></Route>
           <Route path ="/orders" component={Orders}></Route>
           <Route path ="/"  component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
