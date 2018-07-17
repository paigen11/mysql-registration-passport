import React, { Component } from 'react';
import HeaderBar from "../components/HeaderBar";
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const title = {
    pageTitle: 'Update User Profile Screen'
};

class UpdateProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            loadingUser: false,
            updated: false
        };
    }

    componentDidMount(){
        this.setState({ loadingUser : true });
        console.log('loading user data');

        axios.get('http://localhost:3003/findUser', {
            params: {
                username: this.props.match.params.username
            }
        })
            .then((response) => {
               this.setState({
                    loadingUser: false,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    username: response.data.username,
                    password: response.data.password
                })
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name] : event.target.value
        });
    };

    updateUser = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3003/updateUser', {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.last_name,
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    updated: true
                })
            })
            .catch((error) => {
                console.log(error.data);
            })
    };

    render() {
        if(this.state.loadingUser !== false){
            return (
                <div>
                    <HeaderBar title={title}/>
                    <p>Loading user data...</p>
                </div>
            )
        } else if(this.state.loadingUser === false && this.state.updated === true) {
            return <Redirect to={`/userProfile/${this.state.username}`} />

        }
        else if(this.state.loadingUser === false) {
            return (
                <div>
                    <HeaderBar title={title}/>
                    <form className='profile-form' onSubmit={this.updateUser}>
                        <TextField
                            id='first_name'
                            label='first_name'
                            value={this.state.first_name}
                            onChange={this.handleChange('first_name')}
                            placeholder='First Name'
                        />
                        <TextField
                            id='last_name'
                            label='last_name'
                            value={this.state.last_name}
                            onChange={this.handleChange('last_name')}
                            placeholder='Last Name'
                        />
                        <TextField
                            id='email'
                            label='email'
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            placeholder='Email'
                        />
                        <TextField
                            id='username'
                            label='username'
                            value={this.state.username}
                            readOnly
                            disabled
                        />
                        <TextField
                            id='password'
                            label='password'
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            placeholder='Password'
                            type='password'
                        />
                        <Button type='submit' variant='contained' color='primary'>
                            Save Changes
                        </Button>
                    </form>
                    <Button variant='contained' color='primary'>
                        <Link to='/'>Go Home</Link>
                    </Button>
                </div>
            )
        }
    }
}

export default UpdateProfile;