<!-- 区域 -->
<template>
	<div class="cnt">
		<div class="head">
			<div class="seach">
				<span>区域名称：</span>
				<el-input size="small" clearable placeholder="请输入检索摘要"></el-input>
				<el-button type="primary" icon="el-icon-search" size="small" class="btnSeach">搜索</el-button>
			</div>
			<div><el-button type="primary" size="small" @click="add">添加区域</el-button></div>
		</div>
		<div class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed prop="date" label="序号" width="90"> </el-table-column>
				<el-table-column prop="name" label="区域名称" width="260"> </el-table-column>
				<el-table-column prop="province" label="区域编号" width="140"> </el-table-column>
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
		<addArea v-if="diaShow" :dialogVisible="diaShow"  :type='type' :editName="editName" @chose="editChose" @confirm='editConfirm' />
	</div>
</template>

<script>
import addArea from './components/addArea.vue'
export default {
	data() {
		return {
			diaShow:false, //弹窗开关
			type:0, //0新增 1编辑
			editName:'新增区域', //弹窗名称
		};
	},

	components: {addArea},

	computed: {},

	mounted() {},

	methods: {
		add(){
			this.diaShow = true
			this.type = 0
			this.editName = '新增区域'

		},
		edit(){
			this.diaShow = true
			this.type = 1
			this.editName = '编辑区域'
		},
		editChose(){
			this.diaShow = false
		},
		editConfirm(){
			this.editChose()
		}
	},
};
</script>
<style lang="scss" scoped></style>
