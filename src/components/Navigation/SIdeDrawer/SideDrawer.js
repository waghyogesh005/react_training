import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer = (props) => {

    const attachedClass = `${props.open ? classes.Open : classes.Close}`;
    return (

        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
            <div className={ `${classes.SideDrawer} ${attachedClass}`}>
                <Logo height="11%"></Logo>
                <nav>
                <NavigationItems isAuthenticated = {props.isAuth}></NavigationItems>
                </nav>
             </div>  
        </Aux>
    );
}

export default SideDrawer;
