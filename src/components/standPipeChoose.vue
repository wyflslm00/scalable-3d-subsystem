<template>
	<div class="legend_panel">
		<div class="legend">
			<!-- <div  class="pipe" v-for="item in pipeList" :class="[{'pipe_chk_no':item.checked}]" @click="changePipe(item)" ></div> -->

			<template v-for="(item, i) in pipeList">
				<el-tooltip class="item" effect="green" placement="bottom" :key="'s' + i">
					<div class="pipe" :class="[{ pipe_chk_yes:item.lineTreeListFlag,pipe_chk_reg:item.colorReg,pipe_chk_no: item.checked, pipe_unchk_yes: item.pipe_complete }]" @click="changePipe(item)"></div>
					<div slot="content">{{ riserName + "(" + (item.typeName||item.equipmentTypes[0]) + ")" }}</div>
				</el-tooltip>
			</template>

			<!-- {{ pipeList }} -->
			<!-- <div class="pipe" v-for="item in pipeList" :class="[{'pipe_chk_no':item.checked}]" @click="changePipe(item)" ></div> -->
		</div>
	</div>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";

export default {
	data() {
		return {
			riserName: "",
			pipeList: [],
		};
	},
	props: {
		queryBody: {
			type: Object,
			default: function () {},
		},
		stand_pipe_data: {
			type: Object,
			default: function () {},
		},
	},
	methods: {
		changePipe(item) {
			if (item.checked) return;
			this.pipeList.forEach((item) => {
				item.checked = false;
			});

			item.checked = !item.checked;
			item.classCode = item.equipmentTypes[0];
			item.templateid = this.$route.query.templateid;
			this.pipeList = this.pipeList.concat([]);
			this.$emit("mainAnchor", item);
		},
		setHistoryPipeComplete(pipe) {
			this.pipeList.map((item) => {
				if (item.id == pipe.id) item.pipe_complete = true;
			});
		},
		setPipeRestore(pipe) {
			this.pipeList.map((item) => {
				if (item.id == pipe.id) item.pipe_complete = false;
			});
		},
		 // 查询立管母线关系
         getLineTreRise(data,index) {
            let params = {}
                params = {
                    operate: "line-tree-mul",
                    templateId: this.$route.query.templateid,
                    mainPipeId: data.id,
                };
           
			GetAdmData.getAnchorDetail(params).then((result) => {
				if (result.result == "success") {
				if(result.data.lineTreeList&&result.data.lineTreeList.length){
					this.$set(this.pipeList[index],'lineTreeListFlag',true)
				}
				if(result.data.lineTreeList&&result.data.lineTreeList.length){
					this.$set(this.pipeList[index],'colorReg',true)
				}
                    
                       
				}
			});
		},
	},
	watch: {
		queryBody: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (JSON.stringify(val) == "{}" || val.children == undefined) return;

				this.riserName = val.name;
				let pipes = val.children;
				// if (pipes && pipes.length) {
				// 	pipes.forEach((item) => {
				// 		item.pipe_complete = false;
				// 	});
				// }
				
				this.pipeList = pipes.concat([]);
				for(let i = 0;i<this.pipeList.length;i++){
					this.getLineTreRise(this.pipeList[i],i)
				}

			},
		},
	},
};
</script>

<style lang="scss">
.el-tooltip__popper.is-green {
	background: #14c4c4;
	font-size: 14px;
}

.el-tooltip__popper.is-green .popper__arrow {
	border-bottom-color: #14c4c4;
}

.el-tooltip__popper.is-green .popper__arrow::after {
	border-bottom-color: #14c4c4;
}
</style>
<style lang="scss" scoped>
.legend_panel {
	display: flex;
	height: 400px;
	width: 734px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// width: fit-content;

	.legend {
		background: red;
		position: relative;
		display: flex;
		justify-content: center;
		background: #ffffff;
		height: 264px;
		padding-right: 18px;

		.pipe {
			width: 4px;
			background: #d9ebff;
			float: left;
			margin-left: 18px;
			cursor: pointer;
			transition: 0.5s;
		}

		.pipe:hover {
			// width: 8px;
			-webkit-transform: scaleX(2);
		}

		.pipe_unchk_yes {
			background: #cbf7f3;
		}

		.pipe_chk_yes {
			background: #CBF7F3;
		}
		.pipe_chk_reg{
			background: #F55047;
		}
		.pipe_chk_no {
			background: #246fe5;
		}
		
	}
}
</style>
