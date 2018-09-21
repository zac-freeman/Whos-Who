import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 4px 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px 2px;
`

const Image = styled.img`
  display: block;
  max-width:250px;
  max-height:250px;
  width: auto;
  height: auto;
  margin: 4px 0;
`

export const ArtistChoice = props => {
  return (
    <Wrapper>
      <span>{props.artist.name}</span>
      <Image src={props.artist.image} />
      <input type='submit' value='Guess' onClick={props.handleClick} />
    </Wrapper>
  )
}

ArtistChoice.propTypes = {
  artist: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}
