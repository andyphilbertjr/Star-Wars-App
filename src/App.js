import React, { Component } from 'react';
import './App.css';
import { CardActions, Card, Button, Typography } from '@material-ui/core';
const charactersData = require('./characters.json')


function Characters(props){
  function displayCharacters(title, release){
      release = new Date(release)
      let infoContainer = document.createElement('div')
      let infoText = document.createTextNode(`Title: ${title}, Release Date: ${release.toDateString()}`)
      infoText.nodeValue.replace(',', '<br />')
      return infoContainer.appendChild(infoText)
    }

  function getFilmData(filmUrl){
      return fetch(filmUrl)
              .then( response => response.json() )
              .then( data => {
                let filmContainer = document.getElementById(props.name)
                let characterInfo = displayCharacters(data.title,data.release_date)
                      return filmContainer.insertAdjacentHTML('beforeend',  `<div>${characterInfo.nodeValue}</div>`)
              })
    }

    function getData(){
      return fetch(props.url)
              .then( response => response.json() )
              .then( data => {
                data.films.forEach( film => getFilmData(film) )
              }) 
    }

  return (
          <div>
            <Card>
              <Typography variant='display2'>
                {props.name}
              </Typography>
              <div id={props.name} className='characterDetails'>
              </div>
              <CardActions>
                <Button variant='contained' color='primary' onClick={getData}>Pick Character</Button>
              </CardActions>
            </Card>

          </div>

          )
} 



class App extends Component {
  constructor(props){
    super(props)
    this.getCharacters = this.getCharacters.bind(this)
   // this.getData = this.getData.bind(this)
  }
  
  getCharacters(){
    return charactersData.characters.map( item => {
      return <Characters key={item.name} name={item.name} url={item.url}/>
    }) 
    }

  render() {
    return (
      <div>
        <header>
          <Typography variant={"display4"}>
            Star Wars App
          </Typography>
        </header>
        {this.getCharacters()}
      </div>
    );
  }
}

export default App;