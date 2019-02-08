import React, { Component } from 'react';
import './App.css';
import { Typography } from '@material-ui/core';
import Characters from './Components/Characters/characters'
const charactersData = require('./characters.json')

class App extends Component {
  constructor(props){
    super(props)
    this.displayCharacterCards = this.displayCharacterCards.bind(this)
    this.getCharacterData = this.getCharacterData.bind(this)
    this.characters = charactersData.characters.map( character => 
      ({name: character.name, 
        characterUrl: character.url, 
        filmUrls: '',
        filmData: []
      }))
  }

  getCharacterData(){
    this.characters.forEach( character => 
      fetch( character.characterUrl )
        .then( response => response.json() )
        .then( data => 
          character.filmUrls = data.films  
          ).then ( filmUrls => 
            filmUrls.forEach( url => {
              fetch( url )
                .then( response => response.json() )
                .then( data => {
                  data.release_date = new Date( data.release_date )
                    character.filmData.push({title : data.title, releaseDate: data.release_date.toDateString()})
                })
            })

          ).catch(error => console.log('Movie List Unavailable')
          )
      )
  }
  
  displayCharacterCards(){
    return this.characters.map( person => {
      return <Characters key={person.name} 
                name={person.name} 
                url={person.characterUrl} 
                films={person.filmData}/>
  })
}

  render() {
    this.getCharacterData()
    return (
      <div>
        <header>
          <Typography variant={"display3"}>
            Star Wars App
          </Typography>
        </header>
        {this.displayCharacterCards()}
      </div>
    );
  }
}

export default App;