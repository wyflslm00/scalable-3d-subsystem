<!-- 添加小附件 -->
<template>
	<Dialog class="annexDialog" :visible.sync="visibleModel" @close="close" width="654px" destroy-on-close append-to-body :close-on-click-modal="false">
		<div class="head" slot="title">
			<div class="title">
				<span class="txt">{{ editType }}小附件</span>
			</div>
		</div>
		<div class="container">
			<div class="item">
				<div class="label">小附件类型<span class="red">*</span></div>
				<div class="inline">
					<Select filterable :filter-method="filterTree" ref="selecteltree" :disabled="editType == '编辑'" class="select" :size="size" v-model="form.attachClassCode" placeholder="请选择类型">
						<Option v-for="(item, i) in formatData(treeData)" :key="item.value + i" :value="item.value" :label="item.label" style="display: none"></Option>
						<Tree class="main-select-el-tree" ref="tree" :data.sync="treeData" node-key="classCode" highlight-current :props="defaultProps" @node-click="handleNodeClick" :current-node-key="form.attachClassCode" :expand-on-click-node="expandOnClickNode" :filter-node-method="filterNode" />
					</Select>
				</div>
			</div>
			<div class="item">
				<div class="label">小附件名称<span class="red">*</span></div>
				<div class="inline">
					<Input placeholder="请输入名称" :size="size" v-model="form.attachName" class="fjName"></Input>
				</div>
			</div>
			<div class="tl_c">
				<div class="item tl">
					<div class="label">选择横管图例</div>
					<div class="tl_cnt">
						<svg width="276" height="265" viewBox="0 0 276 265" fill="none" xmlns="http://www.w3.org/2000/svg" @click="chooseLegendDialog('横管')" v-if="JSON.stringify(h_legend) == '{}'">
							<rect x="1" y="1" width="274" height="263" rx="7" fill="white" />
							<path d="M116.801 151.713C118.191 150.908 119.168 150.064 119.73 149.182H117.328V148.361H120.129C120.34 147.814 120.492 147.217 120.586 146.568H117.938V145.748H124.969V146.568H121.5C121.41 147.248 121.281 147.846 121.113 148.361H125.531V149.182H122.742C123.512 150.264 124.559 151.006 125.883 151.408C125.617 151.705 125.383 152.006 125.18 152.311C123.641 151.561 122.496 150.518 121.746 149.182H120.779C120.178 150.381 119.059 151.475 117.422 152.463C117.258 152.244 117.051 151.994 116.801 151.713ZM120.527 150.729H121.418V155.111C121.418 155.979 120.961 156.412 120.047 156.412C119.578 156.412 119.156 156.408 118.781 156.4C118.734 156.111 118.672 155.795 118.594 155.451C118.992 155.514 119.387 155.545 119.777 155.545C120.277 155.545 120.527 155.307 120.527 154.83V150.729ZM115.57 151.607C115.875 151.725 116.188 151.838 116.508 151.947C116.109 153.604 115.754 155.111 115.441 156.471L114.434 156.166C114.848 154.83 115.227 153.311 115.57 151.607ZM123.246 152.229L123.984 151.877C124.562 152.791 125.09 153.725 125.566 154.678L124.758 155.076C124.375 154.271 123.871 153.322 123.246 152.229ZM118.77 151.994L119.59 152.334C119.16 153.412 118.695 154.361 118.195 155.182C117.922 155.041 117.645 154.916 117.363 154.807C117.934 153.955 118.402 153.018 118.77 151.994ZM121.758 152.486L122.531 152.205C122.875 153.08 123.203 154.037 123.516 155.076L122.637 155.369C122.387 154.385 122.094 153.424 121.758 152.486ZM114.738 148.221C115.301 148.611 115.992 149.143 116.812 149.814C116.523 150.143 116.293 150.396 116.121 150.576C115.301 149.826 114.645 149.264 114.152 148.889L114.738 148.221ZM115.195 145.174C115.891 145.721 116.566 146.291 117.223 146.885C116.957 147.15 116.723 147.389 116.52 147.6C115.785 146.873 115.145 146.279 114.598 145.818L115.195 145.174ZM132.867 146.592H137.32V156.248H136.395V155.064H133.793V156.248H132.867V146.592ZM126.434 147.166H128.068C128.076 146.537 128.078 145.838 128.074 145.068H129C129 145.846 128.996 146.545 128.988 147.166H131.719C131.68 150.166 131.629 152.521 131.566 154.232C131.535 155.639 131.004 156.314 129.973 156.26C129.668 156.26 129.219 156.248 128.625 156.225C128.57 155.896 128.508 155.557 128.438 155.205C128.984 155.275 129.43 155.311 129.773 155.311C130.297 155.326 130.582 154.955 130.629 154.197C130.715 152.346 130.766 150.299 130.781 148.057H128.977C128.969 148.654 128.957 149.162 128.941 149.58C128.91 152.635 128.176 154.986 126.738 156.635C126.543 156.393 126.312 156.131 126.047 155.85C127.344 154.428 128.004 152.307 128.027 149.486C128.043 149.076 128.055 148.6 128.062 148.057H126.434V147.166ZM136.395 147.459H133.793V154.221H136.395V147.459ZM138.809 145.49H149.145V156.518H148.266V155.955H139.688V156.518H138.809V145.49ZM148.266 146.334H139.688V155.111H148.266V146.334ZM140.086 149.205C141.156 148.432 142.035 147.521 142.723 146.475L143.496 146.838C143.352 147.053 143.195 147.264 143.027 147.471H147.176V148.162C146.602 148.857 145.869 149.484 144.979 150.043C145.803 150.32 146.812 150.537 148.008 150.693C147.828 151.045 147.699 151.338 147.621 151.572C146.234 151.256 145.062 150.898 144.105 150.5C143.148 150.93 141.879 151.35 140.297 151.76C140.188 151.502 140.055 151.252 139.898 151.01C141.27 150.729 142.402 150.406 143.297 150.043C142.746 149.664 142.271 149.229 141.873 148.736C141.502 149.092 141.098 149.439 140.66 149.779C140.504 149.615 140.312 149.424 140.086 149.205ZM140.93 153.74L141.176 152.932C143.129 153.189 145.008 153.49 146.812 153.834L146.496 154.725C144.77 154.342 142.914 154.014 140.93 153.74ZM146.016 148.197H142.4C142.389 148.213 142.377 148.227 142.365 148.238C142.818 148.82 143.391 149.299 144.082 149.674C144.891 149.24 145.535 148.748 146.016 148.197ZM142.16 152.182L142.395 151.396C143.543 151.568 144.75 151.764 146.016 151.982L145.77 152.803C144.488 152.545 143.285 152.338 142.16 152.182ZM154.465 151.549L154.934 150.893C155.289 151.135 155.674 151.418 156.088 151.742C156.389 150.941 156.598 150.072 156.715 149.135H155.068C154.627 150.564 154.082 151.713 153.434 152.58C153.27 152.33 153.082 152.088 152.871 151.854C153.754 150.584 154.408 148.807 154.834 146.521H153.562V145.701H158.098V146.521H155.707C155.586 147.162 155.451 147.764 155.303 148.326H157.582V149.135C157.262 152.213 156.008 154.682 153.82 156.541C153.648 156.307 153.434 156.053 153.176 155.779C154.281 154.889 155.137 153.814 155.742 152.557C155.355 152.24 154.93 151.904 154.465 151.549ZM150.164 150.705C151.172 148.994 151.918 147.1 152.402 145.021L153.27 145.186C153.062 146.061 152.801 146.924 152.484 147.775V156.518H151.688V149.662C151.344 150.377 150.961 151.084 150.539 151.783C150.445 151.471 150.32 151.111 150.164 150.705ZM160.453 145.057H161.309V154.842C161.309 155.436 161.215 155.842 161.027 156.061C160.863 156.264 160.535 156.369 160.043 156.377C159.707 156.385 159.164 156.377 158.414 156.354C158.383 156.033 158.328 155.709 158.25 155.381C158.852 155.443 159.344 155.475 159.727 155.475C160.031 155.482 160.227 155.428 160.312 155.311C160.406 155.209 160.453 154.959 160.453 154.561V145.057ZM159.211 153.775H158.379V146.896H159.211V153.775Z" fill="#626C78" />
							<circle cx="138" cy="111" r="18" fill="#246FE5" />
							<rect x="132" y="110" width="12" height="2" rx="1" fill="white" />
							<rect x="139" y="105" width="12" height="2" rx="1" transform="rotate(90 139 105)" fill="white" />
							<rect x="1" y="1" width="274" height="263" rx="7" stroke="#E1E5EB" stroke-width="2" stroke-dasharray="4 4" />
						</svg>

						<div class="hint" @click="chooseLegendDialog('横管')">
							<legend-choose-texts-hint :queryBody="h_legend" v-if="JSON.stringify(h_legend) != '{}'"></legend-choose-texts-hint>
							<div class="lName" v-if="JSON.stringify(h_legend) != '{}'">
								<span class="name">{{ h_legend.legendName }}</span>
								<span class="size">{{ h_legend.legendContent?.size?.x + "*" + h_legend.legendContent?.size?.y + "px" }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="item tl">
					<div class="label">选择竖管图例</div>
					<div class="tl_cnt">
						<svg width="276" height="265" viewBox="0 0 276 265" fill="none" xmlns="http://www.w3.org/2000/svg" @click="chooseLegendDialog('竖管')" v-if="JSON.stringify(v_legend) == '{}'">
							<rect x="1" y="1" width="274" height="263" rx="7" fill="white" />
							<path d="M116.801 151.713C118.191 150.908 119.168 150.064 119.73 149.182H117.328V148.361H120.129C120.34 147.814 120.492 147.217 120.586 146.568H117.938V145.748H124.969V146.568H121.5C121.41 147.248 121.281 147.846 121.113 148.361H125.531V149.182H122.742C123.512 150.264 124.559 151.006 125.883 151.408C125.617 151.705 125.383 152.006 125.18 152.311C123.641 151.561 122.496 150.518 121.746 149.182H120.779C120.178 150.381 119.059 151.475 117.422 152.463C117.258 152.244 117.051 151.994 116.801 151.713ZM120.527 150.729H121.418V155.111C121.418 155.979 120.961 156.412 120.047 156.412C119.578 156.412 119.156 156.408 118.781 156.4C118.734 156.111 118.672 155.795 118.594 155.451C118.992 155.514 119.387 155.545 119.777 155.545C120.277 155.545 120.527 155.307 120.527 154.83V150.729ZM115.57 151.607C115.875 151.725 116.188 151.838 116.508 151.947C116.109 153.604 115.754 155.111 115.441 156.471L114.434 156.166C114.848 154.83 115.227 153.311 115.57 151.607ZM123.246 152.229L123.984 151.877C124.562 152.791 125.09 153.725 125.566 154.678L124.758 155.076C124.375 154.271 123.871 153.322 123.246 152.229ZM118.77 151.994L119.59 152.334C119.16 153.412 118.695 154.361 118.195 155.182C117.922 155.041 117.645 154.916 117.363 154.807C117.934 153.955 118.402 153.018 118.77 151.994ZM121.758 152.486L122.531 152.205C122.875 153.08 123.203 154.037 123.516 155.076L122.637 155.369C122.387 154.385 122.094 153.424 121.758 152.486ZM114.738 148.221C115.301 148.611 115.992 149.143 116.812 149.814C116.523 150.143 116.293 150.396 116.121 150.576C115.301 149.826 114.645 149.264 114.152 148.889L114.738 148.221ZM115.195 145.174C115.891 145.721 116.566 146.291 117.223 146.885C116.957 147.15 116.723 147.389 116.52 147.6C115.785 146.873 115.145 146.279 114.598 145.818L115.195 145.174ZM132.867 146.592H137.32V156.248H136.395V155.064H133.793V156.248H132.867V146.592ZM126.434 147.166H128.068C128.076 146.537 128.078 145.838 128.074 145.068H129C129 145.846 128.996 146.545 128.988 147.166H131.719C131.68 150.166 131.629 152.521 131.566 154.232C131.535 155.639 131.004 156.314 129.973 156.26C129.668 156.26 129.219 156.248 128.625 156.225C128.57 155.896 128.508 155.557 128.438 155.205C128.984 155.275 129.43 155.311 129.773 155.311C130.297 155.326 130.582 154.955 130.629 154.197C130.715 152.346 130.766 150.299 130.781 148.057H128.977C128.969 148.654 128.957 149.162 128.941 149.58C128.91 152.635 128.176 154.986 126.738 156.635C126.543 156.393 126.312 156.131 126.047 155.85C127.344 154.428 128.004 152.307 128.027 149.486C128.043 149.076 128.055 148.6 128.062 148.057H126.434V147.166ZM136.395 147.459H133.793V154.221H136.395V147.459ZM138.809 145.49H149.145V156.518H148.266V155.955H139.688V156.518H138.809V145.49ZM148.266 146.334H139.688V155.111H148.266V146.334ZM140.086 149.205C141.156 148.432 142.035 147.521 142.723 146.475L143.496 146.838C143.352 147.053 143.195 147.264 143.027 147.471H147.176V148.162C146.602 148.857 145.869 149.484 144.979 150.043C145.803 150.32 146.812 150.537 148.008 150.693C147.828 151.045 147.699 151.338 147.621 151.572C146.234 151.256 145.062 150.898 144.105 150.5C143.148 150.93 141.879 151.35 140.297 151.76C140.188 151.502 140.055 151.252 139.898 151.01C141.27 150.729 142.402 150.406 143.297 150.043C142.746 149.664 142.271 149.229 141.873 148.736C141.502 149.092 141.098 149.439 140.66 149.779C140.504 149.615 140.312 149.424 140.086 149.205ZM140.93 153.74L141.176 152.932C143.129 153.189 145.008 153.49 146.812 153.834L146.496 154.725C144.77 154.342 142.914 154.014 140.93 153.74ZM146.016 148.197H142.4C142.389 148.213 142.377 148.227 142.365 148.238C142.818 148.82 143.391 149.299 144.082 149.674C144.891 149.24 145.535 148.748 146.016 148.197ZM142.16 152.182L142.395 151.396C143.543 151.568 144.75 151.764 146.016 151.982L145.77 152.803C144.488 152.545 143.285 152.338 142.16 152.182ZM154.465 151.549L154.934 150.893C155.289 151.135 155.674 151.418 156.088 151.742C156.389 150.941 156.598 150.072 156.715 149.135H155.068C154.627 150.564 154.082 151.713 153.434 152.58C153.27 152.33 153.082 152.088 152.871 151.854C153.754 150.584 154.408 148.807 154.834 146.521H153.562V145.701H158.098V146.521H155.707C155.586 147.162 155.451 147.764 155.303 148.326H157.582V149.135C157.262 152.213 156.008 154.682 153.82 156.541C153.648 156.307 153.434 156.053 153.176 155.779C154.281 154.889 155.137 153.814 155.742 152.557C155.355 152.24 154.93 151.904 154.465 151.549ZM150.164 150.705C151.172 148.994 151.918 147.1 152.402 145.021L153.27 145.186C153.062 146.061 152.801 146.924 152.484 147.775V156.518H151.688V149.662C151.344 150.377 150.961 151.084 150.539 151.783C150.445 151.471 150.32 151.111 150.164 150.705ZM160.453 145.057H161.309V154.842C161.309 155.436 161.215 155.842 161.027 156.061C160.863 156.264 160.535 156.369 160.043 156.377C159.707 156.385 159.164 156.377 158.414 156.354C158.383 156.033 158.328 155.709 158.25 155.381C158.852 155.443 159.344 155.475 159.727 155.475C160.031 155.482 160.227 155.428 160.312 155.311C160.406 155.209 160.453 154.959 160.453 154.561V145.057ZM159.211 153.775H158.379V146.896H159.211V153.775Z" fill="#626C78" />
							<circle cx="138" cy="111" r="18" fill="#246FE5" />
							<rect x="132" y="110" width="12" height="2" rx="1" fill="white" />
							<rect x="139" y="105" width="12" height="2" rx="1" transform="rotate(90 139 105)" fill="white" />
							<rect x="1" y="1" width="274" height="263" rx="7" stroke="#E1E5EB" stroke-width="2" stroke-dasharray="4 4" />
						</svg>

						<div class="hint" @click="chooseLegendDialog('竖管')">
							<legend-choose-texts-hint :queryBody="v_legend" v-if="JSON.stringify(v_legend) != '{}'"></legend-choose-texts-hint>
							<div class="lName" v-if="JSON.stringify(v_legend) != '{}'">
								<span class="name">{{ v_legend.legendName }}</span>
								<span class="size">{{ v_legend.legendContent?.size?.x + "*" + v_legend.legendContent?.size?.y + "px" }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer">
			<Button :size="size" @click="close">取 消</Button>
			<Button :size="size" :loading="isLoading" type="primary" @click="confirm">确定</Button>
		</div>

		<el-dialog width="1020px" :title="'选择' + tl_title + '图例'" :visible.sync="vis_tl" append-to-body class="tlDialog">
			<div class="dl_tl_cnt">
				<div class="lft">
					<template v-if="legendList.length">
						<div class="tle">
							{{ form.name }}<span class="classcode"> ({{ form.attachClassCode }})</span>
						</div>
						<div class="legendList">
							<template v-for="item in legendList">
								<div class="legendItem" :key="item.id" :class="{ legendItemChecked: item.checked }" @click="changeSelect(item)" v-if="item.legendContent.attach">
									<div class="radio">
										<i class="icon el-icon-success"></i>
										<span class="noSel"></span>
									</div>
									<div class="item">
										<legendItem :legendObj="item" :isEdit="true"></legendItem>
									</div>
									<div class="subtitle">
										<span class="name">{{ item.legendName }}</span>
										<span class="size">
											{{ item.legendContent.size.x }}
											*
											{{ item.legendContent.size.y }}px
										</span>
									</div>
								</div>
							</template>
						</div>
					</template>
					<div v-else class="noMore">
						<img src="@/assets/images/no_template.png" alt="" />
						<p class="label">暂无内容</p>
						<p class="txt">请在左侧选择要添加的图例</p>
					</div>
				</div>
				<div class="rht">
					<div class="tle">信息点设置</div>
					<div class="chartBox">
						<legend-choose-texts :queryBody="changedLegend" ref="legendTexts" v-if="JSON.stringify(changedLegend) != '{}'"></legend-choose-texts>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button :size="size" @click="closeChooseLegend">取 消</Button>
				<Button :size="size" type="primary" @click="confirmLegend">确定</Button>
			</div>
		</el-dialog>
	</Dialog>
</template>

<script>
import { Button, Dialog, Select, Option, Tree, Input } from "element-ui";
import refilterType from "./refilterType";
import GetAdmData from "@/store/http/getAdmData";
import setFilter from "@/store/http/setFilter";
import legendItem from "./../legendItem.vue";
import legendChooseTexts from "./../legendChooseTexts.vue";
import legendChooseTextsHint from "./../legendChooseTextsHint.vue";

export default {
	props: {
		visible: {
			type: Boolean,
			default: () => false,
		},
		annexList: {
			type: Array,
			default: () => [],
		},
		annexObj: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			size: "small",
			form: {
				attachName: "",
				attachClassCode: "",
				name: "",
			},
			isLoading: false,
			editType: "",
			defaultProps: {
				label: "name",
			},
			treeData: [],
			expandOnClickNode: true,

			vis_tl: false,
			tl_title: "",
			changedLegend: {},
			legendList: [],
			attachLegends: [],
			h_textsData: [],
			v_textsData: [],

			h_legend: {},
			v_legend: {},
		};
	},

	components: {
		Button,
		refilterType,
		Dialog,
		Select,
		Option,
		Tree,
		Input,
		legendItem,
		legendChooseTexts,
		legendChooseTextsHint,
	},
	computed: {
		visibleModel: {
			get() {
				return this.visible;
			},
			set(val) {
				this.$emit("update:visible", false);
			},
		},
	},
	watch: {
		visibleModel(value) {
			if (value) {
				this.init();
			}
		},
		annexObj: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (JSON.stringify(val) == "{}" || val == undefined) {
					this.h_legend = {};
					this.v_legend = {};
					this.editType = "添加";
					return;
				}
				if (val.id == "") return;
				this.editType = "编辑";
				this.getAttachDetail();
			},
		},
	},
	created() {
		this.getAttachTypeList();
	},

	mounted() {},

	methods: {
		async getAttachDetail() {
			let params = {
				templateId: this.$route.query.templateid,
				operate: "attach-detail",
				attachId: this.annexObj.id,
			};
			const { result, data } = await GetAdmData.getAttachDetail(params);
			if (result == "success") {
				this.form.attachClassCode = data.attachClassCode;
				this.form.attachName = data.attachName;
				this.form.name = this.findTree(data.attachClassCode, this.treeData)?.name;
				this.attachLegends = data.attachLegends;
				await this.setLegendHint();
			}
		},
		findTree(classCode, array) {
			var result;
			array.some((o) => (o.classCode == classCode && (result = o)) || (result = this.findTree(classCode, o.children || [])));
			return result;
		},
		async setLegendHint() {
			const params = {
				classCode: this.form.attachClassCode,
			};
			const { result, data } = await GetAdmData.selectGraphLegend(params);
			if (result == "success") {
				if (this.attachLegends && this.attachLegends.length) {
					let l1 = data.filter((x) => this.attachLegends[0].legendId == x.id);
					let l2 = data.filter((x) => this.attachLegends[1].legendId == x.id);

					if (l1.length && l2.length) {
						let v1 = _.cloneDeep(l1[0]);
						let v2 = _.cloneDeep(l2[0]);
						v1.textList = this.attachLegends[0].textList;
						v2.textList = this.attachLegends[1].textList;

						this.h_legend = v1;
						this.v_legend = v2;
					}
				} else {
					this.h_legend = {};
					this.v_legend = {};
				}
			}
		},
		closeChooseLegend() {
			this.vis_tl = false;
		},
		confirmLegend() {
			if (JSON.stringify(this.changedLegend) == "{}") return this.$message.error("请选择图例");
			// const data = this.$refs.legendTexts.getLegendTextsData();
			if (this.tl_title == "横管") {
				// this.h_textsData = _.map(data, "code");
				// this.changedLegend.textList = this.h_textsData;
				this.h_legend = {};
				this.$nextTick(() => {
					this.h_legend = this.changedLegend;
				});
			} else {
				// this.v_textsData = _.map(data, "code");
				// this.changedLegend.textList = this.v_textsData;
				this.v_legend = {};
				this.$nextTick(() => {
					this.v_legend = this.changedLegend;
				});
			}
			this.closeChooseLegend();
		},
		close() {
			this.visibleModel = false;
		},
		init() {
			this.form = {
				attachName: "",
				attachClassCode: "",
				name: "",
			};
		},
		async confirm() {
			if (this.isLoading) return;
			const { attachName, attachClassCode } = this.form;
			if (!this.annexObj && !this.annexObj.id) {
				const ifRepeat = this.annexList.some((item) => item.name == attachName);
				if (ifRepeat) return this.$message.error("名称重复！");
			}

			if (!attachName || !attachClassCode) return this.$message.error("必填项不能为空");
			if (JSON.stringify(this.h_legend) == "{}") return this.$message.error("请选择横管图例");
			if (JSON.stringify(this.v_legend) == "{}") return this.$message.error("请选择竖管图例");

			const params = {
				templateId: this.$route.query.templateid || "7fbb43cd-72c8-4dd3-b68b-32010117f294",
				operate: "attach-add",
				attachName,
				attachClassCode,
				attachLegends: [
					{
						legendId: this.h_legend.id,
						// textList: this.h_textsData,
					},
					{
						legendId: this.v_legend.id,
						// textList: this.v_textsData,
					},
				],
			};
			if (this.annexObj && this.annexObj.id) {
				params.operate = "attach-update";
				params.attachId = this.annexObj.id;
			}
			this.isLoading = true;
			const { result, data } = await setFilter.setDetailModify(params);
			setTimeout(() => {
				this.isLoading = false;
			}, 300);
			if (result == "success") {
				this.close();
				this.$emit("confirm");
			}
		},
		async getAttachTypeList() {
			this.treeData = [];
			const { result, data } = await GetAdmData.getAttachTypeList();
			if (result == "success") {
				this.treeData = data;
			}
		},
		handleNodeClick(node) {
			this.changedLegend = {};
			this.h_legend = {};
			this.v_legend = {};
			this.changedLegend = {};

			if (!node.objType) return;
			this.form.attachClassCode = node.classCode;
			this.form.name = node.name;
			const Len = this.annexList.filter((item) => item.classCode == node.classCode);
			this.form.attachName = `${node.name}#${Len.length + 1}`;
			this.$refs.selecteltree.blur();
			this.filterTree("");
		},
		filterTree(val) {
			this.$refs.tree.filter(val);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		formatData(data) {
			let options = [];
			if (!data.length) return options;
			const handleData = (list) => {
				list.forEach((item) => {
					if (item.children?.length) {
						handleData(item.children);
					}
					options.push({
						label: item.name,
						value: item.classCode,
					});
				});
				return options;
			};
			const list = handleData(data);
			return list;
		},
		chooseLegendDialog(name) {
			if (this.form.attachClassCode == "") return this.$message.error("请选择小附件类型");
			if (this.form.attachName == "") return this.$message.error("请输入小附件名称");
			if (name == "横管") this.changedLegend = this.h_legend;
			else this.changedLegend = this.v_legend;
			this.vis_tl = true;
			this.tl_title = name;
			this.selectGraphLegend();
		},
		async selectGraphLegend() {
			const params = {
				classCode: this.form.attachClassCode,
			};
			const { result, data } = await GetAdmData.selectGraphLegend(params);
			if (result == "success") {
				this.legendList = data.map((item) => {
					item.checked = false;
					if (item.id == this.changedLegend.id) item.checked = true;
					return item;
				});
			}
		},
		changeSelect(item) {
			this.legendList.map((x) => {
				if (x.id == item.id) {
					x.checked = true;
					this.changedLegend = x;
				} else x.checked = false;
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.annexDialog {
	::v-deep {
		.el-dialog__header {
			padding: 0;
		}

		.el-dialog__body {
			padding: 0;
		}
	}
}

.tlDialog {
	::v-deep {
		.el-dialog__body {
			padding: 0;
		}
	}
}

.head {
	display: flex;
	justify-content: space-between;
	height: 56px;
	align-items: center;
	padding: 0 24px;

	.title {
		font-size: 16px;

		.txt {
			color: #2e3742;
			font-weight: 700;
		}
	}
}

// .head {
//   font-size: 16px;
//   font-weight: 700;
//   // border-bottom: 1px solid #e1e5eb;
//   padding: 20px;

//   .txt {
//     color: #2e3742;
//     padding-right: 6px;
//     margin-right: 8px;
//   }
// }

.container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 422px;
	padding: 11px 32px;
	box-sizing: border-box;
	background: #fff;

	.item {
		padding-bottom: 15px;
		display: flex;
		flex-direction: row;

		.label {
			color: #626c78;
			font-size: 14px;
			line-height: 32px;
			margin-right: 6px;

			.red {
				color: #f55047;
			}
		}

		.tl_cnt {
			width: 276px;
			height: 265px;
			background: #f1f4f6;
			border-radius: 4px;
			position: relative;

			svg {
				cursor: pointer;
			}

			.hint {
				position: absolute;
				display: flex;
				align-items: center;
				justify-content: center;
				top: 0;
			}

			.lName {
				position: absolute;
				left: 0;
				display: flex;
				bottom: -44px;
				width: 100%;
				height: 44px;
				justify-content: space-between;
				line-height: 44px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0 16px;
				border-top: 1px solid #e1e5eb;

				.name {
					font-family: "Microsoft YaHei UI";
					font-weight: 700;
					font-size: 14px;
					color: #1b2129;
				}

				.size {
					font-family: "Microsoft YaHei UI";
					color: #8b949e;
					font-weight: 400;
				}
			}
		}
	}

	.tl_c {
		display: flex;
		flex-direction: row;
	}

	.tl {
		flex-direction: column;
		margin-right: 40px;
	}

	.inline {
		.select {
			width: 260px;
		}

		.fjName {
			width: 260px;
		}
	}
}

.dl_tl_cnt {
	height: 524px;
	display: flex;
	flex-direction: row;

	.lft {
		width: 635px;
		display: flex;
		flex-direction: column;
		border-right: 1px solid #e1e5eb;

		.tle {
			height: 50px;
			padding-left: 32px;
			line-height: 46px;
			font-size: 16px;
			color: #1b2129;
			font-weight: 700;
			font-family: "Microsoft YaHei UI";

			.classcode {
				color: #626c78;
			}
		}

		.legendList {
			display: flex;
			flex-wrap: wrap;
			flex-grow: 1;
			height: 0;
			overflow-y: auto;
			gap: 16px;
			padding-left: 32px;
			padding-bottom: 12px;

			.legendItem {
				flex-shrink: 0;
				width: 276px;
				height: 265px;
				// margin: 15px;
				display: flex;
				flex-direction: column;
				border: 1px solid #e1e5eb;
				border-radius: 8px;
				position: relative;
				cursor: pointer;
				overflow: hidden;

				&.un {
					cursor: not-allowed;

					.radio {
						.icon {
							color: #bdc4cb;
						}
					}
				}

				.radio {
					position: absolute;
					right: 5px;
					top: 5px;

					.icon {
						font-size: 22px;
						color: #367ae4;
						display: none;
					}

					.noSel {
						display: block;
						width: 19px;
						height: 19px;
						border-radius: 50%;
						// box-sizing: border-box;
						border: 1px solid #8b949e;
					}
				}

				.item {
					display: flex;
					flex-grow: 1;

					.icon {
						cursor: pointer;
					}
				}

				.subtitle {
					border-top: 1px solid #e1e5eb;
					flex-shrink: 0;
					height: 40px;
					background: #f1f4f6;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 15px;
					font-size: 14px;
					cursor: pointer;

					.name {
						font-weight: 700;
						color: #1b2129;
					}

					.size {
						color: #8b949e;
					}
				}
			}

			.legendItemChecked {
				border: 1px solid #246fe5;

				.el-icon-success {
					display: block !important;
				}

				.noSel {
					display: none !important;
				}
			}
		}

		.noMore {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			line-height: 22px;

			.label {
				color: #626c78;
				padding-top: 12px;
			}
		}
	}

	.rht {
		display: flex;
		flex-direction: column;
		flex: 1;

		.tle {
			height: 50px;
			font-weight: 700;
			font-family: "Microsoft YaHei UI";
			color: #424c59;
			line-height: 46px;
			padding-left: 23px;
		}

		.chartBox {
			width: 320px;
			height: 396.88px;
			background: #f7f9fa;
			border-radius: 8px;
			margin-left: 23px;
			display: flex;
		}
	}
}
</style>
