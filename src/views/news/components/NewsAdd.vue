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
          <Upload :before-upload="handleUploadCover" action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">请上传封面</Button>
          </Upload>
      </Row>
    </Form>
      <div class="editor-wrapper">
        <div id="editorId"></div>
      </div>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="showTemp = false">Cancel</Button>
      <Button type="primary" @click=" showTemp = false">Submit</Button>
    </div>
  </Drawer>
</template>

<script>
import Editor from 'wangeditor'
// import 'wangeditor/release/wangEditor.min.css'
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
        title: '', 
        cover: '',
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
    // this.editor.customConfig.onchangeTimeout = 200
    this.editor.create()
    let html = this.value || localStorage.editorCache
    if (html) this.editor.txt.html(html)
  },
  methods: {
    handleUploadCover: function(cover) {
      this.formData.cover = cover
      return false;
    },
  }
};
</script>

<style>
.ivu-drawer-body {
  width: 900px;
}

</style>
