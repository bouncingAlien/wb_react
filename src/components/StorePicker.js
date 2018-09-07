import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';
 
class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
    constructor() {
        super();
        this.goToStore = this.goToStore.bind(this);
    }
    myInput = React.createRef();
    goToStore(e) {
        e.preventDefault();
        this.props.history.push(`/store/${this.myInput.current.value}`);
    }
    render() {
        return (
            <form className="store-selector" onSubmit={ this.goToStore }>
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    ref= { this.myInput }
                    required placeholder="Store Name" 
                    defaultValue={ getFunName() }
                />
                <button type="submit">Visit Store &rarr;</button>
            </form>
        )
    }
}

export default StorePicker;