import {
  getMenuByFrameConfig,
} from '@/frame/util'
import { frameConfig } from '@/frame/frameConfig'

export default {
  state: {
    breadCrumbList: [],
  },
  getters: {
    menuList: (state) => getMenuByFrameConfig(frameConfig, '/'),
  },
}
