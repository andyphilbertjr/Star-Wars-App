import React from 'react';
import { CardActions, Card, Button, Typography, CardContent, Grid } from '@material-ui/core';

class Characters extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.checkDisplay = this.checkDisplay.bind(this)
    this.state = {
      name: props.name,
      characterUrl: props.url,
      filmUrls: [],
      filmData: [],
      onDisplay: false
    }
  }

  checkDisplay(){
    if( this.state.onDisplay === false ){
      this.setState({onDisplay: true})
      return true
    }else {
      this.setState({onDisplay: false})
      return false
    }
  }

  handleClick(callback){
    if(this.state.filmData.length < 1){
      fetch( this.state.characterUrl)
      .then( response => response.json() )
      .then( data => {
        this.setState({
          filmUrls: data.films
        })
        return data.films
      })
      .then ( filmUrls => {
        filmUrls.forEach( url => {
          fetch( url )
          .then( response => response.json() )
          .then( data => {
            data.release_date = new Date( data.release_date )
            this.setState( prevState => ({
              filmData: [...prevState.filmData, `<li>Title : ${data.title} &amp; Release Date: ${data.release_date.toDateString()}</li>`],
          }))
            return data
          })
        })
      })
      .then( () => {
          callback()
          this.checkDisplay()
      })
      .catch( () => {
        callback()
        this.checkDisplay()
      })
        }else{
          callback()
          this.checkDisplay()
        }
  }


  

render(){
  const { name , characterUrl, filmData, onDisplay } = this.state
  
  function showCharacterData(){
    let movieWrapper = document.getElementById( characterUrl )
    let filmList =  filmData.map( film => {
      return movieWrapper.insertAdjacentHTML('beforeend', film)
    })
    if(filmList.length > 0 && !onDisplay){
      let movieSubHeaderText = document.createTextNode( 'Movies List:' )
      movieWrapper.prepend( movieSubHeaderText )
      return filmList
    }else {
      if(characterUrl.includes('unknown')){
        if(onDisplay){
          return movieWrapper.innerHTML = ''
        }
        return movieWrapper.innerText = 'Sorry, We can not find movie data for this charcter.'
      }
      return movieWrapper.innerHTML = ''
    }

  }
  return (
    <Grid item lg={12} md={6} sm={3}>
      <Card>
        <CardContent >
          <Grid container justify='center'>
            <Typography variant='subtitle1'>
              {name}
            </Typography>
          </Grid>
          <Grid container justify='center'>
            <Typography id={name} component='article'>
              <ul id={characterUrl}>
              </ul>
            </Typography>
          </Grid>
          <Grid container justify='center'>
            <CardActions>
              <Button onClick={()=>this.handleClick(showCharacterData)} name={name} variant='contained' color='primary' fullWidth={true}>List Movies</Button>
            </CardActions>
          </Grid>
        </CardContent>
      </Card>
    </Grid>

    )
}
  
} 
export default Characters