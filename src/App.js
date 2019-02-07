import React, { Component } from 'react';
import './App.css';
import { CardActions, Card, Button, Typography, CardContent } from '@material-ui/core';
const charactersData = require('./characters.json')


function Characters(props){
  function handleClick(){
    props.films.forEach( film => {
      document.getElementById(props.name).insertAdjacentText('beforeend', `Title: ${film.title} , Release Date: ${film.releaseDate}`)
    })
  }

  return (
          <div>
            <Card>
              <CardContent>
                <Typography variant='display2'>
                  {props.name}
                </Typography>
                <Typography id={props.name} variant='display1'>
                  Test
                </Typography>
                <CardActions>
                  <Button variant='contained' color='primary' onClick={handleClick}>Pick Character</Button>
                </CardActions>
              </CardContent>
            </Card>

          </div>

          )
} 



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

  // displayFilmInfo(e){
  //   let filmsWrapper = document.createElement('ul')
  //   document.getElementById(this.characters.name).insertAdjacentHTML('beforeend', 
  //   `<li>
  //     ${this.characters.forEach( film => {
  //       `Title: ${film}`
  //     })}
  //   </li>`)
  // }

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

          )
      )
  }
  

  displayCharacterCards(){
    return this.characters.map( person => {
      return <Characters key={person.name} 
                name={person.name} 
                url={person.characterUrl} 
                characterInfo={this.displayFilmInfo} 
                films={person.filmData}/>
  })
}

  render() {
    this.getCharacterData()
    return (
      <div>
        <header>
          <Typography variant={"display4"}>
            Star Wars App
          </Typography>
        </header>
        {this.displayCharacterCards()}
      </div>
    );
  }
}

export default App;