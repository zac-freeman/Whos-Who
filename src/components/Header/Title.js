import React from 'react'
import PropTypes from 'prop-types'

const Title = (props) => <h4>{props.children}</h4>

Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default Title
