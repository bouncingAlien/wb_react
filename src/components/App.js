import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object
    }
    constructor() {
        super();
        this.state = {
            fishes: {},
            order: {}
        }
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.deleteFish = this.deleteFish.bind(this);
        this.loadSampleFishes = this.loadSampleFishes.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }
    componentDidMount() {
        // reinstate local storage
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if(localStorageRef) this.setState({ order: JSON.parse(localStorageRef) });
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        // set in local storage
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    // custom methods
    // --- FISH ---
    addFish(fish){
        // take copy of existing state
        const fishes = { ...this.state.fishes };
        // add new element to variable
        fishes[`fish${Date.now()}`] = fish;
        // set state to value of variable
        this.setState({ fishes });
    }
    updateFish(key, updatedFish){
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }
    deleteFish(key){
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes });
    }
    loadSampleFishes(){
        this.setState({ fishes: sampleFishes });
    }
    // --- ORDER ---
    addToOrder(key){
        const order = { ...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }
    removeFromOrder(key){
        const order = { ...this.state.order};
        delete order[key];
        this.setState({ order });
    }
    // render method -----------------------------------------
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="fresh seefood market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish 
                                                                    key={ key } 
                                                                    index = { key }
                                                                    addToOrder={ this.addToOrder } 
                                                                    details={ this.state.fishes[key] } 
                                                                    />)}
                    </ul>
                </div>
                <Order 
                    fishes={ this.state.fishes }
                    order={ this.state.order }
                    removeFromOrder={ this.removeFromOrder }
                />
                <Inventory 
                    fishes={ this.state.fishes } 
                    addFish={ this.addFish } 
                    updateFish={ this.updateFish }
                    deleteFish={ this.deleteFish }
                    loadSampleFishes={this.loadSampleFishes} 
                    storeId = { this.props.match.params.storeId }
                />
            </div>
        )
    }
}

export default App;