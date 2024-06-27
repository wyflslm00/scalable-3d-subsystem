<!-- 终端配置 -->
<template>
	<div class="cnt">
		<div class="head">
			<div class="seach">
				<span>终端名称：</span>
				<el-input size="small" clearable placeholder="请输入检索摘要"></el-input>
				<el-button type="primary" icon="el-icon-search" size="small" class="btnSeach">搜索</el-button>
			</div>
			<div><el-button type="primary" size="small">新增终端</el-button></div>
		</div>
		<div class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed prop="date" label="序号" width="90"> </el-table-column>
				<el-table-column prop="name" label="终端名称" width="260"> </el-table-column>
				<el-table-column prop="province" label="终端编号" width="140"> </el-table-column>
				<el-table-column prop="city" label="终端IP" width="140"> </el-table-column>
				<el-table-column prop="city" label="端口号" width="140"> </el-table-column>
				<el-table-column prop="city" label="设备类别" width="140"> </el-table-column>
				<el-table-column fixed="right" label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
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
