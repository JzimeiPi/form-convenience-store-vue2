<template>
  <div class="main-comp">
    <el-form class="el-form-block" ref="form" :model="formData" label-width="80px">
      <el-row v-for="(form, index) in list" :key="'row-' + index">
        <el-col>
          <el-form-item :label="form.label">
            <components :is="form.type"></components>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      formData: {},
    }
  }

}
</script>

<style lang="less" scoped>
.main-comp {
  height: 100%;
}
</style>