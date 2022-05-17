<template>
  <Drawer
    :title="titleTemp"
    v-model="showTemp"
    width="80%"
    :mask-closable="true"
    :styles="styles"
  >
    <Form :model="formData">
      <Row :gutter="32">
        <Col span="12" />
          <FormItem label="标题" label-position="top">
            <Input
              v-model="formData.title"
              placeholder="请输入标题"
            />
          </FormItem>
        <Col span="12" />
          <Upload :before-upload="handleBeforeUploadCover" action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline" v-if="!formData.cover">请上传封面</Button>
            <img :src="formData.cover" v-if="formData.cover">
          </Upload>
      </Row>
    </Form>
      <div class="editor-wrapper">
        <div id="editorId"></div>
      </div>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="showTemp = false">Cancel</Button>
      <Button type="primary" @click="handlerSubmit">Submit</Button>
    </div>
  </Drawer>
</template>

<script>
import Editor from 'wangeditor'
import { uploadImageService } from '../../../service/image/imageService.js'
export default {
  name: "NewsAdd",
  props: {
    show: {
      required: true,
      default: false,
    },
    title: {
      required: false,
      default: '新增新闻',
    },
    showCallBack: {
    },
    newsAddSubmit: {

    },
  },
  data() {
    return {
      showTemp: true,
      titleTemp: this.title,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static',
        width: '100%',
      },
      formData: {
        title: '测试标题1', 
        cover: null,
        body: '',
      },
    };
  },
  watch: {
    show: {
      handler(newValue, oldValue) {
        this.showTemp = newValue;
      },
      immediate: true,
      deep: false,
    },
    title: {
      handler(newValue, oldValue) {
        this.titleTemp = this.newValue;
      },
      immediate: true,
      deep: false,
    },
    showTemp: {
      handler(newValue, oldValue) {
        this.showCallBack(newValue)
      },
      immediate: true,
      deep: false,
    },
  },
  mounted() {
    this.editor = new Editor(`#editorId`)
    this.editor.create()
    let html = this.value || localStorage.editorCache
    if (html) this.editor.txt.html(html)
  },
  methods: {
    handleBeforeUploadCover: function(cover) {
      this.formData.coverFile = cover
      let formData = new FormData()
      formData.append('file', cover)
      uploadImageService(formData)
        .then(successResponse => {
          this.formData.cover=successResponse.data.data
        })
        .catch(failResponse => {
          console.log(failResponse)
        })
      return false;
    },
    handlerSubmit: function() {
      this.newsAddSubmit(this.formData)
    },
  }
};
</script>

<style>
.ivu-drawer-body {
  width: 900px;
}
</style>
