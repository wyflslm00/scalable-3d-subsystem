<template>
	<div class="legend_panel">
		<div class="legend" :style="{ height: realHeight + 'px', width: realWidth + 'px' }">
			<!-- <template v-for="obj in legendObj.legendContent.texts">
				<div class="center_panel" v-if="obj.direction == 'C'" :style="{ width: (realWidth <= 50 ? realWidth - 4 : 50) + 'px' }">
					<div class="txt T1" :style="{ visibility: obj.code == 'C1' ? 'visible' : 'hidden', width: (realWidth <= 50 ? realWidth - 4 : 50) + 'px' }"></div>
					<div class="txt T2" :style="{ visibility: obj.code == 'C2' ? 'visible' : 'hidden', width: (realWidth <= 50 ? realWidth - 4 : 50) + 'px' }"></div>
					<div class="txt T3" :style="{ visibility: obj.code == 'C3' ? 'visible' : 'hidden', width: (realWidth <= 50 ? realWidth - 4 : 50) + 'px' }"></div>
				</div>

				<div class="top_panel" v-if="obj.direction == 'T'">
					<div class="txt T1" :style="{ visibility: obj.code == 'T1' ? 'visible' : 'hidden' }"></div>
					<div class="txt T2" :style="{ visibility: obj.code == 'T2' ? 'visible' : 'hidden' }"></div>
				</div>

				<div class="btm_panel" v-if="obj.direction == 'B'">
					<div class="txt B1" :style="{ visibility: obj.code == 'B1' ? 'visible' : 'hidden' }"></div>
					<div class="txt B2" :style="{ visibility: obj.code == 'B2' ? 'visible' : 'hidden' }"></div>
				</div>

				<div class="lft_panel" v-if="obj.direction == 'L'">
					<div class="txt L1" :style="{ visibility: obj.code == 'L1' ? 'visible' : 'hidden' }" v-show="vis_lr1"></div>
					<div class="txt L2" :style="{ visibility: obj.code == 'L2' ? 'visible' : 'hidden' }" v-show="vis_lr2"></div>
				</div>

				<div class="rgt_panel" v-if="obj.direction == 'R'">
					<div class="txt R1" :style="{ visibility: obj.code == 'R1' ? 'visible' : 'hidden' }" v-show="vis_lr1"></div>
					<div class="txt R2" :style="{ visibility: obj.code == 'R2' ? 'visible' : 'hidden' }" v-show="vis_lr2"></div>
				</div>
			</template> -->

			<div class="tAnchor">
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'T1'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'T2'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'T3'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'T4'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'T5'"></div>
				</div>
			</div>

			<div class="bAnchor">
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'B1'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'B2'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'B3'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'B4'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'B5'"></div>
				</div>
			</div>

			<div class="lAnchor">
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'L1'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'L2'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'L3'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'L4'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'L5'"></div>
				</div>
			</div>

			<div class="rAnchor">
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'R1'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'R2'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'R3'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'R4'"></div>
				</div>
				<div class="grid">
					<div class="anchor" v-for="obj in legendObj.legendContent.anchors" v-show="obj.code == 'R5'"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			vis_lr2: true,
			vis_lr1: true,

			realWidth: 0,
			realHeight: 0,

			cTxts: [
				{
					code: "C1",
					direction: "C",
					vertical: false,
					max_length_px: 130,
					width_px: 26,
					interval: 0,
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "C2",
					direction: "C",
					vertical: false,
					max_length_px: 130,
					width_px: 26,
					interval: 0,
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "C3",
					direction: "C",
					vertical: false,
					max_length_px: 130,
					width_px: 26,
					interval: 0,
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
			],
			tTxts: [
				{
					code: "T1",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 38, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T2",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
			],
			bTxts: [
				{
					code: "B1",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B2",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 38, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
			],
			lTxts: [
				{
					code: "L1",
					direction: "L", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: -15,
					},
					checked: false,
				},
				{
					code: "L2",
					direction: "L", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 15,
					},
					checked: false,
				},
			],
			rTxts: [
				{
					code: "R1",
					direction: "R", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: -15,
					},
					checked: false,
				},
				{
					code: "R2",
					direction: "R", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 15,
					},
					checked: false,
				},
			],

			tAnchor: [
				{
					code: "T1",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "T2",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "T3",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "T4",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "T5",
					multiple: false,
					checked: false,
					vis: true,
				},
			],
			bAnchor: [
				{
					code: "B1",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "B2",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "B3",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "B4",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "B5",
					multiple: false,
					checked: false,
					vis: true,
				},
			],
			lAnchor: [
				{
					code: "L1",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "L2",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "L3",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "L4",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "L5",
					multiple: false,
					checked: false,
					vis: true,
				},
			],
			rAnchor: [
				{
					code: "R1",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "R2",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "R3",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "R4",
					multiple: false,
					checked: false,
					vis: true,
				},
				{
					code: "R5",
					multiple: false,
					checked: false,
					vis: true,
				},
			],
		};
	},
	props: {
		legendObj: {
			type: Object,
			default: {},
		},
		isEdit: false, //true 用于图例库   false 用于模版引用
	},
	methods: {
		getLegendData() {
			let tt = this.tTxts.filter((x) => x.checked == true);
			let bt = this.bTxts.filter((x) => x.checked == true);
			let lt = this.lTxts.filter((x) => x.checked == true);
			let rt = this.rTxts.filter((x) => x.checked == true);
			let txts = [...tt, ...bt, ...lt, ...rt];

			let ta = this.tAnchor.filter((x) => x.checked == true);
			let ba = this.bAnchor.filter((x) => x.checked == true);
			let la = this.lAnchor.filter((x) => x.checked == true);
			let ra = this.rAnchor.filter((x) => x.checked == true);
			let anchors = [...ta, ...ba, ...la, ...ra];

			let data = {
				legendContent: {
					width: this.legendSize.width,
					height: this.legendSize.height,
					texts: txts,
					anchors: anchors,
				},
			};

			this.$emit("changeLegendData", data);
		},
	},
	watch: {
		legendObj: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (this.isEdit) {
					let bl = val.legendContent.size.y / val.legendContent.size.x;
					//默认显示宽度最大 320， 高度 160 ， 所以才会有0.5这个概念
					if (bl <= 0.8) {
						this.realWidth = 160;
						this.realHeight = (160 / val.legendContent.size.x) * val.legendContent.size.y;
					} else {
						this.realHeight = 160;
						this.realWidth = (160 / val.legendContent.size.y) * val.legendContent.size.x;
					}
				} else {
					this.realWidth = val.legendContent.size.x;
					this.realHeight = val.legendContent.size.y;
				}

				// if (this.realHeight < 56) {
				//     this.vis_lr2 = false
				// } else if (this.realHeight < 26) {
				//     this.vis_lr1 = false
				// } else {
				//     this.vis_lr1 = true
				//     this.vis_lr2 = true
				// }
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.legend_panel {
	display: flex;
	height: 100%;
	width: 100%;
	background: #f1f4f6;
	border-radius: 8px 8px 0 0;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// width: fit-content;

	.legend {
		background: red;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ebf6ff;
		border: 1px solid #246fe5;

		.txt {
			width: 50px;
			height: 8px;
			line-height: 34px;
			text-align: left;
			display: block;
			background: #9fc9fb;
			cursor: pointer;
			flex: 0 0 8px;
			color: #626c78;
			font-family: "Microsoft YaHei UI";
			font-size: 14px;
			font-weight: 400;
		}

		.center_panel {
			width: 50px;
			flex-direction: column;
			position: absolute;
			display: flex;
			gap: 3px;

			.txt {
				font-size: 8px;
			}
		}

		.top_panel {
			position: absolute;
			height: 0;
			width: 0;
			top: -6px;
			display: flex;
			justify-content: end;
			flex-direction: column;
			align-items: center;
			gap: 2px;
		}

		.btm_panel {
			position: absolute;
			height: 0;
			width: 0;
			bottom: -6px;
			display: flex;
			// justify-content: center;
			flex-direction: column;
			align-items: center;
			gap: 2px;
		}

		.lft_panel {
			height: 100%;
			position: absolute;
			width: 1px;
			left: -6px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: end;
			gap: 2px;
		}

		.rgt_panel {
			height: 100%;
			position: absolute;
			width: 1px;
			right: -6px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: flex-start;
			gap: 2px;
		}

		.tAnchor,
		.bAnchor,
		.lAnchor,
		.rAnchor {
			position: absolute;
			display: flex;
			flex-direction: row;
			width: 83.33%;
			height: 0px;

			.grid {
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;

				.anchor {
					width: 4px;
					height: 4px;
					border-radius: 50%;
					background: #14c4c4;
					cursor: pointer;
				}

				.anchor_chk {
					background: #14c4c4;
				}
			}
		}

		.tAnchor,
		.bAnchor {
			overflow-x: clip;
		}

		.lAnchor,
		.rAnchor {
			flex-direction: column;
			height: 83.33%;
			width: 0px;
			top: 8.33%;
			overflow-y: clip;

			.grid {
				.anchor {
					flex: 0 0 4px;
				}
			}
		}

		.tAnchor {
			top: -1px;
		}

		.bAnchor {
			bottom: -1px;
		}

		.lAnchor {
			left: -1px;
		}

		.rAnchor {
			right: -1px;
		}
	}
}
</style>
