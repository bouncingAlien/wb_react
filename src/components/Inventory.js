import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base,{ firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        loadSampleFishes: PropTypes.func,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        fishes: PropTypes.object
    }
    constructor() {
        super();
        this.state = {
            uid: null,
            owner: null
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            if(user) {
                this.authHandler({ user })
            }
        })
    }
    authHandler = async (authData) => {
        // look up current store in firebase db
        const store = await fetch(this.props.storeId, { context: this });
        // claim if there is no owner
        if(!store.owner){
            // if no owner, save current user as owner
            // if there is no owner field, create it with data
            // authData object that we get from github, with user, and in there uid property
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }
    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null })
    }
    render() {
        const logout = <button onClick={ this.logout }>Log Out</button>
        // check is user loged in
        if(!this.state.uid){
            return <Login authenticate={ this.authenticate } />
        }
        // check if they are not the owner of store
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner of this Store!</p>
                    { logout }
                </div>
            )
        }
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                { logout }
                { Object.keys(this.props.fishes).map(fish => {
                    return (<EditFishForm 
                        fish={this.props.fishes[fish]} 
                        key={fish} 
                        updateFish={ this.props.updateFish } 
                        deleteFish={ this.props.deleteFish }
                        index={fish} 
                    />)
                }) }
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;