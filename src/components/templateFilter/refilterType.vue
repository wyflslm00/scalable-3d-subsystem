<!--  -->
<template>
	<div class="rxfilter">
		<div class="Left">
			<div class="title">
				<span class="name">
					<!-- {{ filterName }} -->
				</span>
				<Button size="mini" type="primary" @click="addRelationGroup">新增关系组</Button>
			</div>
			<div class="relationship">
				<div class="switch" :style="switchH" v-if="chainLists.length">
					<span class="item" v-for="{ id, label } in jointSymbols" :key="id" :class="{ active: jointSymbol == id }" @click="jointSymbol = id">{{ label }}</span>
				</div>
				<div class="group" ref="group">
					<filterGroup v-for="(item, index) in chainLists" :key="index" :options="item" :groupI="index"></filterGroup>
				</div>
			</div>
		</div>
		<div class="Right">
			<div class="title">
				信息点筛选<span class="txt">{{ filterLink }}</span>
			</div>
			<div class="filters">
				<Form>
					<div class="subtitle">筛选条件</div>
					<Condition ref="Condition" :matchFilters="getMatchFiltersList" :filters.sync="filters" @change="addConditions" @delCon="delConditions"></Condition>
					<Dropdown v-if="filters.length" trigger="click" class="dropdown" @command="addConditions" @visible-change="onVisibleChange" placement="bottom-start">
						<span class="el-dropdown-link">
							<i class="el-icon-plus"></i>
							添加条件
						</span>
						<DropdownMenu slot="dropdown" class="dropdownMenu" v-if="filters.length">
							<div class="input">
								<Input :clearable="true" size="mini" placeholder="搜索" prefix-icon="el-icon-search" v-model="filterText"> </Input>
							</div>
							<DropdownItem :command="item.code" v-for="item in filterList" :key="item.id" v-html="item.heightName || item.name"></DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button type="text" disabled icon="el-icon-plus" v-else>添加条件</Button>
				</Form>
			</div>
		</div>
	</div>
</template>
<script>
import { Button, Form, FormItem, Dropdown, DropdownMenu, DropdownItem, Input } from "element-ui";
import { mapMutations, mapGetters, mapState } from "vuex";
import Condition from "@/components/condition/index";
import Vue from "vue";
import filterGroup from "./filterGroup.vue";
import setFilter from "@/store/http/setFilter";
import _ from "lodash";
export default {
	props: ["options"],
	provide() {
		return {
			refilterType: this,
		};
	},
	data() {
		return {
			size: "small",
			filters: [],
			filterText: "",
			deviceVisible: false,

			chainTypeList: [],

			jointSymbols: [
				{
					id: "or",
					label: "或",
				},
				{
					id: "and",
					label: "且",
				},
			],
			//包含
			contains: [
				{
					id: "contains",
					label: "包含",
				},
				{
					id: "contains=not",
					label: "不包含",
				},
				{
					id: "notnull",
					label: "非空",
				},
			],
			//等于
			equals: [
				{
					id: "equals",
					label: "等于",
				},
				{
					id: "equals=not",
					label: "不等于",
				},
				{
					id: "notnull",
					label: "非空",
				},
			],
			//等于且
			exist: [
				{
					id: "existAny",
					label: "等于&或",
				},
				{
					id: "existAll",
					label: "等于&且",
				},
				{
					id: "notnull",
					label: "非空",
				},
			],
			//范围下拉
			redios5: [
				{
					id: "(",
					label: ">",
				},
				{
					id: "[",
					label: "≥",
				},
				{
					id: ")",
					label: "<",
				},
				{
					id: "]",
					label: "≤",
				},
			],
			//scope
			scope: [
				{
					id: "scope",
					label: "在范围内",
				},
				{
					id: "scope=not",
					label: "不在范围内",
				},
				{
					id: "notnull",
					label: "非空",
				},
			],

			relChainList: [], //关系链

			relationList: [],
			defaultProps: {
				children: "children",
				label: "label",
			},

			deviceOption: {},

      switchH:null
		};
	},

	components: {
		filterGroup,
		Button,
		Form,
		FormItem,
		Dropdown,
		DropdownMenu,
		DropdownItem,
		Condition,
		Input,
	},

	computed: {
		...mapGetters("rxfilter", ["relChain"]),
		...mapState("rxfilter", ["currentNodeKey", "tabOn"]),
		chainLists() {
			return this.relChain?.relChainListList?.chainLists || [];
		},
		filterName() {
			const relChain = this.curChain?.relChainFilter.at(0);
			return relChain?.name?.replace(/\[.+\]/g, "");
		},
		jointSymbol: {
			get() {
				return this.relChain?.relChainListList?.jointSymbol;
			},
			set(val) {
				const { relChainListList } = this.relChain;
				this.$set(relChainListList, "jointSymbol", val);
			},
		},
		unJointSymbol() {
			const joint = ["or", "and"];
			const index = joint.findIndex((i) => i == this.jointSymbol);
			return joint[+!index];
		},
		getMatchFiltersList() {
			if (this.currentNodeKey === "") return [];
			if (!this.chainLists.length) return [];
			if (!this.filters.length) return [];
			const [groupI, parent, child] = this.currentNodeKey.split("-");
			return this.curChain?.matchFiltersList[+child];
		},
		filterLink() {
			const [groupI, parent, child] = this.currentNodeKey.split("-");
			const list = this.chainLists[+groupI];
			if (!this.currentNodeKey || !list?.chainList) return "";
			const index = list.chainList.findIndex((item, index) => index == parent);
			if (index > -1) {
				const { name, relChainFilter } = list.chainList[index];
				const { name: childName } = relChainFilter[+child];
				return `/${name}-${childName}`;
			}
		},
		curChain() {
			const [groupI, parent, child] = this.currentNodeKey.split("-");
			const list = this.chainLists[+groupI];
			return list?.chainList[+parent];
		},
		filterList() {
			if (!this.filterText) return this.filters;
			const regExp = new RegExp(this.filterText, "g");
			return _.cloneDeep(this.filters)
				.filter((item) => {
					return item.name.includes(this.filterText);
				})
				.map((item) => {
					item.heightName = item.name.replace(regExp, `<font color="#246fe5">${this.filterText}</font>`);
					return item;
				});
		}
	},
	watch: {
		currentNodeKey(val) {
			if (val) {
				this.getFuncid();
			} else {
				this.filters = [];
			}
		},
    chainLists:{
      handler(val){
        this.$nextTick(()=>{
          const {clientHeight,scrollHeight}=this.$refs.group;
          if(clientHeight==scrollHeight){
            this.switchH=`height:${clientHeight}px`
          }else{
            this.switchH=null
          }
        })
      },
      deep:true
    }
	},
	created() {
		this.getDetailShow();
	},
	mounted() {
  },
	activated() {
		if (this.chainLists.length) {
			this.merge({
				currentNodeKey: "0-0-0",
			});
			this.getFuncid();
		}
	},
	methods: {
		...mapMutations("rxfilter", ["merge"]),
		onVisibleChange(bool) {
			if (bool) {
				this.filterText = "";
			}
		},
		//过滤设置-查询
		async getDetailShow() {
			const { templateid } = this.$route.query;
			const params = {
				templateId: templateid,
			};
			const { result, data } = await setFilter.getShow(params);
			if (result == "success") {
				const { relChainListList, chainTypeList } = data;
				this.$set(this.relChain, "relChainListList", relChainListList);
				this.chainTypeList = chainTypeList;
				this.merge({
					currentNodeKey: "0-0-0",
				});
				this.getFuncid();
			}
		},
		addRelationGroup() {
			const { length } = this.chainLists;
			const [{ chainList }] = this.chainLists;
			const [first] = chainList;
			const { relChainFilter, classCodeList } = first;
			const [device] = relChainFilter;
			const [classCode] = classCodeList;
			const maxN = Math.max(
				...this.chainLists.map((item) => {
					const num = item.name.match(/\d+$/)[0];
					if (+num) {
						return +num;
					} else {
						return 0;
					}
				})
			);
			const Num = maxN > length ? maxN + 1 : length + 1;
			this.chainLists.push({
				name: `关系链组${Num}`,
				jointSymbol: this.unJointSymbol,
				chainList: [],
			});
		},
		//删除条件
		delConditions(index) {
			const { matchFiltersList } = this.curChain;
			const [groupI, parent, child] = this.currentNodeKey.split("-");
			matchFiltersList[+child].splice(index, 1);
		},
		//添加条件
		addConditions(val, option) {
			const { matchFiltersList } = this.curChain;
			const [groupI, parent, child] = this.currentNodeKey.split("-");

			const { dataType, isMultiple, code } = this.filters.find((item) => item.code === String(val));

			// const rul1 = this.jointSymbols.at(0); //且或
			// const jointSymbol = rul1.id;
			const infoCode = code;
			const rul2 = this.contains.at(0); //包含or不包含
			const rul3 = this.equals.at(0); //等于or不等于
			const rul4 = this.exist.at(0); //等于或
			const rul5 = this.scope.at(0); //范围
			const mold = {
				STRING: rul2.id,
				ENUM: isMultiple ? rul4.id : rul3.id,
				BOOLEAN: rul3.id,
			};
			const ruls = ["STRING", "ENUM", "BOOLEAN"];
			//获取值类型
			// const value = ruls.some(key => key == dataType) ? "" : []
			const value = "";
			//获取下拉默认值
			const operation = ruls.some((key) => key == dataType) ? mold[dataType] : rul5.id;
			const condition = {
				// jointSymbol,
				infoCode,
				operation,
				infoDataType: dataType,
				value,
				not: false,
			};
			if (option instanceof Vue) {
				if (matchFiltersList[+child]) {
					matchFiltersList[+child].push(condition);
				} else {
					matchFiltersList.splice(+child, 0, [condition]);
				}
			} else {
				Object.keys(condition).forEach((key) => {
					option[key] = condition[key];
				});
			}
		},
		async getFuncid() {
			const [groupI, first, child] = this.currentNodeKey.split("-");
			const { classCode } = this.curChain.relChainFilter[+child];
			const params = {
				classCode,
			};
			this.filters = [];
			const { result, data } = await setFilter.getFuncid(params);
			if (result == "success") {
				const ruls = ["STRING", "DOUBLE", "INTEGER", "ENUM", "BOOLEAN"];
				this.filters = data.filter((item) => item.category == "STATIC" && ruls.some((key) => key == item.dataType));
				// this.handleData()
			}
		},
	},
};
</script>
<style lang="scss">
.el-popconfirm {
	width: 275px;

	.el-popconfirm__main {
		align-items: flex-start;

		.el-popconfirm__icon {
			line-height: 19px;
		}
	}

	.el-popconfirm__action {
		padding-top: 10px;
	}
}
</style>
<style lang="scss" scoped>
.dropdownMenu {
	max-height: 200px;
	overflow-y: auto;
	padding: 0;

	.input {
		background: #fff;
		position: sticky;
		top: 0;
		padding: 10px;
	}
}

.blue {
	color: #246fe5;
}

.rxfilter {
	display: flex;
	flex-grow: 1;

	.Left {
		display: flex;
		flex-shrink: 0;
		width: 615px;
		background: #fff;
		border-right: 1px solid #e1e5eb;
		flex-direction: column;
		padding: 15px 20px 19px;
		box-sizing: border-box;

		.title {
			font-size: 16px;
			font-weight: 700;
			color: #2e3742;
			padding-bottom: 13px;
			align-items: center;
			display: flex;
			justify-content: space-between;
		}

		.relationship {
			display: flex;
			flex-grow: 1;
			height: 0;
			// flex-direction: column;

			.switch {
				display: flex;
				position: relative;
				flex-direction: column;
				justify-content: center;
				margin-right: 9px;

				&::after {
					content: "";
					display: block;
					width: 1px;
					height: 100%;
					position: absolute;
					background: #64a6f7;
					left: 14px;
				}

				.item {
					width: 28px;
					height: 28px;
					background: #f1f4f6;
					font-size: 14px;
					color: #8b949e;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					z-index: 1;

					&:first-child {
						border-radius: 2px 2px 0px 0px;
					}

					&:last-child {
						border-radius: 0px 0px 2px 2px;
					}

					&.active {
						background: #246fe5;
						color: #fff;
					}
				}
			}

			.group {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				overflow-y: auto;
				height:min-content;
				gap: 12px;
        max-height:100%;
			}
		}
	}

	.Right {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		background: #fff;

		.title {
			font-size: 16px;
			font-weight: 700;
			color: #1b2129;
			flex-shrink: 0;
			height: 48px;
			padding-left: 15px;
			border-bottom: 1px solid #e1e5eb;
			display: flex;
			align-items: center;

			.txt {
				color: #626c78;
				font-size: 14px;
				font-weight: 400;
				padding-left: 5px;
			}
		}

		.filters {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			height: 0;
			overflow-y: auto;
			background: #fff;
			padding: 20px 15px;

			.subtitle {
				font-size: 14px;
				font-weight: 700;
				color: #000000;
				border-left: 2px solid #246fe5;
				padding-left: 5px;
				margin-bottom: 12px;
			}

			.dropdown {
				width: 75px;
				margin-bottom: 29px;

				.el-dropdown-link {
					cursor: pointer;
					color: #0091ff;
				}
			}
		}
	}
}
</style>
