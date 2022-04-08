import {get, post} from '../../utils/axios.js'

export function newsListService(data) {
  return get(
    '/news/list',
    data,
  )
}

export default {
	newsListService
}
