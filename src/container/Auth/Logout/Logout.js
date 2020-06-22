import React, {
    useEffect
} from 'react';
import * as actionCreator from '../../../store/action/index';
import {
    Redirect
} from 'react-router-dom';
import {
    connect
} from 'react-redux';

const Logout = props => {

    const { onLogout_ } = props;
    useEffect(() => {
       props.onLogout_()
    }, [onLogout_]);

    
    return (
        <div>
            <Redirect to ="/"/>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout_: () => dispatch(actionCreator.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);