<template>
  <div class="forms">
    <el-form class="el-form-block" ref="form" :model="formData" label-width="80px">
      <draggable :animation="animation" id="draggable-forms" class="draggable-forms" :list="forms"
        :group="{ name: 'forms', pull: false, put: true }" @add="handleAdd">
        <el-row class="el-row-block" :class="index === curFormIndex && 'cur-click-form'" v-for="(form, index) in forms"
          :key="'row-' + index" @click.native="clickFormItem(index)">
          <draggable :animation="animation" id="draggable-columns" :list="form.columns"
            :group="{ name: 'forms', pull: form.columns.length > 1, put: form.columns.length < form.layout.column }"
            @add="handleRemoveColumn($event, index)">
            <el-col class="el-col-block" :class="index + '-' + i === curFormIndex && 'cur-click-form'"
              v-for="(column, i) in form.columns" :key="'col-' + i" @click.native.stop="clickFormItem(index, i)">
              <el-form-item :label="column.label">
                <components :is="column.type"></components>
              </el-form-item>
            </el-col>
          </draggable>
        </el-row>
      </draggable>
    </el-form>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      animation: 200,
      forms: [],
      formData: {},
      curFormIndex: 0,
    }
  },
  computed: {
    curFormItem() {
      const [index, i] = String(this.curFormIndex).split('-')
      let curItem = this.forms[index]
      if (i != undefined) curItem = this.forms[index].columns[i].attrs
      return curItem
    }
  },
  created() {
  },
  methods: {
    clickFormItem(index, i) {
      this.curFormIndex = index
      if (i != undefined) {
        this.curFormIndex += '-' + i
      }
    },
    handleAdd(res) {
      console.log('handleAdd', res);
      const { from, to, newIndex } = res
      if (from.id === 'draggable-columns' && to.id === 'draggable-forms') {
        const obj = {
          pId: "c_" + Date.now(),
          layout: {
            column: 1,
            spans: [24]
          },
          columns: [{ ...this.forms[newIndex] }]
        }
        this.forms.splice(newIndex, 1, obj)

      }
    },
    handleRemoveColumn(res, index) {
      const { from, to, newIndex } = res
      if (from.id === 'draggable-comps' && to.id === 'draggable-columns') {
        const column = { ...this.forms[index].columns[newIndex].columns[0] }
        this.forms[index].columns.splice(newIndex, 1, column)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.forms {
  /deep/ .el-form-item {
    margin: 0;
  }

  .cur-click-form {
    border: 2px dashed #409EFF !important;
  }

  .el-row-block {
    border: 1px dashed #a1a1a1;
    padding: 20px 10px;
    margin: 5px;
  }

  .el-row-block:hover {
    cursor: move;
  }

  .el-col-block {
    border: 1px dashed #a1a1a1;
  }

  .draggable-forms {
    height: 100%;
  }

  .el-form-block {
    height: 100%;
  }
}
</style>