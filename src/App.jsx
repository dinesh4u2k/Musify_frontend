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
        let accesstoken = 'BQCIGrEerWhUK5XjhWnIys5crQZOvEEM3fggOO9bdoUPmoP4G8TMttBMoiXc-ykCMCEyKf4TsqMwWGrM0F1h2LNv2iM14AY-gxjRVb70QxidT92uD6kq3FXwbtjsnk_SiE2UIFc6StvrcbJ1oUhjP1g1zRk0O3hNKNk15ziTIbYOtjQXEwhlCeeg'
        console.log('fetch url',FetchUrl);
        fetch(FetchUrl,{
            method:'GET',
            headers:{
                'Authorization' : 'Bearer' + accesstoken
            },
            mode: 'cors',
            cache:'default'
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