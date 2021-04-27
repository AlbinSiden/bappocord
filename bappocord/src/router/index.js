import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Server from "../views/Server.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/server/:id/:channelID",
    name: "Server",
    component: Server,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
