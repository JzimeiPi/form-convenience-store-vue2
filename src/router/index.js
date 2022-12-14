import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () =>
      import(/* webpackChunkName: 'index' */ "../views/index.vue"),
    children: [
      {
        path: "form/:id",
        name: 'formDesign',
        component: () =>
          import(/* webpackChunkName: 'formDesign' */ "../views/formDesign/index.vue"),
      }
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
