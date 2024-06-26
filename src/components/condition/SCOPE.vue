<!-- 范围 -->
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
					<Select :class="{ error: getError2 }" :size="size" placeholder="请选择" v-model="options.operation" @change="(val) => selTrans(val, options)">
						<Option v-for="item in scope" :key="item.id" :value="item.id" :label="item.label"></Option>
					</Select>
				</Tooltip>
			</Col>
			<Col class="center col" :span="4">
				<Input :size="size" v-model="modal[1]" placeholder="请填写" class="input-with-select" :disabled="options.operation == 'notnull' || !modal[0]">
					<Select :disabled="options.operation == 'notnull'" v-model="modal[0]" :size="size" slot="prepend" placeholder=">">
						<Option v-for="item in Bthan" :label="item.label" :value="item.id" :key="item.label"></Option>
					</Select>
				</Input>
			</Col>
			<Col class="center col" :span="4">
				<Input :disabled="options.operation == 'notnull' || !modal[2]" :size="size" v-model="modal[3]" placeholder="请填写" class="input-with-select">
					<Select :disabled="options.operation == 'notnull'" :size="size" v-model="modal[2]" slot="prepend" placeholder="<">
						<Option v-for="item in Sthan" :label="item.label" :value="item.id" :key="item.label"></Option>
					</Select>
				</Input>
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
			modal: [],
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
			scope: [
				{
					id: "scope",
					label: "在范围内",
				},
				{
					id: "scope=true",
					label: "不在范围内",
				},
				{
					id: "notnull",
					label: "非空",
				},
			],
			Bthan: [
				{
					id: "(",
					label: ">",
				},
				{
					id: "[",
					label: "≥",
				},
			],
			Sthan: [
				{
					id: ")",
					label: "<",
				},
				{
					id: "]",
					label: "≤",
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
	watch: {
		modal(val) {
			const [a = "", b = "", c = "", d = ""] = val;
			this.options.value = `${a}${b},${d}${c}`;
		},
		"options.value"(val) {
			this.handleVal();
		},
	},

	mounted() {
		if (this.options.not) {
			const [operation] = this.options.operation.split("=");
			this.options.operation = `${operation}=${this.options.not}`;
		}
		this.handleVal();
	},

	methods: {
		handleVal() {
			const val = this.options.value;
			const [a = "", b = ""] = val.split(",");
			const [a1 = ""] = a.match(/\(|\[/) || [];
			const [a2 = ""] = a.match(/(?<=[\(|\[])(.+?)$/g) || [];
			const [b1 = ""] = b.match(/^(.+?)(?=[\)|\]])/g) || [];
			const [b2 = ""] = b.match(/\)|\]/) || [];
			this.modal = [a1, a2, b2, b1];
		},
		addConditions(val, option) {
			this.$emit("change", val, option);
		},
		selTrans(val, item) {
			const [operation, not = false] = val.split("=");
			item.not = Boolean(not);
			if (item.not) {
				item.operation = `scope=${item.not}`;
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

.input-with-select {
	::v-deep {
		&.is-disabled {
			.el-input {
				.el-input__inner {
					cursor: pointer;
				}

				.el-input__icon {
					cursor: pointer;
				}
			}
		}

		.el-input {
			width: 56px;

			input {
				color: #333;
			}
		}
	}
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
