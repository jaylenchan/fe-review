<template>
  <el-dialog :model-value="modelValue" title="提示" :width="500" :close-on-click-modal="false" @close="confirm">
    <div class="content">
      <p class="text">跟读任务还在进行中，中途退出将不会记录进度</p>
      <p class="text">确认要退出吗?</p>
    </div>
    <template #footer>
      <div class="select">
        <div @click="confirm" class="select-button confirm">继续跟读</div>
        <div @click="cancel" class="select-button cancel">确认退出</div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('player')
export default {
  name: 'exit-dialog',
  props: {
    modelValue: Boolean
  },
  computed: {
    ...mapState(['playEvent'])
  },
  emits: ['update:modelValue'],
  methods: {
    cancel() {
      this.$emit('update:modelValue', false)
      /* this.$router.back() */
      this.playEvent.clear()
      console.log('this.$store=>', this.$store)
      this.setMediaType('listen')
      this.resetSomeState()
      window.onClientGoBack()
    },
    confirm() {
      this.$emit('update:modelValue', false)
    },
    ...mapMutations('player', ['setMediaType']),
    ...mapActions(['resetSomeState'])
  }
}
</script>

<style lang="scss">
.el-dialog {
  &__title {
    color: #666;
    font-weight: bold;
    font-size: 16px;
  }
  &__header {
    .el-dialog__close {
      margin-top: 8px;
    }
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    &::before {
      color: #00c18a;
    }
  }

  .el-dialog__footer {
    .select {
      &-button {
        &.cancel:hover {
          background-color: #00a979;
        }
        &.confirm:hover {
          border-color: #00a979;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.dialog {
  position: fixed;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  .text {
    line-height: 22px;
  }
}
.select {
  display: flex;
  justify-content: center;
  .select-button {
    width: 100px;
    height: 35px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
  }
  .confirm {
    background: #ffffff;
    border: 1px solid #00c18a;
    color: #00c18a;
    margin-right: 30px;
  }
  .cancel {
    background: #00c18a;
    color: #ffffff;
  }
}
</style>
<style lang="scss">
.exit-dialog {
  box-sizing: border-box;
  height: 209px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  .el-dialog {
    margin-top: 35vh !important;
  }
  .el-dialog__header {
    padding: 12px 30px 12px 25px;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    background: #eceff8;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .el-dialog__headerbtn {
    right: 30px;
    top: 8px;
    .el-dialog__close::before {
      color: #717b86;
      font-weight: 600;
    }
  }
  .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 30px;
  }
}
</style>
