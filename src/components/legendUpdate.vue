<template>
	<div class="legend_panel">
		<div class="legend" :style="{ height: disHeight + 'px', width: disWidth + 'px' }">
			<div class="center_panel">
				<div v-for="(item, i) in cTxts" :class="[item.code, { txt_chk: item.checked }]" :ref="'cp' + (i + 1)">
					<el-checkbox :label="item.code" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
				</div>
			</div>
			<div class="top_panel1" v-if="isAttach">
				<div class="txt" v-for="(item, i) in tTxts" :class="[item.code, { txt_chk: item.checked }]">
					<el-checkbox :label="item.code" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
				</div>
			</div>
			<div class="top_panel" @mouseenter="topTooltipVis = true" @mouseleave="topTooltipVis = false" v-if="!isAttach">
				<!-- <div class="txt" v-for="(item, i) in tTxts" :class="[item.code, { txt_chk: item.checked }]">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div> -->
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
						<div class="item" v-if="tTxts_3_9.filter((x) => x.checked == true).length" :class="{ ta_disabled: tTxts_3_9.filter((x) => x.disabled == true).length }">
							<span class="name">+{{ tTxts_3_9.filter((x) => x.checked == true).length }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delTopAllChecked">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
							</svg></div
					></template> -->
				</div>
				<el-popover placement="right" width="160" trigger="click">
					<div class="t_Content">
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in tTxts_3_9.slice().reverse()" :disabled="item.disabled"></el-checkbox>
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in tTxts.slice().reverse()" :disabled="item.disabled"></el-checkbox>
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
					<el-checkbox :label="item.code" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
				</div>
			</div>
			<div class="btm_panel" @mouseenter="bottomTooltipVis = true" @mouseleave="bottomTooltipVis = false" v-if="!isAttach">
				<!-- <div class="txt" v-for="(item, i) in bTxts" :class="[item.code, { txt_chk: item.checked }]">
					<el-checkbox :label="item.code" v-model="item.checked"></el-checkbox>
				</div> -->
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
						<div class="item" v-if="bTxts_3_9.filter((x) => x.checked == true).length" :class="{ ta_disabled: bTxts_3_9.filter((x) => x.disabled == true).length }">
							<span class="name">+{{ bTxts_3_9.filter((x) => x.checked == true).length }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delBottomAllChecked">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
							</svg></div
					></template> -->
				</div>
				<el-popover placement="right" width="160" trigger="click">
					<div class="t_Content">
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in bTxts" :disabled="item.disabled"></el-checkbox>
						<el-checkbox :label="item.code" v-model="item.checked" v-for="(item, i) in bTxts_3_9" :disabled="item.disabled"></el-checkbox>
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
					<el-checkbox :label="item.code" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
				</div>
			</div>
			<div class="rgt_panel">
				<div class="txt" v-for="(item, i) in rTxts" :class="[item.code, { txt_chk: item.checked }]" v-show="item.code == 'R1' ? vis_lr1 : vis_lr2">
					<el-checkbox :label="item.code" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
				</div>
			</div>

			<div class="tAnchor">
				<div class="grid" v-for="(item, i) in tAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked, tb_disabled: item.disabled }]" v-show="item.vis" @click="changeAnchor('tAnchor', item)"></div>
				</div>
			</div>
			<div class="bAnchor">
				<div class="grid" v-for="(item, i) in bAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked, tb_disabled: item.disabled }]" v-show="item.vis" @click="changeAnchor('bAnchor', item)"></div>
				</div>
			</div>
			<div class="lAnchor">
				<div class="grid" v-for="(item, i) in lAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked, tb_disabled: item.disabled }]" v-show="item.vis" @click="changeAnchor('lAnchor', item)"></div>
				</div>
			</div>
			<div class="rAnchor">
				<div class="grid" v-for="(item, i) in rAnchor">
					<div class="anchor" :class="[{ anchor_chk: item.checked, tb_disabled: item.disabled }]" v-show="item.vis" @click="changeAnchor('rAnchor', item)"></div>
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

			topTooltipVis: false,
			bottomTooltipVis: false,

			disWidth: 0,
			disHeight: 0,

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
						y: 12,
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
					checked: false,
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
					checked: false,
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
					checked: false,
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
			tTxtsNew: [],
			bTxtsNew: [],
		};
	},
	props: {
		legendObj: {
			type: Object,
			default: {},
		},
		legendSize: {
			type: Object,
			default: {},
		},
		isAttach: {
			type: Boolean,
		},
	},
	methods: {
		delTopChecked(key) {
			// item.checked = false;
			this.tTxts.map((x) => {
				if (x.code == key) {
					if (!x.disabled) {
						x.checked = false;
					} else {
						this.$message({
							type: "warning",
							message: "禁止编辑",
						});
					}
				}
			});
			this.tTxts_3_9.map((x) => {
				if (x.code == key) {
					if (!x.disabled) {
						x.checked = false;
					} else {
						this.$message({
							type: "warning",
							message: "禁止编辑",
						});
					}
				}
			});
		},
		delTopAllChecked() {
			let list = [...this.tTxts, ...this.tTxts_3_9];
			let checkedList = [];
			let alertShow = false;
			for (let i = 0; i < list.length; i++) {
				if (list[i].checked) {
					checkedList.push(list[i].code);
				}
			}
			for (let i = 2; i < checkedList.length; i++) {
				this.tTxts.map((x) => {
					if (x.code === checkedList[i]) {
						if (!x.disabled) {
							x.checked = false;
						} else {
							alertShow = true;
						}
					}
				});
				this.tTxts_3_9.map((x) => {
					if (x.code === checkedList[i]) {
						if (!x.disabled) {
							x.checked = false;
						} else {
							alertShow = true;
						}
					}
				});
			}
			if (alertShow) {
				this.$message({
					type: "warning",
					message: "注意，其中有禁止编辑的文本区",
				});
			}
		},
		delBottomChecked(key) {
			// item.checked = false;
			this.bTxts.map((x) => {
				if (x.code == key) {
					if (!x.disabled) {
						x.checked = false;
					} else {
						this.$message({
							type: "warning",
							message: "禁止编辑",
						});
					}
				}
			});
			this.bTxts_3_9.map((x) => {
				if (x.code == key) {
					if (!x.disabled) {
						x.checked = false;
					} else {
						this.$message({
							type: "warning",
							message: "禁止编辑",
						});
					}
				}
			});
		},
		delBottomAllChecked() {
			let list = [...this.bTxts, ...this.bTxts_3_9];
			let checkedList = [];
			let alertShow = false;
			for (let i = 0; i < list.length; i++) {
				if (list[i].checked) {
					checkedList.push(list[i].code);
				}
			}
			for (let i = 2; i < checkedList.length; i++) {
				this.bTxts.map((x) => {
					if (x.code === checkedList[i]) {
						if (!x.disabled) {
							x.checked = false;
						} else {
							alertShow = true;
						}
					}
				});
				this.bTxts_3_9.map((x) => {
					if (x.code === checkedList[i]) {
						if (!x.disabled) {
							x.checked = false;
						} else {
							alertShow = true;
						}
					}
				});
			}
			if (alertShow) {
				this.$message({
					type: "warning",
					message: "注意，其中有禁止编辑的文本区",
				});
			}
		},
		changeAnchor(anchorObj, item) {
			// if (item.multiple) {
			//     for (let i = 0; i < this[anchorObj].length; i++) {
			//         const ele = this[anchorObj][i];
			//         ele.multiple = false
			//         ele.vis = true
			//     }
			//     return
			// }
			// for (let i = 0; i < this[anchorObj].length; i++) {
			//     const ele = this[anchorObj][i];
			//     ele.multiple = false
			//     ele.vis = false
			// }
			// item.multiple = true

			// item.vis = true

			item.checked = !item.checked;
		},
		async queryLegendUsed(id) {
			await GetAdmData.queryLegendUsed({ id: id }).then((result) => {
				var texts = result.data.texts;
				var anchors = result.data.anchors;
				if (JSON.stringify(texts) != "{}") {
					let keys = Object.keys(texts);
					keys.map((key) => {
						this.cTxts.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.tTxts.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.tTxts_3_9.map((x) => {
							if (x.code == key) {
								x.disabled = true;
								x.checked = true;
							}
						});
						this.bTxts.map((x) => {
							if (x.code == key) {
								x.disabled = true;
								x.checked = true;
							}
						});
						this.bTxts_3_9.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.lTxts.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.rTxts.map((x) => {
							if (x.code == key) x.disabled = true;
						});
					});
				}
				if (JSON.stringify(anchors) != "{}") {
					let keys = Object.keys(anchors);
					keys.map((key) => {
						this.tAnchor.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.bAnchor.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.lAnchor.map((x) => {
							if (x.code == key) x.disabled = true;
						});
						this.rAnchor.map((x) => {
							if (x.code == key) x.disabled = true;
						});
					});
				}
			});
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
					// "width": this.legendSize.width,
					// "height": this.legendSize.height,
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
		// 		this.$refs.cp1[0].classList.add("txt_disabled");
		// 		this.$refs.cp3[0].classList.add("txt_disabled");

		// 		this.cTxts[0].checked = false;
		// 		this.cTxts[2].checked = false;
		// 	} else {
		// 		this.$refs.cp1[0].classList.remove("txt_disabled");
		// 		this.$refs.cp3[0].classList.remove("txt_disabled");
		// 	}
		// },
	},
	watch: {
		legendSize: {
			deep: true,
			immediate: true,
			handler: function (val) {
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
		legendObj: {
			deep: true,
			immediate: true,
			handler: function (val) {
				{
					this.cTxts.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});
					this.tTxts.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});
					this.tTxts_3_9.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});
					this.bTxts.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});
					this.bTxts_3_9.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});
					this.lTxts.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});
					this.rTxts.forEach((item) => {
						item.checked = false;
						item.disabled = false;
					});

					let c = val.legendContent.texts.filter((x) => x.direction == "C");
					let t = val.legendContent.texts.filter((x) => x.code == "T1" || x.code == "T2");
					let t_3_9 = val.legendContent.texts.filter((x) => x.code == "T3" || x.code == "T4" || x.code == "T5" || x.code == "T6" || x.code == "T7" || x.code == "T8" || x.code == "T9");
					let b = val.legendContent.texts.filter((x) => x.code == "B1" || x.code == "B2");
					let b_3_9 = val.legendContent.texts.filter((x) => x.code == "B3" || x.code == "B4" || x.code == "B5" || x.code == "B6" || x.code == "B7" || x.code == "B8" || x.code == "B9");
					let l = val.legendContent.texts.filter((x) => x.direction == "L");
					let r = val.legendContent.texts.filter((x) => x.direction == "R");

					this.cTxts = Object.values([].concat(this.cTxts, c).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.tTxts = Object.values([].concat(this.tTxts, t).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.tTxts_3_9 = Object.values([].concat(this.tTxts_3_9, t_3_9).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.bTxts = Object.values([].concat(this.bTxts, b).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.bTxts_3_9 = Object.values([].concat(this.bTxts_3_9, b_3_9).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.lTxts = Object.values([].concat(this.lTxts, l).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.rTxts = Object.values([].concat(this.rTxts, r).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
				}

				{
					this.tAnchor.forEach((item) => {
						item.checked = false;
						item.vis = true;
						item.disabled = false;
					});
					this.bAnchor.forEach((item) => {
						item.checked = false;
						item.vis = true;
						item.disabled = false;
					});
					this.lAnchor.forEach((item) => {
						item.checked = false;
						item.vis = true;
						item.disabled = false;
					});
					this.rAnchor.forEach((item) => {
						item.checked = false;
						item.vis = true;
						item.disabled = false;
					});

					let t = val.legendContent.anchors.filter((x) => x.code.indexOf("T") > -1);
					let b = val.legendContent.anchors.filter((x) => x.code.indexOf("B") > -1);
					let l = val.legendContent.anchors.filter((x) => x.code.indexOf("L") > -1);
					let r = val.legendContent.anchors.filter((x) => x.code.indexOf("R") > -1);

					this.tAnchor = Object.values([].concat(this.tAnchor, t).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.bAnchor = Object.values([].concat(this.bAnchor, b).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.lAnchor = Object.values([].concat(this.lAnchor, l).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
					this.rAnchor = Object.values([].concat(this.rAnchor, r).reduce((r, c) => ((r[c.code] = Object.assign(r[c.code] || {}, c)), r), {}));
				}

				this.queryLegendUsed(val.id);
			},
		},
		isAttach: {
			deep: true,
			// immediate: true,
			handler: function (val) {
				debugger;
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
	background: #f1f4f6;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	// width: fit-content;

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

.ta_disabled {
	pointer-events: none;
	opacity: 0.5;
}
.tb_disabled {
	pointer-events: none;
	background-color: #c4c9cf !important;
	border-color: #c4c9cf !important;
	cursor: not-allowed !important;
}
</style>
