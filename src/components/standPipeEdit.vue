<template>
	<div class="legend_panel">
		<div class="legend">
			<!-- <div class="pipe" v-for="item in pipeList" :class="[{ 'pipe_chk_no':item.checked }]" @click="changePipe(item)"></div> -->

			<template v-for="(item, i) in pipeList">
				<el-tooltip class="item" effect="dark" placement="bottom" :key="'p' + i">
					<div class="pipe" :class="[{ pipe_chk_no: item.checked }]" @click="changePipe(item)"></div>
					<div slot="content">{{ item.name + "(" + item.typeName + ")" }}</div>
				</el-tooltip>
			</template>
		</div>
	</div>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";

export default {
	data() {
		return {
			pipeList: [],
		};
	},
	props: {
		queryBody: {
			type: Object,
			default: function () {},
		},
		addChangedAnchor: {},
	},
	methods: {
		changePipe(item) {
			return
			item.checked = !item.checked;
			item.classCode = item.equipmentTypes[0];
			item.templateid = this.$route.query.templateid;
			this.pipeList = this.pipeList.concat([]);
			this.$emit("allAnchor", this.pipeList);
		},
		async getChangedAnchors() {
			let marker = this.pipeList.filter((x) => x.checked1 == true && x.locked == false);
			return marker;
		},
	},
	watch: {
		queryBody: {
			deep: true,
			immediate: true,
			handler: function (val) {
				console.error(val)
				val.children.map((x) => {
					x.checked = true;
				});
				this.pipeList = val.children;
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.legend_panel {
	display: flex;
	height: 400px;
	width: 734px;
	background: #f1f4f6;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// width: fit-content;

	.legend {
		background: red;
		position: relative;
		display: flex;
		justify-content: center;
		background: #ffffff;
		height: 184px;
		padding-right: 18px;

		.pipe {
			width: 4px;
			background: #d9ebff;
			float: left;
			margin-left: 18px;
			cursor: pointer;
			transition: 0.5s;
		}

		.pipe:hover {
			// width: 8px;
			-webkit-transform: scaleX(2);
		}

		.pipe_chk_no {
			background: #246fe5;
		}

		.pipe_unchhk_yes {
			background: #cbf7f3;
		}

		.pipe_chk_yes {
			background: #14c4c4;
		}
	}
}
</style>
