import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fishes: {},
            order: {}
        }
        this.addFish = this.addFish.bind(this);
        this.loadSampleFishes = this.loadSampleFishes.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
    }
    componentDidMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
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
    loadSampleFishes(){
        this.setState({ fishes: sampleFishes });
    }
    // --- ORDER ---
    addToOrder(key){
        const order = { ...this.state.order};
        order[key] = order[key] + 1 || 1;
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
                />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;