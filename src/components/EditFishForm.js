import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        index: PropTypes.string,
        fish: PropTypes.shape({
            image: PropTypes.string, 
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        })
    }
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.removeFish = this.removeFish.bind(this);
    }
    handleChange(e) {
        const updatedFish = {
            ...this.props.fish,
            [e.currentTarget.name]: e.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }
    removeFish(){
        this.props.deleteFish(this.props.index);
    }
    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
                <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
                <select name="status" onChange={this.handleChange}value={this.props.fish.status} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} />
                <button onClick={this.removeFish}>Remove Fish</button>
            </div>
        )
    }
}

export default EditFishForm;