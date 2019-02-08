import React from 'react';
import { CardActions, Card, Button, Typography, CardContent } from '@material-ui/core';
function Characters(props){
  let onDisplay = false
  

  function getCharacterData(){
    return props.characterInfo.forEach( character => {
      if(props.name === character.name){
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
                })
             })
          })
      }

        })
  }


  async function handleClick(){
    await getCharacterData()
    if(!onDisplay){
      onDisplay = true
      let movieWrapper = document.getElementById(props.url)
      let movieSubHeaderText = document.createTextNode('Movies List:')
      let moviesListHeader = movieWrapper.appendChild(movieSubHeaderText)
      document.getElementById(props.url).prepend(moviesListHeader)
      let filmList = props.characterInfo.find( character => {
        if(character === props.name){
          return character.filmData.map( films => {
            return `<li>Title: ${films.title} & Released On: ${films.releaseDate}</li>`
          })
        }

      })
      //console.log(filmList)
      return document.getElementById(props.url).innerHTML= filmList
    } 
    
    onDisplay = false
    //return document.getElementById(props.url).innerHTML = ''
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