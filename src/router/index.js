import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "month",
    component: () => import("@/views/Month.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
