import React from 'react';
import { CardActions, Card, Button, Typography, CardContent } from '@material-ui/core';
function Characters(props){
  let onDisplay = false
  
  function handleClick(){
    console.log()
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
export default Characters