<template>
	<div class="legend_panel">
		<div class="legend" :style="{ height: disHeight + 'px', width: disWidth + 'px' }">
			<div class="center_panel">
				<div v-for="(item, i) in cTxts" :class="[item.code, { txt_chk: item.checked }]" :style="{ visibility: item.visible ? 'visible' : 'hidden' }">
					<el-checkbox :label="item.code" v-model="item.checked" @change="changeText"></el-checkbox>
				</div>
			</div>
			<div class="top_panel">
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
			</div>

			<div class="tAnchor">
				<div class="grid" v-for="(item, i) in tAnchor">
					<div v-if="item.multiple" :class="[{ 'multiple-T': item.multiple }]">
						<div class="anchor-bor"></div>
						<div class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('tAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
					<div v-else class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('tAnchor', item)">
						<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
					</div>
				</div>
			</div>
			<div class="bAnchor">
				<div class="grid" v-for="(item, i) in bAnchor">
					<div v-if="item.multiple" :class="[{ 'multiple-B': item.multiple }]">
						<div v-show="item.visible" class="anchor-bor"></div>
						<div class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('bAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
					<div v-else class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('bAnchor', item)">
						<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
					</div>
				</div>
			</div>
			<div class="lAnchor">
				<div class="grid" v-for="(item, i) in lAnchor">
					<div v-if="item.multiple" :class="[{ 'multiple-L': item.multiple }]">
						<div v-show="item.visible" class="anchor-bor"></div>
						<div class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('lAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
					<div v-else class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('lAnchor', item)">
						<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
					</div>
				</div>
			</div>
			<div class="rAnchor">
				<div class="grid" v-for="(item, i) in rAnchor">
					<div v-if="item.multiple" :class="[{ 'multiple-R': item.multiple }]">
						<div v-show="item.visible" class="anchor-bor"></div>
						<div class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('rAnchor', item)">
							<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
						</div>
					</div>
					<div v-else class="anchor" :class="[{ anchor_chk: item.checked, anchor_complete: item.complete }]" v-show="item.visible" @click="changeAnchor('rAnchor', item)">
						<div class="a_txt" v-show="item.checked">{{ item.code }}</div>
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
					complete: false,
				},
				{
					code: "T2",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "T3",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "T4",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "T5",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
			],
			bAnchor: [
				{
					code: "B1",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "B2",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "B3",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "B4",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "B5",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
			],
			lAnchor: [
				{
					code: "L1",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "L2",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "L3",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "L4",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "L5",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
			],
			rAnchor: [
				{
					code: "R1",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "R2",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "R3",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "R4",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
				},
				{
					code: "R5",
					multiple: false,
					checked: false,
					visible: true,
					complete: false,
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
			let textList = [];
			let c = this.cTxts.filter((x) => x.checked == true);
			let t = this.tTxts.filter((x) => x.checked == true);
			let b = this.bTxts.filter((x) => x.checked == true);
			let l = this.lTxts.filter((x) => x.checked == true);
			let r = this.rTxts.filter((x) => x.checked == true);
			textList = textList.concat(c).concat(t).concat(b).concat(l).concat(r);

			const params = {
				templateId: this.queryBody.templateId,
				operate: "text",
				containerId: this.queryBody.containerId,
				textList: _.map(textList, "code"),
			};
			GetAdmData.textsModify(params).then((result) => {});
		},
		changeAnchor(anchorObj, item) {
			if (item.checked) {
				item.checked = !item.checked;
				return;
			} else {
				this.tAnchor.forEach((item) => {
					item.checked = false;
				});
				this.bAnchor.forEach((item) => {
					item.checked = false;
				});
				this.lAnchor.forEach((item) => {
					item.checked = false;
				});
				this.rAnchor.forEach((item) => {
					item.checked = false;
				});
				item.checked = !item.checked;
			}
			let eqAnchor = {
				anchorCode: item.code,
				...item,
				...this.queryBody,
			};
			console.log(eqAnchor);
			this.$emit("mainAnchor", eqAnchor);
		},
		setInitAnchorState(anchor) {
			this.tAnchor.forEach((item) => {
				item.checked = false;
				if (item.code == anchor.anchorCode) item.checked = true;
			});
			this.bAnchor.forEach((item) => {
				item.checked = false;
				if (item.code == anchor.anchorCode) item.checked = true;
			});
			this.lAnchor.forEach((item) => {
				item.checked = false;
				if (item.code == anchor.anchorCode) item.checked = true;
			});
			this.rAnchor.forEach((item) => {
				item.checked = false;
				if (item.code == anchor.anchorCode) item.checked = true;
			});
		},
		getLegendData() {
			let cc = this.cTxts.filter((x) => x.checked == true);
			let tt = this.tTxts.filter((x) => x.checked == true);
			let bt = this.bTxts.filter((x) => x.checked == true);
			let lt = this.lTxts.filter((x) => x.checked == true);
			let rt = this.rTxts.filter((x) => x.checked == true);
			let txts = [...cc, ...tt, ...bt, ...lt, ...rt];

			let ta = this.tAnchor.filter((x) => x.checked == true);
			let ba = this.bAnchor.filter((x) => x.checked == true);
			let la = this.lAnchor.filter((x) => x.checked == true);
			let ra = this.rAnchor.filter((x) => x.checked == true);
			let anchors = [...ta, ...ba, ...la, ...ra];

			let data = {
				legendContent: {
					// "width": this.legendSize.width,
					// "height": this.legendSize.height,
					size: {
						x: this.legendSize.width,
						y: this.legendSize.height,
					},
					texts: txts,
					anchors: anchors,
				},
			};

			this.$emit("changeLegendData", data);
		},
		async getTextsAnchor(data) {
			let params = data;
			await GetAdmData.getInstantiationDetail(params).then((result) => {
				if (result.result == "success") {
					let rst = result.data;
					this.setLegendSize(rst.legend.legendContent.size);
					this.setTexts(rst.legend.legendContent.texts);
					this.setAnchor(rst.legend.legendContent.anchors);
					this.setTextVisible(rst.textList);
				}
			});
		},
		setTextVisible(texts) {
			texts.forEach((v1) => {
				this.cTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.checked = true;
					}
				});
				this.tTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.checked = true;
					}
				});
				this.bTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.checked = true;
					}
				});
				this.lTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.checked = true;
					}
				});
				this.rTxts.forEach((v2) => {
					if (v1 == v2.code) {
						v2.checked = true;
					}
				});
			});
		},
		setAnchorComplete(lineListMap, lineListMapMap) {
			let keys = Object.keys(lineListMap);
			let mapKeys = Object.keys(lineListMapMap);

			if (keys.length) {
				keys.forEach((v1) => {
					this.tAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
					this.bAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
					this.lAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
					this.rAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
				});
			}

			if (mapKeys.length) {
				mapKeys.forEach((v1) => {
					this.tAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
					this.bAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
					this.lAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
					this.rAnchor.forEach((v2) => {
						if (v1 == v2.code) {
							v2.complete = true;
						}
					});
				});
			}
		},
		setLegendSize(size) {
			let bl = size.y / 200 > size.x / 80 ? size.y / 200 : size.x / 80;

			this.disWidth = size.x / bl < 77 ? 77 : size.x / bl;
			this.disHeight = size.y / bl < 75 ? 75 : size.y / bl;
		},
		setLegendRoomSize() {
			this.disWidth = 82;
			this.disHeight = 82;
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
		setTextsRoom() {
			const self = this;
			this.cTxts.forEach((item, index) => {
				item.visible = true;
			});
			this.tTxts.forEach((item) => {
				item.visible = true;
			});
			this.bTxts.forEach((item) => {
				item.visible = true;
			});
			this.lTxts.forEach((item) => {
				item.visible = true;
			});
			this.rTxts.forEach((item) => {
				item.visible = true;
			});
		},
		setAnchor(anchors, anchorDetailMap) {
			this.tAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
			});
			this.bAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
			});
			this.lAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
			});
			this.rAnchor.forEach((item) => {
				item.checked = false;
				item.visible = false;
			});

			let t = anchors.filter((x) => x.code.indexOf("T") > -1);
			let b = anchors.filter((x) => x.code.indexOf("B") > -1);
			let l = anchors.filter((x) => x.code.indexOf("L") > -1);
			let r = anchors.filter((x) => x.code.indexOf("R") > -1);

			t.forEach((item) => {
				item.visible = true;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
				}
			});
			b.forEach((item) => {
				item.visible = true;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
				}
			});
			l.forEach((item) => {
				item.visible = true;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
				}
			});
			r.forEach((item) => {
				item.visible = true;
				const anchorInfo = anchorDetailMap[item.code];
				if (anchorInfo != undefined) {
					item.multiple = anchorInfo.multiple;
					item.equipment = anchorInfo.equipment;
				}
			});

			this.tAnchor = Object.values([].concat(this.tAnchor, t).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.bAnchor = Object.values([].concat(this.bAnchor, b).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.lAnchor = Object.values([].concat(this.lAnchor, l).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
			this.rAnchor = Object.values([].concat(this.rAnchor, r).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
		},
		setAnchorRoom(anchorDetailMap) {
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
		setHistoryAnchorComplete(anchor) {
			this.tAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = true;
			});
			this.bAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = true;
			});
			this.lAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = true;
			});
			this.rAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = true;
			});
		},
		setAnchorRestor(anchor) {
			this.tAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = false;
			});
			this.bAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = false;
			});
			this.lAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = false;
			});
			this.rAnchor.forEach((item) => {
				if (item.code == anchor.anchorCode) item.complete = false;
			});
		},
	},
	watch: {
		queryBody: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (JSON.stringify(val) != "{}" && val.objectType == "room") {
					this.setLegendRoomSize();
					this.setTextsRoom();
					this.setTextVisible(val.textList);
					this.setAnchorRoom(val.anchorDetailMap);
					this.setAnchorComplete(val.lineListMap, val.lineListMapMap);
					return;
				}
				if (JSON.stringify(val) == "{}" || !val.legend) return;

				this.setLegendSize(val.legend.legendContent.size);
				this.setTexts(val.legend.legendContent.texts);
				this.setAnchor(val.legend.legendContent.anchors, val.anchorDetailMap);
				this.setTextVisible(val.textList);
				this.setAnchorComplete(val.lineListMap, val.lineListMapMap);
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
			width: 80px;
			height: 26px;
			line-height: 26px;
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
