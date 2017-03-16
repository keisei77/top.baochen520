<template>
  <div class="moments">
    <md-card md-with-hover v-for="moment in moments" :key="moment._id">
      <md-card-header>
        <md-avatar>
          <img :src="moment.user.avatar" alt="Avatar">
        </md-avatar>
        <div class="md-title">{{ moment.user.username }}</div>
        <div class="md-subhead">{{ moment.user.status }}</div>
      </md-card-header>
      <md-card-media>
        <img :src="moment.imgSrc" alt="People">
      </md-card-media>
      <md-card-content>
        {{ moment.description }}
      </md-card-content>
      <md-card-actions>
        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>
        <md-button>评论</md-button>
      </md-card-actions>
    </md-card>
    <div class="btn-fixed">
      <md-button class="md-fab md-primary" v-tap="{ methods: share }">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import Env from '../../utils/env'

const fetchMoments = (vm) => {
  vm.$http.get(vm.momentsAPI).then(response => {
    vm.moments = response.data
  })
}

export default {
  data () {
    return {
      momentsAPI: `${Env.apiDomain}/api/moments`,
      moments: []
    }
  },
  mounted () {
    fetchMoments(this)
  },
  methods: {
    share () {
      this.$router.push({ name: 'share', params: { userId: this.$route.params.userId } })
    }
  }
}
</script>

<style lang="less">
@import 'moments';
</style>
