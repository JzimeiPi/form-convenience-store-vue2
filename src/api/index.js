import store from "@/store"

export default {
  getMenuList() {
    return store.state.menuList
  },
  setMenuList(data) {
    store.dispatch('setMenuList', data)
  },
  delMenuList(data) {
    store.dispatch('delMenuList', data)
  }
}