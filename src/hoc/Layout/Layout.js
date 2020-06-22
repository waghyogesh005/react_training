import React, {
    useState
} from 'react';
import Aux from '../Aux/Aux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SIdeDrawer/SideDrawer';
import {
    connect
} from 'react-redux';


const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const drawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return (
        <Aux>
                <div>
                    <Toolbar 
                    drawerToggledClick = {drawerToggleHandler}
                    isAuth = {props.isAuthenticated_}
                    ></Toolbar>
                    <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler}
                    isAuth = {props.isAuthenticated_}
                    ></SideDrawer>
                </div>
                <main className={classes.content}>
                    {props.children}
                </main>
            </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated_: state.auth.token ? true : false
    }
}
export default connect(mapStateToProps)(Layout);