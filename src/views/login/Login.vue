<template>
  <div id="loginDiv">
    <Card style="width:300px" id="loginCard" title="欢迎登陆">
      <Form :model="loginForm" :rules="rules" @keydown.enter.native="login" label-position="right">
        <FormItem prop="userId">
          <Input v-model="loginForm.userId" placeholder="请输入用户id"/>
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
        </FormItem>
        <FormItem>
          <Button @click="login" type="primary" long>登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { loginService } from '../../service/login/login.js'
export default {
  name: 'LoginForm',
  data: () => ({
    loginForm: {
      userId: 1,
      password: 'abc123',
    },
  }),
  computed: {
    rules () {
      return {
        userId: {
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
      }
    },
  },
  methods: {
    login() {
      loginService(this.loginForm)
        .then(successResponse => (
          this.$router.push('/news')
        ))
        .catch(failResponse => {
          console.log(failResponse)
        })
    },
  },
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
