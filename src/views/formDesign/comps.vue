<template>
  <div class="comps">
    <draggable id="draggable-comps" class="draggable-comps" :list="comps" :sort="false"
      :group="{ name: 'forms', pull: 'clone', put: false }" :clone="cloneFormItem">
      <div v-for="(comp, i) in comps" :key="i" class="comps-label">{{ comp.label }}</div>
    </draggable>
  </div>
</template>

<script>
import comps from '@/config/comps'
import compConfig from '@/config'

export default {
  data() {
    return {
      comps: comps
    }
  },
  methods: {
    cloneFormItem(info) {
      const id = "key_" + Date.now() + this.$uuid.v4().replace(/\-/g, "")
      const pId = "c_" + Date.now()
      const attrs = compConfig[info.type.split('-')[1]]
      // TODO:
      // 1.配置中attrs设置默认值
      // 2.获取配置attrs中key：value，组成desc中attrs，作为右侧属性设置的data
      // 3.配置中attrs用于右侧属性设置组件展示
      return {
        pId,
        layout: {
          column: 1,
          spans: [24]
        },
        columns: [
          {
            id,
            ...info,
            ...attrs
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comps {
  font-size: 14px;
  color: #666;
  background-color: #fff;

  .draggable-comps {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .comps-label {
    display: inline-block;
    border: 1px solid #f1f1f1;
    background-color: #f9f9f0;
    border-radius: 2px;
    width: 40%;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin-top: 10px;

  }

  .comps-label:hover {
    cursor: move;
  }
}
</style>