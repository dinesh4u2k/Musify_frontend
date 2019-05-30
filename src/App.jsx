import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import queryString from 'query-string';
import Profile from './Profile';
import Gallery from './Gallery';
class App extends Component{

    constructor(props){
        super(props);
        
       
        this.state={
            ArtistName:'',
            artist: null,
            tracks:[]
        }
        
        // const params = this.getHashParams();
        // console.log('tokennnnnn',params);
    }

    // componentDidMount(){
        
    // }

    // getHashParams() {
    //     var hashParams = {};
    //     var e, r = /([^&;=]+)=?([^&;]*)/g,
    //         q = window.location.hash.substring(1);
    //     e = r.exec(q)
    //     while (e) {
    //        hashParams[e[1]] = decodeURIComponent(e[2]);
    //        e = r.exec(q);
    //     }
    //     return hashParams;
    //   }

    Search(){
        let parsed = queryString.parse(window.location.search);
        console.log('this state', this.state);
        const BaseUrl = 'https://api.spotify.com/v1/search?';
        const AlbumUrl = 'https://api.spotify.com/v1/artists/'
        let FetchUrl = `${BaseUrl}q=${this.state.ArtistName}&type=artist&limit=1`;
        let accesstoken = parsed.access_token;
        console.log('fetch url',FetchUrl);
        console.log('Access token',accesstoken);
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
              FetchUrl = `${AlbumUrl}${artist.id}/top-tracks?country=US&`
          
          fetch(FetchUrl, myOptions)
            .then(response => response.json())
            .then(json => { 
                console.log('artist tracks',json);
                const tracks = json.tracks;
                this.setState({tracks});
            })
            })
            .then(response => console.log('response', response))

          
    }

    render(){
       
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
                {
                    this.state.artist !== null
                    ?  
                    <div>
                        <Profile 
                         artist={this.state.artist}
                         />

                        <Gallery 
                            tracks={this.state.tracks}
                        
                        />

                    </div>

                    :   <div></div>
                }
            
                
            
                
            
            </div>
        )
    }


}

export default App;