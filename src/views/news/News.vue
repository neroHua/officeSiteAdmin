<template>
  <div id="allDiv">
    <div id="navDiv">
      <Menu active-name="1">
        <MenuGroup title="新闻管理">
        </MenuGroup>
      </Menu>
    </div>
    <div class="contentDiv">
        <Button type="primary" @click="addNews">新增新闻</Button>
        <Table :columns="columns" :data="data"></Table>
        <NewsAdd></NewsAdd>
    </div>
  </div>

</template>
<script>
import { newsListService } from '../../service/news/newsService.js'
import NewsAdd from "@/views/news/components/NewsAdd"
export default {
  components: {
    NewsAdd ,
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
      ],
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
    addNews: function() {
    }
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
