<template>
  <div class="form-design">
    <el-tabs v-model="active" @tab-click="changeTab">
      <el-tab-pane label="表单设计" name="design">
        <Design></Design>
      </el-tab-pane>
      <el-tab-pane label="设计列表" name="list"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Design from './design.vue'
export default {
  components: {
    Design
  },
  data() {
    return {
      active: 'design'
    }
  },
  methods: {
    changeTab() {

    }
  }
}
</script>

<style lang="less" scoped>
.form-design {
  height: 100%;

  /deep/ .el-tabs {
    height: 100%;

    .el-tabs__content {
      height: calc(100% - 55px);
    }

    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>