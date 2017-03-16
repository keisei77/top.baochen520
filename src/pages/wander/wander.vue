<template>
  <div id="board">
    <canvas id="wander" class="wander"></canvas>
  </div>
</template>

<script>
  const drawLine = (prevTouch, currTouch) => {
    console.log(`prevTouchX${prevTouch.touches[0].clientX}`, `prevTouchY${prevTouch.touches[0].clientY}`, `currTouchX${currTouch.touches[0].clientX}`, `currTouchY${currTouch.touches[0].clientY}`)
    let canvas = document.getElementById('wander')
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(prevTouch.touches[0].clientX / 2 - canvas.offsetLeft, prevTouch.touches[0].clientY / 4 - canvas.offsetTop)
      ctx.lineTo(currTouch.touches[0].clientX / 2 - canvas.offsetLeft, currTouch.touches[0].clientY / 4 - canvas.offsetTop)
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
      ctx.closePath()
    }
  }

  export default {
    data () {
      return {
        startPoint: [],
        movePoint: []
      }
    },
    mounted () {
      let board = document.getElementById('board')
      board.addEventListener('touchstart', (startEvent) => {
        this.startPoint.push(startEvent)
      }, false)
      board.addEventListener('touchmove', (currEvent) => {
        let prevTouch = this.movePoint.length > 0 ? this.movePoint.shift() : this.startPoint.shift()
        this.movePoint.push(currEvent)
        drawLine(prevTouch, currEvent)
      }, false)
      board.addEventListener('touchend', (event) => {
        this.movePoint = []
      }, false)
    }
  }

</script>

<style lang="less">
  @import './wander';
</style>
