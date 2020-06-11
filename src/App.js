import React from 'react';
import logo from './logo.svg';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
       <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
