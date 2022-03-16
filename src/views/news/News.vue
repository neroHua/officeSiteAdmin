<template>
  <Layout id="pageLayout">
    <Header>新闻列表页</Header>
    <Content>
      <Table :columns="columns" :data="data"></Table>
    </Content>
    <Footer>新闻列表页</Footer>
  </Layout>
</template>
<script>
import axios from 'axios'
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
  methods: {

  }
}
</script>
<style scoped>
#pageLayout{
  height: 100%;
}

</style>
