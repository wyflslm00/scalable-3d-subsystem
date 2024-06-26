<template>
	<div class="legend_panel">
		<div class="legend" :style="{ height: disHeight + 'px', width: disWidth + 'px' }">
			
			<!-- <div class="center_panel" :style="{ width: (disWidth <= 20 ? disWidth - 4 : disWidth) + 'px' }">
				<div class="txt" v-for="(item, i) in cTxts" :class="[item.code]" :style="{ visibility: item.visible ? 'visible' : 'hidden', width: (disWidth <= 20 ? disWidth - 4 : disWidth) + 'px' }"></div>
			</div> -->
			<!-- <div class="top_panel">
				<div class="txt" v-for="(item, i) in tTxts" :class="[item.code]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }"></div>
			</div> -->
			<!-- <div class="btm_panel">
				<div class="txt" v-for="(item, i) in bTxts" :class="[item.code]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }"></div>
			</div> -->
			<!-- <div class="lft_panel">
				<div class="txt" v-for="(item, i) in lTxts" :class="[item.code]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }"></div>
			</div> -->
			<!-- <div class="rgt_panel">
				<div class="txt" v-for="(item, i) in rTxts" :class="[item.code]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }"></div>
			</div> -->
		</div>
	</div>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";

export default {
	data() {
		return {
			vis_lr2: true,
			vis_lr1: true,

			disWidth: 0,
			disHeight: 0,

			cTxts: [
				{
					code: "C1",
					direction: "C", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 0, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
					visible: false,
				},
				{
					code: "C2",
					direction: "C", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 0, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
					visible: false,
				},
				{
					code: "C3",
					direction: "C", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 0, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
					visible: false,
				},
			],
			tTxts: [
				{
					code: "T2",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 38, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
					visible: false,
				},
				{
					code: "T1",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
					visible: false,
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
					visible: false,
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
					visible: false,
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
					visible: false,
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
					visible: false,
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
					visible: false,
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
					visible: false,
				},
			],
		};
	},
	props: {
		queryBody: {
			type: Object,
			default: function () {},
		},
	},
	methods: {
		changeText() {
			// let textList = [];
			// let t = this.tTxts.filter((x) => x.checked == true);
			// let b = this.bTxts.filter((x) => x.checked == true);
			// let l = this.lTxts.filter((x) => x.checked == true);
			// let r = this.rTxts.filter((x) => x.checked == true);
			// textList = textList.concat(t).concat(b).concat(l).concat(r);

			const params = {
				templateId: this.queryBody.templateId,
				operate: "text",
				containerId: this.queryBody.containerId,
				// textList: _.map(textList, "code"),
			};
			GetAdmData.textsModify(params).then((result) => {});
		},

		setLegendSize(size) {
			let bl = size.y / 70 > size.x / 70 ? size.y / 70 : size.x / 70;

			this.disWidth = size.x / bl < 20 ? 20 : size.x / bl;
			this.disHeight = size.y / bl < 20 ? 20 : size.y / bl;
		},
		setTexts(texts) {
			this.cTxts.forEach((item) => {
				item.visible = false;
			});
			this.tTxts.forEach((item) => {
				item.visible = false;
			});
			this.bTxts.forEach((item) => {
				item.visible = false;
			});
			this.lTxts.forEach((item) => {
				item.visible = false;
			});
			this.rTxts.forEach((item) => {
				item.visible = false;
			});

			let c = texts.filter((x) => x.direction == "C");
			let t = texts.filter((x) => x.direction == "T");
			let b = texts.filter((x) => x.direction == "B");
			let l = texts.filter((x) => x.direction == "L");
			let r = texts.filter((x) => x.direction == "R");

			c.forEach((item) => {
				item.visible = true;
			});
			t.forEach((item) => {
				item.visible = true;
			});
			b.forEach((item) => {
				item.visible = true;
			});
			l.forEach((item) => {
				item.visible = true;
			});
			r.forEach((item) => {
				item.visible = true;
			});

			this.cTxts = Object.values([].concat(this.cTxts, c).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.tTxts = Object.values([].concat(this.tTxts, t).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.bTxts = Object.values([].concat(this.bTxts, b).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.lTxts = Object.values([].concat(this.lTxts, l).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.rTxts = Object.values([].concat(this.rTxts, r).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
		},
		setTextVisible(texts) {
			this.cTxts.map((x) => {
				x.visible = false;
			});
			this.tTxts.map((x) => {
				x.visible = false;
			});
			this.bTxts.map((x) => {
				x.visible = false;
			});
			this.lTxts.map((x) => {
				x.visible = false;
			});
			this.rTxts.map((x) => {
				x.visible = false;
			});

			texts.forEach((v1) => {
				this.cTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.visible = true;
					}
				});
				this.tTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.visible = true;
					}
				});
				this.bTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.visible = true;
					}
				});
				this.lTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.visible = true;
					}
				});
				this.rTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.visible = true;
					}
				});
			});
		},
	},
	watch: {
		queryBody: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (JSON.stringify(val) == "{}" || !val.legendContent) {
					return;
				}

				this.setLegendSize(val.legendContent.size);
				// this.setTexts(val.legendContent.texts);
				// this.setTextVisible(val.textList);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.legend_panel {
	display: flex;
	height: 220px;
	width: 276px;
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
		align-items: center;
		background: #f1f4f6;
		border: 2px solid #246fe5;

		.txt {
			width: 50px;
			height: 8px;
			text-align: left;
			display: block;
			background: #fff;
			cursor: pointer;
			flex: 0 0 8px;
			background: #9fc9fb;
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
			top: -8px;
			display: flex;
			justify-content: end;
			flex-direction: column;
			align-items: center;
			gap: 6px;
		}

		.btm_panel {
			position: absolute;
			height: 0;
			width: 0;
			bottom: -8px;
			display: flex;
			// justify-content: center;
			flex-direction: column;
			align-items: center;
			gap: 6px;
		}

		.lft_panel {
			height: 100%;
			position: absolute;
			width: 1px;
			left: -8px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: end;
			gap: 6px;
		}

		.rgt_panel {
			height: 100%;
			position: absolute;
			width: 1px;
			right: -8px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}

		.T1 {
			top: -64px;
		}

		.T2 {
			top: -34px;
		}

		.B1 {
			bottom: -34px;
		}

		.B2 {
			bottom: -64px;
		}

		.L1 {
			right: 0;
			position: static;
		}

		.L2 {
			right: 0;
			position: static;
		}

		.R1 {
			left: 0;
			position: static;
		}

		.R2 {
			left: 0;
			position: static;
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
					width: 9px;
					height: 9px;
					border-radius: 50%;
					background: #fff;
					border: 1.5px solid #64a6f7;
					cursor: pointer;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.anchor_complete {
					background: #cbf7f3;
					border: 1.5px solid #cbf7f3;
				}

				.anchor_chk {
					background: #246fe5;
					border: 1.5px solid #246fe5;
				}
				.multiple-L {
					position: relative;
					.anchor-bor {
						position: absolute;
						left: 0.5px;
						top: -0px;
						display: block;
						width: 0;
						height: 0;
						border-top: 4px solid transparent;
						border-bottom: 4px solid transparent;
						border-right: none;
						border-left: 9px solid #64a6f7;
						transform: scale(1.4);
					}
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: 4px solid transparent;
						border-bottom: 4px solid transparent;
						border-right: none;
						border-left: 9px solid #fff;
					}
					.anchor_chk {
						border-left: 9px solid #246fe5 !important;
					}
					.anchor_complete {
						border-left: 9px solid #cbf7f3;
					}
				}
				.multiple-B {
					position: relative;
					.anchor-bor {
						position: absolute;
						left: 0px;
						top: -0.5px;
						display: block;
						width: 0;
						height: 0;
						border-top: none;
						border-bottom: 9px solid #64a6f7;
						border-right: 4px solid transparent;
						border-left: 4px solid transparent;
						transform: scale(1.4);
					}
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: none;
						border-bottom: 9px solid #fff;
						border-right: 4px solid transparent;
						border-left: 4px solid transparent;
					}
					.anchor_chk {
						border-bottom: 9px solid #246fe5 !important;
					}
					.anchor_complete {
						border-bottom: 9px solid #cbf7f3;
					}
				}
				.multiple-T {
					position: relative;
					.anchor-bor {
						position: absolute;
						left: 0px;
						top: 0.5px;
						display: block;
						width: 0;
						height: 0;
						border-top: 9px solid #64a6f7;
						border-bottom: none;
						border-right: 4px solid transparent;
						border-left: 4px solid transparent;
						transform: scale(1.4);
					}
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: 9px solid #fff;
						border-bottom: none;
						border-right: 4px solid transparent;
						border-left: 4px solid transparent;
					}
					.anchor_chk {
						border-top: 9px solid #246fe5 !important;
					}
					.anchor_complete {
						border-top: 9px solid #cbf7f3;
					}
				}
				.multiple-R {
					position: relative;
					.anchor-bor {
						position: absolute;
						left: 0px;
						top: -0px;
						display: block;
						width: 0;
						height: 0;
						border-top: 4px solid transparent;
						border-bottom: 4px solid transparent;
						border-right: 9px solid #64a6f7;
						border-left: none;
						transform: scale(1.3);
					}
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: 4px solid transparent;
						border-bottom: 4px solid transparent;
						border-right: 9px solid #fff;
						border-left: none;
					}
					.anchor_chk {
						border-right: 9px solid #246fe5 !important;
					}
					.anchor_complete {
						border-right: 9px solid #cbf7f3;
					}
				}
			}
		}

		// .tAnchor,
		// .bAnchor {
		// }

		.lAnchor,
		.rAnchor {
			flex-direction: column;
			height: 83.33%;
			width: 0px;
			top: 8.33%;
			// overflow-y: clip;

			.grid {
				.anchor {
					flex: 0 0 9px;
				}
			}
		}

		.tAnchor {
			top: -1px;
			.a_txt {
				position: absolute;
				color: #14c4c4;
				font-weight: 400;
				font-family: "Microsoft YaHei UI";
				width: 20px;
				bottom: 8px;
				text-align: center;
			}
		}

		.bAnchor {
			bottom: -1px;
			.a_txt {
				position: absolute;
				color: #14c4c4;
				font-weight: 400;
				font-family: "Microsoft YaHei UI";
				width: 20px;
				top: 8px;
				text-align: center;
			}
		}

		.lAnchor {
			left: -1px;
			.a_txt {
				position: absolute;
				color: #14c4c4;
				font-weight: 400;
				font-family: "Microsoft YaHei UI";
				width: 20px;
				right: 8px;
				text-align: center;
			}
		}

		.rAnchor {
			right: -1px;
			.a_txt {
				position: absolute;
				color: #14c4c4;
				font-weight: 400;
				font-family: "Microsoft YaHei UI";
				width: 20px;
				left: 8px;
				text-align: center;
			}
		}
	}
}
</style>
