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
        <FormItem label="标题" label-position="top">
          <Input
            v-model="formData.title"
            placeholder="请输入标题"
          />
        </FormItem>
      </Row>
      <Row>
        <div class="upload">
          <template v-if="formData.cover">
            <img :src="formData.cover">
            <div class="cover">
              <Icon type="ios-trash-outline" @click.native="handleRemoveCover"></Icon>
            </div>
          </template>
          <template v-else>
            <Upload
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :before-upload="handleBeforeUploadCover"
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20">请上传封面</Icon>
              </div>
            </Upload>
          </template>
        </div>
      </Row>
      <Row>
        <div class="editor-wrapper">
          <div id="editorId"></div>
        </div>
      </Row>
      <Row>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="showTemp = false">取消</Button>
          <Button type="primary" @click="handlerSubmit">提交</Button>
        </div>
      </Row>
    </Form>
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
        // cover: 'http://localhost:8082/image/1652839558262chrome_WAaurZyh81.png',
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
    this.editor.config.customUploadImg = function (files, insert) {
      let formData = new FormData()
      formData.append('file', files[0])
      uploadImageService(formData)
        .then(successResponse => {
          insert(successResponse.data.data)
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    };

    this.editor.create();
  },
  methods: {
    handleBeforeUploadCover: function (cover) {
      this.formData.coverFile = cover;
      let formData = new FormData();
      formData.append("file", cover);
      uploadImageService(formData)
        .then((successResponse) => {
          this.formData.cover = successResponse.data.data;
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
      return false;
    },
    handleRemoveCover: function () {
      this.formData.cover = null;
    },
    handlerSubmit: function () {
      this.formData.body = this.editor.txt.html();
      this.newsAddSubmit(this.formData);
    },
  },
};
</script>

<style>
.ivu-drawer-body {
  width: 900px;
}
.upload {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.upload img {
  width: 100%;
  height: 100%;
}
.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.upload:hover .cover {
  display: block;
}
.cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
