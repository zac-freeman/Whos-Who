import toPairs from 'lodash/toPairs'

import request from '../utils/request'
import { getAccessTokenFromLocalStorage } from './auth'

const SPOTIFY_ROOT = 'https://api.spotify.com/v1'

export function fetchCategories () {
  return fetchFromSpotify({
    endpoint: 'browse/categories',
    params: {
      limit: '30'
    }
  })
}

export function fetchArtists (category) {
  return fetchFromSpotify({
    endpoint: 'search',
    params: {
      q: `genre:${category}`,
      type: 'artist',
      limit: '30'
    }
  })
}

export function fetchSongsByArtist (id) {
  return fetchFromSpotify({
    endpoint: `artists/${id}/top-tracks?country=US`
  })
}

export function fetchFromSpotify ({ endpoint, params }) {
  const spotifyToken = getAccessTokenFromLocalStorage()
  let url = [SPOTIFY_ROOT, endpoint].join('/')

  if (params) {
    const paramString = toPairs(params).map(param => param.join('=')).join('&')
    url += `?${paramString}`
  }

  const options = { headers: { Authorization: `Bearer ${spotifyToken}` } }
  return request(url, options)
}
