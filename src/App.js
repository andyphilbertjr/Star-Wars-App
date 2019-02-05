import React, { Component } from 'react';
import './App.css';
const charactersData = require('./characters.json')


function Characters(props){
  function getData(){
    return fetch(props.url)
            .then( response => response.json() )
            .then( data => document.getElementById(props.name)
                            .innerHTML = `<div>${JSON.stringify(data.films)}</div>`)
  }

  return (
          <div>
            <div className='characterCards'>
              {props.name}
              <button onClick={getData}>Pick Character</button>
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
      </div>
    );
  }
}

export default App;