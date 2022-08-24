<template>
  <div class="aside" :class="isCollapse && 'aside-width-0'">
    <div class="fold-btn">
      <i :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="foldMenu"></i>
      <el-button size="small" v-show="!isCollapse && fromState === 'design'" @click="addMenu">添加菜单</el-button>
    </div>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" router>
      <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.id">
        <template slot="title">
          <i :class="item.menuIcon"></i>
          <span class="menu-content" slot="title">{{ item.menuName }}</span>
          <el-popover placement="bottom" trigger="click" popper-class="el-popover-block">
            <el-button class="edit-btn" type="text" @click="addMenu(item, 'menu')" v-if="item.type === 'menu'">添加菜单
            </el-button>
            <el-button class="edit-btn" type="text" @click="addMenu(item, 'form')" v-if="item.type === 'menu'">添加表单
            </el-button>
            <el-button class="edit-btn" type="text" @click="delList(item.pId, index)">删除</el-button>
            <i slot="reference" v-if="fromState === 'design'" class="el-icon-setting"
              @click.prevent.stop="edit(item, index)"></i>
          </el-popover>
        </template>
        <template v-for="(child, i) in item.children">
          <el-submenu v-if="child.type === 'menu'" :key="i" :index="child.id">
            <template slot="title">
              <i :class="child.menuIcon"></i>
              <span class="menu-content menu-content-2-menu" slot="title">{{ child.menuName }}</span>
              <el-popover placement="bottom" trigger="click" popper-class="el-popover-block">
                <el-button class="edit-btn" type="text" @click="addMenu(child, 'form')" v-if="child.type === 'menu'">
                  添加表单
                </el-button>
                <el-button class="edit-btn" type="text" @click="delList(child.pId, index, i)">删除</el-button>
                <i slot="reference" v-if="fromState === 'design'" class="el-icon-setting"
                  @click.prevent.stop="edit(child, i)"></i>
              </el-popover>
            </template>
            <el-menu-item v-for="(c2, j) in child.children" :key="j" :index="c2.id" :route="getRoute(c2)">
              <template slot="title">
                <span class="menu-content menu-content-3" slot="title">{{ c2.menuName }}</span>
                <el-popover placement="bottom" trigger="click" popper-class="el-popover-block">
                  <el-button class="edit-btn" type="text" @click="delList(c2.pId, index, i, j)">删除</el-button>
                  <i slot="reference" v-if="fromState === 'design'" class="el-icon-setting"
                    @click.prevent.stop="edit(c2, j)"></i>
                </el-popover>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="child.id" :index="child.id" :route="getRoute(child)">
            <template slot="title">
              <span class="menu-content menu-content-2" slot="title">{{ child.menuName }}</span>
              <el-popover placement="bottom" trigger="click" popper-class="el-popover-block">
                <el-button class="edit-btn" type="text" @click="delList(child.pId, index, i)">删除</el-button>
                <i slot="reference" v-if="fromState === 'design'" class="el-icon-setting"
                  @click.prevent.stop="edit(child, i)"></i>
              </el-popover>
            </template>
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>

    <el-dialog :title="type === 'menu' ? '添加菜单' : '添加表单'" :visible.sync="isShowAddMenu">
      <el-form :model="form">
        <el-form-item :label="type === 'menu' ? '菜单名称' : '表单名称'" label-width="120">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'menu'" label="菜单图标" label-width="120">
          <i class="menu-icon" :class="form.icon"></i>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddMenu = false">取 消</el-button>
        <el-button type="primary" @click="addMenuConfig">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'Aside',
  data() {
    return {
      isShowAddMenu: false,
      isCollapse: false,
      type: '',
      form: {
        name: '',
        icon: 'el-icon-s-goods'
      },
      menuList: [],
      pId: ''
    }
  },
  computed: {
    ...mapState(['fromState'])
  },
  watch: {
    fromState() {
      this.getMenuList()
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    getRoute(item) {
      return {
        path: `form/${item.id}`
      }
    },
    foldMenu() {
      this.isCollapse = !this.isCollapse
    },
    addMenuConfig() {
      let id = this.$uuid.v4()
      if (this.type !== 'menu') {
        id = "key_" + Date.now() + this.$uuid.v4().replace(/\-/g, "")
      }
      api.setMenuList({
        pId: this.pId,
        id,
        menuName: this.form.name,
        menuIcon: this.form.icon,
        type: this.type
      })
      this.isShowAddMenu = false
      this.getMenuList()
    },
    addMenu(item, type) {
      this.type = type || 'menu'
      this.pId = item.id || ''
      this.form.name = ''
      this.isShowAddMenu = !this.isShowAddMenu
    },
    delList(pId, index, i, j) {
      console.log(2222, pId, index, i, j);
      Promise.resolve(
        api.delMenuList({ pId, index, i, j })
      ).then(() => {
        this.getMenuList()
      })
    },
    edit(item, index) {
      console.log(1111, item, index);
    },
    // mock
    getMenuList() {
      this.menuList = []
      this.menuList.push(...api.getMenuList())
    }
  }

}
</script>
<style lang="less">
.el-popover-block {
  min-width: 60px;

  .edit-btn {
    display: block;
  }

  .el-button {
    margin-left: 0;
    padding: 6px;
  }
}
</style>
<style lang="less" scoped>
.aside-width-0 {
  min-width: 0 !important;
}

.aside {
  min-width: 200px;

  /deep/ .el-submenu__title {
    padding: 0 10px;
  }

  /deep/ .el-submenu .el-menu-item {
    padding-right: 10px;
  }

  .fold-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    color: #409EFF;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .menu-content {
    display: inline-block;
    width: 86px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-content-2 {
    width: 94px;
  }

  .menu-content-2-menu {
    width: 66px;
  }

  .menu-content-3 {
    width: 74px;
  }

  .menu-icon {
    font-size: 26px;
    color: #409EFF;
  }
}
</style>