import { fetchCategories } from '../services/api'

// TODO: set max line length to 100
export const LOAD_CATEGORIES_BEGIN =
  'cooksys/whos-who/Home/LOAD_CATEGORIES_BEGIN'
export const LOAD_CATEGORIES_DONE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_DONE'
export const LOAD_CATEGORIES_FAILURE =
  'cooksys/whos-who/Home/LOAD_CATEGORIES_FAILURE'
export const LOAD_CATEGORIES_UPDATE =
  'cooksys/whos-who/Home/LOAD_CATEGORIES_UPDATE'
export const SELECT_CATEGORY = 'cooksys/whos-who/Home/SELECT_CATEGORY'
export const SET_GAME_DIMENSIONS = 'cooksys/whos-who/Home/SET_GAME_DIMENSIONS'

const initialState = {
  categories: [],
  errorLoadingCategories: false,
  loadingCategories: true,
  selectedCategory: 'Random',
  songCount: 1,
  artistCount: 2
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_BEGIN:
      console.log('Loading categories...')
      return {
        ...state,
        errorLoadingCategories: false,
        loadingCategories: true,
        categories: initialState.categories
      }
    case LOAD_CATEGORIES_DONE:
      console.log('Loaded categories successfully!')
      return {
        ...state,
        errorLoadingCategories: false,
        loadingCategories: false,
        categories: action.payload
      }
    case LOAD_CATEGORIES_FAILURE:
      console.log('Failed to load categories.')
      return {
        ...state,
        errorLoadingCategories: true,
        loadingCategories: false,
        categories: initialState.categories
      }
    case SELECT_CATEGORY:
      console.log('Category ' + action.payload + ' selected.')
      return {
        ...state,
        selectedCategory: action.payload
      }
    case SET_GAME_DIMENSIONS:
      console.log(
        'Game Dimensions set to: ' +
          action.payload.songCount +
          ' song(s) and ' +
          action.payload.artistCount +
          ' artists.'
      )
      return {
        ...state,
        songCount: action.payload.songCount,
        artistCount: action.payload.artistCount
      }
    default:
      return state
  }
}

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  payload: category
})

const loadCategoriesBegin = () => ({
  type: LOAD_CATEGORIES_BEGIN
})

const loadCategoriesDone = categories => ({
  type: LOAD_CATEGORIES_DONE,
  payload: categories
})

const loadCategoriesFailure = () => ({
  type: LOAD_CATEGORIES_FAILURE
  // TODO: add error payload
})

export const loadCategories = () => dispatch => {
  dispatch(loadCategoriesBegin())
  return fetchCategories()
    .then(({ categories }) => {
      const categoryNames = categories.items.map(c => c.name)
      dispatch(loadCategoriesDone(categoryNames))
    })
    .catch(err => dispatch(loadCategoriesFailure(err)))
}

export const setGameDimensions = (songCount, artistCount) => ({
  type: SET_GAME_DIMENSIONS,
  payload: { songCount, artistCount }
})
