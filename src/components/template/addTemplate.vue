<!-- 创建模板 -->
<template>
	<Dialog :title="title" :visible.sync="visibleModel" @close="close" class="dialog" width="840px" destroy-on-close :close-on-click-modal="false">
		<Form>
			<div class="subtitle">基础信息</div>
			<FormItem label="模板ID" v-if="options.id">
				{{ options.id }}
			</FormItem>
			<FormItem>
				<Row type="flex" :gutter="25">
					<Col :span="8">
						<div class="label">
							<span class="name">模板名称<span class="red">*</span></span>
						</div>
						<Input class="input" :size="size" v-model="form.templateCode"></Input>
					</Col>
					<Col :span="6" v-if="options.id">
						<div class="label">
							<span class="name">状态<span class="red">*</span></span>
						</div>
						<Select class="select" :size="size" v-model="form.templateStatus">
							<Option value="设计中"></Option>
							<Option value="验收通过"></Option>
							<Option value="已上架"></Option>
						</Select>
					</Col>
				</Row>
			</FormItem>
			<FormItem>
				<Row type="flex" :gutter="20">
					<Col :span="8">
						<div class="label"><span class="name">关联需求</span></div>
						<!-- <Select class="select" :size="size" disabled>
            <Option></Option>
                                                                                                                                                                                                                                                                                                                    </Select> -->
					</Col>
				</Row>
			</FormItem>
			<div class="subtitle">分类选择</div>
			<FormItem>
				<Row :gutter="25" type="flex">
					<Col :span="8">
						<div class="label">
							<span class="name">专业<span class="red">*</span></span>
						</div>
						<Select :disabled="isDisabled" class="select" :size="size" v-model="form.majorCode" @change="getGrapTypes">
							<Option v-for="item in majorList" :key="item.id" :value="item.code" :label="item.label"></Option>
						</Select>
					</Col>
					<Col :span="8">
						<div class="label">
							<span class="name">关系图类<span class="red">*</span></span>
							<Popover :disabled="isDisabled" placement="bottom-end" v-model="showGraphType">
								<div class="label">
									<span class="name"> 关系类型名称<span class="red">*</span> </span>
								</div>
								<Input :size="size" v-model="addGraphTypeCode" maxlength="20" placeholder="最多可输入20个字"></Input>
								<div style="text-align: right; margin-top: 10px">
									<Button size="mini" @click="showGraphType = false">取消</Button>
									<Button type="primary" size="mini" @click="insertGrapType">确定</Button>
								</div>
								<span class="btn" :class="{ disabled: isDisabled }" slot="reference">添加选项</span>
							</Popover>
						</div>
						<Select :disabled="isDisabled" clearable class="select" :size="size" v-model="form.graphTypeCode" @change="getGraphSubTypes">
							<Option v-for="item in grapTypes" :key="item.id" :value="item.graphTypeCode" :label="item.graphTypeCode"> </Option>
						</Select>
					</Col>

					<Col :span="8">
						<img class="linkIcon" src="@/assets/images/toLink.png" alt="" />
						<div class="label">
							<span class="name">基准对象<span class="red">*</span></span>
						</div>
						<Select filterable :filter-method="filterTree" :disabled="isObjDisabled" ref="selecteltree" class="select" :size="size" v-model="form.referenceObjectTypeCode" placeholder="试试搜索：基准对象">
							<Option v-for="(item, i) in formatData(referenceObjectTypes)" :key="item.value + i" :value="item.value" :label="item.label" style="display: none"></Option>
							<Tree class="main-select-el-tree" ref="tree" :data.sync="referenceObjectTypes" node-key="classCode" highlight-current :props="defaultProps" @node-click="handleNodeClick" :current-node-key="form.referenceObjectTypeCode" :expand-on-click-node="expandOnClickNode" :filter-node-method="filterNode" />
						</Select>
					</Col>
				</Row>
			</FormItem>
			<FormItem>
				<Row :gutter="25" type="flex">
					<Col :span="8">
						<div class="label">
							<span class="name">空间范围<span class="red">*</span></span>
						</div>
						<Input :disabled="isDisabled" class="input" :size="size" v-model="form.remark"> </Input>
					</Col>
					<Col :span="8">
						<div class="label">
							<span class="name">关系图子类<span class="red">*</span></span>
							<Popover :disabled="isDisabled" placement="bottom-end" v-model="showGraphSubType">
								<div class="label">
									<span class="name"> 关系图子类名称<span class="red">*</span> </span>
								</div>
								<Input :size="size" v-model="addGraphSubTypeCode" maxlength="20" placeholder="最多可输入20个字"></Input>
								<div style="text-align: right; margin-top: 10px">
									<Button size="mini" @click="showGraphSubType = false">取消</Button>
									<Button type="primary" size="mini" @click="insertGrapSubType">确定</Button>
								</div>

								<span class="btn" :class="{ disabled: isDisabled }" slot="reference">添加选项</span>
							</Popover>
						</div>
						<Select :disabled="isDisabled" class="select" :size="size" v-model="form.graphSubTypeCode">
							<Option v-for="item in graphSubTypes" :key="item.id" :value="item.graphSubTypeCode" :label="item.graphSubTypeCode"></Option>
						</Select>
					</Col>
					<!-- <Col :span="8">
          <div class="label"><span class="name">对象说明<span class="red">*</span></span></div>
          <Input class="input" :size="size" v-model="form.remark">
          </Input>
                                                                                                                              </Col> -->
				</Row>
			</FormItem>
			<FormItem label="版本号" v-if="options.id || form.version">
				{{ options.version || form.version }}
			</FormItem>
		</Form>
		<div slot="footer">
			<Button :size="size" @click="cancel">取 消</Button>
			<Button :size="size" type="primary" @click="confirm" :loading="isLoading">{{ this.options?.id ? "确定" : "确定并进入开发" }}</Button>
		</div>
	</Dialog>
</template>

<script>
import getTemplate from "@/store/http/getTemplate";
import GetAdmData from "@/store/http/getAdmData";
let historyTemplateName = null;
const initForm = () => ({
	majorCode: "",
	referenceObjectTypeCode: "",
	graphTypeCode: "",
	graphSubTypeCode: "",
	templateStatus: "设计中",
	templateCode: "",
	remark: "",
	version: "",
});

import { Dialog, Button, Form, FormItem, Row, Col, Input, Select, Option, DatePicker, Tree, Popover } from "element-ui";
export default {
	props: {
		visible: {
			type: Boolean,
			default: () => true,
		},
		options: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			size: "small",
			//模板标题
			// templateCode: "",
			isLoading: false,
			//专业
			majorList: [],
			// majorCode: "",
			//关系图类
			showGraphType: false,
			grapTypes: [],
			// graphTypeCode: "",
			addGraphTypeCode: "",
			//基准对象
			referenceObjectTypes: [],
			// referenceObjectTypeCode: "",
			//关系图子类
			showGraphSubType: false,
			graphSubTypes: [],
			// graphSubTypeCode: "",
			addGraphSubTypeCode: "",
			//对象说明
			explain: "",
			//空间范围
			scope: "",

			form: initForm(),

			expandOnClickNode: true,
			defaultProps: {
				label: "name",
			},
		};
	},

	components: {
		Dialog,
		Button,
		Form,
		FormItem,
		Row,
		Col,
		Input,
		Select,
		Option,
		DatePicker,
		Tree,
		Popover,
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
		title() {
			return `${this.options?.id ? "编辑模板" : "创建模板"}`;
		},
		isUnull() {
			const { majorCode, graphTypeCode, graphSubTypeCode, referenceObjectTypeCode } = this.form;
			return majorCode != "" && graphTypeCode != "" && graphSubTypeCode != "" && referenceObjectTypeCode != "";
		},
		isDisabled() {
			return !!this.options?.id;
		},
		isObjDisabled() {
			const { graphTypeCode } = this.form;
			if (!this.grapTypes.length || !graphTypeCode) return false;
			const obj = this.grapTypes.find((item) => item.graphTypeCode == graphTypeCode);
			return obj?.referenceObjectTypeCode != "" || !!this.options?.id;
		},
	},

	watch: {
		visibleModel(val) {
			if (val) {
				this.initParams();
				if (this.options?.id) {
					this.$nextTick(() => {
						this.form = this.options;
						this.getMajorList();
					});
				}
			}
		},
		isUnull(val) {
			if (val) {
				this.getVersion();
			}
		},
		"form.majorCode"(newVal, oldVal) {
			if (oldVal) {
				this.form.graphTypeCode = "";
				this.form.referenceObjectTypeCode = "";
				this.form.graphSubTypeCode = "";
			}
		},
		"form.graphTypeCode"(newVal, oldVal) {
			if (oldVal) {
				this.form.graphSubTypeCode = "";
			}
		},
	},

	created() {
		this.getMajorList();
		this.getTypeTree();
	},

	methods: {
		initParams() {
			this.form = initForm();
			//模板标题
			// this.templateCode = "";
			//专业
			// this.majorCode = "";
			//关系图类
			this.grapTypes = [];
			// this.graphTypeCode = "";
			//基准对象
			// this.referenceObjectTypes = [];
			// this.referenceObjectTypeCode = "";
			//关系图子类
			this.graphSubTypes = [];
			// this.graphSubTypeCode = "";
		},
		close(val) {},
		cancel() {
			this.$emit("update:visible", false);
			this.$emit("close");
			this.$nextTick(() => {
				// this.form = initForm();
			});
		},

		async getMajorList(val) {
			//专业
			const { result, data } = await getTemplate.getMajorList();
			const { majorCode } = this.form;
			if (result == "success") {
				this.majorList = data;
			}
			if (majorCode) {
				this.getGrapTypes();
			}
		},
		//关系图类
		async getGrapTypes(val) {
			if (val) {
				let name = this.majorList.filter((item) => {
					return item.code === val;
				})[0].label;

				if (!this.form.templateCode.length) {
					this.form.templateCode = name;
					historyTemplateName = name;
				} else {
					if (historyTemplateName === this.form.templateCode) {
						this.form.templateCode = name;
						historyTemplateName = name;
					}
				}
			}

			const { majorCode, graphTypeCode } = this.form;
			const params = {
				majorCode,
			};
			this.grapTypes = [];
			const { result, data } = await getTemplate.getGrapType(params);
			if (result == "success") {
				this.grapTypes = data;
			}
			if (graphTypeCode) {
				this.getGraphSubTypes();
			}
		},
		filterTree(val) {
			this.$refs.tree.filter(val);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		//基准对象
		async getTypeTree() {
			this.referenceObjectTypes = [];
			const { result, data } = await GetAdmData.getTypeTree();
			if (result == "success") {
				this.referenceObjectTypes = data;
			}
		},
		//关系图子类
		async getGraphSubTypes() {
			const { majorCode, graphTypeCode } = this.form;
			const params = {
				majorCode,
				graphTypeCode,
			};
			if (!graphTypeCode) return;
			const { referenceObjectTypeCode } = this.grapTypes.find((item) => item.graphTypeCode == graphTypeCode);
			this.form.referenceObjectTypeCode = referenceObjectTypeCode;
			this.graphSubTypes = [];
			const { result, data } = await getTemplate.getGraphSubType(params);
			if (result == "success") {
				this.graphSubTypes = data;
			}
		},

		//添加关系图类
		async insertGrapType() {
			const { majorCode, referenceObjectTypeCode, graphTypeCode } = this.form;
			if (!this.addGraphTypeCode) {
				return this.$message.error("名称不能为空！");
			}
			if (!majorCode) {
				return this.$message.error("请选择专业");
			}
			// if (!graphTypeCode) {
			//   return this.$message.error("请选择关系图类")
			// }
			if (!referenceObjectTypeCode) {
				return this.$message.error("请选择基准对象");
			}
			const params = {
				majorCode,
				referenceObjectTypeCode,
				graphTypeCode: this.addGraphTypeCode,
			};
			const isHas = this.grapTypes.findIndex((item) => item.graphTypeCode == this.addGraphTypeCode);

			if (isHas > -1) {
				return this.$message.error("关系图类已存在");
			}
			const { result } = await getTemplate.insertGrapType(params);
			if (result == "success") {
				//添加后更新列表
				this.showGraphType = false;
				this.form.graphTypeCode = this.addGraphTypeCode;
				this.addGraphTypeCode = "";
				this.getGrapTypes();
			}
		},

		//添加关系图子类
		async insertGrapSubType() {
			const { majorCode, graphTypeCode, referenceObjectTypeCode, graphSubTypeCode } = this.form;
			if (!this.addGraphSubTypeCode) {
				return this.$message.error("名称不能为空！");
			}
			if (!majorCode) {
				return this.$message.error("请选择专业");
			}
			if (!graphTypeCode) {
				return this.$message.error("请选择关系图类");
			}
			// if (!graphSubTypeCode) {
			//   return this.$message.error("请选择关系图子类")
			// }
			const params = {
				majorCode,
				referenceObjectTypeCode,
				graphTypeCode,
				graphSubTypeCode: this.addGraphSubTypeCode,
			};
			const isHas = this.graphSubTypes.findIndex((item) => item.graphSubTypeCode == this.addGraphSubTypeCode);
			if (isHas > -1) {
				return this.$message.error("关系图子类已存在");
			}
			const { result } = await getTemplate.insertGrapSubType(params);
			if (result == "success") {
				this.showGraphSubType = false;
				this.form.graphSubTypeCode = this.addGraphSubTypeCode;
				this.addGraphSubTypeCode = "";
				this.getGraphSubTypes();
			}
		},
		async confirm() {
			const { majorCode, graphTypeCode, referenceObjectTypeCode, graphSubTypeCode, templateCode, remark, id, templateStatus } = this.form;

			if (!this.isUnull || !templateStatus || !templateCode || !remark) return this.$message.error("必填信息不能为空");
			if (this.isLoading) return;
			this.isLoading = true;
			if (!id) {
				const params = {
					majorCode,
					referenceObjectTypeCode,
					graphTypeCode,
					graphSubTypeCode,
					templateCode,
					remark,
					templateStatus,
				};
				const { result, data, message } = await GetAdmData.insertTemplate(params);
				if (result == "success") {
					this.$emit("success", data);
				} else {
					this.$message.error(message);
				}
			} else {
				const params = {
					templateId: id,
					operate: "updateInfo",
					templateCode,
					templateStatus,
				};
				const { result, data, message } = await getTemplate.graphTemplateModify(params);
				if (result == "success") {
					this.$emit("success", data);
				} else {
					this.$message.error(message);
				}
			}
			this.isLoading = false;
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
		handleNodeClick(node) {
			this.form.referenceObjectTypeCode = node.classCode;
			this.$refs.selecteltree.blur();
			this.filterTree("");
		},
		async getVersion() {
			const { majorCode, graphTypeCode, graphSubTypeCode } = this.form;
			const params = {
				majorCode,
				graphSubTypeCode,
				graphTypeCode,
			};
			const { result, data } = await getTemplate.getVersion(params);
			if (result == "success") {
				//添加后更新列表
				this.form.version = data.version;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.subtitle {
	font-size: 14px;
	font-weight: 700;
	color: #2e3742;
	border-left: 2px solid #246fe5;
	padding-left: 5px;
	margin-bottom: 16px;
}

.linkIcon {
	position: absolute;
	width: 16px;
	height: 16px;
	margin-top: 39px;
	margin-left: -20px;
}

.label {
	color: #626c78;
	display: flex;
	justify-content: space-between;
	line-height: 22px;
	padding-bottom: 4px;

	.red {
		color: #f55047;
	}

	.btn {
		color: #246fe5;
		cursor: pointer;

		&.disabled {
			cursor: not-allowed;
			color: #c0c4cc;
		}
	}
}

.input,
.select,
.picker {
	width: 100%;
}
</style>

<style lang="scss">
::v-deep .el-dialog__body {
	padding: 0;
}
</style>
