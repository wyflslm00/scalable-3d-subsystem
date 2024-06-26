<!-- 枚举 -->
<template>
	<FormItem>
		<Row type="flex">
			<Col :span="2" class="center col">
				<span v-if="!index">当</span>
				<Select v-else :size="size" v-model="options.jointSymbol" placeholder="请选择">
					<Option v-for="item in jointSymbols" :key="item.id" :label="item.label" :value="item.id"> </Option>
				</Select>
			</Col>
			<Col class="center col" :span="4">
				<Tooltip popper-class="error" :enterable="false" :disabled="!getError1" effect="dark" :content="getError1" placement="top" :visible-arrow="false">
					<Select :class="{ error: getError1 }" :size="size" v-model="options.infoCode" @change="(val) => addConditions(val, options)" placeholder="请选择">
						<Option v-for="item in filters" :key="item.id" :label="item.name" :value="item.code"> </Option>
					</Select>
				</Tooltip>
			</Col>
			<Col class="center col" :span="4">
				<Tooltip popper-class="error" :enterable="false" :disabled="!getError2" effect="dark" :content="getError2" placement="top" :visible-arrow="false">
					<Select :class="{ error: getError2 }" v-if="funcid.isMultiple" :size="size" placeholder="请选择" v-model="options.operation" @change="(val) => selTrans(val, options)">
						<Option v-for="item in exist" :key="item.id" :label="item.label" :value="item.id"> </Option>
					</Select>
				</Tooltip>
				<!-- 单选枚举 -->
				<Tooltip popper-class="error" :enterable="false" :disabled="!getError2" effect="dark" :content="getError2" placement="top" :visible-arrow="false">
					<Select :class="{ error: getError2 }" v-if="!funcid.isMultiple" :size="size" placeholder="请选择" v-model="options.operation" @change="(val) => selTrans(val, options)">
						<Option v-for="item in equals" :key="item.id" :label="item.label" :value="item.id"> </Option>
					</Select>
				</Tooltip>
			</Col>
			<Col class="center col" :span="4">
				<Tooltip popper-class="error" :enterable="false" :disabled="!getError3" effect="dark" :content="getError3" placement="top" :visible-arrow="false">
					<Select :class="{ error: getError3 }" :multiple="funcid.isMultiple" :collapse-tags="funcid.isMultiple" :size="size" placeholder="请选择" filterable v-model="queryVal" :disabled="options.operation == 'notnull'">
						<Option v-for="(item, index) in funcid.dataSource" :key="index" :label="item.name" :value="item.code"> </Option>
					</Select>
				</Tooltip>
			</Col>
			<Col :span="1" class="center">
				<i @click="delConditions(options)" class="close el-icon-close"></i>
			</Col>
		</Row>
	</FormItem>
</template>

<script>
import { FormItem, Select, Option, Col, Row, Tooltip } from "element-ui";
export default {
	props: {
		options: {
			type: Object,
			default: () => {},
		},
		filters: {
			type: Array,
			default: () => [],
		},
		index: {
			type: Number,
			default: () => 0,
		},
	},
	data() {
		return {
			size: "small",
			single: "",
			multiple: [],
			jointSymbols: [
				{
					id: "and",
					label: "且",
				},
				{
					id: "or",
					label: "或",
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
			//等于
			equals: [
				{
					id: "equals",
					label: "等于",
				},
				{
					id: "equals=true",
					label: "不等于",
				},
				{
					id: "notnull",
					label: "非空",
				},
			],
		};
	},

	components: {
		FormItem,
		Select,
		Option,
		Col,
		Row,
		Tooltip,
	},
	watch: {
		multiple(val) {
			this.options.value = val.join(",");
		},
		single(val) {
			this.options.value = val;
		},
		"options.value"(val) {
			if (this.funcid.isMultiple) {
				this.multiple = val ? val.split(",") : [];
			} else {
				this.single = val;
			}
		},
	},
	computed: {
		funcid() {
			const params = {
				dataSource: [],
				isMultiple: false,
			};
			if (!this.filters.length) return params;
			const { infoCode } = this.options;
			const { dataSource = [], isMultiple = false } = this.filters.find((rx) => rx.code === String(infoCode));
			params.dataSource = dataSource;
			params.isMultiple = Boolean(isMultiple);
			return params;
		},
		queryVal: {
			get() {
				if (this.funcid.isMultiple) {
					return this.multiple;
				} else {
					return this.single;
				}
			},
			set(val) {
				if (this.funcid.isMultiple) {
					return (this.multiple = val);
				} else {
					return (this.single = val);
				}
			},
		},
		getError1() {
			const isHas = this.filters.find((item) => item.code === this.options.infoCode);
			if (!isHas) return "信息点不存在";
		},
		getError2() {
			if (this.getError1) return;
			const obj = this.filters.find((item) => item.code === this.options.infoCode);
			const arr = this.funcid.isMultiple ? this.exist : this.equals;
			const isHas = arr.some((item) => item.id == this.options.operation);
			if (obj.dataType !== this.options.infoDataType || !isHas) return "类型有变化";
		},
		getError3() {
			if (this.getError1) return;
			const { isMultiple } = this.funcid;
			let val = this.queryVal;
			if (!isMultiple) {
				if (!this.queryVal) return;
				val = [this.queryVal];
			}
			if (!val.length) return;
			const obj = this.funcid.dataSource.find((item) => val.some((v) => v === item.code));
			if (!obj) return "取值范围有变化";
		},
	},

	mounted() {
		if (this.options.not) {
			const [operation] = this.options.operation.split("=");
			this.options.operation = `${operation}=${this.options.not}`;
		}
		if (this.funcid.isMultiple) {
			this.multiple = this.options.value ? this.options.value.split(",") : [];
		} else {
			this.single = this.options.value;
		}
	},

	methods: {
		addConditions(val, option) {
			this.$emit("change", val, option);
		},
		selTrans(val, item) {
			const [operation, not = false] = val.split("=");
			item.not = Boolean(not);
			if (item.not) {
				item.operation = `equals=${item.not}`;
			}
		},
		delConditions(item) {
			this.$emit("delCon", this.index, item);
		},
	},
};
</script>
<style lang="scss" scoped>
.center {
	display: flex;
	align-items: center;
	justify-content: center;
}

.col {
	margin-right: 30px;
}

.close {
	cursor: pointer;
}

.error {
	&::v-deep {
		input {
			color: #e63c35;
		}

		.el-select__tags + .el-input {
			.el-input__inner {
				border-color: #e63c35;
			}
		}
	}
}
</style>
