<template>
  <div>
    <router-link>首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'jaylen'
    }
  }
}
</script>

<style lang="scss" scoped></style>
