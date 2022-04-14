<template>
  <div class="count-down">
    <div class="mask"></div>
    <div class="timer">
      <span class="left-time" ref="leftTimeRef">{{ countDown.getOutString() }}</span>
    </div>
  </div>
</template>

<script>
import useCountDown from './use-count-down'

export default {
  name: 'countdown',
  props: {
    time: {
      type: Number,
      default: 3
    }
  },
  setup(props) {
    const { countDown } = useCountDown(props)
    return {
      countDown
    }
  }
}
</script>

<style lang="scss" scoped>
.count-down {
  .mask {
    position: fixed;
    background: #000000;
    opacity: 0.5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }
  .timer {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 340px;
    height: 340px;
    border: 10px solid #00c18a;
    border-radius: 50%;
    background: #ffffff;
    opacity: 1;
    .left-time {
      font-size: 210px;
      color: #00c18a;
    }
  }
}
</style>
