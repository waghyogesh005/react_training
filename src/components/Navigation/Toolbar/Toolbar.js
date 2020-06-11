import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SIdeDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggledClick}></DrawerToggle>
            <Logo height="100%"></Logo>
            <nav className={classes.DesktopOnly}>
               <NavigationItems></NavigationItems>
            </nav>
        </header>
    ); 
}

export default Toolbar;
