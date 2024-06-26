<!-- 添加设备 -->
<template>
	<el-Dialog :visible="visible" @close="close" width="600px" destroy-on-close append-to-body class="addDeviceDialog" :close-on-click-modal="false" :before-close="close">
		<div class="head" slot="title">
			<span class="txt"> {{directData.type?'添加关系':'编辑关系'}} </span>
		</div>

		<div class="el">
			<div :class="['gx',placeholderValueFlag?'error-head':'']">
				<span>选择关系</span>
				<el-Cascader style="width: 400px" :options="relationList" :class="[placeholderValueFlag?'color-name':'']" v-model="relationValue" @change="changeRelClassCode" :props="{ value: 'code', label: 'name', children: 'children', multiple: false, checkStrictly: false }" :placeholder='placeholderValue'>
				</el-Cascader>
				<div v-if="placeholderValueFlag" class="alert-error-name">
					{{errorNameDirect}}
				</div>
			</div>
			

			<div class="gx">
				<span>关系方向</span>
				<el-radio-group @input="changeDirection()" v-model="positionValue" size="mini" @change="changeRadio" :disabled='placeholderValueFlag||!relationValue.length'>
					<el-radio-button class="error-select" :label="Number(positionValue)" v-if="positionValueFlag" :disabled="true">
						<template v-if="Number(errorPositionValue) == '99'"> 无 </template>
						<template v-else-if="Number(errorPositionValue) == '0'"> — </template>
						<img v-else-if="Number(errorPositionValue) == '1'"  width="12" height="10" src="@/assets/images/arrow1-3.png" alt="">
						<img v-else-if="Number(errorPositionValue) == '2'"  width="12" height="10" src="@/assets/images/arrow2-3.png" alt="">
						<img v-else-if="Number(errorPositionValue) == '3'"  width="12" height="10" src="@/assets/images/arrow3-3.png" alt="">
						<img v-else-if="Number(errorPositionValue) == '901'"  width="12" height="10" src="@/assets/images/arrow901-3.png" alt="">
						<img v-else-if="Number(errorPositionValue) == '902'"  width="12" height="10" src="@/assets/images/arrow902-3.png" alt="">
						<img v-else-if="Number(errorPositionValue) == '903'"  width="12" height="10" src="@/assets/images/arrow903-3.png" alt="">
						<div  class="alert-error-name">
							方向有变化
						</div>
					</el-radio-button>
					
					<el-radio-button :label="Number(radio.code)" v-for="radio in positionList">
						
					<el-tooltip  class="item" effect="dark" :content="groupName[radio.code]" placement="top">
						<div v-if="radio.code == '99'"> 无 </div>
						<div v-else-if="radio.code == '0'"> —</div>
						<img v-else-if="radio.code == '1'"  width="12" height="10" src="@/assets/images/arrow1-1.png" alt="">
						<img v-else-if="radio.code == '2'"  width="12" height="10" src="@/assets/images/arrow2-1.png" alt="">
						<img v-else-if="radio.code == '3'"  width="12" height="10" src="@/assets/images/arrow3-1.png" alt="">
						<img v-else-if="radio.code == '901'"  width="12" height="10" src="@/assets/images/arrow901-1.png" alt="">
						<img v-else-if="radio.code == '902'"  width="12" height="10" src="@/assets/images/arrow902-1.png" alt="">
						<img v-else-if="radio.code == '903'"  width="12" height="10" src="@/assets/images/arrow903-1.png" alt="">
					</el-tooltip>


						<!-- <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '1'">
							<path d="M7.46484 1.46387L11.0005 4.9995L7.46484 8.53514" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
							<path d="M10.5 4.96387H0.999724" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
						</svg>

						<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '2'">
							<path d="M4.53516 1.46436L0.99952 4.99999L4.53516 8.53563" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
							<path d="M1.5 4.96436H11.0003" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
						</svg>

						<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-else-if="radio.code == '3'">
							<path d="M3.41797 1.30664L0.725106 3.9995L3.41797 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
							<path d="M8.57812 1.30664L11.271 3.9995L8.57812 6.69237" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
							<path d="M10.3867 3.96387H0.886442" stroke="#424C59" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0" />
						</svg> -->
					</el-radio-button>
				</el-radio-group>
			</div>
			<div class="gx">
				<span>查询步数</span>
				<el-radio-group v-model="step" :disabled="!hasPipe">
					<el-radio :label="false">不限</el-radio>
					<el-radio :label="true">1步</el-radio>
				</el-radio-group>
			</div>

			<div class="gx">
				<span>是否允许路过立管</span>
				<el-radio-group v-model="link" :disabled="!hasPipe">
					<el-radio :label="false">允许</el-radio>
					<el-radio :label="true">不允许</el-radio>
				</el-radio-group>
			</div>

			<!-- <div class="gx">
				<span>允许路过</span>
				<el-radio-group v-model="pipeRiserOuter" :disabled="link || !hasPipe">
					<el-radio :label="false">所有立管</el-radio>
					<el-radio :label="true">模板外立管</el-radio>
				</el-radio-group>
			</div> -->
			<div class="gx">
				<span>禁止路过</span>
				<el-radio-group v-model="pipeRiserOuterLimited" :disabled="link || !hasPipe">
					<el-radio :label="false">不限制</el-radio>
					<el-radio :label="true">模板内立管和环管</el-radio>
				</el-radio-group>
			</div>
			<div class="gx">
				<span>禁止路过</span>
				<el-radio-group v-model="pipePipeOuterLimited" :disabled="link || !hasPipe">
					<el-radio :label="false">不限制</el-radio>
					<el-radio :label="true">模版内设备管件</el-radio>
				</el-radio-group>
			</div>

			<div class="gx">
				<span>允许途经</span>
				<el-radio-group v-model="pipeAllowAllType" :disabled="!hasPipe">
					<el-radio :label="false">管道/阀门/传感器</el-radio>
					<el-radio :label="true">所有对象</el-radio>
				</el-radio-group>
			</div>
		</div>

		<div slot="footer">
			<!-- <el-Button :size="size" @click="cancel">取 消</el-Button> -->
			<el-Button :size="size" type="primary" @click="confirm">确定</el-Button>
		</div>
	</el-Dialog>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";

export default {
	props: {
		visible: {
			type: Boolean,
			default: () => true,
		},
		directData: {
			type: Object,
			default: () => {},
		},
		anchorList: {
			type: Array,
			default: () => [],
		},
		errorNameDirect:{
			type:String,
			default: '',
		}
	},
	data() {
		return {
			size: "small",
			relationList: [],
			relationValue: [],

			positionValue: null,
			positionList: [{ code: 99 }],
			hasPipe: false,

			step: false,
			link: false,

			pipeRiserOuterLimited: false, // false对应所有立管，true对应模板外立管
			pipePipeOuterLimited: false,
			pipeAllowAllType: false, // false对应管道/阀门/传感器，true对应所有对象

			placeholderValue:'请选择',
			placeholderValueFlag:false,

			positionValueFlag:false,
			errorPositionValue:null,

			confirmFlag:false,
			groupName:{
				99:'无',
				0:'-',
				1:"包含向右",
				2:"包含向左",
				3:"包含双向",
				901:"仅向右",
				902:"仅向左",
				903:"仅双向",
			}
		};
	},
	computed: {},
	created() {
		this.init();
	},
	mounted() {},
	watch: {
		// equipList: {
		// 	deep: true,
		// 	immediate: true,
		// 	handler: function (value) {
		// 		// this.equipList1 = _.cloneDeep(value)
		// 	},
		// },
	},
	methods: {
		async init() {
			await this.getRelFromToClassCode({
				classCodeFrom: this.directData.classCodeFrom,
				classCodeTo: this.directData.classCodeTo,
			}).then((res) => {});

			if (this.directData.type === 0) {
				// 二次编辑
				this.showClassCode();
			}
		},
		close() {
			this.$emit("close");
		},
		changeDirection(){

		},
		confirm() {
			console.error("close");
			if (this.relationValue.length&&!this.confirmFlag) {
				let obj = {};
				let father = this.relationValue[0].split("-");
				let child = this.relationValue[1].split("-");
				obj["fatherCode"] = father[0];
				obj["fatherName"] = father[1];
				obj["childCode"] = child[0];
				obj["childName"] = child[1];
				obj["step"] = this.step;
				obj["link"] = this.link;
				obj["pipeRiserOuterLimited"] = this.pipeRiserOuterLimited;
				obj['pipePipeOuterLimited'] = this.pipePipeOuterLimited
				obj["pipeAllowAllType"] = this.pipeAllowAllType;
				obj["position"] = this.positionValue;

				let newObj = {
					relName: obj["fatherName"] + "/" + obj["childName"],
					defaultRelModel: obj["fatherCode"] + "/" + obj["childCode"],
					directionName: obj["position"],
					pipeStepLimited: obj["step"],
					pipeRiserLimited: obj["link"],
					pipeRiserOuterLimited: obj["pipeRiserOuterLimited"],
					pipePipeOuterLimited:obj['pipePipeOuterLimited'],
					pipeAllowAllType: obj["pipeAllowAllType"],
					dependLineList:this.directData.dependLineList,
				};
				debugger;
				this.$emit("confirm", newObj);
			} else {
				this.$message.error("请选择关系!");
			}
		},
		// 查询关系
		async getRelFromToClassCode(obj) {
			let params = {
				classCodeFrom: obj.classCodeFrom,
				classCodeTo: obj.classCodeTo,
			};
			const { result, data } = await GetAdmData.getClassCode(params);
			if (result == "fail") {
				this.$message.error("系统关系查询出错,请刷新后再次尝试!");
				this.relationList = [];
				return;
			}
			let arr = [];
			for (let i = 0; i < data.length; i++) {
				let obj = {};
				obj["name"] = data[i].name;
				obj["code"] = data[i].graphCode + "-" + data[i].name;
				obj["children"] = [];
				if (data[i].children) {
					for (let j = 0; j < data[i].children.length; j++) {
						let child = {};
						child["name"] = data[i].children[j].name;
						child["code"] = data[i].children[j].relCode + "-" + data[i].children[j].name;
						child["hasPipe"] = data[i].children[j].hasPipe;
						child["directions"] = Array.isArray(data[i].children[j].directions) ? [{ code: 99 }, ...data[i].children[j].directions] : [{ code: 99 }];
						obj["children"].push(child);
					}
				}
				arr.push(obj);
			}
			this.relationList = arr;
		},
		changeRelClassCode(data) {
			this.confirmFlag = false
			for (let i = 0; i < this.relationList.length; i++) {
				if (this.relationList[i].code === data[0]) {
					for (let j = 0; j < this.relationList[i].children.length; j++) {
						if (this.relationList[i].children[j].code === data[1]) {
							this.hasPipe = this.relationList[i].children[j].hasPipe;
							this.positionList = this.relationList[i].children[j].directions;
							// 恢复默认值
							this.step = false;
							this.link = false;
							this.pipeRiserOuterLimited = false;
							this.pipePipeOuterLimited = false;
							this.pipeAllowAllType = false;
							this.positionValue = 99;

							// error 取消
							this.placeholderValueFlag = false
						}
					}
				}
			}
		},
		async showClassCode() {
			console.error( this.directData)
			let code = this.directData.code.split("/");
			let name = this.directData.name.split("/");
			this.step = this.directData.pipeStepLimited;
			this.link = this.directData.pipeRiserLimited;
			this.pipeRiserOuterLimited = this.directData.pipeRiserOuterLimited;
			this.pipePipeOuterLimited = this.directData.pipePipeOuterLimited
			this.pipeAllowAllType = this.directData.pipeAllowAllType;
			this.positionValue = (this.directData.direction&&String(this.directData.direction).length)?String(this.directData.direction):'99'
			this.relationValue = [code[0] + "-" + name[0], code[1] + "-" + name[1]];
			let data = this.relationValue;
			
			let placeholderValueFlag = true
			let placeholderValue = this.directData.code

			let confirmFlag = true

			for (let i = 0; i < this.relationList.length; i++) {
				if (this.relationList[i].code === data[0]) {
					for (let j = 0; j < this.relationList[i].children.length; j++) {
						if (this.relationList[i].children[j].code === data[1]) {
							this.hasPipe = this.relationList[i].children[j].hasPipe;
							this.positionList = this.relationList[i].children[j].directions;

							placeholderValueFlag = false
							placeholderValue = '请选择'
							confirmFlag = false
						}
					}
				}
			}
			
			this.placeholderValueFlag = placeholderValueFlag
			this.placeholderValue = placeholderValue

			

			

			let arr = []
			for(let posi = 0;posi<this.positionList.length;posi++){
				arr.push(Number(this.positionList[posi].code))
			}
			if(!arr.includes(Number(this.positionValue))){
				this.positionValueFlag = true
				this.errorPositionValue = (this.directData.direction&&String(this.directData.direction).length)?String(this.directData.direction):'99'
				confirmFlag = true
			}

			this.confirmFlag = confirmFlag

		},
		changeRadio(){
			// let arr = []
			// for(let posi = 0;posi<this.positionList.length;posi++){
			// 	arr.push(this.positionList[posi].code)
			// }
			// if(!arr.includes(Number(this.positionValue))){
			// 	this.positionValueFlag = true
			// }else{
			// 	this.positionValueFlag = false
			// }
		}
	},
};
</script>

<style lang="scss" scoped>
.addDeviceDialog {
	::v-deep {
		.el-dialog__header {
			padding: 0;
		}

		.el-dialog__body {
			padding: 0;
		}
	}
}

.head {
	font-size: 16px;
	font-weight: 700;
	border-bottom: 1px solid #e1e5eb;
	padding: 20px;

	.txt {
		color: #2e3742;
		padding-right: 6px;
		margin-right: 8px;
	}
}

.el {
	padding: 13px 0 20px 33px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	.gx {
		color: #626c78;
		font-family: "Microsoft YaHei UI";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 36px;
		display: flex;
		align-items: center;
		&>span{
			width: 115px;
			display: inline-block;
			text-align: right;
		}

		.el-radio-group {
			margin-left: 10px;
			margin-top: 3px;
		}
		.color-name{
			::v-deep .el-input__inner::placeholder{
				color:#E63C35;
			}
		}
		.error-select{
			border: 1px solid #E63C35;
			color:#E63C35;
			.alert-error-name{
				display: none;
				position: absolute;
				bottom: 28px;
				left:-10px;
				color: #E4E6E7;
				background: rgba(31,36,41,.8);
				border-radius: 4px;
				padding: 6px 12px;
				line-height: 24px;
				}
			&:hover{
				.alert-error-name{
					display: block;
				}
			}
		}
	}
	.error-head{
		position: relative;
		.alert-error-name{
			display: none;
			position: absolute;
			bottom: 36px;
			left:125px;
			color: #E4E6E7;
			background: rgba(31,36,41,.8);
			border-radius: 4px;
			padding: 6px 12px;
			line-height: 24px;
			font-size: 12px;
			}
		&:hover{
			.alert-error-name{
				display: block;
			}
		}
	}

	.el-cascader {
		width: 100%;
		margin-top: -6px;
		margin-left: 10px;
		width:300px;
		// margin-top: 4px;
		// margin-bottom: 20px;
		height: 32px;
		::v-deep .el-input{
			height: 32px;
		}
		::v-deep .el-input__inner{
			height:32px ;
		}

	}
}
</style>
