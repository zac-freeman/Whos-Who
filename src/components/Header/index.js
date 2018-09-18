import React from 'react'

import Nav from './Nav'
import Title from './Title'

// Used css in js for simplicity of boilerplate
const headerStyles = {
  display: 'flex',
  flexDirection: 'row'
}

const Header = (props) =>
  <header style={headerStyles}>
    <Title>Title goes here</Title>
    <Nav />
  </header>

export default Header
