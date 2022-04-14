<template>
  <scroll class="article" ref="scrollRef" scrollX>
    <div ref="groupRef">
      <template v-for="(sen, index) in senlist" :key="sen.id">
        <span
          class="sentence"
          v-html="(index !== 0 && sen.paraghId !== senlist[index - 1].paraghId ? '<br/>' : '') + sen.text"
          :class="[curIndex === index && 'highlight', sen.paraghId]"
        ></span>
      </template>
    </div>
  </scroll>
</template>

<script>
import Scroll from '../scroll/index.vue'
import useScrollTo from './use-scrollTo'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('player')
export default {
  name: 'article',
  components: {
    Scroll
  },
  computed: {
    senlist() {
      console.log('this.playlist=>', this.playlist)
      return this.playlist.map((item) => item.content)
      // return this.playlist[0].item.map((sen) => sen.content.text)
    },
    highlightIndex() {
      const greaterStartTime = []
      const allStartTime = this.playlist[0].startTimeList

      allStartTime.forEach((startTime) => {
        if (+startTime.start / 1000 < this.currentTime) {
          greaterStartTime.push(startTime.index)
        }
      })
      const highlightIndex = Math.max(...greaterStartTime)
      return highlightIndex
    },
    ...mapState(['playlist', 'curIndex', 'curContent', 'currentTime'])
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

<style lang="scss" scoped>
.article {
  height: 350px;
  overflow: hidden;
  padding: 0 100px;
  .group {
    .sentence {
      padding-top: 30px;
      text-align: center;
      font-size: 48px;
      color: #ffffff;
      opacity: 0.5;
    }
  }
  .sentence {
    padding-top: 30px;
    text-align: center;
    font-size: 48px;
    color: #ffffff;
    opacity: 0.5;
    line-height: 80px;
  }
  .highlight {
    font-size: 68px;
    font-weight: 600;
    color: #ffffff;
    opacity: 1;
  }
}
</style>
