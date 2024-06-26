<!-- 布尔 -->
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
			<Col class="center col" :span="1">
				<span>等于</span>
			</Col>
			<Col class="center col" :span="8">
				<!-- <Tooltip popper-class="error" :enterable="false" :disabled="!getError2" effect="dark" :content="getError2"
        placement="top" :visible-arrow="false">
        <RadioGroup :class="{ error: getError2 }" :size="size" v-model="options.value">
          <Radio v-for="item in dataSource" :key="item.code" :label="item.code">
            {{ item.name }}
          </Radio>
        </RadioGroup>
      </Tooltip> -->
				<Tooltip popper-class="error" :enterable="false" :disabled="!getError2" effect="dark" :content="getError2" placement="top" :visible-arrow="false">
					<Select :class="{ error: getError2 }" :size="size" placeholder="请选择" v-model="options.value">
						<Option v-for="item in dataSource" :key="item.code" :label="item.name" :value="item.code"> </Option>
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
import { RadioGroup, Radio, FormItem, Select, Option, Col, Row, Tooltip } from "element-ui";
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
		};
	},

	components: {
		RadioGroup,
		Radio,
		FormItem,
		Select,
		Option,
		Col,
		Row,
		Tooltip,
	},

	computed: {
		dataSource() {
			if (!this.filters.length) return [];
			const { infoCode } = this.options;
			const { dataSource = [], dataType } = this.filters.find((rx) => rx.code === String(infoCode));
			return dataSource;
		},
		getError1() {
			const isHas = this.filters.find((item) => item.code === this.options.infoCode);
			if (!isHas) return "信息点不存在";
		},
		getError2() {
			if (this.getError1) return;
			if (this.options.value === "") return;
			const obj = this.dataSource.find((item) => item.code === this.options.value);
			if (!obj) return "取值范围有变化";
		},
	},

	mounted() {},

	methods: {
		addConditions(val, option) {
			this.$emit("change", val, option);
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
