<template>
  <Layout style="height: 100%" class="frame">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
        </header-bar>
      </Header>
      <Content class="frame-content-con">
        <Layout class="frame-layout-con">
          <Content class="content-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import minLogo from '../../static/images/logo-min.jpg'
import maxLogo from '../../static/images/logo.jpg'
import './frame.less'
export default {
  name: 'Frame',
  components: {
    SideMenu,
    HeaderBar,
    User,
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    menuList () {
      return this.$store.getters.menuList
    },
  },
  methods: {
    turnToPage (route) {
      console.log(route);
      this.$router.push(route)
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
  }
}
</script>
