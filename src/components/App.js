import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fishes: {},
            orders: {}
        }
        this.addFish = this.addFish.bind(this);
        this.loadSampleFishes = this.loadSampleFishes.bind(this);
    }
    // custom methods
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
    // render method -----------------------------------------
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="fresh seefood market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;