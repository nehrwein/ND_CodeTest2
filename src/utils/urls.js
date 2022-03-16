const BASE_URL = 'https://rebrickable.com/api/v3/lego'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'key cef91563c41612c871ed256c1a22e628'
  }
}