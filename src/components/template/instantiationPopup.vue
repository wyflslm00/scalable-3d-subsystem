<template>
	<!-- 实例化 左侧弹窗 -->
	<transition name="drawer-fade">
		<div class="drawer__wrapper" v-show="visibleModel">
			<div class="drawer__container" :class="visibleModel && 'drawer__open'" @click.self="handleWrapperClick">
				<div class="drawer" :class="[direction]" ref="drawer">
					<div class="drawer__body">
						<div class="label">
							<span class="name">环境</span>
							<span class="red">*</span>
						</div>
						<div class="item">
							<Select :size="size" v-model="urlPar.env" @change="changeEnv" style="width: 366px">
								<Option v-for="item in instantiationEnvList" :value="item.id" :label="item.name" :key="item.id"></Option>
							</Select>
						</div>
						<div class="label">
							<span class="name">项目实例</span>
							<span class="red">*</span>
						</div>
						<div class="item">
							<Select :size="size" filterable :key="keyIndex" v-model="urlPar.projectId" @change="changeProjectId" style="width: 366px">
								<Option v-for="item in projectList" :value="item.projectId+'-'+item.groupCode" :label="item.name" :key="item.projectId+item.groupCode"></Option>
							</Select>
						</div>
						<div class="label">
							<span class="name">基准对象实例</span>
							<span class="red">*</span>
						</div>
						<div class="item">
							<Select ref="selecteltree" filterable class="select" :size="size" v-model="form.referenceObjectId" style="width: 366px">
								<Option v-for="item in referenceObjectTypes" :key="item.id" :value="item.id" :label="item.localName"></Option>
								<!-- <Option v-for="item, i in formatData(referenceObjectTypes)" :key="item.value + i" :value="item.value"
                  :label="item.label" style="display: none;"></Option>
                <Tree class="main-select-el-tree" ref="selecteltree" :data="referenceObjectTypes" node-key="classCode"
                  highlight-current :props="defaultProps" @node-click="handleNodeClick"
                  :current-node-key="form.referenceObjectId" :expand-on-click-node="expandOnClickNode" /> -->
							</Select>
						</div>
						<!-- <div class="label">
							<span class="name">放大倍数</span>
							<span class="red">*</span>
						</div>
						<div class="item">
							<Select ref="selecteltree" class="select" :size="size" v-model="legendScaleRatio" style="width: 366px">
								<Option v-for="item in legendScaleRatioList" :key="item" :value="item" :label="item"></Option>
							</Select>
						</div> -->
						<div class="label">
							<span class="name">画布尺寸</span>
						</div>
						<div class="item">
							<Select :size="size" v-model="layoutSize" style="width: 366px">
								<Option v-for="(item, index) in layoutSizes" :key="index" :label="item.label" :value="item.value"></Option>
							</Select>
						</div>

						<el-collapse accordion>
							<el-collapse-item>
								<template slot="title">
									<div class="ln_title">
										视觉展示配置
										<div class="zk">展开</div>
										<div class="sq">收起</div>
									</div>
								</template>
								<div class="blk" style="width: 208px">
									<span class="tle">图例放大倍数</span>

									<Select ref="selecteltree" class="select" :size="size" v-model="legendScaleRatio">
										<Option v-for="item in legendScaleRatioList" :key="item" :value="item" :label="item"></Option>
									</Select>
								</div>
								<div class="blk" style="width: 96px">
									<span class="tle">默认文字大小</span>
									<el-input @input="ScaleRatio.fontSize=ScaleRatio.fontSize.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" :size="size" v-model="ScaleRatio.fontSize" placeholder="请输入"></el-input>
								</div>
								<div class="blk" style="width: 96px">
									<span class="tle">线芯</span>
									<el-input  @input="ScaleRatio.lineContent=ScaleRatio.lineContent.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" :size="size" v-model="ScaleRatio.lineContent" placeholder="请输入"></el-input>
								</div>
								<div class="blk" style="width: 96px">
									<span class="tle">底色</span>
									<el-input  @input="ScaleRatio.lineBackground=ScaleRatio.lineBackground.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" :size="size" v-model="ScaleRatio.lineBackground" placeholder="请输入"></el-input>
								</div>
								<div class="blk" style="width: 96px">
									<span class="tle">描边</span>
									<el-input  @input="ScaleRatio.lineSide=ScaleRatio.lineSide.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" :size="size" v-model="ScaleRatio.lineSide" placeholder="请输入"></el-input>
								</div>
								<div class="blk" style="width: 196px">
									<span class="tle">设备底部边框&锚点</span>
									<el-radio-group v-model="isButton">
										<el-radio :label="true">显示</el-radio>
										<el-radio :label="false">不显示</el-radio>
									</el-radio-group>
								</div>
							</el-collapse-item>
							<el-collapse-item>
								<template slot="title">
									<div class="ln_title">
										显示配置
										<div class="zk">展开</div>
										<div class="sq">收起</div>
									</div>
								</template>
								<div class="label">
									<span class="name">是否切换图数据库</span>
								</div>
								<div class="item">
									<RadioGroup :size="size" v-model="form.graphEnable">
										<Radio :label="true">切换</Radio>
										<Radio :label="false">不切换</Radio>
									</RadioGroup>
								</div>
								<div class="label">
									<span class="name">文本框是否隐藏</span>
								</div>
								<div class="item">
									<RadioGroup :size="size" v-model="form.textHidden">
										<Radio :label="true">隐藏</Radio>
										<Radio :label="false">不隐藏</Radio>
									</RadioGroup>
								</div>
								<div class="label">
									<span class="name">小附件是否显示</span>
								</div>
								<div class="item">
									<RadioGroup :size="size" v-model="form.attachEnable">
										<Radio label="one">显示全部</Radio>
										<Radio label="two">显示已配置的</Radio>
										<Radio style="margin-top: 10px" label="three">不显示</Radio>
									</RadioGroup>
								</div>
								<div class="item">
									<Button size="mini" :disabled="form.attachEnable !== 'two'" @click="dialogVisibleAttach = true">小附件图例显隐与关系线设置</Button>
									<instantiationAttach ref="instantiationAttach" v-if="dialogVisibleAttach" :instantiationAttachData="instantiationAttachData" :dialogVisible="dialogVisibleAttach" @editChose="dialogVisibleAttach = false" @editInfo="instantiationInfoAttach" />
								</div>
								<div class="item">
									<Button size="mini" @click="dialogVisible = true">图例显隐与锚点偏移设置</Button>
									<instantiationEditor ref="instantiationEditor" v-if="dialogVisible" :instantiationEditorData="instantiationEditorData" :dialogVisible="dialogVisible" @editChose="dialogVisible = false" @editInfo="instantiationInfo" />
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="foot">
						<Button :size="size" type="primary" @click="confirm">预览图例</Button>
						<Button class="icon-n" :size="size" @click="confirm(true,{'isButton':isButton})">预览图标</Button>
						<!-- <div class='btn-footer'>
							<el-checkbox class="check-btn" v-model="isButton">底部文本框&锚点</el-checkbox>
							<Button class="icon-n" :size="size" @click="confirm(true,{'isButton':isButton})">预览图标</Button>
						</div> -->
						<!-- <el-button @click="cancel">取 消</el-button> -->
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { Select, Option, RadioGroup, Radio, Tree, Button } from "element-ui";
import GetAdmData from "@/store/http/getAdmData";
import instantiationEditor from "./instantiationEditor.vue";
import instantiationAttach from "./instantiationAttach.vue";
const initForm = () => ({
	textHidden: false,
	attachEnable: "three",
	graphEnable: false,
	referenceObjectId: "",
	size: { x: 1680, y: 810 },
});
export default {
	data() {
		return {
			layoutOptions: {},
			direction: "", //rtl 右边  ltr 左边
			size: "small",
			form: initForm(),
			referenceObjectTypes: [],
			defaultProps: {
				label: "name",
			},
			expandOnClickNode: true,
			legendScaleRatio: 1,
			legendScaleRatioList: [1, 2, 3, 4, 5],
			layoutSize: "",
			layoutSizes: [
				{
					label: "不限",
					value: "",
				},
				{
					label: "1920x1080px",
					value: "1920-1080",
				},
				{
					label: "1280x1024px",
					value: "1280-1024",
				},
				{
					label: "800x600px",
					value: "800-600",
				},
			],
			ScaleRatio: {
				lineContent: 4,
				lineBackground: 8,
				lineSide: 12,
				fontSize: 16,
			},
			instantiationEnvList: [],
			projectList: [],

			keyIndex: 1,
			urlPar: {
				env: "",
				// groupCode :'WNMDGFZQNY',
				// projectId:'ys4569438055'
				groupCode: "",
				projectId: "",
			},
			legendDescMap: null,
			templateAttachDescMap: null,
			templateMainPipeDescMap: null,
			dialogVisible: false,
			dialogVisibleAttach: false,

			instantiationEditorData: null,
			instantiationAttachData: null,

			isButton:true,
		};
	},
	props: {
		options: {
			type: Object,
			default: function () {
				return {
					templateId: "",
					referenceObjectTypeCode: "",
				};
			},
		},
		// 是否展开
		visible: {
			type: Boolean,
			default: true,
		},
	},
	components: {
		Select,
		Option,
		RadioGroup,
		Radio,
		Tree,
		Button,
		instantiationEditor,
		instantiationAttach,
	},
	created() {
		this.instantiationEnv();
		// this.projectListFun()
		let dataHis = JSON.parse(localStorage.getItem("interfaceList") || "{}");

		if (dataHis[this.$route.query.templateid]) {
			// 有历史

			this.urlPar.env = dataHis[this.$route.query.templateid].env;
			this.urlPar.groupCode = dataHis[this.$route.query.templateid].groupCode;
			this.urlPar.projectId = dataHis[this.$route.query.templateid].projectId;

			this.form.referenceObjectId = dataHis[this.$route.query.templateid].referenceObjectId;
			GetAdmData.projectList({env:this.urlPar.env}).then((res) => {
				const { result, data } = res;

				if (result == "success") {
					
					this.projectList = data;

					this.queryObjectList();
				}
			});
		} else {
			// this.projectListFun();
		}
	},
	mounted() {},
	methods: {
		close() {
			this.$emit("update:visible", false);
		},
		cancel() {
			this.close();
			//取消后进行数据初始化
			this.$nextTick(() => {
				this.form = initForm();
				this.layoutSize = "";
				this.legendScaleRatio = 1;
			});
		},
		handleWrapperClick() {
			this.close();
		},
		handleNodeClick(node) {
			this.form.referenceObjectId = node.classCode;
			this.$refs.selecteltree.blur();
		},
		formatData(data) {
			let options = [];
			if (!data.length) return options;
			const handleData = (list) => {
				list.forEach((item) => {
					if (item.children?.length) {
						handleData(item.children);
					}
					options.push({ label: item.name, value: item.classCode });
				});
				return options;
			};
			return handleData(data);
		},
		changeEnv() {
			this.projectListFun()
			// this.queryObjectList();
			// this.urlPar.projectId = ''
			this.$set(this.urlPar,'projectId','')
			this.form.referenceObjectId = "";
		},
		//基准对象
		async queryObjectList() {
			const params = {
				classCode: this.options.referenceObjectTypeCode,
			};
			const { result, data } = await GetAdmData.queryObjectList(params, {...this.urlPar,projectId:this.urlPar.projectId.split('-')[0]});
			if (result == "success") {
				this.referenceObjectTypes = data;
			}
		},

		//环境列表
		async instantiationEnv() {
			const { result, data } = await GetAdmData.instantiationEnv();
			if (result == "success") {
				this.instantiationEnvList = data;
			}
		},

		async projectListFun() {
			this.projectList = []
			const { result, data } = await GetAdmData.projectList({env:this.urlPar.env});
			if (result == "success") {
				this.projectList = data;
				// this.queryObjectList();
				// return
				let flag = false;
				for (let i = 0; i < data.length; i++) {
					if (data[i].projectId === "ys4569438055") {
						flag = true;
					}
				}

				if (flag) {
					this.urlPar = {
						env: this.urlPar.env,
						groupCode: "WNMDGFZQNY",
						projectId: "ys4569438055-WNMDGFZQNY",
					};
					this.queryObjectList();
				} else if (data && data.length) {
					this.urlPar = {
						env: this.urlPar.env,
						groupCode: data[0].groupCode,
						projectId: data[0].projectId+'-'+data[0].groupCode,
					};
					this.queryObjectList();
				}

				// this.projectList = [{groupCode: "WNMDGFZQNY",name: "22#楼冷站控制",projectId: "ys4569438055"},...data];
			}
		},
		async confirm(isEn,obj) {
			const { templateId } = this.options;
			const { referenceObjectId, textHidden, attachEnable, graphEnable } = this.form;
			if (!this.urlPar.env) {
				return this.$message.error("请选择环境");
			}
			if (!referenceObjectId) {
				return this.$message.error("请选择基准对象实例");
			}
			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});

			let data = JSON.parse(localStorage.getItem("interfaceList") || "{}");
			data[this.$route.query.templateid] = this.urlPar;
			data[this.$route.query.templateid].referenceObjectId = this.form.referenceObjectId;
			localStorage.setItem("interfaceList", JSON.stringify(data));


            let storage = JSON.parse(localStorage.getItem("instantiationEditor") || "{}");
			let {legendDescMap:legendDescMapStorage,templateMainPipeDescMap:templateMainPipeDescMapStorage} = storage[this.$route.query.templateid]||{};

			const params = {
				templateId,
				referenceObjectId,
				textHidden,
				graphEnable,
				// attachEnable,
				legendScaleRatio: this.legendScaleRatio,
				size: null,
				templateLegendDescMap: this.legendDescMap?this.legendDescMap:legendDescMapStorage,
				templateAttachDescMap: this.templateAttachDescMap,
				templateMainPipeDescMap: this.templateMainPipeDescMap?this.templateMainPipeDescMap:templateMainPipeDescMapStorage,
			};
			// 小附件参数
			switch (attachEnable) {
				case "one":
					params.attachEnable = true;
					params.attachShowAll = true;
					break;
				case "two":
					params.attachEnable = true;
					params.attachShowAll = false;
					break;
				case "three":
					params.attachEnable = false;
					params.attachShowAll = false;
					break;
			}
			if (this.layoutSize) {
				const [x, y] = this.layoutSize.split("-");
				params.size = {
					x,
					y,
				};
			}

			// 小附件数据参数
			//   let a = {
			//     "referenceObjectId": "Sy11010806661536648451229188098",
			//     "templateId": "fe178ae7-760c-4c9f-b713-2ba5398d5e0f",
			//     "majorCode": "AC",
			//     "graphTypeCode": "供水关系图",
			//     "size": null,
			//     "textHidden": false,
			//     "attachEnable": true
			// }
			//   let b = {projectId:'PjGXT1080666',groupCode:'JDGXT',userId:'abc',env:'qa'}
			//   await GetAdmData.instantiationLoad(a,b).then(res=>{

			if (isEn === true) {
				// this.$loading().close();
				this.close();
				this.$emit("confirm", params, {...this.urlPar,projectId:this.urlPar.projectId.split('-')[0]},obj);
				return;
			}
			await GetAdmData.instantiationLoad(params, {...this.urlPar,projectId:this.urlPar.projectId.split('-')[0]})
				.then((res) => {
					const { result, data } = res;
					this.$loading().close();
					// this.legendDescMap=null
					// this.templateAttachDescMap = null
					// this.templateMainPipeDescMap = null
					if (result == "success") {
						if (data.success === false) {
							this.$message({
								type: "error",
								message: data.error,
							});
							return;
						}
						this.close();
						this.$emit("confirm", data);
					} else {
						console.log({ name: "实例化失败", error: result });
						this.$message({
							type: "error",
							// message: result,
							message: "实例化失败",
						});
					}
				})
				.catch((res) => {
					// console.error(res)
					// this.legendDescMap=null
					// this.templateAttachDescMap = null
					// this.templateMainPipeDescMap = null
					this.$loading().close();
					this.$message({
						type: "error",
						message: res.message,
					});
				});
		},
		changeProjectId(data) {
			let obj = this.projectList.filter((item) => item.projectId === data);
			// this.urlPar.groupCode = obj[0].groupCode;
			this.urlPar.groupCode = data.split('-')[1];
			this.form.referenceObjectId = "";
			this.queryObjectList();
		},
		instantiationInfo(info, templateMainPipeDescMap) {
			this.legendDescMap = info;
			this.templateMainPipeDescMap = templateMainPipeDescMap;
			// console.error(this.$refs.instantiationEditor.equipmentList)

			const a = this.$refs.instantiationEditor.equipmentList.map((item) => item);
			// Object.assign(a,this.$refs.instantiationEditor.equipmentList)
			this.instantiationEditorData = a;
			this.$refs.instantiationEditor.handleClose();
			// this.instantiationEditorData = JSON.parse(JSON.stringify(this.$refs.instantiationEditor.equipmentList))
		},
		instantiationInfoAttach(templateAttachDescMap) {
			this.templateAttachDescMap = templateAttachDescMap;
			this.instantiationAttachData = JSON.parse(JSON.stringify(this.$refs.instantiationAttach.equipmentList));
		},
		inputReg(value,key){
			// console.error(value,this.ScaleRatio[key])
			// this.ScaleRatio[key]=this.ScaleRatio[key].replace(/^(0+)|(\-)*[^\d]/g,'').replace('-','').replace('+','')

			// console.error(value)
		},
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
		visibleModel(val) {
			this.direction = "ltr";
			if (val) {
				this.form.referenceObjectId = "";
				//
				// this.instantiationEnv()
				// this.projectListFun()
				// this.queryObjectList();

				// this.form.referenceObjectId = '';
				let dataHis = JSON.parse(localStorage.getItem("interfaceList") || "{}");

				if (dataHis[this.$route.query.templateid]) {
					// 有历史

					this.urlPar.env = dataHis[this.$route.query.templateid].env;
					this.urlPar.groupCode = dataHis[this.$route.query.templateid].groupCode;
					this.urlPar.projectId = dataHis[this.$route.query.templateid].projectId;

					this.form.referenceObjectId = dataHis[this.$route.query.templateid].referenceObjectId;
					GetAdmData.projectList({env:this.urlPar.env}).then((res) => {
						const { result, data } = res;

						if (result == "success") {
							this.projectList = data;
							this.queryObjectList();
						}
					});
				} else {
					this.projectListFun();
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@keyframes drawer-fade-in {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@mixin drawer-animation($direction) {
	@keyframes #{$direction}-drawer-in {
		0% {
			@if $direction ==ltr {
				transform: translate(-100%, 0px);
			}

			@if $direction ==rtl {
				transform: translate(100%, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, -100%);
			}

			@if $direction ==btt {
				transform: translate(0px, 100%);
			}
		}

		100% {
			@if $direction ==ltr {
				transform: translate(0px, 0px);
			}

			@if $direction ==rtl {
				transform: translate(0px, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, 0px);
			}

			@if $direction ==btt {
				transform: translate(0px, 0px);
			}
		}
	}

	@keyframes #{$direction}-drawer-out {
		0% {
			@if $direction ==ltr {
				transform: translate(0px, 0px);
			}

			@if $direction ==rtl {
				transform: translate(0px, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, 0px);
			}

			@if $direction ==btt {
				transform: translate(0px, 0);
			}
		}

		100% {
			@if $direction ==ltr {
				transform: translate(-100%, 0px);
			}

			@if $direction ==rtl {
				transform: translate(100%, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, -100%);
			}

			@if $direction ==btt {
				transform: translate(0px, 100%);
			}
		}
	}
}

@mixin animation-in($direction) {
	.drawer__open .#{$direction} {
		animation: #{$direction}-drawer-in 0.3s 1ms;
	}
}

@mixin animation-out($direction) {
	.#{$direction} {
		animation: #{$direction}-drawer-out 0.3s;
	}
}

@include drawer-animation(rtl);
@include drawer-animation(ltr);

$directions: rtl, ltr;

@each $direction in $directions {
	@include animation-out($direction);
	@include animation-in($direction);
}

.drawer-fade-enter-active {
	animation: drawer-fade-in 0.3s;
}

.drawer-fade-leave-active {
	animation: drawer-fade-in 0.3s reverse;
}

.drawer__wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	margin: 0;
}

.drawer__container {
	position: relative;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
}

.drawer {
	width: 400px;
	background: #ffffff;
	position: absolute;
	top: 46px;
	bottom: 0;
	left: 0;
	z-index: 10;
	box-shadow: 0px 3px 12px rgba(27, 33, 41, 0.12), 0px 0.5px 3px rgba(27, 33, 41, 0.08);
	flex-direction: column;
	display: flex;

	&.ltr {
		left: 0;

		.foot {
			// justify-content: flex-end;
		}
	}

	&.rtl {
		right: 0;
	}

	.drawer__body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding: 25px;
		overflow-y: auto;

		.label {
			line-height: 22px;
			padding: 5px 0;
			font-size: 14px;

			.name {
				color: #626c78;
			}

			.red {
				color: #f55047;
			}
		}

		.item {
			margin-bottom: 20px;
			display: flex;

			&:last-child {
				padding-top: 10px;
			}
		}
	}

	.foot {
		height: 72px;
		border-bottom: 1px solid #edf1f5;
		box-shadow: 0px 3px 12px rgba(27, 33, 41, 0.12), 0px 0.5px 3px rgba(27, 33, 41, 0.08);
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		.el-button--primary {
			padding: 8px 20px !important;
		}
	}
}
.blk {
	height: 66px;
	float: left;
	margin-bottom: 14px;
	margin-right: 12px;
	.tle {
		color: #626c78;
		line-height: 34px;
	}
}
.el-collapse {
	.el-collapse-item__header {
		.ln_title {
			color: #2e3742;
			font-weight: 800;
			position: relative;

			.zk {
				position: absolute;
				left: 296px;
				top: -1px;
				width: 30px;
				color: #246fe5;
				font-weight: 400;
				display: block;
			}
			.sq {
				position: absolute;
				left: 296px;
				top: -1px;
				width: 30px;
				color: #246fe5;
				font-weight: 400;
				display: none;
			}
		}
	}

	.is-active {
		.ln_title {
			.zk {
				display: none !important;
			}
			.sq {
				display: block !important;
			}
		}
	}
}
.btn-footer{
	margin-left:10px;
	display: flex;
	flex-direction: column;
	margin-top: -14px;
	.check-btn{
		::v-deep .el-checkbox__input{
			height: 14px !important;
		}
		::v-deep .el-checkbox__label{
			height:14px;
			font-size: 12px!important;
		}
		::v-deep .el-checkbox__inner{
			width: 14px !important;
    		height: 14px !important;
		}

	}
}
</style>

<style>
.el-collapse-item__arrow {
	color: #246fe5;
}
</style>
