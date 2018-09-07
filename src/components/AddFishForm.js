import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
    static propTypes = {
        addFish: PropTypes.func
    }
    constructor(){
        super();
        this.createFish = this.createFish.bind(this);
    }
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    createFish(e){
        e.preventDefault();
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }
        this.props.addFish(fish);
        e.currentTarget.reset();
    }
    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input type="text" name="name" placeholder="Name" ref={this.nameRef} />
                <input type="text" name="price" placeholder="Price" ref={this.priceRef} />
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" placeholder="Description" ref={this.descRef}></textarea>
                <input type="text" name="image" placeholder="Image" ref={this.imageRef} />
                <button type="submit"> + Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;