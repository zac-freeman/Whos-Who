import { fetchArtists, fetchSongsByArtist } from '../services/api'

// TODO: set max line length to 100
export const LOAD_CONTENT_BEGIN = 'cooksys/whos-who/Home/LOAD_CONTENT_BEGIN'
export const LOAD_CONTENT_DONE = 'cooksys/whos-who/Home/LOAD_CONTENT_DONE'
export const LOAD_CONTENT_FAILURE = 'cooksys/whos-who/Home/LOAD_CONTENT_FAILURE'
export const LOAD_CONTENT_UPDATE = 'cooksys/whos-who/Home/LOAD_CONTENT_UPDATE'
export const SELECT_ARTIST = 'cooksys/whos-who/Home/SELECT_ARTIST'
export const RESET_STATE = 'cooksys/whos-who/Home/RESET_STATE'

const initialState = {
  songs: [],
  artists: [],
  selectedArtist: '',
  correctArtist: '',
  errorLoadingContent: false,
  loadingContent: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTENT_BEGIN:
      console.log(`Loading content from ${action.payload}...`)
      return {
        ...state,
        errorLoadingContent: false,
        loadingContent: true
      }
    case LOAD_CONTENT_DONE:
      console.log('Loaded content successfully!')
      return {
        ...state,
        errorLoadingContent: false,
        loadingContent: false,
        songs: action.payload.songs,
        correctArtist: action.payload.correctArtist,
        artists: action.payload.artists
      }
    case LOAD_CONTENT_FAILURE:
      console.log('Failed to load content.')
      return {
        ...state,
        errorLoadingContent: true,
        loadingContent: false
      }
    case SELECT_ARTIST:
      console.log(action.payload + ' selected.')
      return {
        ...state,
        selectedArtist: action.payload
      }
    case RESET_STATE:
      return {
        ...initialState
      }
    default:
      return state
  }
}

const loadContentBegin = category => ({
  type: LOAD_CONTENT_BEGIN,
  payload: category
})

const loadContentDone = (songs, correctArtist, artists) => ({
  type: LOAD_CONTENT_DONE,
  payload: { songs, correctArtist, artists }
})

const loadContentFailure = () => ({
  type: LOAD_CONTENT_FAILURE
  // TODO: add error payload
})

export const selectArtist = selectedArtist => ({
  type: SELECT_ARTIST,
  payload: selectedArtist
})

export const resetState = () => ({
  type: RESET_STATE
})

export const loadContent = (category, songCount, artistCount) => dispatch => {
  dispatch(loadContentBegin(category))
  return fetchArtists(category)
    .then(response => {
      const artists = response.artists.items
      const artistIndices = generateIndices(artistCount, artists.length)

      return artists.reduce((acc, artist, index) => {
        if (artistIndices.includes(index)) {
          return [...acc, artist]
        }
        return [...acc]
      }, [])
    })
    .then(artists => {
      const correctArtist = artists[Math.floor(Math.random() * artistCount)]
      return fetchSongsByArtist(correctArtist.id).then(songs => [
        songs.tracks,
        correctArtist,
        artists
      ])
    })
    .then(([songs, correctArtist, artists]) => {
      const previews = songs
        .map(song => song.preview_url)
        .filter(url => url != null)
      const previewIndices = generateIndices(songCount, previews.length)

      dispatch(
        loadContentDone(
          previews.reduce((acc, preview, index) => {
            if (previewIndices.includes(index)) {
              return [...acc, preview]
            }
            return [...acc]
          }, []),
          correctArtist.name,
          artists.map(artist => artist.name)
        )
      )
    })
    .catch(err => dispatch(loadContentFailure(err)))
}

const generateIndices = (count, max) => {
  let indices = []
  if (count >= max || max === 0) {
    while (indices.length < max) {
      indices.push(indices.length)
    }
  } else {
    while (indices.length < count) {
      let randomIndex = Math.floor(Math.random() * max)
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex)
      }
    }
  }
  return indices
}
