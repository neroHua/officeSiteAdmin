<template>
  <div id="loginDiv">
    <Card style="width:300px" id="loginCard" title="欢迎登陆">
      <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="login" label-position="right">
        <FormItem prop="userId">
          <Input v-model="loginForm.userId" placeholder="请输入用户id">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button @click="login" type="primary" long>登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LoginForm',
  data () {
    return {
      loginForm: {
        userId: 1,
        password: 'abc123',
      },
    }
  },
  methods: {
    login() {
      axios
        .post('/login',
        JSON.stringify(this.loginForm),
        {
          headers:{
            'content-Type': 'application/json;charset=utf-8'
          }
        })
        .then(response => (
          this.info = response
        ))
        .catch(failResponse => {
          alert('系统繁忙')
        })

    },
  }
}
</script>
<style scoped>
#loginDiv {
  width: 100%;
  height: 100%;
  background-color: #5cadff;
}

#loginCard {
  position: absolute;
  top: 30%;
  left: 40%;
}

</style>
