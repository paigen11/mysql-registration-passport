import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const headerStyle = {
  background:
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(8,177,5,1) 62%, rgba(0,212,255,1) 100%)',
  color: 'white',
};

class HeaderBar extends Component {
  render() {
    return (
      <div className="header">
        <AppBar position="static" color="default" style={headerStyle}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              {this.props.title.pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default HeaderBar;
