import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }
    renderOrder = (key) => {
        const orderTransitionOptions = {
            classNames:"order",
            key,
            timeout: {enter: 500, exit: 500}
        }
        // fish items
        const fish = this.props.fishes[key];
        // fish count
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        // prevents error that comes as result of loading order from local storage is
        // faster than getting fishes from database, so there are no fishes in state.
        // do not display component until you get fishes from database
        if(!fish) return null;
        if(!isAvailable) {
            return (
                <CSSTransition {...orderTransitionOptions}>
                    <li key={key}>
                        Sorry { fish ? fish.name : 'fish' } is no longer available! 
                    </li>
                </CSSTransition>
            )
        }
        return (
            <CSSTransition {...orderTransitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
                                <span>{ count }</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs { fish.name } 
                        { formatPrice(count * fish.price) }
                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            // fish items
            const fish = this.props.fishes[key];
            // fish count
            const count = this.props.order[key];
            // check is fish available
            const isAvailable = fish && fish.status === 'available';
            // if yes, add value to total
            if(isAvailable) return prevTotal + (count * fish.price);
            // if no, return previous total
            else return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{ total ? formatPrice(total) : '' }</strong>
                </div>
            </div>
        )
    }
}

export default Order;