<template>
  <div class="progress-bar">
    <el-progress color="#00C18A;" :percentage="percentage">
      <span class="finish-count">{{ finishCount }}</span>
      <span class="separator">/</span>
      <span class="total-count">{{ totalCount }}</span>
    </el-progress>
  </div>
</template>

<script>
import { computed } from 'vue'
import usePlayerStore from '../../../store/use-player-store'

export default {
  name: 'progress-bar',
  computed: {
    percentage() {
      return ((this.finishCount / this.totalCount) * 100) | 0
    }
  },
  setup() {
    const { curIndex, playlist } = usePlayerStore()
    const finishCount = computed(() => curIndex.value + 1)
    const totalCount = computed(() => playlist.value?.length)

    return {
      finishCount,
      totalCount
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 250px;
  border-radius: 8px;
  .finish-count {
    font-size: 36px;
    font-weight: 600;
    color: #666666;
  }
  .separator,
  .total-count {
    font-size: 24px;
    color: #666666;
  }
}
</style>
<style lang="scss">
.progress-bar {
  .el-progress-circle__track {
    stroke: #e4eaef;
  }
  .el-progress__text {
    margin-left: 20px;
  }
}
</style>
