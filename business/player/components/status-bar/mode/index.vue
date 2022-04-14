<template>
  <div class="mode" id="mode">
    <div class="text">自动跟读</div>
    <el-switch
      :disabled="switchDisable"
      class="switch"
      v-model="autoPlay"
      active-color="#00c18a"
      inactive-color="#d7dde6"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { playMode } from '../../../config/player'

const { mapMutations, mapState } = createNamespacedHelpers('player')

export default {
  name: 'mode',
  data() {
    return {
      autoPlay: true
    }
  },
  computed: {
    ...mapState(['guidConf']),
    switchDisable() {
      return this.guidConf.showGuid && this.guidConf.emitType === 'system'
    }
  },
  watch: {
    autoPlay(newV) {
      if (newV) {
        this.setPlayMode(playMode.AUTO)
      } else {
        this.setPlayMode(playMode.MANUALY)
      }
    }
  },
  methods: {
    ...mapMutations(['setPlayMode'])
  }
}
</script>

<style lang="scss" scoped>
.mode {
  display: flex;
  align-items: center;
  .text {
    font-size: 24px;
    color: #666666;
    margin-right: 10px;
  }
  .switch {
    width: 68px;
    height: 40px;
  }
}
</style>
<style lang="scss">
.switch {
  &.el-switch {
    &.is-disabled {
      opacity: 1;
    }
  }
  .el-switch__core {
    height: 40px !important;
    width: 68px !important;
    border-radius: 20px;
    .el-switch__action {
      height: 38px;
      width: 38px;
      margin-top: -1px;
    }
  }

  &.is-checked .el-switch__core .el-switch__action {
    margin-left: -37px;
  }
}
</style>
