import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

let ArtistSelectForm = props => {
  const { handleSubmit } = props

  const artists = props.artists.map(artist => (
    <label key={artist}>
      <Field name='artists' component='input' type='radio' />
      {artist}
    </label>
  ))

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {artists}
      </div>
      <button type='submit'>Guess</button>
    </form>
  )
}

ArtistSelectForm = reduxForm({
  form: 'artistSelect'
})(ArtistSelectForm)

ArtistSelectForm.propTypes = {
  handleSubmit: PropTypes.func, // TODO: fix this; handleSubmit is undefined in ConfigForm
  artists: PropTypes.array.isRequired
}

export default ArtistSelectForm
