<template>
	<div>
		<el-dialog title="添加空间" :visible.sync="addSpaceVisible" @close="$emit('close', false)" :close-on-click-modal="false">
			<div class="tle_v">
				<span class="tle">空间ID：{{ spaceId }}</span>
			</div>
			<div class="tle_v">
				<span class="tle">空间类型：{{ spaceType }}</span>
			</div>
			<div class="tle_v" style="display: block">
				<span class="tle">空间名称<em>*</em></span>
				<!-- <br /> -->
				<el-input class="title" v-model="spaceName" placeholder="请输入空间名称"></el-input>
			</div>

			<div class="tle_v" style="display: block; display: flex" v-if="type == 'container'">
				<span class="tle">是否占位<em>*</em></span>
				<!-- <br /> -->
				<el-radio-group style="margin-left: 12px" v-model="placeholder">
					<el-radio :label="true">是</el-radio>
					<el-radio :label="false">否</el-radio>
				</el-radio-group>
			</div>
			<div class="tle_v" style="display: block; display: flex" v-if="type == 'container'">
				<span class="tle">尺寸设置<em>*</em></span>
				<!-- <br /> -->
				<div class="size-box">
					<span>宽</span>
					<el-input :disabled='!placeholder' class="size-input" @input="containerWidth=containerWidth.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" size="small" v-model="containerWidth" placeholder="请输入"></el-input>
				</div>
				<div class="size-box">
					<span>高</span>
					<el-input :disabled='!placeholder' class="size-input"  @input="containerHeight=containerHeight.replace(/^(0+)|(\-)*[^\d]/g,'')"  :min="1" size="small" v-model="containerHeight" placeholder="请输入"></el-input>
				</div>
				
				
			</div>

			<div class="tle_v" style="display: block" v-if="type == 'room'">
				<span class="tle">字典对象类型<em>*</em></span>
				<br />
				<!-- <el-select v-model="dtObjType" placeholder="请选择" style="width:100%;">
            </el-select> -->

				<el-cascader class="title" ref="cascaderSelect" placeholder="试试搜索：请输入" v-model="dtObjType" :options="getterTreeList" :filterable="true" style="width: 100%;height:32px;" :props="{ value: 'classCode', label: 'name', children: 'children', multiple: false, checkStrictly: true }"></el-cascader>
			</div>
			<!-- <div class="tle_v" style="display: block;" v-if="type=='stand'">
            <span class="tle">立管类型<em>*</em></span>
            <br />
            <el-select v-model="standType" placeholder="请选择" style="width:100%;">
            </el-select>

        </div> -->

			<div slot="footer" class="dialog-footer">
				<el-button @click="$emit('close', false)">取 消</el-button>
				<el-button type="primary" @click="sure">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { guid } from "@/utils/utils";

export default {
	data() {
		return {
			addSpaceVisible: false,
			spaceId: "",
			spaceType: "",
			spaceName: "",
			dtObjType: "",

			standType: "",
			placeholder: false, // 排版组占位
			containerWidth:1,
			containerHeight:1,
		};
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
		type: {
			type: String,
			default: "room",
		},
		containerSize:{
			type: Object,
			default: {},
		}
	},
	computed: {
		...mapGetters(["getterTreeList"]),
	},
	mounted() {
		this.spaceId = this.guid();
	},
	methods: {
		guid,
		sure() {
			if (this.spaceName == "") {
				this.$message({
					message: "空间名称不能为空",
					type: "error",
				});
				return;
			}
			if (this.type == "room" && !this.$refs.cascaderSelect.getCheckedNodes().length) {
				this.$message({
					message: "请选择字典对象类型",
					type: "error",
				});
				return;
			}
			if (this.type == "container"&&(!this.containerWidth||!this.containerHeight)) {
				this.$message({
					message: "请输入正确的宽高",
					type: "error",
				});
				return;
			}
			// else if(this.containerWidth<48||this.containerHeight<48){
			// 		this.$message({
			// 			message: "宽高不得小于48",
			// 			type: "error",
			// 		});
			// 		return;
			// 	}

			
			// if (this.type == 'stand' && !this.standType.length) {
			//     this.$message({
			//         message: '请选择立管类型',
			//         type: 'error'
			//     })
			//     return
			// }

			let containerInfo = {};
			switch (this.type) {
				case "room":
					containerInfo = {
						id: this.spaceId,
						name: this.spaceName,
						typeCode: "group",
						groupCode: this.$refs.cascaderSelect.getCheckedNodes()[0].data.objType,
						classCodes: [this.$refs.cascaderSelect.getCheckedNodes()[0].data.classCode],
					};
					break;
				case "container":
					containerInfo = {
						id: this.spaceId,
						name: this.spaceName,
						typeCode: "container",
						placeholder: this.placeholder,
						width:this.containerWidth,
						height:this.containerHeight,
					};
					break;
				case "shaft":
					containerInfo = {
						id: this.spaceId,
						name: this.spaceName,
						typeCode: "shaft",
					};
					break;
				case "sapce":
					break;
				case "floor":
					containerInfo = {
						id: this.spaceId,
						name: this.spaceName,
						typeCode: "floor",
					};
					break;
				case "stand":
					break;
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
		dtObjType(val) {
			this.$refs.cascaderSelect.toggleDropDownVisible(false);
		},
		type: {
			deep: true,
			immediate: true,
			handler: function (val) {
				// room-机房    container-排版组    shaft-竖井    sapce-空间   //TODO 怀臻
				switch (val) {
					case "room":
						this.spaceType = "机房";
						break;
					case "container":
						this.spaceType = "排版组";
						this.containerWidth = this.containerSize.width;
						this.containerHeight = this.containerSize.height;
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
					// case 'stand':
					//     this.spaceType = '立管'
					//     break;
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
	flex-direction: row;

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
