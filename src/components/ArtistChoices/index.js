import React from 'react'
import PropTypes from 'prop-types'

export const ArtistChoices = props => {
  const artists = props.artists.map(artist => (
    <option key={artist} value={artist}>
      {artist}
    </option>
  ))

  artists.unshift(
    <option key='Artist' value='Artist'>
      Artist
    </option>
  )

  return (
    <select onChange={props.handleChange}>
      {artists}
    </select>
  )
}

ArtistChoices.propTypes = {
  artists: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}
