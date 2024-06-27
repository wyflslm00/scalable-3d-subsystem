<!-- 音频 -->
<template>
	<div class="cnt">
		<div class="head">
			<div class="seach">
				<span>音频名称：</span>
				<el-input size="small" clearable placeholder="请输入检索摘要"></el-input>
				<el-button type="primary" icon="el-icon-search" size="small" class="btnSeach">搜索</el-button>
			</div>
			<div><el-button type="primary" size="small">上传音频</el-button></div>
		</div>
		<div class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed prop="date" label="序号" width="90"> </el-table-column>
				<el-table-column prop="name" label="音频名称" width="260"> </el-table-column>
				<el-table-column prop="province" label="音频编号" width="140"> </el-table-column>
				<el-table-column prop="province" label="文件大小" width="140"> </el-table-column>
				<el-table-column prop="province" label="主题" width="140"> </el-table-column>
				<el-table-column prop="city" label="说明"> </el-table-column>
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
