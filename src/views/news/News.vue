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
