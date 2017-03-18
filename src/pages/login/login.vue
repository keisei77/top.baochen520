<template>
  <div class="login">
    <div class="login-form">
      <md-input-container>
        <md-icon>face</md-icon>
        <label>用户名</label>
        <md-input v-model="username"></md-input>
      </md-input-container>
      <md-input-container md-has-password>
        <md-icon>security</md-icon>
        <label>密码</label>
        <md-input type="password" v-model="password"></md-input>
      </md-input-container>
    </div>
    <div class="operations">
      <md-button class="md-raised md-primary" v-tap="{ methods: login }">立即登陆</md-button>
      <md-button class="md-raised md-accent" v-tap="{ methods: register }">马上注册</md-button>
    </div>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{ tipContent }}</span>
    </md-snackbar>
  </div>
</template>

<script>
const md5 = require('md5')
import {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  LOGIN_SUCCESSFULLY
} from '../../utils/errorCode'

import Env from '../../utils/env'

export default {
  data () {
    return {
      vertical: 'top',
      horizontal: 'center',
      duration: 3000,
      tipContent: '',
      username: '',
      password: '',
      hintMessage: '',
      loginAPI: `${Env.apiDomain}/api/login`,
      userId: ''
    }
  },
  mounted () {
    let loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
    if (loginInfo) {
      this.$router.push({ name: 'moments', params: { userId: loginInfo.userId } })
    }
  },
  methods: {
    login () {
      if (this.username === '') {
        this.tipContent = '请输入用户名(*^__^*) 嘻嘻……'
        this.$refs.snackbar.open()
        return
      }
      if (this.password === '') {
        this.tipContent = '请输入密码O(∩_∩)O~ 嘻嘻……'
        this.$refs.snackbar.open()
        return
      }
      let params = {
        username: this.username,
        password: md5(this.password)
      }
      this.$http.post(this.loginAPI, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => {
        let response = data.body
        if (response.successCode === LOGIN_SUCCESSFULLY) {
          this.tipContent = '登录成功~'
          this.$refs.snackbar.open()
          this.userId = response.user._id
          let loginInfo = {
            isLogin: true,
            userId: this.userId
          }
          window.sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo))
          setTimeout(() => {
            this.$router.push({ name: 'moments', params: { userId: this.userId } })
          }, 1000)
        }
      }
      , error => {
        switch (error.body.errorCode) {
          case USER_NOT_FOUND:
            this.tipContent = '用户不存在~'
            this.$refs.snackbar.open()
            break
          case WRONG_PASSWORD:
            this.tipContent = '密码输错啦~'
            this.$refs.snackbar.open()
            break
        }
      })
    },
    register () {
      this.$router.push('register')
    }
  }
}
</script>

<style lang="less">
@import 'login';
</style>
