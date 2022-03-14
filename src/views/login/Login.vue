<template>
    <form>
        <p>
            用户名
            <input
            type="number"
            name="userId"
            v-model="loginForm.userId"
            />
        </p>
        <p>
            密码
            <input
            type="password"
            name="password"
            v-model="loginForm.password"
            />
        </p>
        <button type="button" v-on:click="login">登录</button>
    </form>
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
