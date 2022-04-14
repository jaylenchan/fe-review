<template>
  <div ref="rootRef" class="scroll">
    <slot></slot>
    <div class="custom-vertical-scrollbar" ref="customRef">
      <div class="custom-vertical-indicator"></div>
    </div>
  </div>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    },
    scrollbar: Boolean,
    scrollX: Boolean
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    console.log('scrollBar=>', props.scrollbar)
    const rootRef = ref(null)
    const customRef = ref(null)
    const scroll = useScroll(rootRef, customRef, props, emit)
    return {
      rootRef,
      scroll,
      customRef
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  position: relative;
  .custom-vertical-scrollbar {
    position: absolute;
    top: 50%;
    right: 0;
    width: 4px;
    height: 380px;
    border-radius: 6px;
    transform: translateY(-50%) translateZ(0);
    background-color: transparent;
  }
  .custom-vertical-indicator {
    width: 100%;
    height: 57px;
    border-radius: 3px;
    background-color: #dee5ef;
  }
}
</style>
