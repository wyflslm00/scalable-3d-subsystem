<template>
	<div class="legend_panel">
		<!-- <div class="lft"> .slice().reverse() -->
		<div class="legend" :style="{ height: disHeight + 'px', width: disWidth + 'px' }">
			<div class="center_panel">
				<div v-for="(item, i) in cTxts" :class="[item.code, { txt_chk: item.checked }]" :ref="'cp' + (i + 1)">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div>
			</div>
			<div class="top_panel1" v-if="isAttach">
				<div class="txt" v-for="(item, i) in tTxts" :class="[item.code, { txt_chk: item.checked }]">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div>
			</div>
			<div class="top_panel" @mouseenter="topTooltipVis = true" @mouseleave="topTooltipVis = false" v-if="!isAttach">
				<div class="yxContnet">
					<span class="prompt" v-if="!tTxts.filter((x) => x.checked == true).length && !tTxts_3_9.filter((x) => x.checked == true).length">请选择</span>
					<template v-for="(item, i) in tTxtsNew">
						<div class="item" v-if="i < 2" :key="i">
							<span class="name">{{ item }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delTopChecked(item)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
							</svg>
						</div>
					</template>
					<div class="item" v-if="tTxtsNew.length > 2">
						<span class="name">+{{ tTxtsNew.length - 2 }}</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delTopAllChecked">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
						</svg>
					</div>
					<!-- <template>
						<div class="item" v-if="tTxts_3_9.filter((x) => x.checked == true).length">
							<span class="name">+{{ tTxts_3_9.filter((x) => x.checked == true).length }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delTopAllChecked">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
							</svg></div
					></template> -->
				</div>
				<el-popover placement="right" width="160" trigger="click">
					<div class="t_Content">
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in tTxts_3_9.slice().reverse()"></el-checkbox>
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in tTxts.slice().reverse()"></el-checkbox>
					</div>

					<svg xmlns="http://www.w3.org/2000/svg" slot="reference" width="17" height="16" viewBox="0 0 17 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7469 7.53812C11.0361 7.77805 11.0361 8.22174 10.7469 8.46167L6.28663 12.162C5.89559 12.4864 5.30353 12.2083 5.30353 11.7002L5.30353 4.29958C5.30353 3.7915 5.89559 3.5134 6.28662 3.83781L10.7469 7.53812Z" fill="#C4C9CF" />
					</svg>
				</el-popover>
				<div class="t_tooltip" v-show="topTooltipVis" v-if="tTxts.filter((x) => x.checked == true).length || tTxts_3_9.filter((x) => x.checked == true).length">
					<template v-for="(item, i) in tTxts">
						<div class="item" v-if="item.checked">
							{{ item.code }}
						</div>
					</template>
					<template v-for="(item, i) in tTxts_3_9">
						<div class="item" v-if="item.checked">
							{{ item.code }}
						</div>
					</template>
				</div>
			</div>
			<div class="btm_panel1" v-if="isAttach">
				<div class="txt" v-for="(item, i) in bTxts" :class="[item.code, { txt_chk: item.checked }]">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div>
			</div>
			<div class="btm_panel" @mouseenter="bottomTooltipVis = true" @mouseleave="bottomTooltipVis = false" v-if="!isAttach">
				<div class="yxContnet">
					<span class="prompt" v-if="!bTxts.filter((x) => x.checked == true).length && !bTxts_3_9.filter((x) => x.checked == true).length">请选择</span>
					<template v-for="(item, i) in bTxtsNew">
						<div class="item" v-if="i < 2" :key="i">
							<span class="name">{{ item }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delBottomChecked(item)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
							</svg>
						</div>
					</template>
					<div class="item" v-if="bTxtsNew.length > 2">
						<span class="name">+{{ bTxtsNew.length - 2 }}</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delBottomAllChecked">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
						</svg>
					</div>
					<!-- <template>
						<div class="item" v-if="bTxts_3_9.filter((x) => x.checked == true).length">
							<span class="name">+{{ bTxts_3_9.filter((x) => x.checked == true).length }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delBottomAllChecked">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
							</svg></div
					></template> -->
				</div>
				<el-popover placement="right" width="160" trigger="click">
					<div class="t_Content">
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in bTxts"></el-checkbox>
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in bTxts_3_9" v-if="!isAttach"></el-checkbox>
					</div>

					<svg xmlns="http://www.w3.org/2000/svg" slot="reference" width="17" height="16" viewBox="0 0 17 16" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7469 7.53812C11.0361 7.77805 11.0361 8.22174 10.7469 8.46167L6.28663 12.162C5.89559 12.4864 5.30353 12.2083 5.30353 11.7002L5.30353 4.29958C5.30353 3.7915 5.89559 3.5134 6.28662 3.83781L10.7469 7.53812Z" fill="#C4C9CF" />
					</svg>
				</el-popover>
				<div class="t_tooltip" v-show="bottomTooltipVis" v-if="bTxts.filter((x) => x.checked == true).length || bTxts_3_9.filter((x) => x.checked == true).length">
					<template v-for="(item, i) in bTxts">
						<div class="item" v-if="item.checked">
							{{ item.code }}
						</div>
					</template>
					<template v-for="(item, i) in bTxts_3_9">
						<div class="item" v-if="item.checked">
							{{ item.code }}
						</div>
					</template>
				</div>
			</div>
			<div class="lft_panel">
				<div class="txt" v-for="(item, i) in lTxts" :class="[item.code, { txt_chk: item.checked }]" v-show="item.code == 'L1' ? vis_lr1 : vis_lr2">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div>
			</div>
			<div class="rgt_panel">
				<div class="txt" v-for="(item, i) in rTxts" :class="[item.code, { txt_chk: item.checked }]" v-show="item.code == 'R1' ? vis_lr1 : vis_lr2">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div>
			</div>

			<div class="tAnchor">
				<div class="grid" v-for="(item, i) in tAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked }]" v-show="item.vis" @click="changeAnchor('tAnchor', item)"></div>
				</div>
			</div>
			<div class="bAnchor">
				<div class="grid" v-for="(item, i) in bAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked }]" v-show="item.vis" @click="changeAnchor('bAnchor', item)"></div>
				</div>
			</div>
			<div class="lAnchor">
				<div class="grid" v-for="(item, i) in lAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked }]" v-show="item.vis" @click="changeAnchor('lAnchor', item)"></div>
				</div>
			</div>
			<div class="rAnchor">
				<div class="grid" v-for="(item, i) in rAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked }]" v-show="item.vis" @click="changeAnchor('rAnchor', item)"></div>
				</div>
			</div>
		</div>
		<!-- </div> -->
		<!-- <div class="sx">
			<div class="bt">信息点个数</div>
			<el-form :model="validateForm" ref="validateForm" :rules="rules" :inline="true">
				<el-form-item label="上" prop="up">
					<el-input v-model.number="validateForm.up" autocomplete="off" placeholder="0" size="small" style="width: 80px"></el-input>
				</el-form-item>
				<el-form-item label="左" prop="left">
					<el-input v-model.number="validateForm.left" autocomplete="off" placeholder="0" size="small" style="width: 80px"></el-input>
				</el-form-item>
				<el-form-item label="中" prop="center">
					<el-input v-model.number="validateForm.center" autocomplete="off" placeholder="0" size="small" style="width: 80px"></el-input>
				</el-form-item>
				<el-form-item label="右" prop="right">
					<el-input v-model.number="validateForm.right" autocomplete="off" placeholder="0" size="small" style="width: 80px"></el-input>
				</el-form-item>
				<el-form-item label="下" prop="down">
					<el-input v-model.number="validateForm.down" autocomplete="off" placeholder="0" size="small" style="width: 80px"></el-input>
				</el-form-item>
			</el-form>
		</div> -->
	</div>
</template>

<script>
export default {
	data() {
		var checkUp = (rule, value, callback) => {
			if (!value) {
				this.validateForm.up = 0;
			}
			if (value > 9) {
				this.validateResult = false;
				callback(new Error("最多不超过9个"));
			} else {
				this.validateResult = true;
			}
		};
		var checkCenter = (rule, value, callback) => {
			if (!value) {
				this.validateForm.center = 0;
			}
			if (value > 3) {
				this.validateResult = false;
				callback(new Error("最多不超过3个"));
			} else {
				this.validateResult = true;
			}
		};
		var checkDown = (rule, value, callback) => {
			if (!value) {
				this.validateForm.down = 0;
			}
			if (value > 9) {
				this.validateResult = false;
				callback(new Error("最多不超过9个"));
			} else {
				this.validateResult = true;
			}
		};
		var checkLeft = (rule, value, callback) => {
			if (!value) {
				this.validateForm.left = 0;
			}
			if (value > 2) {
				this.validateResult = false;
				callback(new Error("最多不超过2个"));
			} else {
				this.validateResult = true;
			}
		};
		var checkRight = (rule, value, callback) => {
			if (!value) {
				this.validateForm.right = 0;
			}
			if (value > 2) {
				this.validateResult = false;
				callback(new Error("最多不超过2个"));
			} else {
				this.validateResult = true;
			}
		};
		return {
			vis_lr2: true,
			vis_lr1: true,

			topTooltipVis: false,
			bottomTooltipVis: false,

			disWidth: 0,
			disHeight: 0,

			validateForm: {
				up: 2,
				center: 3,
				down: 2,
				left: 2,
				right: 2,
			},
			rules: {
				up: [{ validator: checkUp, trigger: "blur" }],
				center: [{ validator: checkCenter, trigger: "blur" }],
				down: [{ validator: checkDown, trigger: "blur" }],
				left: [{ validator: checkLeft, trigger: "blur" }],
				right: [{ validator: checkRight, trigger: "blur" }],
			},
			validateResult: true,

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
						y: -12,
					},
					checked: true,
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
					checked: true,
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
						y: 12,
					},
					checked: true,
				},
			],
			tTxts: [
				{
					code: "T1",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: true,
				},
				{
					code: "T2",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 38, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: true,
				},
			],
			tTxts_3_9: [
				{
					code: "T3",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 68, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T4",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 98, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T5",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 128, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T6",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 158, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T7",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 188, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T8",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 218, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "T9",
					direction: "T", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 248, // 文本框与图例的距离
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
					width_px: 26,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: true,
				},
				{
					code: "B2",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 38, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: true,
				},
			],
			bTxts_3_9: [
				{
					code: "B3",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 68, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B4",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 98, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B5",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 128, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B6",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 158, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B7",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 188, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B8",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 218, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 0,
					},
					checked: false,
				},
				{
					code: "B9",
					direction: "B", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 248, // 文本框与图例的距离
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
					width_px: 26,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: -15,
					},
					checked: true,
				},
				{
					code: "L2",
					direction: "L", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 15,
					},
					checked: true,
				},
			],
			rTxts: [
				{
					code: "R1",
					direction: "R", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: -15,
					},
					checked: true,
				},
				{
					code: "R2",
					direction: "R", //上下左右分别是 TBLR
					vertical: false, // 文本方向
					max_length_px: 130,
					width_px: 26,
					interval: 8, // 文本框与图例的距离
					offset_px: {
						x: 0,
						y: 15,
					},
					checked: true,
				},
			],

			tAnchor: [
				{
					code: "T1",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "T2",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "T3",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "T4",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "T5",
					multiple: false,
					checked: true,
					vis: true,
				},
			],
			bAnchor: [
				{
					code: "B1",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "B2",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "B3",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "B4",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "B5",
					multiple: false,
					checked: true,
					vis: true,
				},
			],
			lAnchor: [
				{
					code: "L1",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "L2",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "L3",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "L4",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "L5",
					multiple: false,
					checked: true,
					vis: true,
				},
			],
			rAnchor: [
				{
					code: "R1",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "R2",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "R3",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "R4",
					multiple: false,
					checked: true,
					vis: true,
				},
				{
					code: "R5",
					multiple: false,
					checked: true,
					vis: true,
				},
			],
			tTxtsNew: [],
			bTxtsNew: [],
		};
	},
	props: {
		legendSize: {
			type: Object,
			default: {},
		},
		isAttach: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		// delTopChecked(item) {
		// 	item.checked = false;
		// },
		// delTopAllChecked() {
		// 	this.tTxts_3_9.map((x) => {
		// 		x.checked = false;
		// 	});
		// },
		// delBottomChecked(item) {
		// 	item.checked = false;
		// },
		// delBottomAllChecked() {
		// 	this.bTxts_3_9.map((x) => {
		// 		x.checked = false;
		// 	});
		// },
		delTopChecked(key) {
			// item.checked = false;
			this.tTxts.map((x) => {
				if (x.code == key) x.checked = false;
			});
			this.tTxts_3_9.map((x) => {
				if (x.code == key) x.checked = false;
			});
		},
		delTopAllChecked() {
			let list = [...this.tTxts, ...this.tTxts_3_9];
			let checkedList = [];
			for (let i = 0; i < list.length; i++) {
				if (list[i].checked) {
					checkedList.push(list[i].code);
				}
			}
			for (let i = 2; i < checkedList.length; i++) {
				this.tTxts.map((x) => {
					if (x.code === checkedList[i]) {
						x.checked = false;
					}
				});
				this.tTxts_3_9.map((x) => {
					if (x.code === checkedList[i]) {
						x.checked = false;
					}
				});
			}
		},
		delBottomChecked(key) {
			// item.checked = false;
			this.bTxts.map((x) => {
				if (x.code == key) x.checked = false;
			});
			this.bTxts_3_9.map((x) => {
				if (x.code == key) x.checked = false;
			});
		},
		delBottomAllChecked() {
			let list = [...this.bTxts, ...this.bTxts_3_9];
			let checkedList = [];
			for (let i = 0; i < list.length; i++) {
				if (list[i].checked) {
					checkedList.push(list[i].code);
				}
			}
			for (let i = 2; i < checkedList.length; i++) {
				this.bTxts.map((x) => {
					if (x.code === checkedList[i]) {
						x.checked = false;
					}
				});
				this.bTxts_3_9.map((x) => {
					if (x.code === checkedList[i]) {
						x.checked = false;
					}
				});
			}
		},

		changeAnchor(anchorObj, item) {
			item.checked = !item.checked;
		},
		getLegendData() {
			let cc = this.cTxts.filter((x) => x.checked == true);
			let tt = this.tTxts.filter((x) => x.checked == true);
			let tt_3_9 = this.tTxts_3_9.filter((x) => x.checked == true);
			let bt = this.bTxts.filter((x) => x.checked == true);
			let bt_3_9 = this.bTxts_3_9.filter((x) => x.checked == true);
			let lt = this.lTxts.filter((x) => x.checked == true);
			let rt = this.rTxts.filter((x) => x.checked == true);
			cc.map((x) => {
				x.max_length_px = this.legendSize.sizeX - 4;
			});
			let txts = [...cc, ...tt, ...tt_3_9, ...bt, ...bt_3_9, ...lt, ...rt];

			let ta = this.tAnchor.filter((x) => x.checked == true);
			let ba = this.bAnchor.filter((x) => x.checked == true);
			let la = this.lAnchor.filter((x) => x.checked == true);
			let ra = this.rAnchor.filter((x) => x.checked == true);
			let anchors = [...ta, ...ba, ...la, ...ra];

			let data = {
				legendContent: {
					size: {
						x: this.legendSize.sizeX,
						y: this.legendSize.sizeY,
					},
					texts: txts,
					anchors: anchors,
					attach: this.isAttach,
				},
			};

			this.$emit("changeLegendData", data);
		},
		// async setCenterTxtsDis(val) {
		// 	if (val.height <= 30) {
		// 		this.cTxts[0].checked = false;
		// 		this.cTxts[2].checked = false;

		// 		this.$nextTick(() => {
		// 			this.$refs.cp1[0].classList.add("txt_disabled");
		// 			this.$refs.cp3[0].classList.add("txt_disabled");
		// 		});
		// 	} else {
		// 		this.cTxts[0].checked = true;
		// 		this.cTxts[2].checked = true;

		// 		this.$nextTick(() => {
		// 			this.$refs.cp1[0].classList.remove("txt_disabled");
		// 			this.$refs.cp3[0].classList.remove("txt_disabled");
		// 		});
		// 	}
		// },
	},
	watch: {
		legendSize: {
			deep: true,
			immediate: true,
			handler: function (val) {
				console.log(val);

				let bl = val.sizeY / val.sizeX;
				//默认显示宽度最大 320， 高度 160 ， 所以才会有0.5这个概念
				if (bl <= 0.5) {
					this.disWidth = 320;
					this.disHeight = (320 / val.sizeX) * val.sizeY;
				} else {
					this.disHeight = 120;
					this.disWidth = (120 / val.sizeY) * val.sizeX;
				}

				if (this.disWidth < 86) this.disWidth = 86;
				if (this.disHeight < 86) this.disHeight = 86;

				// this.$nextTick(() => {
				// 	this.setCenterTxtsDis(val);
				// });
			},
		},
		isAttach: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (val) {
					this.tTxts.map((x) => {
						x.checked = true;
					});
					this.bTxts.map((x) => {
						x.checked = true;
					});
					this.lTxts.map((x) => {
						x.checked = true;
					});
					this.rTxts.map((x) => {
						x.checked = true;
					});
					this.cTxts.map((x) => {
						x.checked = true;
					});
					this.tTxts_3_9.map((x) => {
						x.checked = false;
					});
					this.bTxts_3_9.map((x) => {
						x.checked = false;
					});
				} else {
					this.tTxts.map((x) => {
						x.checked = true;
					});
					this.bTxts.map((x) => {
						x.checked = true;
					});
					this.lTxts.map((x) => {
						x.checked = true;
					});
					this.rTxts.map((x) => {
						x.checked = true;
					});
					this.cTxts.map((x) => {
						x.checked = true;
					});
					this.tTxts_3_9.map((x) => {
						if (x.code === "T3") {
							x.checked = true;
						} else {
							x.checked = false;
						}
					});
					this.bTxts_3_9.map((x) => {
						if (x.code === "B3") {
							x.checked = true;
						} else {
							x.checked = false;
						}
					});
				}
			},
		},
		tTxts: {
			deep: true,
			immediate: true,
			handler: function (val) {
				let tTxtsNew = [];
				let list = [...this.tTxts, ...this.tTxts_3_9];
				for (let i = 0; i < list.length; i++) {
					if (list[i].checked) {
						tTxtsNew.push(list[i].code);
					}
				}
				this.tTxtsNew = tTxtsNew;
			},
		},
		tTxts_3_9: {
			deep: true,
			immediate: true,
			handler: function (val) {
				let tTxtsNew = [];
				let list = [...this.tTxts, ...this.tTxts_3_9];
				for (let i = 0; i < list.length; i++) {
					if (list[i].checked) {
						tTxtsNew.push(list[i].code);
					}
				}
				this.tTxtsNew = tTxtsNew;
			},
		},
		bTxts: {
			deep: true,
			immediate: true,
			handler: function (val) {
				let tTxtsNew = [];
				let list = [...this.bTxts, ...this.bTxts_3_9];
				for (let i = 0; i < list.length; i++) {
					if (list[i].checked) {
						tTxtsNew.push(list[i].code);
					}
				}
				this.bTxtsNew = tTxtsNew;
			},
		},
		bTxts_3_9: {
			deep: true,
			immediate: true,
			handler: function (val) {
				let tTxtsNew = [];
				let list = [...this.bTxts, ...this.bTxts_3_9];
				for (let i = 0; i < list.length; i++) {
					if (list[i].checked) {
						tTxtsNew.push(list[i].code);
					}
				}
				this.bTxtsNew = tTxtsNew;
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.legend_panel {
	display: flex;
	height: 400px;
	width: 560px;
	background: #f7f9fa;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	// width: fit-content;

	.lft {
		width: 325px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.legend {
		// width: 160px;
		// height: 160px;
		background: red;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f1f4f6;
		border: 2px solid #246fe5;

		.txt {
			width: 75px;
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

		.txt_disabled {
			pointer-events: none;
			opacity: 0.4;
		}

		.center_panel {
			width: 50px;
			flex-direction: column;
		}

		.top_panel1 {
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

		.top_panel {
			position: absolute;
			height: 32px;
			width: 194px;
			top: -58px;
			display: flex;
			justify-content: center;
			flex-direction: row;
			align-items: center;
			gap: 6px;
			border: 1px solid #c4c9cf;
			border-radius: 4px;
			background-color: #fff;
			padding: 0 0px 0 4px;

			.t_tooltip {
				position: absolute;
				bottom: 40px;
				min-width: 40px;
				height: 40px;
				border-radius: 8px;
				border: 1px solid var(--Grey-Grey-300, #e1e5eb);
				background: var(--Grey-Grey-0, #fff);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 0 4px 0 8px;

				.item {
					width: 29px;
					height: 24px;
					border-radius: 4px;
					background: var(--Grey-Grey-200, #e8ecf0);
					font-weight: 400;
					color: var(--Grey-Grey-900, #1b2129);
					text-align: center;
					line-height: 24px;
					margin-right: 4px;
				}
			}
		}

		.btm_panel1 {
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
		.btm_panel {
			position: absolute;
			height: 32px;
			width: 194px;
			bottom: -58px;
			display: flex;
			// justify-content: center;
			justify-content: center;
			flex-direction: row;
			align-items: center;
			gap: 6px;
			border: 1px solid #c4c9cf;
			border-radius: 4px;
			background-color: #fff;
			padding: 0 0px 0 4px;

			.t_tooltip {
				position: absolute;
				top: 40px;
				min-width: 40px;
				height: 40px;
				border-radius: 8px;
				border: 1px solid var(--Grey-Grey-300, #e1e5eb);
				background: var(--Grey-Grey-0, #fff);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 0 4px 0 8px;

				.item {
					width: 29px;
					height: 24px;
					border-radius: 4px;
					background: var(--Grey-Grey-200, #e8ecf0);
					font-weight: 400;
					color: var(--Grey-Grey-900, #1b2129);
					text-align: center;
					line-height: 24px;
					margin-right: 4px;
				}
			}
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
					width: 7px;
					height: 7px;
					border-radius: 50%;
					background: #fff;
					border: 1.5px solid #64a6f7;
					cursor: pointer;
				}

				.anchor_chk {
					background: #14c4c4;
					border: 1.5px solid #14c4c4;
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
					flex: 0 0 7px;
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

	.sx {
		height: 212px;
		width: 275px;
		border-left: 1px solid #e1e5eb;
		padding-left: 50px;
		.bt {
			line-height: 22px;
			color: #2e3742;
			font-weight: 400;
			font-size: 14px;
			margin-bottom: 20px;
		}
	}
}
</style>

<style lang="scss">
.yxContnet {
	width: 160px;
	height: 24px;
	display: flex;
	flex-direction: row;

	.prompt {
		color: var(--Grey-Grey-400, #c4c9cf);
		font-weight: 400;
		line-height: 24px;
	}

	.item {
		width: 49px;
		height: 24px;
		background-color: #e8ecf0;
		border-radius: 4px;
		margin: 0 2px;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		cursor: pointer;

		.name {
			line-height: 24px;
			color: #1b2129;
			font-weight: 400;
			padding: 6px;
		}
		svg {
		}
	}
}
.t_Content {
	display: flex;
	flex-direction: column;
	padding: 20px 20px 0px 20px;

	.el-checkbox {
		margin-bottom: 18px;
	}
}
</style>
