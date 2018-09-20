import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect' // TODO: whats going on here

import { loadContent } from '../../ducks/game.duck'

class Game extends React.Component {
  componentDidMount () {
    let category = this.props.selectedCategory
    if (category === 'Random') {
      let index = 1 + Math.floor(Math.random() * this.props.categories.length)
      category = this.props.categories[index]
    }
    this.props.loadContent(
      category,
      this.props.songCount,
      this.props.artistCount
    )
  }

  render () {
    if (this.props.loadingContent) {
      return <span>Loading content...</span>
    }
    if (this.props.errorLoadingContent) {
      return <span>Error loading content.</span>
    }

    const songs = this.props.songs.map(song => (
      <span key={song}>
        {song}
      </span>
    ))
    const artists = this.props.artists.map(artist => (
      <span key={artist}>{artist}</span>
    ))
    return (
      <div>
        <div>{songs}</div>
        <div>{artists}</div>
      </div>
    )
  }
}

Game.propTypes = {
  loadContent: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  artists: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  songCount: PropTypes.number.isRequired,
  artistCount: PropTypes.number.isRequired,
  loadingContent: PropTypes.bool.isRequired,
  errorLoadingContent: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  songs: state.game.songs,
  artists: state.game.artists,
  loadingContent: state.game.loadingContent,
  errorLoadingContent: state.game.errorLoadingContent,

  categories: state.config.categories,
  selectedCategory: state.config.selectedCategory,
  songCount: state.config.songCount,
  artistCount: state.config.artistCount
})

const mapDispatchToProps = dispatch => ({
  loadContent: (category, songCount, artistCount) =>
    dispatch(loadContent(category, songCount, artistCount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
