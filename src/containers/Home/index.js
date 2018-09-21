import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect' // TODO: whats going on here
import { withRouter } from 'react-router'

import {
  loadCategories,
  selectCategory,
  setGameDimensions
} from '../../ducks/config.duck'
import ConfigForm from '../../components/ConfigForm'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  submit = selections => {
    this.props.setGameDimensions(selections.songCount, selections.artistCount)
    this.props.history.push('/game')
  }

  render () {
    if (this.props.loadingCategories) {
      return <span>Loading categories...</span>
    }
    if (this.props.errorLoadingCategories) {
      return <span>Error loading categories.</span>
    }

    const categories = this.props.categories.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))
    categories.unshift(
      <option key='Random' value='Random'>
        Random
      </option>
    )
    return (
      <div>
        <select
          onChange={event => this.props.selectCategory(event.target.value)}
        >
          {categories}
        </select>
        <ConfigForm onSubmit={this.submit} />
      </div>
    )
  }
}

Home.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  setGameDimensions: PropTypes.func.isRequired,
  categories: PropTypes.array,
  loadingCategories: PropTypes.bool.isRequired,
  errorLoadingCategories: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  categories: state.config.categories,
  loadingCategories: state.config.loadingCategories,
  errorLoadingCategories: state.config.errorLoadingCategories
})

const mapDispatchToProps = dispatch => ({
  loadCategories: _ => dispatch(loadCategories()),
  selectCategory: evt => dispatch(selectCategory(evt)),
  setGameDimensions: (songCount, artistCount) =>
    dispatch(setGameDimensions(songCount, artistCount))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
