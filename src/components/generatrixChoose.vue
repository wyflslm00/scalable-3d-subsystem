<template>
	<div class="legend_panel">
		<img v-if="linkLineError" width="180" height="165" src="@/assets/images/error/generatrix-error.png" alt="">
		<svg v-else width="180" height="165" viewBox="0 0 180 165" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 4H93V160.5H172" stroke="#424C59" stroke-width="2" />
			<circle cx="92.5" cy="160" r="3.5" transform="rotate(-90 92.5 160)" fill="white" stroke="#424C59" />
			<circle cx="4" cy="4" r="3.5" transform="rotate(-90 4 4)" fill="white" stroke="#424C59" />
			<circle cx="176" cy="161" r="3.5" transform="rotate(-90 176 161)" fill="white" stroke="#424C59" />
			<circle cx="93" cy="4" r="3.5" transform="rotate(-90 93 4)" fill="white" stroke="#424C59" />
		</svg>
	</div>
</template>

<script>
export default {
	props:['linkLineError'],
	data() {
		return {};
	},
	methods: {},
	watch: {},
};
</script>

<style lang="scss" scoped>
.legend_panel {
	display: flex;
	height: 400px;
	width: 734px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
</style>
