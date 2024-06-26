<!-- 编辑锚点 -->
<template>
	<div class="legend_panel">
		<div class="legend" :style="{ height: disHeight + 'px', width: disWidth + 'px' }">
			<!-- <div class="top_panel">
				<div class="txt" v-for="(item, i) in tTxts" :class="[item.code, { txt_chk: item.checked }]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }">
					<el-checkbox :label="item.code" v-model="item.checked" @change="changeText"></el-checkbox>
				</div>
			</div>
			<div class="btm_panel">
				<div class="txt" v-for="(item, i) in bTxts" :class="[item.code, { txt_chk: item.checked }]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }">
					<el-checkbox :label="item.code" v-model="item.checked" @change="changeText"></el-checkbox>
				</div>
			</div>
			<div class="lft_panel">
				<div class="txt" v-for="(item, i) in lTxts" :class="[item.code, { txt_chk: item.checked }]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }" v-show="item.code == 'L1' ? vis_lr1 : vis_lr2">
					<el-checkbox :label="item.code" v-model="item.checked" @change="changeText"></el-checkbox>
				</div>
			</div>
			<div class="rgt_panel">
				<div class="txt" v-for="(item, i) in rTxts" :class="[item.code, { txt_chk: item.checked }]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }" v-show="item.code == 'R1' ? vis_lr1 : vis_lr2">
					<el-checkbox :label="item.code" v-model="item.checked" @change="changeText"></el-checkbox>
				</div>
			</div> -->

			<div class="tAnchor">
				<div class="grid" v-for="(item, i) in tAnchor" :key="'t' + i">
					<div :class="[{ 'multiple-T': item.multiple }]">
						<div class="anchor" :class="[{ anchor_chk: item.checked }, { anchor_locked: item.locked }]" v-show="item.visible" @click="changeAnchor('tAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bAnchor">
				<div class="grid" v-for="(item, i) in bAnchor" :key="'b' + i">
					<div :class="[{ 'multiple-B': item.multiple }]">
						<div class="anchor" :class="[{ anchor_chk: item.checked }, { anchor_locked: item.locked }]" v-show="item.visible" @click="changeAnchor('bAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="lAnchor">
				<div class="grid" v-for="(item, i) in lAnchor" :key="'l' + i">
					<div :class="{ 'multiple-L': item.multiple }">
						<div class="anchor" :class="[{ anchor_chk: item.checked }, { anchor_locked: item.locked }]" v-show="item.visible" @click="changeAnchor('lAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="rAnchor">
				<div class="grid" v-for="(item, i) in rAnchor" :key="'r' + i">
					<div :class="{ 'multiple-R': item.multiple }">
						<div class="anchor" :class="[{ anchor_chk: item.checked }, { anchor_locked: item.locked }]" v-show="item.visible" @click="changeAnchor('rAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";

export default {
	data() {
		return {
			disWidth: 0,
			disHeight: 0,

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
					visible: false,
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

			tAnchor: [
				{
					code: "T1",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "T2",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "T3",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "T4",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "T5",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
			],
			bAnchor: [
				{
					code: "B1",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "B2",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "B3",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "B4",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "B5",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
			],
			lAnchor: [
				{
					code: "L1",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "L2",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "L3",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "L4",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "L5",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
			],
			rAnchor: [
				{
					code: "R1",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "R2",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "R3",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "R4",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
				{
					code: "R5",
					multiple: false,
					checked: false,
					visible: true,
					locked: false,
				},
			],
		};
	},
	props: {
		queryBody: {
			type: Object,
			default: {},
		},
	},
	methods: {
		changeAnchor(anchorObj, item) {
			if (item.locked) return;

			// this.tAnchor.forEach((item) => {
			// 	item.checked = false;
			// });
			// this.bAnchor.forEach((item) => {
			// 	item.checked = false;
			// });
			// this.lAnchor.forEach((item) => {
			// 	item.checked = false;
			// });
			// this.rAnchor.forEach((item) => {
			// 	item.checked = false;
			// });

			item.checked = !item.checked;

			const list = this.getChangedAnchors();
			this.$emit("allAnchor", list, item);
		},
		getChangedAnchors() {
			let t = this.tAnchor.filter((x) => x.visible);
			let b = this.bAnchor.filter((x) => x.visible);
			let l = this.lAnchor.filter((x) => x.visible);
			let r = this.rAnchor.filter((x) => x.visible);

			let lst = [];
			return lst.concat(t).concat(b).concat(l).concat(r);
		},
		async getTextsAnchor(data) {
			let params = {
				templateId: data.templateId,
				operate: "text-line",
				containerId: data.containerId,
			};
			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			await GetAdmData.getInstantiationDetail(params).then((result) => {
				if (result.result == "success") {
					let rst = result.data;

					if (JSON.stringify(this.queryBody) != "{}" && this.queryBody.typeCode == "group" && this.queryBody.groupCode == "equipment") {
						this.setLegendRoomSize();
						this.setMultipleRoom(rst.anchorDetailMap);
						this.setAnchorRoom(rst.lineListMap);
					} else {
						this.setLegendSize(rst.legend.legendContent.size);
						this.setAnchor(rst.legend.legendContent.anchors, rst.anchorDetailMap);
					}

					const list = this.getChangedAnchors();
					this.$emit("allAnchor", list);
				}

				this.$loading().close();
			});
		},
		setLegendSize(size) {
			let bl = size.x / 140;
			let bl1 = size.y / 200;

			bl = bl1 > bl ? bl1 : bl;

			this.disWidth = size.x / bl < 60 ? 60 : size.x / bl;
			this.disHeight = size.y / bl < 58 ? 58 : size.y / bl;
		},
		setLegendRoomSize() {
			this.disWidth = 82;
			this.disHeight = 82;
		},
		setAnchor(anchors, anchorDetailMap) {
			const childs = this.queryBody.childNode || [];

			this.tAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
			this.bAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
			this.lAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
			this.rAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});

			let t = anchors.filter((x) => x.code.indexOf("T") > -1);
			let b = anchors.filter((x) => x.code.indexOf("B") > -1);
			let l = anchors.filter((x) => x.code.indexOf("L") > -1);
			let r = anchors.filter((x) => x.code.indexOf("R") > -1);

			t.forEach((item) => {
				item.visible = true;
				item.anchorCode = item.code;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
					item.equipments = anchorInfo.equipments;
				}
			});
			b.forEach((item) => {
				item.visible = true;
				item.anchorCode = item.code;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
					item.equipments = anchorInfo.equipments;
				}
			});
			l.forEach((item) => {
				item.visible = true;
				item.anchorCode = item.code;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
					item.equipments = anchorInfo.equipments;
				}
			});
			r.forEach((item) => {
				item.visible = true;
				item.anchorCode = item.code;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
					item.equipments = anchorInfo.equipments;
				}
			});

			let lockT = this.queryBody.anchors.filter((x) => x.code.indexOf("T") > -1);
			let lockB = this.queryBody.anchors.filter((x) => x.code.indexOf("B") > -1);
			let lockL = this.queryBody.anchors.filter((x) => x.code.indexOf("L") > -1);
			let lockR = this.queryBody.anchors.filter((x) => x.code.indexOf("R") > -1);

			// lockT.forEach((item) => {
			// 	if (item.code == this.editChangedAnchor.code) {
			// 		item.locked = false;
			// 		item.checked = true;
			// 	} else {
			// 		item.locked = true;
			// 	}
			// });
			// lockB.forEach((item) => {
			// 	if (item.code == this.editChangedAnchor.code) {
			// 		item.locked = false;
			// 		item.checked = true;
			// 	} else {
			// 		item.locked = true;
			// 	}
			// });
			// lockL.forEach((item) => {
			// 	if (item.code == this.editChangedAnchor.code) {
			// 		item.locked = false;
			// 		item.checked = true;
			// 	} else {
			// 		item.locked = true;
			// 	}
			// });
			// lockR.forEach((item) => {
			// 	if (item.code == this.editChangedAnchor.code) {
			// 		item.locked = false;
			// 		item.checked = true;
			// 	} else {
			// 		item.locked = true;
			// 	}
			// });

			this.tAnchor = Object.values([].concat(this.tAnchor, t).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.bAnchor = Object.values([].concat(this.bAnchor, b).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.lAnchor = Object.values([].concat(this.lAnchor, l).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.rAnchor = Object.values([].concat(this.rAnchor, r).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));

			this.tAnchor = Object.values([].concat(this.tAnchor, lockT).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.bAnchor = Object.values([].concat(this.bAnchor, lockB).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.lAnchor = Object.values([].concat(this.lAnchor, lockL).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.rAnchor = Object.values([].concat(this.rAnchor, lockR).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
		},
		setAnchorRoom(lineListMap) {
			const childs = this.queryBody.childNode || [];

			this.tAnchor.forEach((item) => {
				item.checked = false;
				item.visible = true;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
			this.bAnchor.forEach((item) => {
				item.checked = false;
				item.visible = true;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
			this.lAnchor.forEach((item) => {
				item.checked = false;
				item.visible = true;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
			this.rAnchor.forEach((item) => {
				item.checked = false;
				item.visible = true;
				item.locked = false;

				childs.forEach((c) => {
					if (item.code == c.code) item.checked = c.checked;
				});
			});
		},
		setMultipleRoom(anchorDetailMap) {
			const keys = Object.keys(anchorDetailMap);
			keys.map((x) => {
				this.tAnchor.map((y) => {
					if (x == y.code) {
						y.multiple = anchorDetailMap[x].multiple;
						y.equipment = anchorDetailMap[x].equipment;
					}
				});
				this.bAnchor.map((y) => {
					if (x == y.code) {
						y.multiple = anchorDetailMap[x].multiple;
						y.equipment = anchorDetailMap[x].equipment;
					}
				});
				this.lAnchor.map((y) => {
					if (x == y.code) {
						y.multiple = anchorDetailMap[x].multiple;
						y.equipment = anchorDetailMap[x].equipment;
					}
				});
				this.rAnchor.map((y) => {
					if (x == y.code) {
						y.multiple = anchorDetailMap[x].multiple;
						y.equipment = anchorDetailMap[x].equipment;
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
				this.getTextsAnchor(val);
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
		background: #f1f4f6;
		border: 2px solid #246fe5;

		.txt {
			width: 100px;
			height: 34px;
			line-height: 34px;
			text-align: left;
			display: block;
			// position: absolute;
			background: #fff;
			cursor: pointer;
			flex: 0 0 26px;
			border-radius: 56px;
			color: #626c78;
			font-family: "Microsoft YaHei UI";
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
		}

		.txt_chk {
			background: #d9ebff;
			color: #246fe5;
		}

		.top_panel {
			position: absolute;
			height: 0;
			width: 0;
			top: -26px;
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
			bottom: -26px;
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
			left: -26px;
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
			right: -26px;
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

				.anchor_chk {
					background: #14c4c4;
					border: 1.5px solid #14c4c4;
				}

				.anchor_locked {
					background: #8d9399;
					border: 1.5px solid #8d9399;
				}
				.multiple-L {
					position: relative;
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: 4px solid transparent;
						border-bottom: 4px solid transparent;
						border-right: none;
						border-left: 9px solid #8d9399;
						position: absolute;
						left: -2.5px;
						cursor: pointer;
					}
					.anchor_chk {
						border-left-color: #14c4c4;
					}
					.anchor_locked {
						border-left-color: #8d9399;
					}
				}
				.multiple-B {
					position: relative;
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: none;
						border-bottom: 9px solid #8d9399;
						border-right: 4px solid transparent;
						border-left: 4px solid transparent;
						position: absolute;
						top: -3.5px;
						cursor: pointer;
					}
					.anchor_chk {
						border-bottom: 9px solid #14c4c4;
					}
					.anchor_locked {
						border-bottom: 9px solid #8d9399;
					}
				}
				.multiple-T {
					position: relative;
					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: 9px solid #8d9399;
						border-bottom: none;
						border-right: 4px solid transparent;
						border-left: 4px solid transparent;
						position: absolute;
						top: -3.5px;
						cursor: pointer;
					}
					.anchor_chk {
						border-top: 9px solid #14c4c4;
					}
					.anchor_locked {
						border-top: 9px solid #8d9399;
					}
				}
				.multiple-R {
					position: relative;

					.anchor {
						width: 0;
						height: 0;
						border-radius: 0;
						background: transparent;
						border-top: 4px solid transparent;
						border-bottom: 4px solid transparent;
						border-right: 9px solid #8d9399;
						border-left: none;
						position: absolute;
						left: -4.5px;
						cursor: pointer;
					}
					.anchor_chk {
						border-right: 9px solid #14c4c4;
					}
					.anchor_locked {
						border-right: 9px solid #8d9399;
					}
				}
			}
		}

		.lAnchor,
		.rAnchor {
			flex-direction: column;
			height: 83.33%;
			width: 0px;
			top: 8.33%;

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
