import React, { Component } from 'react';
import './App.css';
const charactersData = require('./characters.json')

function getCharacterInfo(url){
  return fetch(url)
        .then( response => response.json)
        .then(data => JSON.stringify(data))
}

const Characters = function(){
  return charactersData.characters.map( stars=>{
    let data = getCharacterInfo(`${stars.url}`)
    let name = data
    console.log(name)
    return (
      <div>
        {stars.name}
      </div>
    )
  })
}



class App extends Component {

  render() {
    return (
      <div>
        <Characters />
      </div>
    );
  }
}

export default App;