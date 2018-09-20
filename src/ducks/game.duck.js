// TODO: set max line length to 100
export const LOAD_CONTENT_BEGIN = 'cooksys/whos-who/Home/LOAD_CONTENT_BEGIN'
export const LOAD_CONTENT_FAILURE = 'cooksys/whos-who/Home/LOAD_CONTENT_FAILURE'
export const LOAD_CONTENT_DONE = 'cooksys/whos-who/Home/LOAD_CONTENT_DONE'
export const LOAD_CONTENT_UPDATE = 'cooksys/whos-who/Home/LOAD_CONTENT_UPDATE'

const initialState = {
  // array of objects of form {song: artist}
  content: [],
  // array of strings
  artists: [],
  errorLoadingContent: false,
  loadingContent: true
}

export default function (state = initialState, action) {}
