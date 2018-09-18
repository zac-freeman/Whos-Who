import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore (initialState = {}, history) {
  const middlewares = [routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middlewares)]

  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })

  return createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )
}
