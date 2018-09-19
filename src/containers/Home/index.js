import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import { loadCategories, selectCategory } from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  render () {
    const categories = this.props.categories.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))

    if (this.props.loadingCategories) {
      return <span>Loading categories...</span>
    }
    if (this.props.errorLoadingCategories) {
      return <span>Error loading categories</span>
    }

    return (
      <div>
        <select
          onChange={event => this.props.selectCategory(event.target.value)}
        >
          {categories}
        </select>
      </div>
    )
  }
}

Home.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
  loadingCategories: PropTypes.bool.isRequired,
  errorLoadingCategories: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  categories: state.config.categories,
  loadingCategories: state.config.loadingCategories,
  errorLoadingCategories: state.config.errorLoadingCategories
})

const mapDispatchToProps = dispatch => ({
  loadCategories: _ => dispatch(loadCategories()),
  selectCategory: evt => dispatch(selectCategory(evt))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
