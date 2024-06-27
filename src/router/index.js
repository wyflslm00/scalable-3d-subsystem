import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";

Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		component: () => import("../views/login.vue"),
		hidden: true,
	},
	{
		path: "/scene",
		component: Layout,
		redirect: "/scene/theme",
		name: "scene",
		meta: { title: "场景设置模块", icon: "" },
		children: [
			{
				path: "theme",
				name: "Theme",
				component: () => import("../views/scene/theme"),
				meta: { title: "主题管理", icon: "" },
			},
		],
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
