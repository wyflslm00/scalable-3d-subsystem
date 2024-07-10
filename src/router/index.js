import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout";

Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		component: () => import("../views/Login.vue"),
		hidden: true,
	},
	{
		path: "/scene",
		component: Layout,
		// redirect: "/scene/theme",
		name: "scene",
		meta: { title: "场景设置模块", icon: "" },
		children: [
			{
				path: "theme",
				name: "Theme",
				component: () => import("../views/scene/theme"),
				meta: { title: "主题管理", icon: "" },
			},
			{
				path: "area",
				name: "Area",
				component: () => import("../views/scene/area"),
				meta: { title: "区域管理", icon: "" },
			},
		],
	},
	{
		path: "/matter",
		component: Layout,
		// redirect: "/matter/model",
		name: "matter",
		meta: { title: "素材仓库资源模块", icon: "" },
		children: [
			{
				path: "model",
				name: "Model",
				component: () => import("../views/matter/model"),
				meta: { title: "模型管理", icon: "" },
			},
			{
				path: "video",
				name: "Video",
				component: () => import("../views/matter/video"),
				meta: { title: "视频管理", icon: "" },
			},
			{
				path: "audio",
				name: "Audio",
				component: () => import("../views/matter/audio"),
				meta: { title: "音频管理", icon: "" },
			},
			{
				path: "picture",
				name: "Picture",
				component: () => import("../views/matter/picture"),
				meta: { title: "图片管理", icon: "" },
			},
		],
	},
	{
		path: "/expansion",
		component: Layout,
		// redirect: "/matter/model",
		name: "expansion",
		meta: { title: "展项设置管理模块", icon: "" },
		children: [
			{
				path: "content",
				name: "Content",
				component: () => import("../views/expansion/content"),
				meta: { title: "内容管理", icon: "" },
			},
			{
				path: "configuration",
				name: "Configuration",
				component: () => import("../views/expansion/configuration"),
				meta: { title: "配置管理", icon: "" },
			},
		],
	},
	{
		path: "/environment",
		component: Layout,
		// redirect: "/environment/equipment",
		name: "environment",
		meta: { title: "场景环境控制模块", icon: "" },
		children: [
			{
				path: "scene",
				name: "Scene",
				component: () => import("../views/environment/scene"),
				meta: { title: "场景监控", icon: "" },
			},
			{
				path: "equipment",
				name: "Equipment",
				component: () => import("../views/environment/equipment"),
				meta: { title: "设备监控", icon: "" },
			},
			{
				path: "role",
				name: "Rule",
				component: () => import("../views/environment/rule"),
				meta: { title: "规则配置", icon: "" },
			},
			{
				path: "terminal",
				name: "Terminal",
				component: () => import("../views/environment/terminal"),
				meta: { title: "终端配置", icon: "" },
			},
		],
	},
	{
		path: "/system",
		component: Layout,
		// redirect: "/system/equipment",
		name: "system",
		meta: { title: "系统设置模块", icon: "" },
		children: [
			{
				path: "equipment",
				name: "Equipment",
				component: () => import("../views/system/equipment"),
				meta: { title: "设备管理", icon: "" },
			},
			{
				path: "use",
				name: "Use",
				component: () => import("../views/system/use"),
				meta: { title: "用户管理", icon: "" },
			},
			{
				path: "role",
				name: "Role",
				component: () => import("../views/system/role"),
				meta: { title: "角色管理", icon: "" },
			},
			{
				path: "dictionaries",
				name: "Dictionaries",
				component: () => import("../views/system/dictionaries"),
				meta: { title: "字典管理", icon: "" },
			},
		],
	},
	{
		path: "*",
		redirect: "/",
		hidden: true,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
