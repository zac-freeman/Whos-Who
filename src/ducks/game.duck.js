import { fetchArtists, fetchSongsByArtist } from '../services/api'

// TODO: set max line length to 100
export const LOAD_CONTENT_BEGIN = 'cooksys/whos-who/Home/LOAD_CONTENT_BEGIN'
export const LOAD_CONTENT_DONE = 'cooksys/whos-who/Home/LOAD_CONTENT_DONE'
export const LOAD_CONTENT_FAILURE = 'cooksys/whos-who/Home/LOAD_CONTENT_FAILURE'
export const LOAD_CONTENT_UPDATE = 'cooksys/whos-who/Home/LOAD_CONTENT_UPDATE'

const initialState = {
  // array of strings of song names
  songs: [],
  // array of strings of artist names
  artists: [],
  correctArtist: '',
  errorLoadingContent: false,
  loadingContent: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTENT_BEGIN:
      console.log('Loading content...')
      return {
        ...state,
        errorLoadingContent: false,
        loadingContent: true,
        songs: initialState.songs,
        correctArtist: initialState.correctArtist,
        artists: initialState.artists
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
        loadingContent: false,
        songs: initialState.songs,
        correctArtist: initialState.correctState,
        artists: initialState.artists
      }
    default:
      return state
  }
}

const loadContentBegin = () => ({
  type: LOAD_CONTENT_BEGIN
})

const loadContentDone = (songs, correctArtist, artists) => ({
  type: LOAD_CONTENT_DONE,
  payload: { songs, correctArtist, artists }
})

const loadContentFailure = () => ({
  type: LOAD_CONTENT_FAILURE
  // TODO: add error payload
})

export const loadContent = (category, songCount, artistCount) => dispatch => {
  dispatch(loadContentBegin())
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
      const songIndices = generateIndices(songCount, songs.length)

      dispatch(
        loadContentDone(
          songs
            .reduce((acc, song, index) => {
              if (songIndices.includes(index)) {
                return [...acc, song]
              }
              return [...acc]
            }, [])
            .map(song => song.name),
          correctArtist.name,
          artists.map(artist => artist.name)
        )
      )
    })
    .catch(err => dispatch(loadContentFailure(err)))
}

const generateIndices = (count, max) => {
  let indices = []
  if (count >= max) {
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
