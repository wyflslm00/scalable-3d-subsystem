<!-- 框架页 -->
<template>
	<div class="main">
		<div class="head">
			<span class="title">可扩展三维展示控制管理系统</span>
		</div>
		<div class="mBody">
			<div class="menu">
				<el-menu router :default-active="$route.path" :unique-opened="true">
					<template v-for="(route, index) in routes">
						<el-submenu :index="index" :key="'sub' + index" v-if="!route.hidden">
							<template slot="title">{{ route.meta.title }}</template>
							<template v-if="route.children">
								<el-menu-item v-for="(child, idx) in route.children" :key="'child' + idx" :index="resolvePath(route.path, child.path)">{{ child.meta.title }}</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</el-menu>
				<!-- {{ routes }} -->
			</div>
			<div class="navigation">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-for="nav in naviList">{{ nav }}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<router-view class="container" :key="key" />
		</div>
	</div>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
	data() {
		return {
			naviList: [],
		};
	},

	components: {},

	computed: {
		key() {
			return this.$route.path;
		},
		routes() {
			return this.$router.options.routes;
		},
		activeMenu() {
			const route = this.$route;
			const { meta, path } = route;
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},
	},

	mounted() {
		console.log(this.$router.options.routes);
	},

	methods: {
		resolvePath(basePath, routePath) {
			if (isExternal(routePath)) {
				return routePath;
			}
			if (isExternal(basePath)) {
				return basePath;
			}
			return `${basePath}/${routePath}`;
		},
	},
	watch: {
		$route: {
			handler(to, from) {
				this.naviList = [];
				const matched = to.matched;
				matched.map((x) => {
					this.naviList.push(x.meta.title);
				});
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.main {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.head {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #fff;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
		align-content: center;
		padding-left: 20px;
		.title {
			line-height: 50px;
			font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
			font-size: 18px;
			font-weight: 700;
			color: #4f4f4f;
		}
	}
	.mBody {
		position: absolute;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 0;

		.menu {
			position: absolute;
			width: 220px;
			top: 0;
			left: 0;
			bottom: 0;
			border-right: 1px solid #dbdbdb;
		}

		.navigation {
			position: absolute;
			top: 0px;
			left: 220px;
			right: 0;
			height: 40px;
			border-bottom: 1px solid #dbdbdb;
			display: flex;
			align-items: center;
			padding-left: 12px;
		}

		.container {
			position: absolute;
			top: 40px;
			left: 220px;
			right: 0;
			bottom: 0;
		}
	}
}
</style>
