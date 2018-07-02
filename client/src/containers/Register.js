import React, { Component } from 'react';
import HeaderBar from "../components/HeaderBar";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const title = {
    pageTitle: 'Register Screen'
};

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: ''
        };
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name] : event.target.value
        });
    };

    registerUser = (e) => {
        console.log(this.state);
        e.preventDefault();
        axios.post('http://localhost:3003/registerUser', {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.last_name,
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {
                console.log(response.data);
        })
            .catch((error) => {
                console.log(error.data);
        })
    };

    render() {
        return (
            <div>
                <HeaderBar title={title}/>
                <form className='profile-form' onSubmit={this.registerUser}>
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
                    onChange={this.handleChange('username')}
                    placeholder='Username'
                />
                <TextField
                    id='password'
                    label='password'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    placeholder='Password'
                />
                <Button type='submit' variant='contained' color='primary'>
                    Register
                </Button>
                </form>
                <Button variant='contained' color='primary'>
                    <Link to='/'>Go Home</Link>
                </Button>
            </div>
        )
    }
}

export default Register;