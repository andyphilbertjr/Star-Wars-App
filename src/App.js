import React, { Component } from 'react';
import './App.css';
import { Typography, Grid } from '@material-ui/core';
import Characters from './Components/Characters/characters'
const charactersData = require('./characters.json')

class App extends Component {
  constructor(props){
    super(props)
    this.displayCharacterCards = this.displayCharacterCards.bind(this)
    this.characters = charactersData.characters.map( character => 
      ({name: character.name, 
        characterUrl: character.url, 
        filmUrls: []
      }))
    }
    
  displayCharacterCards(){
    return this.characters.map( person => {
      return <Characters key={person.name} 
                name={person.name} 
                url={person.characterUrl} 
                />
  })
}

  render() {
    return (
      <div>
        <Grid container justify='center'>
          <header>
            <Typography variant={"display3"}>
              Star Wars App
            </Typography>
          </header>
        </Grid>
        <Grid container justify='center'>
          {this.displayCharacterCards()}
        </Grid>

      </div>
    );
  }
}

export default App;