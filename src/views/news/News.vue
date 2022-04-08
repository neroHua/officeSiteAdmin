<template>
  <div id="allDiv">
    <div id="navDiv">
      <Menu :theme="theme3" active-name="1">
        <MenuGroup title="新闻管理">
        </MenuGroup>
      </Menu>
    </div>
    <div class="contentDiv">
        <Table :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>
<script>
import { newsListService } from '../../service/news/newsService.js'
export default {
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
                      onclick: function() {

                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    }
                  }, '编辑')
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
      ]
    }
  },
  mounted: function() {
    newsListService({pageSize: 10, pageNumber: 1})
      .then(successResponse => (
        this.data = successResponse.data.dataList
      ))
      .catch(failResponse => {
        console.log(failResponse)
      })
  },
  methods: {

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
