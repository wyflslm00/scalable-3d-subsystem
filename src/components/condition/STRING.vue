<!-- 字符 -->
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
					<Select :class="{ error: getError2 }" :size="size" v-model="options.operation" placeholder="请选择" @change="(val) => selTrans(val, options)">
						<Option v-for="item in contains" :key="item.id" :value="item.id" :label="item.label"></Option>
					</Select>
				</Tooltip>
			</Col>
			<Col class="center col" :span="4">
				<Input :size="size" :disabled="options.operation == 'notnull'" placeholder="请填写" v-model="options.value"></Input>
			</Col>
			<Col :span="1" class="center">
				<i @click="delConditions(options)" class="close el-icon-close"></i>
			</Col>
		</Row>
	</FormItem>
</template>

<script>
import { FormItem, Select, Option, Col, Row, Input, Tooltip } from "element-ui";
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
			contains: [
				{
					id: "contains",
					label: "包含",
				},
				{
					id: "contains=true",
					label: "不包含",
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
		Input,
		Tooltip,
	},

	computed: {
		getError1() {
			const isHas = this.filters.find((item) => item.code === this.options.infoCode);
			if (!isHas) return "信息点不存在";
		},
		getError2() {
			if (this.getError1) return;
			const obj = this.filters.find((item) => item.code === this.options.infoCode);
			if (obj.dataType !== this.options.infoDataType) return "类型有变化";
		},
	},

	mounted() {
		if (this.options.not) {
			const [operation] = this.options.operation.split("=");
			this.options.operation = `${operation}=${this.options.not}`;
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
				item.operation = `contains=${item.not}`;
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
	}
}
</style>
