import React, { Component } from 'react';
import './App.css';
import { CardActions, Card, Button, Typography, CardContent } from '@material-ui/core';
const charactersData = require('./characters.json')


function Characters(props){
  let onDisplay = false
  function handleClick(){

    if(!onDisplay){
      onDisplay = true
      let movieWrapper = document.getElementById(props.url)
      let movieSubHeaderText = document.createTextNode('Movies List:')
      let moviesListHeader = movieWrapper.appendChild(movieSubHeaderText)
      document.getElementById(props.url).prepend(moviesListHeader)

      return props.films.forEach( film => {
        movieWrapper.insertAdjacentHTML('beforeend',
        `<li>Title: ${film.title} & Released On: ${film.releaseDate}</li>
        `)
      })
    } 
    onDisplay = false

    return document.getElementById(props.url).innerHTML = ''
  }

  return (
          <div>
            <Card>
              <CardContent>
                <Typography variant='display2'>
                  {props.name}
                </Typography>
                <Typography id={props.name} component='article'>
                  <ul id={props.url}>

                  </ul>
                </Typography>
                <CardActions>
                  <Button variant='contained' color='primary' onClick={handleClick}>List Movies</Button>
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