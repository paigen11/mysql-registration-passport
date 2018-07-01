import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class ProfileForm extends Component {
    constructor() {
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
        e.preventDefault();
        axios.post()
    }

    render() {
        return (
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
                    {this.props.buttonText}
                </Button>
            </form>
        )
    }
}

export default ProfileForm;