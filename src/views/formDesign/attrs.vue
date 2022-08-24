<template>
  <div class="attrs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="格式布局" name="first">格式布局</el-tab-pane>
      <el-tab-pane label="表单属性" name="t">表单属性</el-tab-pane>
      <el-tab-pane label="组件属性" name="s">组件属性</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
  },
  methods: {
    handleClick() { }
  }
}
</script>

<style lang="less" scoped>
.attrs {
  background-color: #fff;

  /deep/ .el-tabs__nav {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;

    .el-tabs__item {
      flex: 1;
      text-align: center;
      padding: 0;
    }
  }
}
</style>