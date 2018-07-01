import React, { Component } from 'react';
import HeaderBar from "../components/HeaderBar";

const title = {
    pageTitle: 'User Profile Screen'
};

class Profile extends Component {
    render() {
        return (
            <div>
                <HeaderBar title={title}/>
            </div>
        )
    }
}

export default Profile;