import React, { Component } from 'react'
import formatCurrency from '../util';
import {motion} from "framer-motion"
import { connect } from 'react-redux';
import Modal from "react-modal";
import { removeFromCart } from '../actions/cartActions';
import {createOrder, clearOrder} from "../actions/orderActions";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        };
    };

    handleInput = event => {
        this.setState({[event.target.name] : event.target.value});
    };

    createOrder = event => {
        event.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a,c) => a + c.price * c.count, 0)
        };
        this.props.createOrder(order);
    }

    closeModal = () => {
        this.props.clearOrder();
    }

    container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.3
          }
        }
    };

    itemCart = {
        hidden: { x: -40, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1
        },
    };

    itemProceed = {
        hidden: { x: 40, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1
        },
    };

    render() {
        const {cartItems, order} = this.props;
        return (
            <div>
                {cartItems.length === 0 
                ? (<div className="cart cart-header">Cart is empty</div>) 
                : (<div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div>)}

                {
                    order && (
                        <Modal 
                            isOpen = {true}
                            onRequestClose = {this.closeModal}
                        >
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div className="order-details">
                                <h3 className="success-message">Your order has been placed.</h3>
                                <h2>Order {order._id}</h2>
                                <ul>
                                    <li>
                                        <div>Name:</div>
                                        <div>{order.name}</div>
                                    </li>
                                    <li>
                                        <div>Email:</div>
                                        <div>{order.email}</div>
                                    </li>
                                    <li>
                                        <div>Address:</div>
                                        <div>{order.address}</div>
                                    </li>
                                    <li>
                                        <div>Date:</div>
                                        <div>{order.createdAt}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{formatCurrency(order.total)}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>{order.cartItems.map(item => (
                                            <div>{item.count} {"x"} {item.title}</div>
                                        ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Modal>
                    )
                }

                <div>
                    <div className="cart">
                        <motion.ul 
                            className="cart-items"
                            variants={this.container}
                            initial="hidden"
                            animate="visible"
                        >
                            {cartItems.map(item => (
                                <motion.li key={item._id} variants={this.itemCart}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count} {" "}
                                            <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total: {" "}
                                        {formatCurrency(cartItems.reduce((accum, currItem) => accum + currItem.price * currItem.count, 0))}
                                    </div>
                                    <button onClick={() => {this.setState({showCheckout: true})}} className="button primary">
                                        Proceed
                                    </button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <motion.div 
                                    className="cart"
                                    variants={this.container}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <motion.li variants={this.itemProceed}>
                                                <label>Email</label>
                                                <input 
                                                    name="email"
                                                    type="email" 
                                                    required 
                                                    onChange={this.handleInput}
                                                ></input>
                                            </motion.li>
                                            <motion.li variants={this.itemProceed}>
                                                <label>Name</label>
                                                <input 
                                                    name="name"
                                                    type="text" 
                                                    required 
                                                    onChange={this.handleInput}
                                                ></input>
                                            </motion.li>
                                            <motion.li variants={this.itemProceed}>
                                                <label>Address</label>
                                                <input 
                                                    name="address"
                                                    type="text" 
                                                    required 
                                                    onChange={this.handleInput}
                                                ></input>
                                            </motion.li>
                                            <motion.li variants={this.itemProceed}>
                                                <button className="button primary" type="submit">Checkout</button>
                                            </motion.li>
                                        </ul>
                                    </form>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
      cartItems: state.cart.cartItems,
      order: state.order.order
    }),
    { 
        removeFromCart, 
        createOrder, 
        clearOrder 
    }
  )(Cart);