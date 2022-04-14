<template>
  <scroll class="sentences" ref="scrollRef">
    <ul ref="groupRef">
      <li class="sentence" v-for="(sen, index) in senlist" :class="curIndex === index && 'highlight'" :key="index">
        {{ sen }}
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '../scroll/index.vue'
import useScrollTo from './use-scrollTo'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('player')

export default {
  name: 'sentence',
  components: {
    Scroll
  },
  computed: {
    senlist() {
      return this.playlist.map((item) => item.content.text)
    },
    ...mapState(['playlist'])
  },
  setup() {
    const { groupRef, scrollRef, curIndex } = useScrollTo()

    return {
      groupRef,
      scrollRef,
      curIndex
    }
  }
}
</script>

<style lang="scss">
.sentences {
  & > .custom-vertical-scrollbar {
    opacity: 0;
  }
}
</style>

<style lang="scss" scoped>
.sentences {
  height: 350px;
  overflow: hidden;
  .sentence {
    padding-top: 30px;
    text-align: center;
    font-size: 48px;
    color: #ffffff;
    opacity: 0.5;
  }
  .highlight {
    font-size: 68px;
    font-weight: 600;
    color: #ffffff;
    opacity: 1;
  }
}
</style>
