<template>
  <div class="baochen-birthday">
    <div class="placeholder" :class="{'leave': leave}"></div>
    <md-button class="surprise-start md-raised md-accent" v-tap="{ methods: startCelebrate }">惊喜一下~</md-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leave: false
    }
  },
  methods: {
    startCelebrate: function () {
      this.leave = true
      let vm = this
      setTimeout(function () {
        vm.$router.push('login')
      }, 500)
    }
  }
}
</script>

<style lang="less">
@import 'home';
</style>
