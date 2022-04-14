<template>
  <div class="media" v-show="curUrl">
    <template v-if="mediaType !== 'again' && mediaType !== 'restart'">
      <el-progress type="circle" color="#04e7a0" :width="100" :percentage="percentage">
        <img :src="img" :alt="text" class="media-img" />
      </el-progress>
      <div class="text">{{ text }}</div>
      <div v-show="text === '读'" class="animation-style" ref="animationRef"></div>
    </template>
    <template v-else-if="mediaType === 'again'">
      <img :src="img" :alt="text" class="media-img again-img" @click="onPlayAgain" />
      <div class="again-text">{{ text }}</div>
    </template>
    <template v-else-if="mediaType === 'restart'">
      <div class="restart" @click="onRestart">重新开始</div>
    </template>
    <audio
      ref="audioRef"
      :muted="step === 'followsystem'"
      :playbackRate="playbackRate"
      @ended="onEnded"
      @timeupdate="onTimeUpdate"
      @durationchange="onDurationchange"
      @canplay="onCanPlay"
    ></audio>
  </div>
</template>

<script>
import useMedia from './use-media'

export default {
  name: 'media',
  setup(props) {
    const {
      audioRef,
      animationRef,
      showAgain,
      img,
      text,
      percentage,
      mediaType,
      curUrl,
      step,
      playbackRate,
      onEnded,
      onPlayAgain,
      onRestart,
      onTimeUpdate,
      onDurationchange,
      onCanPlay
    } = useMedia(props)
    return {
      audioRef,
      animationRef,
      showAgain,
      img,
      text,
      percentage,
      mediaType,
      curUrl,
      step,
      playbackRate,
      onEnded,
      onPlayAgain,
      onRestart,
      onTimeUpdate,
      onDurationchange,
      onCanPlay
    }
  }
}
</script>

<style lang="scss" scoped>
.media {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 62px; */
  .media-img {
    width: 88px;
    height: 88px;
  }
  .again-img {
    cursor: pointer;
  }
  .text {
    font-size: 60px;
    font-weight: 600;
    color: #04e7a0;
  }
  .again-text {
    font-size: 36px;
    font-weight: 600;
    color: #04e7a0;
    margin-top: 8px;
  }
  .restart {
    background: #fdaf34;
    border-radius: 4px;
    color: #ffffff;
    width: 168px;
    height: 60px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    margin-bottom: 112px;
  }
  .animation-style {
    position: absolute;
    bottom: 225px;
  }
}
</style>

<style lang="scss">
.media {
  .el-progress-circle__track {
    stroke: transparent;
  }
}
</style>
