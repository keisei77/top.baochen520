<template>
  <div class="share">
    <div class="image">
      <img v-show="imgSrc" :src="imgSrc">
      <div v-show="!imgSrc" class="placeholder">图片展示区~</div>
    </div>
    <div class="description">
      <md-input-container>
        <label>这一刻的想法…</label>
        <md-textarea v-model="description"></md-textarea>
      </md-input-container>
    </div>
    <qiniu-upload v-show="!imgSrc" @uploaded="uploaded"></qiniu-upload>
    <md-button class="md-raised md-accent publish" v-tap="{ methods: publish }">发表</md-button>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{ tipContent }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import QiniuUpload from '../../components/QiniuUpload.vue'

import Env from '../../utils/env'

export default {
  data () {
    return {
      vertical: 'top',
      horizontal: 'center',
      duration: 3000,
      tipContent: '',
      imgSrc: '',
      description: '',
      userId: this.$route.params.userId,
      publishAPI: `${Env.apiDomain}/api/publish`
    }
  },
  methods: {
    uploaded (url) {
      this.imgSrc = url
    },
    publish () {
      if (!this.imgSrc) {
        this.tipContent = '忘记上传图片了吧……'
        this.$refs.snackbar.open()
        return
      }
      let params = {
        user: this.userId,
        imgSrc: this.imgSrc,
        description: this.description
      }
      this.$http.post(this.publishAPI, params).then(response => {
        if (response.status === 200) {
          this.$router.push({ name: 'moments', params: { userId: this.$route.params.userId } })
        }
      })
//      TODO
//      生成一个moment document，记录userId, imgSrc, description
//      在user document中，添加imgs:[], 在imgs中添加img的_id
    }
  },
  components: {
    QiniuUpload
  }
}
</script>

<style lang="less">
@import 'share';
</style>
