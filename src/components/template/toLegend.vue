<!-- 模版添加图例 -->
<template>
	<Dialog :visible.sync="visibleModel" @close="close" width="1200px" destroy-on-close append-to-body :close-on-click-modal="false" class="toLegendDialog">
		<div class="head" slot="title">
			<span class="txt"> 添加图例 </span>
		</div>
		<div class="toLegend">
			<div class="Left">
				<Input prefix-icon="el-icon-search" placeholder="输入关键字搜索" v-model="treeFilterText" size="small" clearable></Input>
				<div class="treeBox">
					<Tree v-show="!noTree" class="filter-tree" node-key="classCode" :data="treeData" :props="defaultProps" :default-expanded-keys="['dict']" :filter-node-method="filterNode" ref="tree" highlight-current @node-click="changeTreeNode">
						<template slot-scope="{ node, data }">
							<p class="name" :class="{ disabled: data.disabled }">{{ node.label }}</p>
						</template>
					</Tree>
					<div v-show="noTree" class="noMore">
						<img src="@/assets/images/no_template.png" alt="" />
						<p class="label">暂无数据</p>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="main">
					<div class="Legend">
						<template v-if="legendList.length">
							<div class="title">{{ selectObj.name }}</div>
							<div class="legendList">
								<div class="legendItem" v-for="item in legendList" :key="item.id" @click="changeSelect(item)" :class="{ un: unAdd(item) }">
									<div class="radio">
										<i v-if="hasLegend(item)" class="icon el-icon-success"></i>
										<span v-else class="noSel"></span>
									</div>
									<div class="item">
										<legendItem :legendObj="item" :isEdit="true"></legendItem>
									</div>
									<div class="subtitle">
										<span class="name">{{ item.legendName }}</span>
										<span class="size">
											{{ item?.legendContent?.size?.x || "**" }}
											*
											{{ item?.legendContent?.size?.y || "**" }}px
										</span>
									</div>
								</div>
							</div>
						</template>
						<div v-else class="noMore">
							<img src="@/assets/images/no_template.png" alt="" />
							<p class="label">暂无内容</p>
							<p class="txt">请在左侧选择要添加的图例</p>
						</div>
					</div>
					<div class="selected">
						<template v-if="selectExtendList.length">
							<div class="statistics">
								已选<span>{{ selectExtendList.length }}</span
								>个图例
							</div>
							<div class="list">
								<div class="item" v-for="(item, index) in selectList" :key="item.id">
									<div class="subtitle">
										<div class="name">{{ item.legendName }}</div>
										<div class="size">
											({{ item.legendContent.size.x }}
											*
											{{ item.legendContent.size.y }})
										</div>
									</div>
									<i @click="delSelected(index)" class="icon el-icon-close"></i>
								</div>
								<div class="item" v-for="(item, index) in selected" :key="item.id">
									<div class="subtitle">
										<el-tooltip  effect="dark" :content="item.legendName" placement="bottom">
											<div class="name">{{ item.legendName }}</div>
										</el-tooltip>
										<div class="size">
											({{ item.legendContent.size.x }}
											*
											{{ item.legendContent.size.y }})
										</div>
									</div>
									<!-- <i @click="delSelected(index)" class="icon el-icon-close"></i> -->
								</div>
							</div>
						</template>
						<div v-else class="noMore">
							<img src="@/assets/images/no_template.png" alt="" />
							<p class="label">暂无选择图例</p>
						</div>
					</div>
				</div>
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
import getTemplate from "@/store/http/getTemplate";
import axios from "axios";

import legendItem from "../legendItem";

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
			treeData: [], //设备列表
			treeFilterText: "",
			noTree: true,
			timer: null,
			defaultProps: {
				children: "children",
				label: "name",
			},
			legendList: [],
			selectObj: {},
			selectList: [],
			selected: [], //已添加的回显
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
		unAdd() {
			return (obj) => {
				return this.selected.some((item) => item.id === obj.id);
			};
		},
		hasLegend() {
			return (obj) => {
				return this.selectExtendList.some((item) => item.id === obj.id);
			};
		},
		selectExtendList() {
			return this.selectList.concat(this.selected);
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
				this.graphTemplateLegendList();
			}
		},
	},
	mounted() {},

	methods: {
		close() {
			this.treeFilterText = "";
			this.$emit("update:visible", false);
		},
		async cancel() {
			if (this.selectList.length) {
				const state = await this.$msgbox
					.confirm("数据还未保存，确定离开吗?", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "info",
					})
					.catch(() => {});
				if (state == "confirm") {
					this.close();
					this.selectList = [];
					this.selected = [];
					this.legendList = [];
				}
			} else {
				this.close();
				this.legendList = [];
			}
		},
		async confirm() {
			if (!this.selectList.length) return this.$message.error("请选择图例");
			const postList = this.selectList.map(async (item) => {
				const params = {
					templateId: this.$route.query.templateid,
					legendId: item.id,
				};
				return await getTemplate.graphTemplateLegendAdd(params);
			});
			const res = await axios.all(postList);
			const success = res.map((item) => {
				if (item.result == "success") {
					return item.data;
				}
			});
			if (success.length) {
				this.close();
				this.$emit("confirm", success);
				this.selectList = [];
				this.selected = [];
				this.legendList = [];
			}
		},
		// 获取图例列表
		async graphTemplateLegendList() {
			const { result, data } = await getTemplate.graphTemplateLegendList({
				templateId: this.$route.query.templateid,
			});

			if (result == "success") {
				this.selected = data;
			}
		},
		async getTypeTree() {
			const { result, data } = await getAdmData.getTypeTree();
			if (result == "success") {
				this.treeData = data
				// this.treeData = data.reverse();
				this.noTree = false;
			}
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		changeTreeNode(data) {
			// const hasKey = (key) => this.classCodeList.some((code) => code === key);
			// if (data?.disabled || !hasKey(data.classCode)) return;
			this.selectObj = data;
			this.selectGraphLegend();
		},
		async selectGraphLegend() {
			const params = {
				classCode: this.selectObj.classCode,
			};
			const { result, data } = await getAdmData.selectGraphLegend(params);
			if (result == "success") {
				this.legendList = data.map((item) => {
					item.checked = false;
					return item;
				});
			}
		},
		delSelected(index) {
			this.selectList.splice(index, 1);
		},
		changeSelect(option) {
			// option.checked = !option.checked;
			if (this.unAdd(option)) return;
			const index = this.selectList.findIndex((item) => item.id === option.id);
			if (index > -1) {
				this.delSelected(index);
			} else {
				this.selectList.splice(0, 0, option);
			}
			// this.selectList.push(option)
		},
		// handleData(list) {
		//   return list.reduce((a, b) => {
		//     if (b.objType == "equipment" && !b.children) {
		//       return a.concat([b]);
		//     }
		//     if (b.children) {
		//       return this.handleData(b.children);
		//     }
		//   }, []);
		// },
	},
};
</script>
<style lang="scss" scoped>
.toLegendDialog {
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

.toLegend {
	display: flex;
	flex-grow: 1;
	height: 640px;

	.Left {
		width: 256px;
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		box-sizing: border-box;
		padding: 15px;

		.treeBox {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			margin-top: 17px;
			overflow-y: auto;
			height: 410px;

			.filter-tree {
				::v-deep {
					.el-tree-node__content {
						height: 40px;
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
	}

	.container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;

		.main {
			display: flex;
			flex-grow: 1;

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

				.txt {
					color: #8b949e;
				}
			}

			.Legend {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				border-left: 1px solid #e4e6e7;
				border-right: 1px solid #e4e6e7;

				.title {
					font-size: 16px;
					font-weight: 700;
					color: #1b2129;
					height: 40px;
					display: flex;
					align-items: center;
					padding-left: 15px;
					border-bottom: 1px solid #e4e6e7;
				}

				.legendList {
					display: flex;
					flex-wrap: wrap;
					flex-grow: 1;
					height: 0;
					overflow-y: auto;
					gap: 16px;
					padding: 13px;

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
				}
			}

			.selected {
				display: flex;
				flex-direction: column;
				flex-shrink: 0;
				width: 341px;

				.statistics {
					font-size: 16px;
					font-weight: 700;
					color: #1b2129;
					padding-left: 20px;
					display: flex;
					height: 40px;
					align-items: center;

					span {
						color: #246fe5;
					}
				}

				.list {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					height: 0;
					overflow-y: auto;

					.item {
						display: flex;
						justify-content: space-between;
						font-size: 14px;
						padding: 0 20px;
						height: 40px;
						align-items: center;
						flex-shrink: 0;

						&:hover {
							background: #edf1f5;
						}

						.subtitle {
							display: flex;

							.name {
								flex-shrink: 0;
								width: 112px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								color: #1b2129;
							}

							.size {
								display: flex;

								color: #8b949e;
							}
						}

						.icon {
							cursor: pointer;
						}
					}
				}
			}
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			padding: 15px;
			box-shadow: inset 0px 1px 0px #e4e6e7;
		}
	}
}
</style>
