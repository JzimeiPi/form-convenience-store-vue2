import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fromState: 'design',
    menuList: []
  },
  getters: {},
  mutations: {
    changeFromState(state, data) {
      state.fromState = data
    },
    setMenuList(state, data) {
      const forData = (menuList, data) => {
        menuList.some(menu => {
          if (menu.id === data.pId) {
            if (menu.children) {
              menu.children.push(data)
            } else {
              menu.children = [{...data}]
            }
            return true
          } else if(menu.children && menu.children.length){
            return forData(menu.children, data)
          } else {
            return false
          }
        })
      }
      if (data.pId) {
        forData(state.menuList, data)
      } else {
        state.menuList.push(data)
      }
    },
    delMenuList(state, data) {
      const {pId, index, i, j} =data
      console.log(3333, data);
      if (!pId) {
        state.menuList.splice(index, 1)
      } else if (j != undefined){
        state.menuList[index].children[i].children.splice(j, 1)
      } else if (i != undefined) {
        state.menuList[index].children.splice(i, 1)
      }
    },
  },
  actions: {
    setMenuList({commit}, data) {
      commit('setMenuList', data)
    },
    delMenuList({commit}, data) {
      commit('delMenuList', data)
    }
  },
  modules: {},
});
