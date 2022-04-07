import {get, post} from '../../utils/axios.js'

export function loginService(data) {
  return post(
    '/login',
    data,
  )
}

export default {
	loginService
}
