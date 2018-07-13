import React, { Component } from 'react';
import HeaderBar from "../components/HeaderBar";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const title = {
    pageTitle: 'Login Screen'
};

class Login extends Component {
    constructor(){
        super();

        this.state={
            username: '',
            password: ''
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name] : event.target.value
        });
    };

    loginUser = (e) => {
        e.preventDefault();

        axios.get('http://localhost:3003/loginUser', {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then(( response ) => {
                console.log(response.data)
            })
            .catch(( error ) => {
                console.log(error.data)
            })
    };

    render() {
        return (
            <div>
                <HeaderBar title={title}/>
                <form className='profile-form' onSubmit={this.loginUser}>
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
                        type='password'
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Login
                    </Button>
                </form>
                <Button variant='contained' color='primary'>
                    <Link to='/'>Go Home</Link>
                </Button>
            </div>
        )
    }
}

export default Login;