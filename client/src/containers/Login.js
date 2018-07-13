import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            password: '',
            loggedIn: false,
            showError: false
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
                console.log(response.data);
                if(response.data === 'bad username or password'){
                    this.setState({
                        showError: true
                    })
                } else {
                    this.setState({
                        loggedIn: true,
                        showError: false
                    })
                }
            })
            .catch(( error ) => {
                console.log(error.data)
            })
    };

    render() {
        if(!this.state.loggedIn){
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
                    { this.state.showError &&
                        <div>
                            <p>That username or password isn't recognized. Please try again or register now.</p>
                            <Button variant='contained' color='primary'>
                                <Link to='/register'>Go Register</Link>
                            </Button>
                        </div>
                    }
                    <Button variant='contained' color='primary'>
                        <Link to='/'>Go Home</Link>
                    </Button>
                </div>
            )
        } else {
            return <Redirect to={`/userProfile/${this.state.username}`} />
        }
    }
}

export default Login;