<template>
  <div class="player" v-guid:[guid]="guidConf">
    <div class="content">
      <div style="min-height: 350px"><component :is="contentName"></component></div>
      <media id="media"></media>
    </div>
    <div class="status">
      <status-bar :playType="playTypeName"></status-bar>
    </div>
    <div class="side">
      <transition name="slide">
        <side-bar :showSideBar="showSideBar" id="sidebar" v-show="showSideBar"></side-bar>
      </transition>
    </div>
    <count-down v-if="showCountDown"></count-down>
  </div>
</template>

<script>
import Word from './components/resource/word.vue'
import Sentence from './components/resource/sentence.vue'
import Article from './components/resource/article.vue'
import Media from './components/media/index.vue'
import StatusBar from './components/status-bar/index.vue'
import SideBar from './components/side-bar/index.vue'
import CountDown from './components/count-down/index.vue'
import usePlayer from './use-player'

export default {
  name: 'player',
  components: {
    Word,
    Sentence,
    Article,
    Media,
    StatusBar,
    SideBar,
    CountDown
  },
  setup() {
    const { guidConf, showCountDown, guid, showSideBar, playTypeName, contentName } = usePlayer()
    return {
      guidConf,
      showCountDown,
      guid,
      showSideBar,
      playTypeName,
      contentName
    }
  }
}
</script>

<style lang="scss">
/* .player {
  @media (max-height: 620px) {
    div {
      color: red;
    }
  }
} */
</style>

<style lang="scss" scoped>
.player {
  position: relative;
  height: 100%;
  background: #065640;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #065640;
    padding-top: 90px;
    padding-bottom: 120px;
  }
  .status {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .side {
    position: absolute;
    right: 0;
    bottom: 240px;
    .slide-enter-active,
    .slide-leave-active {
      transition: all 0.3s;
    }

    .slide-enter-from,
    .slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
  }
}
</style>
