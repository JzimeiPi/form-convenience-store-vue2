<template>
  <div class="app">
    <div class="container">
      <div class="header">
        <Header></Header>
      </div>
      <div class="container-main">
        <Aside></Aside>
        <div class="main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
import Aside from './aside.vue'

export default {
  components: {
    Header,
    Aside
  },
  data() {
    return {
      hide: false,
    }
  },
  methods: {
    onHide() {
      this.hide = !this.hide
    }
  }
};
</script>

<style lang="less">
.app {
  width: 100%;
  height: calc(100vh - 16px);

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      height: 60px;
      background-color: #B3C0D1;
      display: flex;
      align-items: center;
    }

    .container-main {
      display: flex;
      height: calc(100% - 60px);

      .aside {
        background-color: #D3DCE6;
        // min-width: 200px;
        height: calc(100%-30px);
        overflow-y: hidden;
        position: relative;

        .icon-hide {
          height: 100%;
          width: 20px;
          text-align: center;
          position: absolute;
          right: -20px;
          top: 0;
          display: flex;
          align-items: center;
          opacity: 0;

          &:hover {
            opacity: 1;
            background-color: #f1f1f1;
          }

          .el-icon-arrow {
            color: #999;
          }
        }
      }

      .aside-hide {
        width: 0;
      }

      .main {
        width: 100%;
        height: 100%;
        margin: 8px;
        background-color: #E9EEF3;
      }
    }
  }
}
</style>
