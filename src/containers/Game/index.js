import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect' // TODO: whats going on here

class Game extends React.Component {
  render () {
    return <div>Game</div>
  }
}

export default connect()(Game)
