<template>
  <div class="status-bar">
    <div class="play-type">{{ playType }}</div>
    <div class="finish-progress">
      <progress-bar></progress-bar>
    </div>
    <div class="use-help" @click="useHelp">
      <help v-hoverall></help>
    </div>
    <div class="play-mode" id="playmode">
      <mode></mode>
    </div>
    <div class="exit-play">
      <exit @click="showExitDialog"></exit>
    </div>
    <div class="exit-dialog">
      <exit-dialog v-model="dialogVisible"></exit-dialog>
    </div>
  </div>
</template>

<script>
import ProgressBar from './progress-bar/index.vue'
import Help from './help/index.vue'
import Mode from './mode/index.vue'
import Exit from './exit/index.vue'
import ExitDialog from './exit-dialog/index.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapMutations, mapGetters, mapState, mapActions } = createNamespacedHelpers('player')

export default {
  name: 'status-bar',
  components: {
    ProgressBar,
    Help,
    Mode,
    Exit,
    ExitDialog
  },
  props: {
    playType: {
      type: String,
      default: '单词跟读'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['isLast']),
    ...mapState(['playEvent', 'stepType', 'isLastEnd'])
  },
  methods: {
    useHelp() {
      controller.hooks.pauseAudio.call({ stepType: this.stepType })
      this.setGuidConf({
        showGuid: true,
        emitType: 'user'
      })
      this.setHelpClick(true)
    },
    showExitDialog() {
      if (this.isLastEnd) {
        this.$router.back()
        this.playEvent.clear()
        this.resetSomeState()
      } else {
        this.dialogVisible = !this.dialogVisible
      }
    },
    ...mapMutations(['setGuidConf', 'setHelpClick']),
    ...mapActions(['resetSomeState'])
  }
}
</script>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 35px;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
  .play-type {
    font-size: 30px;
    font-weight: 600;
    color: #333333;
    margin-right: 20px;
  }
  .use-help {
    margin-left: 297px;
  }
  .play-mode {
    margin-left: 50px;
  }
}
</style>
