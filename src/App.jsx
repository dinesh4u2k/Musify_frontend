import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';


class App extends Component{

    constructor(props){
        super(props);
        this.state={
            ArtistName:''
        }
    }

    Search(){
        console.log('this state', this.state);
        const BaseUrl = 'https://api.spotify.com/v1/search?';
        const FetchUrl = `${BaseUrl}q=${this.state.ArtistName}&type=artist&limit=1`;
        console.log('fetch url',FetchUrl);
        fetch(FetchUrl,{
            method:'GET'
        })
        .then(response => console.log('response', response));
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

            
                <div className="Profile">
                    <div>Singer Picture</div>
                     <div>Singer Name</div>
            
                </div>

                <div className="Gallery">Gallery</div>
            
                
            
            </div>
        )
    }


}

export default App;