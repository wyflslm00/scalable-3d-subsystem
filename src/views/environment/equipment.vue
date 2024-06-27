<!-- 设备 -->
<template>
	<div class="cnt">
		<div class="head">
			<div class="seach">
				<span>设备名称：</span>
				<el-input size="small" clearable placeholder="请输入检索摘要"></el-input>

				<el-button type="primary" icon="el-icon-search" size="small" class="btnSeach">搜索</el-button>
			</div>
			<div><el-button type="primary" size="small">刷新数据</el-button></div>
		</div>
		<div class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed prop="date" label="序号" width="90"> </el-table-column>
				<el-table-column prop="name" label="设备名称" width="260"> </el-table-column>
				<el-table-column prop="province" label="设备编号" width="140"> </el-table-column>
				<el-table-column prop="city" label="区域" width="140"> </el-table-column>
				<el-table-column prop="city" label="状态"> </el-table-column>
			</el-table>
		</div>
		<div class="foot">
			<el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},

	components: {},

	computed: {},

	mounted() {},

	methods: {},
};
</script>
<style lang="scss" scoped></style>
