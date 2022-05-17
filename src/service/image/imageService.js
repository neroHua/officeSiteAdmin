import {upload} from '../../utils/axios.js'

export function uploadImageService(data) {
  return upload(
    '/image/upload',
    data,
  )
}

export default {
  uploadImageService,
}
