<template>
  <div id="allDiv">
    <div id="navDiv">
      <Menu active-name="1">
        <MenuGroup title="新闻管理">
        </MenuGroup>
      </Menu>
    </div>
    <div class="contentDiv">
        <Button type="primary" @click="openNewsAdd">新增新闻</Button>
        <Table :columns="columns" :data="data"></Table>
        <NewsAdd :show="newsAddProps.show" :showCallBack="newsAddShowCallBack" :newsAddSubmit="newsAddSubmit"></NewsAdd>
        <NewsUpdate :show="newsUpdateProps.show" :newsUpdateData="newsUpdateProps.data" :showCallBack="newsUpdateShowCallBack" :newsUpdateSubmit="newsUpdateSubmit"></NewsUpdate>
    </div>
  </div>
</template>
<script>
import { newsListService, newsAddService, newsUpdateService } from '../../service/news/newsService.js'
import NewsAdd from "@/views/news/components/NewsAdd"
import NewsUpdate from "@/views/news/components/NewsUpdate"
export default {
  components: {
    NewsAdd,
    NewsUpdate,
  },
  data () {
    return {
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '创建用户',
          key: 'createUserId'
        },
        {
          title: '封面',
          key: 'cover'
        },
        {
          title: '操作',
          width: 120,
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                    },
                    on: {
                      click: () => {
                        this.openNewsUpdate(params.row);
                      },
                    }
                  }, '编辑'),
              ]);
          }
        },
      ],
      data: [
        {
          id: 1,
          title: '新闻１',
          createUserId: 1,
          cover: 'd://image'
        },
      ],
      newsAddProps: {
        show: false,
      },
      newsUpdateProps: {
        show: false,
        data: null,
      },
    }
  },
  mounted: function() {
    newsListService({pageSize: 10, pageNumber: 1})
      .then(successResponse => {
        this.data = successResponse.data.data.dataList
      })
      .catch(failResponse => {
        console.log(failResponse)
      })
  },
  methods: {
    openNewsAdd: function() {
      this.newsAddProps.show = true
    },
    newsAddShowCallBack: function(childShow) {
      this.newsAddProps.show = childShow
    },
    newsAddSubmit: function(formData) {
      newsAddService(formData)
      .then(successResponse => {
        this.$Message.info('新增新闻成功')
        this.newsAddProps.show = false
      })
      .catch(failResponse => {
        console.log(failResponse)
      })

      newsListService({pageSize: 10, pageNumber: 1})
      .then(successResponse => {
        console.log(successResponse)
        this.data = successResponse.data.data.dataList
      })
      .catch(failResponse => {
        console.log(failResponse)
      })
    },
    openNewsUpdate: function(params) {
      this.newsUpdateProps.show = true
      this.newsUpdateProps.data = params 
    },
    newsUpdateShowCallBack: function(childShow) {
      this.newsUpdateProps.show = childShow
    },
    newsUpdateSubmit: function(formData) {
      newsUpdateService(formData)
      .then(successResponse => {
        this.$Message.info('修改新闻成功')
        this.newsUpdateProps.show = false
      })
      .catch(failResponse => {
        console.log(failResponse)
      })

      newsListService({pageSize: 10, pageNumber: 1})
      .then(successResponse => {
        console.log(successResponse)
        this.data = successResponse.data.data.dataList
      })
      .catch(failResponse => {
        console.log(failResponse)
      })
    },
  },
}
</script>
<style scoped>
#allDiv{
  height: 100%;
}

#navDiv{
  float: left;
  width: 240px;
}

.contentDiv{
  margin-left: 240px;
}
</style>
