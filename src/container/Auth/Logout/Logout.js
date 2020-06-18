import React, { Component } from 'react';
import * as actionCreator from '../../../store/action/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class Logout extends Component {
    componentDidMount(){
        this.props.onLogout_()
    }
    render() {
        return (
            <div>
                <Redirect to ="/"/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout_: ()=> dispatch(actionCreator.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);
