import React, {Component} from 'react';
import Aux from '../Aux/Aux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SIdeDrawer/SideDrawer';


class Layout extends Component {

    
    state = {
        showSideDrawer: false,

    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer: false
        })
    }

    drawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render(){
        return (
            <Aux>
                <div>
                    <Toolbar drawerToggledClick = {this.drawerToggleHandler}></Toolbar>
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
                </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
