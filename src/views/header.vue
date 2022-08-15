<template>
  <div class="header">
    <el-radio-group v-model="state" @change="change">
      <el-radio-button label="business">业务数据</el-radio-button>
      <el-radio-button label="design">表单设计</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Header',
  data() {
    return {
      state: ''
    }
  },
  computed: {
    ...mapState(['fromState'])
  },
  created() {
    this.state = this.fromState
  },
  methods: {
    ...mapMutations(['changeFromState']),
    change() {
      this.changeFromState(this.state)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  margin-left: 10px;
}
</style>