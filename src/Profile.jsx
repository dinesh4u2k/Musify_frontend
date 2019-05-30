import React, { Component } from 'react';
import './App.css';

class Profile extends Component{

    render(){
        let artist = {
            name: '',
            followers: {
              total: ''
            }
          };
          if (this.state.artist !== null) {
            artist = this.state.artist;
          }
        return(
            <div>
                <div>{artist.name}</div>
                <div>{artist.followers}</div>
            </div>
        )
    }
}

export default Profile; 