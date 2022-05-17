import {get, post} from '../../utils/axios.js'

export function newsListService(data) {
  return get(
    '/news/list',
    data,
  )
}

export function newsAddService(data) {
  return post(
    '/news',
    data,
  )
}

export default {
	newsListService
}
