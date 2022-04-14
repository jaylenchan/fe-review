<template>
  <div class="help">
    <div class="help-text">使用帮助</div>
    <div class="help-icon"></div>
  </div>
</template>

<script>
export default {
  name: 'help'
}
</script>

<style lang="scss" scoped>
.help {
  display: flex;
  align-items: center;
  .help-text {
    color: #666666;
    font-size: 24px;
    margin-right: 10px;
    &.hover {
      color: #00c18a;
    }
  }
  .help-icon {
    width: 40px;
    height: 40px;
    background-size: cover;
    background-image: url('./normal-help.png');
    &.hover {
      background-image: url('./hover-help.png');
    }
  }
}
</style>
