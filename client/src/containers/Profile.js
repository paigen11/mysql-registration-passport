import React, { Component } from 'react';
import HeaderBar from "../components/HeaderBar";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const title = {
    pageTitle: 'User Profile Screen'
};

class Profile extends Component {
    constructor(){
        super();

        this.state= {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            isLoading: true
        }
    }

    componentDidMount(){
       axios.get('http://localhost:3003/findUser', {
           params: {
               username: this.props.match.params.username
           }
       })
           .then(( response ) => {
               console.log(response.data);
               this.setState({
                   first_name: response.data.first_name,
                   last_name: response.data.last_name,
                   email: response.data.email,
                   username: response.data.username,
                   password: response.data.password,
                   isLoading: false
               })
           })
           .catch(( error ) => {
               console.log(error.data)
           })
    }

    render() {
        if(this.state.isLoading){
            return (
                <div>
                    <HeaderBar title={title}/>
                    <div>Loading User Data...</div>
                </div>
            )
        } else {
            return (
                <div>
                    <HeaderBar title={title}/>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>{this.state.first_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Name</TableCell>
                                <TableCell>{this.state.last_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email Name</TableCell>
                                <TableCell>{this.state.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell>{this.state.username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Password</TableCell>
                                <TableCell style={{WebkitTextSecurity: 'disc'}} >{this.state.password}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button variant='contained' color='primary'>
                        <Link to='/deleteUser'>Delete User</Link>
                    </Button>
                    <Button variant='contained' color='primary'>
                        <Link to='/updateUser'>Update User</Link>
                    </Button>
                </div>
            )
        }
    }
}

export default Profile;