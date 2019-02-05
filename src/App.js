import React, { Component } from 'react';
import './App.css';
const charactersData = require('./characters.json')


function Characters(props){
  function displayCharacters(title, release){

    let infoContainer = document.createElement('div')
    let infoText = document.createTextNode(`title: ${title}, release date: ${release}`)
    return infoContainer.appendChild(infoText)
  }

  function getFilmData(filmUrl){
    return fetch(filmUrl)
            .then( response => response.json() )
            .then( data => {
              let filmContainer = document.getElementById(props.name)
                    return filmContainer.appendChild(`${displayCharacters(data.title, data.release_date)}`)
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
            <div className='characterCards'>
              {props.name}
              <div>
              <button onClick={getData}>Pick Character</button>
              </div>
            </div>
            <div id={props.name} className='characterDetails'>
            </div>
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
    return charactersData.characters.map( (item , key) => {

      return <Characters key={item.name} name={item.name} url={item.url}/>
    }) 
    }

  render() {
    return (
      <div>
        {this.getCharacters()}
        <div id='test'>

        </div>
      </div>
    );
  }
}

export default App;