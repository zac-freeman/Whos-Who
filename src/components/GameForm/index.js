import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm } from 'redux-form'

let GameForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='songCount'>Number of songs</label>
        <Field
          name='songCount'
          component='input'
          type='number'
          min='2'
          max='4'
        />
      </div>
      <div>
        <label htmlFor='artistCount'>Number of artists</label>
        <Field
          name='artistCount'
          component='input'
          type='number'
          min='1'
          max='3'
        />
      </div>
      <button type='submit'>Generate</button>
    </form>
  )
}

GameForm = reduxForm({
  form: 'game',
  initialValues: {
    songCount: '2',
    artistCount: '1'
  }
})(GameForm)

GameForm.propTypes = {
  handleSubmit: PropTypes.func // TODO: fix this
}

export default GameForm
