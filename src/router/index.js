import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		component: () => import("../views/Login.vue"),
		hidden: true,
	},

	{
		path: "*",
		redirect: "/",
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
