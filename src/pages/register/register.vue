<template>
  <div class="register">
    <div class="register-form">
      <md-avatar class="md-large center">
        <img :src="avatar" alt="People" v-show="avatar">
      </md-avatar>
      <md-input-container>
        <md-icon>face</md-icon>
        <label>用户名</label>
        <md-input v-model="username" required></md-input>
      </md-input-container>
      <md-input-container>
        <md-icon>phone</md-icon>
        <label>手机号码</label>
        <md-input type="tel" v-model="phone"></md-input>
      </md-input-container>
      <md-input-container>
        <md-icon>email</md-icon>
        <label>邮箱名</label>
        <md-input v-model="email" type="email"></md-input>
      </md-input-container>
      <md-input-container>
        <md-icon>home</md-icon>
        <label>家庭住址</label>
        <md-input v-model="address"></md-input>
      </md-input-container>
      <md-input-container md-has-password>
        <md-icon>security</md-icon>
        <label>密码</label>
        <md-input type="password" v-model="password" required></md-input>
      </md-input-container>
      <md-input-container>
        <md-icon>create</md-icon>
        <label>最近状态</label>
        <md-textarea v-model="status"></md-textarea>
      </md-input-container>
    </div>
    <md-button class="md-raised md-warn" v-tap="{ methods: register }">立即注册</md-button>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{ tipContent }}</span>
    </md-snackbar>
    <qiniu-upload v-show="!avatar" :show-upload-button="false" :custom="custom"  @uploaded="uploaded"></qiniu-upload>
  </div>
</template>

<script>
const md5 = require('md5')

import {
  USER_HAS_REGISTER
} from '../../utils/errorCode'

import QiniuUpload from '../../components/QiniuUpload.vue'

import Env from '../../utils/env'

export default{
  data () {
    return {
      vertical: 'top',
      horizontal: 'center',
      duration: 3000,
      tipContent: '',
      username: '',
      phone: '',
      email: '',
      address: '',
      avatar: '',
      status: '',
      password: '',
      custom: 'qiniu-register',
      registerAPI: `${Env.apiDomain}/api/register`
    }
  },
  methods: {
    register () {
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
        phone: this.phone,
        email: this.email,
        address: this.address,
        password: md5(this.password),
        avatar: this.avatar,
        status: this.status
      }
      this.$http.post(this.registerAPI, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
          this.tipContent = '注册成功……准备跳转至登录页'
          this.$refs.snackbar.open()
          setTimeout(() => {
            this.$router.push('login')
          }, 3000)
        }
      }
      , error => {
        if (error.body.errorCode === USER_HAS_REGISTER) {
          this.tipContent = '该用户名已被使用啦~'
          this.$refs.snackbar.open()
        }
      })
    },
    uploaded (url) {
      this.avatar = url
    }
  },
  components: {
    QiniuUpload
  }
}
</script>

<style lang="less">
@import 'register';
</style>
