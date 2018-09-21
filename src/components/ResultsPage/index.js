import React from 'react'
import PropTypes from 'prop-types'

export const ResultsPage = props => {
  let message = 'YOU DID NOT WIN!'
  if (props.results) {
    message = 'YOU WIN!'
  }
  return (
    <div>
      <h1>{message}</h1>
      <button type='submit' onClick={props.handleClick}>
        Play Again?
      </button>
    </div>
  )
}

ResultsPage.propTypes = {
  results: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
