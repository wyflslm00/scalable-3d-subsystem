<template>
	<div class="project-edit">
		<el-dialog :title="editName" :visible.sync="dialogVisible" width="840px" :close-on-click-modal="false" :before-close="handleClose">
			<div class="box">
				<div class="subtitle">基础信息</div>
				<div class="content">
					<div class="label"><span class="name">模板名称</span></div>
					<!-- <div class="title" v-if="form.templateCode">
                    {{form.templateCode}}
                </div> -->
					<!-- {{form.templateCode?form.templateCode:'专业-空间范围-基准对象-关系图类型-说明-版本号'}} -->
					<div class="title">{{ `${alertName.majorCode?.length ? alertName.majorCode : "专业"}-${form.spacialScale?.length ? form.spacialScale : "空间范围"}-${alertName.referenceObjectTypeCode ? alertName.referenceObjectTypeCode : "基准对象"}-${form.graphTypeCode ? form.graphTypeCode : "关系图类型"}-${form.graphSubTypeCode?.length ? form.graphSubTypeCode : "说明"}-${form.version?.length ? form.version : "版本号"}` }}</div>
				</div>

				<div class="content" style="height: 32px; align-items: center">
					<div class="label">
						<span class="name">状态<span class="red">*</span></span>
					</div>
					<Select style="margin-left: 6px" class="select" size="small" v-model="form.templateStatus">
						<Option value="设计中"></Option>
						<Option value="验收通过"></Option>
						<Option value="已上架"></Option>
						<Option value="废弃"></Option>
					</Select>
				</div>

				<div class="content" style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start">
					<div class="label"><span class="name">关联需求</span></div>
					<!-- <Select style="margin-top: 2px;width:530px;" v-model="no_1" :disabled="true" class="select" size="small" >
                     </Select> -->
				</div>

				<div class="subtitle" style="margin-top: 26px">分类选择</div>
				<div class="content">
					<Row :gutter="25" type="flex" style="width:100%">
						<Col :span="7">
							<div class="label">
								<span class="name">专业<span class="red">*</span></span>
							</div>
							<Select :disabled="isDisabled" class="select" size="small" v-model="form.majorCode" @change="getGrapTypes($event)">
								<Option v-for="item in majorList" :key="item.id" :value="item.code" :label="item.label"></Option>
							</Select>
						</Col>
						<Col :span="8">
							<div class="label"><span class="name">空间范围</span></div>
							<Input :disabled="isDisabled" maxlength="20" class="input" size="small" v-model="form.spacialScale"> </Input>
						</Col>

						<Col :span="8">
							<div class="label">
								<span class="name">基准对象<span class="red">*</span></span>
							</div>
							<el-cascader ref="cascaderSelect" :disabled="isDisabled" placeholder="试试搜索：基准对象" size="small" v-model="form.referenceObjectTypeCode" @change="changeReferenceObjectTypeCode" :options="newgetterTreeList" :filterable="true" style="width: 100%" :props="{ value: 'classCode', label: 'name', children: 'children', multiple: false, checkStrictly: true }" :show-all-levels="true"></el-cascader>
						</Col>
					</Row>
				</div>
				
				<div class="content">
					<Row :gutter="25" type="flex" style="width:100%">
						<Col :span="7">
							<div class="label">
								<span class="name">关系图类<span class="red">*</span></span>
								<Popover :disabled="isDisabled" placement="bottom-end" v-model="showGraphType" @hide="addGraphTypeCode = ''">
									<div class="label">
										<span class="name"> 关系类型名称<span class="red">*</span> </span>
									</div>
									<Input size="small" v-model="addGraphTypeCode" maxlength="20" placeholder="最多可输入20个字"></Input>
									<div style="text-align: right; margin-top: 10px">
										<Button size="mini" @click="showGraphType = false">取消</Button>
										<Button type="primary" size="mini" @click="insertGrapType">确定</Button>
									</div>
									<span class="btn" :class="{ disabled: isDisabled }" slot="reference">添加选项</span>
								</Popover>
							</div>
							<Select :disabled="isDisabled" clearable class="select" size="small" v-model="form.graphTypeCode">
								<Option v-for="item in grapTypes" :key="item.id" :value="item.graphTypeCode" :label="item.graphTypeCode"> </Option>
							</Select>
						</Col>
						<Col :span="8">
							<div class="label"><span class="name">说明</span></div>
							<Input :disabled="isDisabled" maxlength="20" class="input" size="small" v-model="form.graphSubTypeCode"> </Input>
						</Col>
						<!-- <Col :span="8">
							<div style="width: 203px"></div>
						</Col> -->
						<Col :span="8">
							<div class="label">
								<span class="name">模版版本号<span class="red">*</span></span>
							</div>
							<Input :disabled="isDisabled" maxlength="20" class="input" size="small" v-model="form.version"> </Input>
						</Col>
					</Row>
				</div>

				<!-- <div class="content">
					<Row :gutter="25" type="flex">
						<Col :span="8">
							<div class="label">
								<span class="name">模版版本号<span class="red">*</span></span>
							</div>
							<Input :disabled="isDisabled" maxlength="20" class="input" size="small" v-model="form.version"> </Input>
						</Col>
						<Col :span="8">
							<div style="width: 203px"></div>
						</Col>
						<Col :span="8">
							<div style="width: 203px"></div>
						</Col>
					</Row>
				</div> -->
				<div class="content">
					<div class="inline">
						<span>
							BDTP版本号：<span class="version">{{ $store.state.version.dicVersion }}</span>
						</span>
						<span :class="'style' + $store.state.version.dicState">
							{{ ["初始化", "编辑中", "业务预发", "已发布"][+$store.state.version.dicState] }}
						</span>
					</div>
				</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="handleClose">取 消</el-button>
				<el-button type="primary" size="small" @click="enter" :loading="isLoading">{{ this.options?.id ? "确定" : "确定并进入开发" }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { Dialog, Button, Form, FormItem, Row, Col, Input, Select, Option, DatePicker, Tree, Popover } from "element-ui";
import { mapGetters, mapActions } from "vuex";
import getTemplate from "@/store/http/getTemplate";
import GetAdmData from "@/store/http/getAdmData";
import { Container } from "pixi.js";
export default {
	name: "Edit",
	props: ["dialogVisible", "options"],
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
	data() {
		return {
			editName: "",
			form: {
				majorCode: "",
				referenceObjectTypeCode: "",
				graphTypeCode: "",
				graphSubTypeCode: "",
				templateStatus: "设计中",
				templateCode: "",
				spacialScale: "",
				version: "",
			},
			//专业
			majorList: [],
			//关系图类
			grapTypes: [],
			isDisabled: false,
			isLoading: false,

			no_1: "",
			newgetterTreeList: [],

			showGraphType: false,
			addGraphTypeCode: "",
			alertName: {
				majorCode: "",
				referenceObjectTypeCode: "",
			},
		};
	},
	watch: {
		"form.templateStatus": {
			handler(val) {
				if (this.options?.id) {
					if (this.form.templateStatus === "已上架" || this.form.templateStatus === "废弃") {
						this.isDisabled = true;
					} else {
						this.isDisabled = false;
					}
				}
			},
			immediate: true,
			deep: true,
		},
	},
	mounted() {
		this.editName = this.options?.id ? "编辑模板" : "创建模板";
		this.getMajorList();
		this.newgetGrapTypes();
		if (this.options?.id) {
			this.alertName.majorCode = this.options.majorCodeLabel;
			this.alertName.referenceObjectTypeCode = this.options.referenceObjectTypesLabel;
			// if(this.options.templateStatus==='已上架'||this.options.templateStatus==='废弃'){
			//     this.isDisabled = true
			// }else{
			//     this.isDisabled = false
			// }
			// console.error(this.options)
			let referenceObjectTypeCode = [];
			const handleData = (list, fatherArrList) => {
				for (let i = 0; i < list.length; i++) {
					let fatherArr = JSON.parse(JSON.stringify(fatherArrList));
					if (list[i].classCode === this.options.referenceObjectTypeCode) {
						fatherArr.push(list[i].classCode);
						referenceObjectTypeCode = fatherArr;
						break;
					}
					if (list[i].children) {
						fatherArr.push(list[i].classCode);
						handleData(list[i].children, fatherArr);
					}
				}
			};
			handleData(this.newgetterTreeList, []);
			console.error(this.options);
			this.form = {
				spacialScale: this.options.spacialScale,
				templateCode: this.options.templateCode,
				templateStatus: this.options.templateStatus,
				id: this.options.id,
				majorCode: this.options.majorCode,
				graphTypeCode: this.options.graphTypeCode,
				graphSubTypeCode: this.options.graphSubTypeCode,
				version: this.options.version,
				referenceObjectTypeCode: referenceObjectTypeCode,
			};
		}
	},
	computed: {
		...mapGetters(["getterTreeList"]),
	},
	created() {
		let getterTreeList = JSON.parse(JSON.stringify(this.getterTreeList));
		const listFun = (list) => {
			for (let i = 0; i < list.length; i++) {
				if (list[i].children) {
					listFun(list[i].children);
				}
				if (list[i].objType) {
					list[i].disabled = false;
				} else {
					list[i].disabled = true;
				}
			}
		};
		listFun(getterTreeList);

		// const loop = (list)=>{
		//     for(let i =list.length-1;i>=0;i--){
		//         if(list[i].children){
		//             loop(list[i].children)
		//         }else{
		//             if(list[i].disabled===true){
		//                 list.splice(i,1)
		//             }
		//         }
		//     }
		// }
		// loop(getterTreeList)
		this.newgetterTreeList = getterTreeList;

		// console.error(this.newgetterTreeList)
	},
	methods: {
		async getMajorList(val) {
			//专业
			const { result, data } = await getTemplate.getMajorList();
			if (result == "success") {
				this.majorList = data;
			}
		},
		//关系图类 new
		async newgetGrapTypes(val) {
			const { majorCode } = this.form;
			const params = {
				majorCode: null,
			};
			const { result, data } = await getTemplate.getGrapType(params);
			if (result == "success") {
				this.grapTypes = data;
			}
		},

		//关系图类
		async getGrapTypes(val) {
			if (val) {
				let obj = this.majorList.find((item) => {
					return item.code === val;
				});
				this.alertName.majorCode = obj.label;
			}

			// this.form.graphTypeCode = ""
			// const {
			// majorCode,
			// } = this.form
			// const params = {
			// majorCode:null,
			// };
			// const {
			// result,
			// data
			// } = await getTemplate.getGrapType(params);
			// if (result == "success") {
			// this.grapTypes = data;
			// }
		},

		//添加关系图类
		async insertGrapType() {
			const { majorCode, referenceObjectTypeCode, graphTypeCode } = this.form;
			if (!this.addGraphTypeCode) {
				return this.$message.error("名称不能为空！");
			}
			//   if (!majorCode) {
			//     return this.$message.error("请选择专业")
			//   }
			// if (!graphTypeCode) {
			//   return this.$message.error("请选择关系图类")
			// }
			//   if (!referenceObjectTypeCode) {
			//     return this.$message.error("请选择基准对象")
			//   }
			const params = {
				// majorCode,
				// referenceObjectTypeCode,
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

		handleClose() {
			this.$emit("close");
		},
		changeReferenceObjectTypeCode(val) {
			setTimeout(() => {
				this.alertName.referenceObjectTypeCode = this.$refs.cascaderSelect.getCheckedNodes()[0].label;
			}, 0);
			// this.alertName.referenceObjectTypeCode = this.$refs.cascaderSelect.getCheckedNodes()[0].label
		},
		async enter() {
			const { majorCode, graphTypeCode, referenceObjectTypeCode, graphSubTypeCode, templateCode, spacialScale, id, templateStatus, version } = this.form;

			if (!version || !templateStatus || !majorCode || !graphTypeCode || !referenceObjectTypeCode) return this.$message.error("必填信息不能为空");
			if (this.isLoading) return;
			this.isLoading = true;

			let paramsReferenceObjectTypeCode = referenceObjectTypeCode[referenceObjectTypeCode.length - 1];

			if (!id) {
				const params = {
					majorCode,
					referenceObjectTypeCode: paramsReferenceObjectTypeCode,
					graphTypeCode,
					graphSubTypeCode,
					spacialScale,
					templateStatus,
					version,
					dicVersion: this.$store.state.version.dicVersion,
				};

				const { result, data, message } = await GetAdmData.insertTemplate(params);
				this.isLoading = false;
				if (result == "success") {
					this.$emit("success", data);
				} else {
					this.$message.error(message);
				}
			} else {
				const params = {
					templateId: id,
					operate: "updateInfo",
					majorCode,
					referenceObjectTypeCode: paramsReferenceObjectTypeCode,
					graphTypeCode,
					graphSubTypeCode,
					spacialScale,
					templateStatus,
					version,
				};

				if (templateStatus == "已上架" && this.options.conflictWithDicFlag && this.options.templateStatus != "已上架") {
					this.$confirm("此模板有问题，请慎重上架！", "", {
						confirmButtonText: "上架",
						cancelButtonText: "取消",
						type: "info",
						showClose: false,
						iconClass: "jsicon",
					})
						.then(() => {
							this.graphTemplateModify(params);
						})
						.catch(() => {
							this.isLoading = false;
						});
				} else {
					this.graphTemplateModify(params);
				}
			}
		},
		async graphTemplateModify(params) {
			const { result, data, message } = await getTemplate.graphTemplateModify(params);
			this.isLoading = false;
			if (result == "success") {
				// this.$message({
				// 		message: "",
				// 		type: "success",
				// 	});
				this.$emit("success");
				this.handleClose();
			} else {
				this.$message.error(message);
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
	border-left: 3px solid #246fe5;
	padding-left: 5px;
	margin-bottom: 16px;
}
.content {
	display: flex;
	margin-bottom: 10px;
	width: 100%;

	.title {
		color: #1b2129;
		font-size: 14px;
		line-height: 22px;
		margin-left: 6px;
	}

	.label {
		color: #626c78;
		display: flex;
		justify-content: space-between;
		line-height: 22px;
		max-width: 194px;
		padding-bottom: 4px;

		.red {
			color: #f55047;
			margin: 0 5px;
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

	.inline {
		display: flex;
		align-items: center;
		gap: 4px;

		.version {
			color: #1b2129;
			font-size: 14px;
		}

		.style1 {
			padding: 0 4px;
			border-radius: 2px;
			background: #d9ebff;
			color: #1b4acc;
			font-feature-settings: "clig" off, "liga" off;
			/* 内文辅助文本 */
			font-family: Microsoft YaHei UI;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px;
			/* 166.667% */
		}

		.style3 {
			padding: 0 4px;
			border-radius: 2px;
			background: #cbf7f3;
			color: #00a2a7;
			font-feature-settings: "clig" off, "liga" off;
			/* 内文辅助文本 */
			font-family: Microsoft YaHei UI;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px;
		}
	}
}

::v-deep .el-dialog__body {
	padding: 12px 24px;
}
</style>
<style lang="scss">
.jsicon {
	width: 24px;
	height: 24px;
	background: url("@/assets/images/CombinedShape.png") no-repeat;
}
</style>
