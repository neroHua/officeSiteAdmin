import CommonIcon from '@/frame/components/common-icon'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      console.log('title', item)
      return item.name 
    },
    showChildren (item) {
      console.log('child', item)
      return item.children && item.children.length > 1
    },
    getNameOrHref (item) {
      console.log('NameOrHref', item)
      return item.href
    }
  }
}
