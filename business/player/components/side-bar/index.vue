<template>
  <div class="side-bar">
    <div class="header" @click="onHeaderClick" v-hoverall v-show="!isNotWordType">
      <i class="icon iconfont f28 icon-doubleup-copy" :class="transitionClass"></i>
    </div>
    <div class="content" :class="transitionClass" ref="contentRef" v-if="haveContent">
      <scroll ref="scrollRef" class="word-list" scrollbar :probeType="0">
        <div>
          <div class="word-title">
            <div class="line"></div>
            <span class="title">单词列表</span>
          </div>
          <ul class="list" @click="onItemSelect" ref="groupRef">
            <li
              class="word"
              :data-index="index"
              :class="curIndex === index ? 'highlight' : ''"
              v-for="(word, index) in wordlist"
              :key="index"
            >
              {{ word }}
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class="content-control">
      <div class="control-button" :class="isFirstContent && 'disabled'" @click="onPrev">{{ prevBtnText }}</div>
      <div class="control-button" :class="isLast && 'restart'" @click="onNext">{{ nextBtnText }}</div>
    </div>
  </div>
</template>

<script>
import Scroll from '../scroll/index.vue'
import useSideBar from './use-side-bar'
import usePlayerStore from '../../store/use-player-store'
import { onMounted, onUpdated, watch } from 'vue'
import { debounce } from '@/utils'
import { playMode as playModeConfig } from '../../config/player'
export default {
  name: 'side-bar',
  components: {
    Scroll
  },
  props: {
    showSideBar: Boolean
  },
  setup(props) {
    const {
      transitionClass,
      prevBtnText,
      nextBtnText,
      scrollRef,
      groupRef,
      wordlist,
      haveContent,
      onHeaderClick,
      onPrev,
      onNext,
      onItemSelect,
      scrollTo
    } = useSideBar()

    const { curIndex, isLast, isNotWordType, isFirstContent, playMode } = usePlayerStore()
    onMounted(() => {
      const debounceFn = debounce(() => {
        scrollTo(curIndex.value)
      }, 2000)
      scrollRef.value?.scroll.on('scrollEnd', () => {
        debounceFn()
      })
    })
    watch(
      () => props.showSideBar,
      () => {
        if (playMode.value === playModeConfig.MANUALY) {
          setTimeout(() => {
            scrollTo(curIndex.value)
          })
        }
      }
    )
    onUpdated(() => {
      scrollRef.value?.scroll.refresh()
    })

    return {
      transitionClass,
      prevBtnText,
      nextBtnText,
      scrollRef,
      groupRef,
      wordlist,
      isLast,
      curIndex,
      haveContent,
      isNotWordType,
      isFirstContent,
      onHeaderClick,
      onPrev,
      onNext,
      onItemSelect
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  box-sizing: border-box;
  width: 210px;
  background: #ffffff;
  border-top-left-radius: 8px;
  padding-bottom: 20px;
  .header {
    position: absolute;
    left: 50%;
    top: -35px;
    transform: translateX(-50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #ffffff;
    .icon {
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translateX(-50%);
      color: #717b86;
      cursor: pointer;
      &.slide-leave {
        transform: translateX(-50%) rotate(180deg) !important;
      }
      &.hover {
        color: #00c18a;
      }
    }
  }
  .content {
    box-sizing: border-box;
    width: 100%;
    padding: 35px 14px 0 25px;
    transition: all 0.5s;
    .word-list {
      height: 380px;
      overflow: hidden;
      .word-title {
        display: flex;
        align-items: center;
        .line {
          width: 4px;
          height: 20px;
          background: #00c18a;
          border-radius: 2px;
          margin-right: 5px;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          color: #666666;
        }
      }
      .list {
        .word {
          font-size: 20px;
          font-weight: 600;
          color: #666666;
          padding-top: 29px;
          &:last-child {
            padding-bottom: 48px;
          }
          cursor: pointer;
          &.highlight {
            font-size: 26px;
            font-weight: 600;
            color: #00c18a;
          }
        }
      }
    }
    &.slide-leave {
      height: 0;
      overflow: hidden;
      padding-top: 0 !important;
      .control-button:first-child {
        margin-top: -5px;
      }
    }
    &.slide-enter {
      height: 380px;
      overflow: hidden;
    }
  }
  .content-control {
    position: absolute;
    width: 100%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    padding-bottom: 20px;
    .control-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 113px;
      height: 35px;
      background: #00c18a;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      margin-top: 20px;
      cursor: pointer;
      &.restart {
        background: #fdaf34;
        border-radius: 4px;
        color: #ffffff;
      }
    }
    .disabled {
      background-color: #d9d9d9;
    }
  }
}
</style>
