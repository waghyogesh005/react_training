import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
// const Modal = (props) => {
//     return (
//         <Aux>
//             <Backdrop show={props.show} clicked ={props.modalClosed}></Backdrop>
//             <div className={classes.Modal}
//                 style={{
//                     transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                     opacity: props.show ? '1' : '0'
//                 }}
//             >
//                 {props.children}
//             </div>
//         </Aux>
//     );
// }

// ***************************check upper code for functional component***************************
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show != this.props.show || nextProps.children != this.props.children
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked ={this.props.modalClosed}></Backdrop>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
