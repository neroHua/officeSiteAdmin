<template>
  <Drawer
    :title="titleTemp"
    v-model="showTemp"
    width="720"
    :mask-closable="true"
    :styles="styles"
  >
    <Form :model="formData">
      <Row :gutter="32">
        <Col span="12" />
          <FormItem label="Name" label-position="top">
            <Input
              v-model="formData.name"
              placeholder="please enter user name"
            />
            {{show}}
          </FormItem>
        <Col span="12" />
          <FormItem label="Url" label-position="top">
            <Input v-model="formData.url" placeholder="please enter url"/>
              <span slot="prepend">http://</span>
              <span slot="append">.com</span>
          </FormItem>
      </Row>
      <FormItem label="Description" label-position="top">
        <Input
          type="textarea"
          v-model="formData.desc"
          :rows="4"
          placeholder="please enter the description"
        />
      </FormItem>
    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="showTemp = false">Cancel</Button>
      <Button type="primary" @click=" showTemp = false">Submit</Button>
    </div>
  </Drawer>
</template>

<script>
export default {
  name: "NewsAdd",
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: '新增新闻',
    },
    showCallBack: {
      type: Function,
    },
  },
  data() {
    return {
      showTemp: true,
      titleTemp: this.title,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
        width: '300px',
      },
      formData: {
        name: "",
        url: "",
        desc: "",
      },
    };
  },
  watch: {
    show: {
      handler(newValue, oldValue) {
        this.showTemp = this.show;
      },
      immediate: true,
      deep: false,
    },
    title: {
      handler(newValue, oldValue) {
        this.titleTemp = this.title;
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
};
</script>

<style>
</style>
