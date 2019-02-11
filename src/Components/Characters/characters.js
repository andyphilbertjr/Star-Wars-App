import React from 'react';
import { CardActions, Card, Button, Typography, CardContent } from '@material-ui/core';
function Characters(props){
  let onDisplay = false
  

  function handleClick(){
    props.characterInfo.forEach( character => {
      if(props.name === character.name){
        if(character.filmData.length <= 1){
        fetch( character.characterUrl)
        .then( response => response.json() )
        .then( data => {
          character.filmUrls.push(data.films)  
          return data.films
        }).then ( filmUrls => {
            filmUrls.forEach( url => {
              fetch( url )
                .then( response => response.json() )
                .then( data => {
                  data.release_date = new Date( data.release_date )
                  character.filmData.push({title : data.title, releaseDate: data.release_date.toDateString()})
                }).then(() => showCharacterData())
              })

          })
        } else {
          showCharacterData()
        }
      }
    })

  }


async function showCharacterData(){
    let characterData = props.characterInfo.find( character => {
      if(character.name === props.name){
        return character
      }
    })
    let movieWrapper = document.getElementById(props.url)
    let movieSubHeaderText = document.createTextNode('Movies List:')
    let moviesListHeader = movieWrapper.appendChild(movieSubHeaderText)
    let characterFilms = characterData.filmData;
    console.log(characterFilms);

    if(characterData && !onDisplay){
      onDisplay = true
      document.getElementById(props.url).prepend(moviesListHeader)
      console.log(onDisplay)
      characterFilms.forEach(film => {
        let filmContainer = document.createElement('li')
        let filmText = document.createTextNode(`${film.title}`)
        document.getElementById(props.url).appendChild(filmContainer)
        filmContainer.appendChild(filmText)
      } )
    }else{
      onDisplay = false
      console.log(onDisplay)
      document.getElementById(props.url).innerHTML = ''
    }

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
                  <div onClick={handleClick}  value={props.name}>
                  <Button component='button' variant='contained' color='primary'>List Movies</Button>
                  </div>
                </CardActions>
              </CardContent>
            </Card>
          </div>

          )
} 
export default Characters