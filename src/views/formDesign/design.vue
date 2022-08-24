<template>
  <div class="design">
    <Comps class="comps"></Comps>
    <Forms class="forms"></Forms>
    <Attrs class="attrs"></Attrs>
  </div>
</template>

<script>
import Comps from './comps.vue'
import Attrs from './attrs.vue'
import Forms from './forms.vue'

export default {
  components: {
    Comps,
    Attrs,
    Forms
  }
}
</script>

<style lang="less" scoped>
.design {
  height: 100%;
  display: flex;

  .comps {
    width: 25%;
    border-right: 1px solid #f9f9f0;
  }

  .forms {
    flex: 1;
  }

  .attrs {
    width: 20%;
  }
}
</style>