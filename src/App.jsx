import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';


class App extends Component{

    constructor(props){
        super(props);
        this.state={
            ArtistName:'',
            artist: null
        }
        const params = this.getHashParams();
        console.log('tokennnnnn',params);
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
      }

    Search(){
        console.log('this state', this.state);
        const BaseUrl = 'https://api.spotify.com/v1/search?';
        const FetchUrl = `${BaseUrl}q=${this.state.ArtistName}&type=artist&limit=1`;
        let accesstoken = 'BQBMlk1fu3KVOV_gNeMigSoGCIzzIunCRjIxrev1wu5QuP_CxrpceG6bzl1oPevGR1G6QHYsHUqTKwHEw-h9sUKFPT970frykmFTUMLfj86PlruazQ_clZ5ulWukyBeQrX5v34UaL8kfC5c4FO1ZNG0c2uO-Pt2tySfRPH2Wt3NSz4oqHPrKSGu_';
        console.log('fetch url',FetchUrl);
        // fetch(FetchUrl,{
        //     method:'GET',
        //     headers:{
        //         'Authorization' : 'Bearer' + accesstoken
        //     },
        //     mode: 'cors',
        //     cache:'default'
        // })
        // .then(response => console.log('response', response));

        var myOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accesstoken
            },
            mode: 'cors',
            cache: 'default'
          };
      
          fetch(FetchUrl, myOptions)
            .then(response => response.json())
            .then(json => {
              const artist = json.artists.items[0];        
              this.setState({ artist });
            })
            .then(response => console.log('response', response))
    }

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
            <div className="App">
                <div className="title">Musify</div>

                <FormGroup>
                    <InputGroup>
                     <FormControl
                        type="text"
                        placeholder="Search by Name"
                        value ={this.state.ArtistName}
                        onChange={event => {this.setState({ArtistName: event.target.value})}}
                        onKeyPress={event => {if(event.key === 'Enter')this.Search()}}
                     />

                     <Button variant="outline-dark" onClick={()=> this.Search()}>Search</Button>


                    </InputGroup>
                   
                </FormGroup>

            
                <div className="Profile">
                    <div>Singer Picture</div>
                     <div>Singer Name</div>
            
                </div>

                <div className="Gallery">Gallery</div>
            
                <div>{artist.name}</div>
            
            </div>
        )
    }


}

export default App;