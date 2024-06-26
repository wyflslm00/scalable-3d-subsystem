<template>
	<div>
		<el-dialog title="编辑信息" :visible.sync="addSpaceVisible" :close-on-click-modal="false" @close="$emit('close', false)">
			<div class="tle_v">
				<span class="tle">空间ID：{{ spaceId }}</span>
			</div>
			<div class="tle_v">
				<span class="tle">空间类型：{{ spaceType }}</span>
			</div>
			<!-- <div class="tle_v" v-if="spaceType === '立管'">
				<span class="tle">实例化是否显示竖井：{{ riserInShaft }}</span>
			</div> -->
			<div class="tle_v" v-if="spaceType === '立管'">
				<span class="tle">实例化竖井展示：{{ shaftRiserMode }}</span>
			</div>
			<div class="tle_v" style="display: block">
				<span class="tle">空间名称<em>*</em></span>
				<br />
				<el-input class="title" v-model="spaceName" placeholder="请输入空间名称"></el-input>
			</div>
			<div class="tle_v" style="display: block" v-if="spaceType === '机房'">
				<span class="tle">字典对象类型<em>*</em></span>
				<br />
				<el-input class="title" :placeholder="placeholderName" :disabled="true"></el-input>
			</div>

			<div class="tle_v" style="display: block" v-if="spaceType === '立管'">
				<span class="tle">立管类型<em>*</em></span>
				<br />
				<el-input v-for="(item, index) in placeholderName" :placeholder="item" :key="index" :disabled="true"></el-input>
			</div>
			<div class="tle_v" style="display: block" v-if="spaceType === '排版组'">
				<span class="tle">是否占位：{{placeholderS?'是':'否'}}</span>
			</div>
			<div class="tle_v" style="display: block; display: flex" v-if="spaceType === '排版组'">
				<span class="tle">尺寸设置<em>*</em></span>
				<!-- <br /> -->
				<div class="size-box">
					<span>宽</span>
					<el-input :disabled='!placeholderS' class="size-input" @input="containerWidth=containerWidth.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" size="small" v-model="containerWidth" placeholder="请输入"></el-input>
				</div>
				<div class="size-box">
					<span>高</span>
					<el-input :disabled='!placeholderS' class="size-input"  @input="containerHeight=containerHeight.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" size="small" v-model="containerHeight" placeholder="请输入"></el-input>
				</div>
				
				
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click="$emit('close', false)">取 消</el-button>
				<el-button type="primary" @click="sure">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {
			addSpaceVisible: false,
			spaceId: "",
			spaceType: "",
			spaceName: "",
			dtObjType: "",
			classCodes: "",
			placeholderName: "",

			riserInShaft: "是",
			shaftRiserMode:'竖井+立管组',
			placeholderS:'否',

			containerWidth:0,
			containerHeight:0,
		};
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
		data: {
			type: Object,
			default: {},
		},
	},
	computed: {
		...mapGetters(["getterTreeList"]),
	},
	mounted() {},
	methods: {
		sure() {
			if (this.spaceName == "") {
				this.$message({
					message: "空间名称不能为空",
					type: "error",
				});
				return;
			}

			let containerInfo = {};
			let containerInfoResize = {} //调整大小
			switch (this.data.typeCode) {
				case "group":
					containerInfo = {
						templateId: this.$route.query.templateid,
						selectContainerId: this.spaceId,
						containerName: this.spaceName,
						operate: "updateContainerInfo",
					};
					break;
				case "container":
					containerInfo = {
						templateId: this.$route.query.templateid,
						selectContainerId: this.spaceId,
						containerName: this.spaceName,
						operate: "updateContainerInfo",
					};
					break;
				case "shaft":
					break;
				case "sapce":
					break;
			}
			containerInfo = {
				templateId: this.$route.query.templateid,
				selectContainerId: this.spaceId,
				containerName: this.spaceName,
				operate: "updateContainerInfo",
			};
			if(this.data.typeCode==='排版组'){
				if (!this.containerWidth||!this.containerHeight) {
					this.$message({
						message: "请输入正确的宽高",
						type: "error",
					});
					return;
				}
				// else if(this.containerWidth<48||this.containerHeight<48){
				// 	this.$message({
				// 		message: "宽高不得小于48",
				// 		type: "error",
				// 	});
				// 	return;
				// }
				containerInfoResize = {
					selectContainerId: this.spaceId,
					x:Math.round(this.containerWidth-this.data.x),
					y:Math.round(this.containerHeight - this.data.y),
				};
				this.$emit("containerInfo", containerInfo,containerInfoResize);
				return
			}
			
			this.$emit("containerInfo", containerInfo);
		},
	},
	watch: {
		visible: {
			deep: true,
			immediate: true,
			handler: function (val) {
				this.addSpaceVisible = val;
			},
		},
		data: {
			deep: true,
			immediate: true,
			handler: function (val) {
				// group-机房    container-排版组    shaft-竖井    sapce-空间   //TODO 怀臻
				switch (val.typeCode) {
					case "group":
						this.spaceType = "机房";
						break;
					case "container":
						this.spaceType = "排版组";
						break;
					case "shaft":
						this.spaceType = "竖井";
						break;
					case "sapce":
						this.spaceType = "空间";
						break;
					case "floor":
						this.spaceType = "楼层";
						break;
					case "stand":
						this.spaceType = "立管";
						break;
					default:
						this.spaceType = val.typeCode;
				}

				this.spaceId = val.id;
				this.spaceName = val.name;
				this.classCodes = val.classCodes;
				this.placeholderS = val.placeholder
				console.error(val)
				if (val.typeCode === "立管") {
					let placeholderName = [];
					// let funName = (list) => {
					// 	for (let i = 0; i < list.length; i++) {
					// 		if (list[i].children) {
					// 			funName(list[i].children);
					// 		}
					// 		for (let c = 0; c < val.classCodes.length; c++) {
					// 			if (list[i].classCode === val.classCodes[c]) {
					// 				if (!placeholderName.includes(list[i].name)) {
					// 					console.error(list[i].classCode)
					// 					placeholderName.push(list[i].name);
					// 				}
					// 			}
					// 		}
					// 	}
					// };


					let funName =  (list,code) => {
						for (let i = 0; i < list.length; i++) {
							if(list[i].classCode === code){
							console.error(list[i].classCode,code,list[i].name)
								return list[i].name
								
							}
							if (list[i].children) {
								const result = funName(list[i].children,code);
            					if (result !== false) return result;
							}
							
						}
						return false
					};
					
					for (let c = 0; c < val.classCodes.length; c++) {
						let name =funName(this.getterTreeList,val.classCodes[c])
							if (name) {
								placeholderName.push(name);
							}else{
								placeholderName.push(val.classCodes[c])
							}
						}


					this.placeholderName = placeholderName;
					this.riserInShaft = val.riserInShaft === "false" ? "否" : "是";
					switch(val.shaftRiserMode){
						case 'Shaft-RiserGroup': this.shaftRiserMode = '竖井+立管组';
						break;
						case 'Shaft-Riser': this.shaftRiserMode = '竖井+单立管';
						break;
						case 'Riser': this.shaftRiserMode = '单立管';
						break;
						default : this.shaftRiserMode = '竖井+立管组';
					}
				}
				if (val.typeCode === "机房") {

					// let funName = (list) => {
					// 	for (let i = 0; i < list.length; i++) {
					// 		if (list[i].children) {
					// 			funName(list[i].children);
					// 		}
					// 		if (list[i].classCode === val.classCodes[0]) {
					// 			this.placeholderName = list[i].name;
					// 			break;
					// 		}
					// 	}
					// };
					// funName(this.getterTreeList);
					let placeholderName = []
					let funName =  (list,code) => {
						for (let i = 0; i < list.length; i++) {
							if(list[i].classCode === code){
								return list[i].name
								
							}
							if (list[i].children) {
								const result = funName(list[i].children,code);
            					if (result !== false) return result;
							}
							
						}
						return false
					};
					let name =funName(this.getterTreeList,val.classCodes[0])
					if (name) {
						placeholderName.push(name);
					}else{
						placeholderName.push(val.classCodes[0])
					}
					this.placeholderName = placeholderName;
				}
				if(val.typeCode==='排版组'){
					this.containerWidth = val.x
					this.containerHeight = val.y
				}
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.tle_v {
	min-width: 40px;
	min-height: 40px;
	display: flex;
	align-items: center;
	.size-box{
		margin-left: 10px;
		display: flex;
		align-items: center;
		&>span{
				margin-right: 10px;
			}
		.size-input{
			width: 100px;
			height: 32px;
			line-height: 32px;
			::v-deep .el-input__inner{
				height: 32px;
				line-height: 32px;
			}
		}
	}
	.title{
		::v-deep .el-input__inner{
				height: 32px;
				line-height: 32px;
			}
	}
	.tle {
		font-family: "Microsoft YaHei UI";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 40px;
		color: #2e3742;
		float: left;

		em {
			color: #f55047;
		}
	}
}

::v-deep .el-dialog {
	width: 520px;
	box-shadow: 0px 20px 30px rgba(31, 35, 41, 0.15);
	border-radius: 8px;

	.el-dialog__header {
		font-family: "Microsoft YaHei UI";
		font-style: normal;
		font-weight: 700;
		font-size: 16px;
		color: #2e3742;
		border-bottom: 1px solid #e1e5eb;
	}

	.el-dialog__body {
		padding: 0px 24px;
	}

	.el-dialog__footer {
		border-top: 1px solid #e1e5eb;
		height: 70px;
		margin-top: 30px;

		.dialog-footer {
			margin-top: 6px;
			.el-button {
				padding: 8px 20px !important;
			}
		}
	}
}
</style>
