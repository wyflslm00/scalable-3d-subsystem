<!-- 添加设备 -->
<template>
	<el-Dialog :visible.sync="visibleModel" @close="close" width="600px" destroy-on-close append-to-body class="addDeviceDialog" :close-on-click-modal="false">
		<div class="head" slot="title">
			<span class="txt"> 选择设备 </span>
		</div>

		<div class="el">
			<el-checkbox v-model="item.checked" v-for="item in equipList">{{ item.name }}</el-checkbox>
		</div>

		<div slot="footer">
			<!-- <el-Button :size="size" @click="cancel">取 消</el-Button> -->
			<el-Button :size="size" type="primary" @click="confirm">确定</el-Button>
		</div>
	</el-Dialog>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: () => true,
		},
		equipList: {
			type: Array,
			default: () => [],
		},
		anchorList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			size: "small",
			equipList1: [],
		};
	},
	computed: {
		visibleModel: {
			get() {
				return this.visible;
			},
			set(val) {
				this.$emit("update:visible", false);
			},
		},
	},
	created() {},
	mounted() {},
	watch: {
		equipList: {
			deep: true,
			immediate: true,
			handler: function (value) {
				// this.equipList1 = _.cloneDeep(value)
			},
		},
	},
	methods: {
		close() {
			this.$emit("update:visible", false);
		},
		cancel() {
			this.close();
		},
		confirm() {
			this.close();
			this.$emit("checkedEquipment", this.equipList);
			// console.table(this.equipList1)
		},
	},
};
</script>

<style lang="scss" scoped>
.addDeviceDialog {
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
	border-bottom: 1px solid #e1e5eb;
	padding: 20px;

	.txt {
		color: #2e3742;
		padding-right: 6px;
		margin-right: 8px;
	}
}

.el {
	padding: 33px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.el-checkbox {
		width: 230px;
		height: 40px;
	}
}
</style>
