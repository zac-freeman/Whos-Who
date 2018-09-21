import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect' // TODO: whats going on here
import ReactAudioPlayer from 'react-audio-player'
import { withRouter } from 'react-router'

import { loadContent, selectArtist, resetState } from '../../ducks/game.duck'

class Game extends React.Component {
  componentDidMount () {
    let category = this.props.selectedCategory
    if (category === 'Random') {
      let index =
        1 + Math.floor(Math.random() * (this.props.categories.length - 1))
      category = this.props.categories[index]
    }
    this.props.loadContent(
      category,
      this.props.songCount,
      this.props.artistCount
    )
  }

  reset = () => {
    this.props.history.goBack()
    this.props.resetState()
  }

  render () {
    if (this.props.loadingContent) {
      return <span>Loading content...</span>
    }
    if (this.props.errorLoadingContent) {
      return (
        <div>
          <span>Error loading content.</span>
          <button type='submit' onClick={_ => this.reset()}>
            Configure New Game
          </button>
        </div>
      )
    }

    if (
      this.props.selectedArtist === this.props.correctArtist &&
      this.props.selectedArtist !== ''
    ) {
      return (
        <div>
          <h1>YOU WIN!</h1>
          <button type='submit' onClick={_ => this.reset()}>
            Play Again?
          </button>
        </div>
      )
    }
    if (
      this.props.selectedArtist !== this.props.correctArtist &&
      this.props.selectedArtist !== ''
    ) {
      return (
        <div>
          <h1>YOU DID NOT WIN!</h1>
          <button type='submit' onClick={_ => this.reset()}>
            Try Again?
          </button>
        </div>
      )
    }

    const songs = this.props.songs.map(song => (
      <ReactAudioPlayer key={song} src={song} autoPlay={false} controls />
    ))

    const artists = this.props.artists.map(artist => (
      <option key={artist} value={artist}>
        {artist}
      </option>
    ))

    artists.unshift(
      <option key='Artist' value='Artist'>
        Artist
      </option>
    )

    const choices = (
      <select onChange={event => this.props.selectArtist(event.target.value)}>
        {artists}
      </select>
    )

    return (
      <div>
        {songs}
        {choices}
      </div>
    )
  }
}

Game.propTypes = {
  loadContent: PropTypes.func.isRequired,
  selectArtist: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  selectedArtist: PropTypes.string.isRequired,
  correctArtist: PropTypes.string.isRequired,
  songs: PropTypes.array.isRequired,
  artists: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  songCount: PropTypes.string.isRequired,
  artistCount: PropTypes.string.isRequired,
  loadingContent: PropTypes.bool.isRequired,
  errorLoadingContent: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  selectedArtist: state.game.selectedArtist,
  correctArtist: state.game.correctArtist,
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
    dispatch(loadContent(category, songCount, artistCount)),
  selectArtist: selectedArtist => dispatch(selectArtist(selectedArtist)),
  resetState: _ => dispatch(resetState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game))
