<!-- 框架页 -->
<template>
	<div>
		框架页
		<router-view :key="key" />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},

	components: {},

	computed: {
		key() {
			return this.$route.path;
		},
	},

	mounted() {},

	methods: {},
};
</script>
<style lang="scss" scoped></style>
