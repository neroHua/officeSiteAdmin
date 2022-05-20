import {get, post, put} from '../../utils/axios.js'

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

export function newsUpdateService(data) {
  return put(
    '/news',
    data,
  )
}

export function newsDetailService(data) {
  return get(
    '/news/detail/' + data,
  )
}

export default {
	newsListService,
  newsAddService,
  newsUpdateService,
  newsDetailService,
}
