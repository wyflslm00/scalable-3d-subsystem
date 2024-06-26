<!-- 添加配设备 -->
<template>
	<Dialog :visible.sync="visibleModel" @close="close" width="840px" destroy-on-close append-to-body :close-on-click-modal="false" class="anchorEquipmentDialog">
		<div class="head" slot="title">
			<span class="txt"> 添加配设备 </span>
		</div>
		<div class="anchorEquipment">
			<div class="Left">
				<Input class="input" prefix-icon="el-icon-search" placeholder="输入关键字搜索" v-model="treeFilterText" size="small" clearable></Input>
				<div class="treeBox">
					<Tree v-show="!noTree" class="filter-tree" node-key="classCode" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree">
						<template slot-scope="{ node, data }">
							<p class="name" v-if="node.level != 1">
								<span>{{ node.label }}</span>
								<i class="icon el-icon-plus" @click.stop="selectTree(data)"></i>
							</p>
							<p class="name" v-else>
								<span>{{ node.label }}</span>
							</p>
						</template>
					</Tree>
					<div v-show="noTree" class="noMore">
						<img src="@/assets/images/no_template.png" alt="" />
						<p class="label">暂无数据</p>
					</div>
				</div>
			</div>
			<div class="container">
				<table>
					<thead>
						<tr>
							<td width="30%">设备类</td>
							<td>
								自定义名称
								<span class="red">*</span>
							</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in selected" :key="index">
							<td>
								{{ findName(item.anchorEquipmentClassCode) }}
							</td>
							<td>
								<Input maxlength="20" :style="{ width: '200px' }" size="mini" v-model="item.anchorEquipmentName"></Input>
							</td>
							<td>
								<span @click="delSelected(item, index)"> 删除 </span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div slot="footer">
			<Button :size="size" @click="cancel">取 消</Button>
			<Button :size="size" type="primary" @click="confirm">确定</Button>
		</div>
	</Dialog>
</template>

<script>
import { Dialog, Button, Tree, Input } from "element-ui";
import getAdmData from "@/store/http/getAdmData";
import setFilter from "@/store/http/setFilter";
import axios from "axios";
import { cloneDeep, Find } from "lodash";
import legendItem from "../legendItem";

export default {
	props: {
		visible: {
			type: Boolean,
			default: () => true,
		},
		options: {
			type: Object,
			default: () => ({
				templateId: "",
				containerId: "",
				anchorCode: "",
			}),
		},
		selectList: {
			type: Array,
			default: () => [
				// {
				//   anchorEquipmentId: "", //设备类id
				//   anchorEquipmentClassCode: "", //设备类型
				//   anchorEquipmentName: ""//设备名称
				// }
			],
		},
	},
	data() {
		return {
			size: "small",
			treeData: [], //设备列表
			treeFilterText: "",
			noTree: true,
			timer: null,
			defaultProps: {
				children: "children",
				label: "name",
			},
			selected: [], //已添加的回显
			deleted: [], //将要删除的
		};
	},

	components: { Dialog, Button, legendItem, Tree, Input },

	computed: {
		visibleModel: {
			get() {
				return this.visible;
			},
			set(val) {
				this.$emit("update:visible", false);
			},
		},
		flatTree() {
			function flatten(arr) {
				return arr.reduce((acc, curr) => {
					if (curr.children) {
						acc.push({ ...curr, children: null }, ...flatten(curr.children));
					} else {
						acc.push(curr);
					}
					return acc;
				}, []);
			}
			return flatten(this.treeData);
		},
		findName() {
			return (code) => {
				if (!this.flatTree.length) return "";
				const obj = this.flatTree.find((item) => {
					return item.classCode == code;
				});
				return obj?.name || "";
			};
		},
	},
	created() {
		this.getTypeTree();
	},
	watch: {
		treeFilterText(val) {
			//搜索防抖
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				const isVal = this.flatTree.filter((item) => {
					return item.name.indexOf(val) > -1;
				});
				if (isVal.length) {
					this.noTree = false;
				} else {
					this.noTree = true;
				}
				this.$refs.tree.filter(val);

				clearTimeout(this.timer);
				this.timer = null;
			}, 500);
		},
		visibleModel(val) {
			if (val) {
				this.init();
			}
		},
	},
	mounted() {},

	methods: {
		close() {
			this.$emit("update:visible", false);
		},
		init() {
			this.selected = [];
			this.deleted = [];
			this.treeFilterText = "";
			this.selected = this.selectList.map((item) => {
				return {
					anchorEquipmentClassCode: item.classCodes[0],
					anchorEquipmentName: item.name,
					anchorEquipmentId: item.id,
				};
			});
		},
		async cancel() {
			this.close();
		},
		async confirm() {
			this.selectedPut();
			this.deletedPut();
		},
		async selectedPut() {
			if (!this.selected.length) return this.$message.error("请选择配设备");

			const { templateId, anchorCode, containerId } = this.options;
			const anchorEquipmentList = this.selected.map((item) => {
				return {
					id: item?.anchorEquipmentId,
					classCode: item.anchorEquipmentClassCode,
					name: item.anchorEquipmentName,
				};
			});
			const repetition = anchorEquipmentList.filter((obj, curindex) => {
				const found = anchorEquipmentList.find((o, index) => curindex !== index && o.name === obj.name);
				console.log(curindex, found);
				return found;
			});
			if (repetition.length) return this.$message.error("名称重复！");
			const params = {
				templateId,
				operate: "anchor-equipment-list-insert",
				containerId,
				anchorCode,
				anchorEquipmentList,
			};
			this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			const { result, data } = await setFilter.setDetailModify(params);
			this.$loading().close();
			if (result == "success") {
				this.close();
				this.$emit("confirm", data?.anchorEquipmentList);
				this.selected = [];
			}
		},
		async deletedPut() {
			if (!this.deleted.length) return;
			const anchorEquipmentList = this.deleted.map((item) => {
				return {
					id: item?.anchorEquipmentId,
				};
			});
			const params = {
				templateId: this.$route.query.templateid,
				operate: "anchor-equipment-list-delete",
				containerId: this.options.containerId,
				anchorCode: this.options.anchorCode,
				anchorEquipmentList,
			};
			const res = await setFilter.setDetailModify(params);
		},
		async getTypeTree() {
			const { result, data } = await getAdmData.getTypeTree();
			if (result == "success") {
				this.treeData = data;
				// this.treeData = data.reverse();
				this.noTree = false;
			}
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		selectTree(data) {
			const { classCode } = data;
			const { name } = this.flatTree.find((item) => {
				return item.classCode == classCode;
			});
			const list = this.selected.filter((item) => item.anchorEquipmentClassCode == classCode);
			const max = Math.max(...list.map((item) => item.anchorEquipmentName.match(/(?<=#)\d+/)[0]));
			const anchorEquipmentName = list.length ? `${name}#${max + 1}` : `${name}#1`;
			this.selected.push({
				anchorEquipmentClassCode: classCode,
				anchorEquipmentName,
			});
		},
		delSelected(item, index) {
			const { anchorEquipmentId } = item;
			if (anchorEquipmentId) {
				this.deleted.push(item);
			}
			this.selected.splice(index, 1);
		},
	},
};
</script>
<style lang="scss" scoped>
.anchorEquipmentDialog {
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
	// border-bottom: 1px solid #e1e5eb;
	padding: 20px;

	.txt {
		color: #2e3742;
		padding-right: 6px;
		margin-right: 8px;
	}
}

.anchorEquipment {
	display: flex;
	flex-grow: 1;
	height: 527px;

	.Left {
		width: 365px;
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		box-sizing: border-box;
		padding: 15px 0 0;

		border-right: 1px solid #e1e5eb;

		.input {
			display: flex;
			width: 317px;
			margin-left: 24px;
		}

		.treeBox {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			margin-top: 17px;
			overflow-y: auto;
			padding: 0 24px;
			height: 410px;

			.filter-tree {
				::v-deep {
					.el-tree-node__content {
						height: 40px;

						.name {
							display: flex;
							justify-content: space-between;
							flex-grow: 1;
							padding-right: 10px;

							.icon {
								cursor: pointer;
							}
						}
					}
				}
				::v-deep.el-tree-node__expand-icon.is-leaf {
					color: transparent !important;
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
	}

	.container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		padding: 16px;
		overflow-y: auto;

		table {
			thead {
				line-height: 30px;
				font-size: 12px;
				color: #646c73;
				background: #f8f9fa;

				.red {
					color: #f55047;
				}

				tr {
					td {
						&:first-child {
							max-width: 30%;
							padding-left: 16px;
						}
					}
				}
			}

			tbody {
				line-height: 22px;

				tr {
					border-bottom: 1px solid #e8ecf0;

					color: #2e3742;

					td {
						padding: 5px;
						vertical-align: middle;

						&:first-child {
							padding-left: 16px;
						}

						&:last-child {
							color: #246fe5;
							cursor: pointer;
						}
					}
				}
			}
		}
	}
}
</style>
