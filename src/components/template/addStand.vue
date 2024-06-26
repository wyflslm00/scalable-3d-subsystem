<template>
	<div>
		<el-dialog title="添加立管" :visible.sync="addSpaceVisible" width="840px" :close-on-click-modal="false" @close="$emit('close', false)">
			<!-- <div class="header-id">立管组ID：{{ spaceId }}</div> -->
			<div class="header">
				<div class="box">
					<div class="tle_v" style="display: flex">
						<span class="tle">立管组名称<em>*&nbsp;&nbsp;</em></span>

						<el-input style="width: 230px; height: 32px" v-model="spaceName" placeholder="请输入立管组名称"></el-input>

						<!-- <div class="tle_v" style="display: flex; margin-left: 24px">
							<span class="tle">实例化是否显示竖井<em>*&nbsp;&nbsp;</em></span>
						</div>
						<el-radio-group v-model="instandRadio">
							<el-radio :label="true">显示</el-radio>
							<el-radio :label="false">不显示</el-radio>
						</el-radio-group> -->
					</div>
					<div class="tle_v" style="display: flex; margin-top: 22px">
						<span class="tle">实例化竖井展示<em>*&nbsp;&nbsp;</em></span>
						<el-radio-group style="margin-top: 2px" v-model="shaftRiserMode">
							<el-radio label="Shaft-RiserGroup">竖井+立管组</el-radio>
							<el-radio label="Shaft-Riser">竖井+单立管</el-radio>
							<el-radio label="Riser">单立管</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>

			<div class="stand-radio"></div>
			<!-- table -->
			<div class="table-box">
				<el-table :data="tableList" border :header-cell-style="{ background: '#F1F4F6', color: '#626C78', fontSize: '12px', padding: '10px 40px' }" class="table-list">
					<el-table-column prop="secondTag" label="立管类型" :resizable="false">
						<template slot-scope="scope">
							<el-cascader ref="cascaderSelect" placeholder="试试搜索：请输入" v-model="scope.row.classCode" :options="list" :filterable="true" style="width: 100%" :props="{ value: 'classCode', label: 'name', children: 'children', multiple: false, checkStrictly: false }"></el-cascader>
						</template>
					</el-table-column>
					<el-table-column prop="accessibility" label="操作" :resizable="false">
						<template slot-scope="scope">
							<div class="table-delete" @click="tableDelete(scope.$index)">删除</div>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<el-button class="btn" size="mini" @click="addTable">添加立管</el-button>

			<div slot="footer" class="dialog-footer">
				<el-button @click="$emit('close', false)">取 消</el-button>
				<el-button type="primary" @click="sure">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
const uuid = require("uuid");
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			addSpaceVisible: false,
			spaceId: "",
			spaceName: "",
			tableList: [],
			list: [],
			shaftRiserMode: "Shaft-RiserGroup",
			// instandRadio: true,
		};
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
		type: {
			type: String,
			default: "stand",
		},
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
				} else {
					if (list[i].classCode.length === 6 && list[i].classCode[2] === "P" && list[i].classCode[3] === "P") {
						list[i].disabled = false;
					} else {
						list[i].disabled = true;
						// list.splice(i,1)
					}
				}
			}
		};
		listFun(getterTreeList);

		// let newarr = []
		// let loop = (data) =>{
		//     data.forEach((item, index) => {
		//         if (item.disabled === true) {
		//             data.splice(index, 1)
		//             console.error(data)
		//         }
		//         console.error(data)
		//         if (item.children) {
		//             // newarr.push({
		//             //     children: [],
		//             //     classCode:item.classCode,
		//             //     name:item.name,
		//             //     objType:item.objType
		//             // })
		//             return loop(item.children)
		//         }
		//     })
		// }
		//   loop(getterTreeList)
		const loop = (list) => {
			for (let i = list.length - 1; i >= 0; i--) {
				if (list[i].children) {
					loop(list[i].children);
				} else {
					if (list[i].disabled === true) {
						list.splice(i, 1);
					}
				}
			}
		};
		loop(getterTreeList);
		this.list = getterTreeList;
	},
	mounted() {
		this.spaceId = uuid.v1();
	},
	methods: {
		sure() {
			if (this.spaceName == "") {
				this.$message({
					message: "立管组名称不能为空",
					type: "error",
				});
				return;
			}
			if (!this.tableList.length) {
				this.$message({
					message: "请添加立管",
					type: "error",
				});
				return;
			}
			let code = false;
			for (let i = 0; i < this.tableList.length; i++) {
				if (this.tableList[i].classCode.length == 0) {
					code = true;
					break;
				}
			}
			if (code) {
				this.$message({
					message: "请选择立管类型",
					type: "error",
				});
				return;
			}

			let repeatSyand = false;
			repeatSyand = this.tableList.some((obj, index) => {
				return (
					this.tableList.findIndex((o, i) => {
						return o["classCode"][o["classCode"].length - 1] === obj["classCode"][obj["classCode"].length - 1] && i !== index;
					}) !== -1
				);
			});

			if (repeatSyand) {
				this.$message({
					message: "不能添加相同的立管",
					type: "error",
				});
				return;
			}
			let containerInfo = {};
			switch (this.type) {
				case "room":
					break;
				case "container":
					break;
				case "shaft":
					break;
				case "sapce":
					break;
				case "floor":
					break;
				case "stand":
					let arr = [];
					for (let i = 0; i < this.tableList.length; i++) {
						arr.push(this.tableList[i].classCode[this.tableList[i].classCode.length - 1]);
					}

					containerInfo = {
						id: this.spaceId,
						name: this.spaceName,
						typeCode: "group",
						groupCode: "NewRiser",
						classCodes: arr,
						shaftRiserMode: this.shaftRiserMode,
						// riserInShaft: this.instandRadio.toString(),
					};
					break;
			}
			this.$emit("containerInfo", containerInfo);
		},
		addTable() {
			this.tableList.push({
				classCode: "",
			});
		},
		tableDelete(index) {
			this.tableList.splice(index, 1);
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
	},
};
</script>

<style lang="scss" scoped>
.tle_v {
	min-width: 40px;
	display: flex;
	align-items: center;
	// margin-left: 37px;

	.tle {
		font-family: "Microsoft YaHei UI";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		color: #2e3742;
		float: left;

		em {
			color: #f55047;
		}
	}
	::v-deep .el-input__inner {
		width: 230px;
		height: 32px;
	}
}
::v-deep .el-dialog__body {
	padding-top: 10px;
}
.header-id {
	white-space: nowrap;
	font-size: 14px;
	margin: 10px 0 26px 0;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 12px;

	.box {
		// display: flex;
		// align-items: center;
	}
	.id {
		width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.btn {
		align-self: flex-end;
		background: #246fe5;
		color: #fff;
		margin-right: 10px;
	}
}
.table-box {
	width: 100%;
	margin: 16px 0 20px 0;
	font-size: 14px;
	.table-delete {
		color: #246fe5;
		padding-left: 40px;
		cursor: pointer;
	}
}

.stand-radio {
	margin-top: 15px;
	display: flex;
}
</style>
