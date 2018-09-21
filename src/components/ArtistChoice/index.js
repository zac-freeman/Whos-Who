import React from 'react'
import PropTypes from 'prop-types'

export const ArtistChoice = props => {
  return (
    <div>
      <span>{props.artist.name}</span>
      <img src={props.artist.image} />
      <input type='submit' value='Guess' onClick={props.handleClick} />
    </div>
  )
}

ArtistChoice.propTypes = {
  artist: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}
