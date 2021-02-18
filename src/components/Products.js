import React, { Component } from 'react'
import formatCurrency from '../util'
import {motion} from "framer-motion"
import Modal from 'react-modal';

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null
        };
    }

    container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2
          }
        }
    };

    item = {
        hidden: { y: 40, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
    };

    openModal = (product) => {
        this.setState({product});
    };

    closeModal = () => {
        this.setState({product: null});
    };

    render() {
        const {product} = this.state;

        return (
            <motion.div 
                variants={this.container}
                initial="hidden"
                animate="visible"
            >
                <ul className="products">
                    {this.props.products.map(product => (
                        <motion.li key={product._id} variants={this.item}>
                            <div className="product">
                                <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="button primary" onClick={() => this.props.addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <motion.div
                                variants={this.container}
                                initial="hidden"
                                animate="visible"
                            >
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Available Sizes:{" "}
                                            {product.availableSizes.map(size => (
                                                <span>{" "} <button className="button">{size}</button></span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button className="button primary" onClick={() => {
                                                this.props.addToCart(product)
                                                this.closeModal();
                                            }}>
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Modal>
                    )  
                }
            </motion.div>
        )
    }
}
