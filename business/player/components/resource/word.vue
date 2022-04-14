<template>
  <div class="word">
    <div class="text">{{ curContent.text }}</div>
    <div class="symbol">{{ curContent.symbol }}</div>
    <div class="definition">
      <span class="def-item" v-for="(def, index) in curContent.definitions" :key="index">{{ def }}</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('player')

export default {
  name: 'word',
  computed: {
    ...mapState(['curContent'])
  }
}
</script>

<style lang="scss" scoped>
.word {
  color: #ffffff;
  text-align: center;
  .text {
    font-size: 80px;
    font-weight: 600;
    line-height: 80px;
  }
  .symbol {
    font-size: 60px;
    font-weight: 400;
    line-height: 60px;
    margin: 50px 0;
  }
  .definition {
    padding: 0 30px;
    .def-item {
      display: inline-block;
      margin-right: 40px;
      font-size: 40px;
      font-weight: 600;
      line-height: 1.5;
      /* line-height: 40px; */
      /* margin-bottom: 30px; */
    }
    margin-bottom: 30px;
  }
}
</style>
