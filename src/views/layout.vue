<!-- 框架页 -->
<template>
	<div class="main">
		<div class="head">
			<span>标题</span>
		</div>
		<div class="mBody">
			<div class="menu">
				<el-menu :default-active="activeMenu" :collapse="false" background-color="#ffffff" text-color="#303133" :unique-opened="false" active-text-color="#409EFF" :collapse-transition="false" mode="vertical">
					<!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
					<template v-for="route in routes">
						<div v-if="!route.hidden" :key="route.path">
							<template v-if="hasOneShowingChild(route.children, route) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !route.alwaysShow">
								<app-link v-if="onlyOneChild.meta" :to="resolvePath(route.path, onlyOneChild.path)">
									<el-menu-item :index="resolvePath(route.path, onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
										<!-- <item :icon="onlyOneChild.meta.icon || (route.meta && route.meta.icon)" :title="onlyOneChild.meta.title" /> -->
									</el-menu-item>
								</app-link>
							</template>

							<el-submenu v-else ref="subMenu" :index="resolvePath(route.path, route.path)" popper-append-to-body>
								<template slot="title">
									<item v-if="route.meta" :icon="route.meta && route.meta.icon" :title="route.meta.title" />
								</template>
								<sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(route.path, child.path)" class="nest-menu" />
							</el-submenu>
						</div>
					</template>
				</el-menu>
			</div>
			<router-view :key="key" />
		</div>
	</div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";

export default {
	data() {
		return {
			onlyOneChild: null,
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
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},
	},

	mounted() {},

	methods: {
		hasOneShowingChild(children = [], parent) {
			const showingChildren = children.filter((item) => {
				if (item.hidden) {
					return false;
				} else {
					// Temp set(will be used if only has one showing child)
					this.onlyOneChild = item;
					return true;
				}
			});

			// When there is only one child router, the child router is displayed by default
			if (showingChildren.length === 1) {
				return true;
			}

			// Show parent if there are no child router to display
			if (showingChildren.length === 0) {
				this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
				return true;
			}

			return false;
		},
		resolvePath(basePath, routePath) {
			if (isExternal(routePath)) {
				return routePath;
			}
			if (isExternal(basePath)) {
				return basePath;
			}
			return path.resolve(basePath, routePath);
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
		-webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
	}
}
</style>
