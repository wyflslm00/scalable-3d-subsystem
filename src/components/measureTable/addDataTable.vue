<!-- 添加多点测量表/阀门 -->
<template>
  <Dialog :visible.sync="visibleModel" @close="cancel" width="600px" destroy-on-close append-to-body
    :close-on-click-modal="false" class="toDataTableDialog">
    <div class="head" slot="title">
      <span class="txt">{{getTitle}}</span>
    </div>
    <div class="toDataTable">
      <div class="switch">
        <div class="label">选择类型<span class="red">*</span></div>
        <RadioGroup v-model="params.measureType" :disabled="!!row.id">
          <Radio label="mulPoint">多点测量表</Radio>
          <Radio label="bypassValue">阀门</Radio>
        </RadioGroup>
      </div>
      <div class="group">
        <div class="inline">
          <div class="label">名称<span class="red">*</span></div>
          <Input :size="size" v-model="params.name" placeholder="请输入名称" />
        </div>
        <div class="inline">
          <div class="label">字典对象<span class="red">*</span></div>
          <TreeSelect width="268" v-model="params.classCodes" :isReadOnly="false" :lastStage="true" :data="treeData" @change="changeSingle"></TreeSelect>
        </div>
        <div class="inline" v-if="params.measureType=='mulPoint'">
          <div class="label">边界图例</div>
          <MSelect width="268" v-model="params.edgeContainerIds" :multiple="true" :data="legends" placeholder="搜索或选择内容"></MSelect>
        </div>
        <div class="inline" v-else>
          <div class="label">选择关系<span class="red">*</span></div>
          <Select :isReadOnly="true" v-model="params.relTypes" :selectdata="relationList" width="268" placeholder="搜索或选择内容"></Select>
        </div>
      </div>
      <div class="relationBox">
        <div class="title">A组关系线</div>
        <div class="list">
          <div class="item" v-for="item in getALine" :key="item.id">
            <div class="line">
              <div class="name">{{item.line}}</div>
              <div class="relation">{{item.relationName}}</div>
            </div>
            <div class="del" @click="delALine(item.id)">删除</div>
          </div>
        </div>
        <div class="addBtn" @click="addLine('lineSupply')">添加关系</div>
      </div>
       <div class="relationBox">
        <div class="title">B组关系线</div>
        <div class="list">
          <div class="item" v-for="item in getBLine" :key="item.id">
            <div class="line">
              <div class="name">{{item.line}}</div>
              <div class="relation">{{item.relationName}}</div>
            </div>
            <div class="del" @click="delBLine(item.id)">删除</div>
          </div>
          <div class="addBtn" @click="addLine('lineReturn')">添加关系</div>
        </div>
       </div>
    </div>
    <div slot="footer">
      <Button :size="size" @click="cancel">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
    <measureTable :title="measureTitle" :visible.sync="measureTableShow" v-if="measureTableShow" :measureData="measureData"  @confirm="measureConfirm" @close="measureClose" />
  </Dialog>
</template>

<script>
import { Dialog, Button, Input,RadioGroup,Radio} from "element-ui";
import measureTable from "@/views/template/component/measure.vue";
import { MSelect,TreeSelect,Select } from "meri-design";
import GetAdmData from "@/store/http/getAdmData";
import GetTemplate from "@/store/http/getTemplate";
import { omitBy,isUndefined } from "lodash";
const initParams=()=>({
  id:undefined,
  name:"多点测量表1",
  classCodes:"",
  measureType:"mulPoint",
  edgeContainerIds:[],
  relTypes:"",
  lineReturn:{
    lineIds:[]
  },
  lineSupply:{
    lineIds:[]
  }      
});
        

export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    legendList:{
      type:Array,
      default:()=>[]
    },
    row:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      size: "small",
      params:{
        ...initParams()
      },
      measureTableShow:false,
      treeData:[],
      lineType:"",
      lineList:[],
      relationList:[]
    };
  },

  components: {
    Dialog,
    Button,
    Input,
    MSelect,
    TreeSelect,
    measureTable,
    RadioGroup,
    Radio,
    Select
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
    legends(){
      return this.legendList.map(item=>{
        return {
          name:item.name,
          id:item.id,
          // checked:"uncheck"
        }
      })
    },
    getTitle(){
      return this.row?.id?"编辑多点测量表/阀门":"添加多点测量表/阀门"
    },
    getALine(){
      const {lineSupply:{lineIds}}=this.params
      const findObj=(id)=>{
        let params={}
        this.lineList.forEach(item=>{
          const obj=item.children.find(C=>C.id===id)
          if(obj){
            params={
              id:obj.id,
              line:`${obj.templateConnector1}→${obj.templateConnector2}`,
              relationName:item.name
            }
          }
        })
        return params;
      }
      const obj=lineIds.map(id=>{
        const line=findObj(id)
        return {
          ...line
        }
      })
      return obj
    },
    getBLine(){
      const {lineReturn:{lineIds}}=this.params
      const findObj=(id)=>{
        let params={}
        this.lineList.forEach(item=>{
          const obj=item.children.find(C=>C.id===id)
          if(obj){
            params={
              id:obj.id,
              line:`${obj.templateConnector1}→${obj.templateConnector2}`,
              relationName:item.name
            }
          }
        })
        return params;
      }
      const obj=lineIds.map(id=>{
        const line=findObj(id)
        return {
          ...line
        }
      })
      return obj
    },
    measureData(){
      if(!this.lineType) return [];
      return this.params[this.lineType].lineIds
    },
    measureTitle(){
      return this.lineType=="lineSupply"?"添加A组关系":"添加B组关系"
    }
  },
  watch: {
    visibleModel(val) {
      if (val) {
        this.getAttachTypeList();
        this.getLinelist();
      }
    },
    "params.measureType"(val){
      if(val=="bypassValue"){
        if(this.params.classCodes){
          this.getOnlyClassCode();
        }
        if(this.params.name&&this.params.name=="多点测量表1"){
          this.params.name="阀门1";
        }else{
          this.params.name=this.params.name||"阀门1"
        }
      }else{
        if(this.params.name&&this.params.name=="阀门1"){
          this.params.name="多点测量表1";
        }else{
          this.params.name=this.params.name||"多点测量表1"
        }
      }
    },
    "params.classCodes"(val){
      if(val&&this.params.measureType=="bypassValue"){
        this.getOnlyClassCode();
      }
    },
    "row.id"(val){
      if(val){
        this.params={
          ...this.row,
          relTypes:this.row.relTypes[0],
          classCodes:this.row.classCodes[0]
        }
      }
    }
  },

  created() {
    
  },
  mounted() {
  },

  methods: {
    close() {
      this.visibleModel = false
    },
    cancel() {
      this.close();
      this.$nextTick(() => {
        //初始化数据
        this.params=initParams();
        if(this.row.id){
          this.$emit("update:row",{})
        }
      });
    },
    // confirm() {
      
      // this.$emit("confirm", _.cloneDeep(params));
      // this.cancel();
    // },
    measureConfirm(data){
      this.params[this.lineType].lineIds=data;
      this.measureClose();
    },
    measureClose(){
      this.measureTableShow=false;
    },
    changeSingle(id,obj){
      this.params.classCodes=id
    },
    async getAttachTypeList() {
			this.treeData = [];
      const handleTree=(arr=[])=>{
        if(!arr.length) return [];
        const result=[]
        arr.forEach(item => {
          const children=handleTree(item?.children||[]);
          if(children.length){
            result.push({
              name: item.name,
              id: item.classCode,
              // checked:""
              open:false,
              children,
            });
          }else{
            result.push({
              name: item.name,
              id: item.classCode,
              // checked:""
              open:false,
            });
          }
        });
        return result;
      }
			const { result, data } = await GetAdmData.getAttachTypeList();
			if (result == "success") {
				this.treeData = handleTree(data);
			}
		},
    async confirm(){
      if(!this.params.name) return this.$message({
        message: '请输入名称',
        type: 'warning'
      });
      if(!this.params.classCodes) return this.$message({
        message: '请选择字典对象',
        type: 'warning'
      });
      if(this.params.measureType=="bypassValue"){
        if(!this.params.relTypes.length) return this.$message({
          message: '请选择关联关系',
          type: 'warning'
        });
      }
      const params={
        templateId:this.$route.query.templateid,
        operate: "addMeasureMeter",
        measureMeter:{
          ...this.params,
          classCodes:[this.params.classCodes],
          relTypes:(this.params.relTypes!=""&&this.params.relTypes!=null)?[this.params.relTypes]:[],
          edgeContainerIds:[...this.params.edgeContainerIds]
        }
      }
      const { result, data, message } = await GetTemplate.graphTemplateModify(params);
      if(result=="success"){
        this.$emit("success", _.cloneDeep(data));
        this.cancel();
      }else{
        this.$message({
        message: message||'发生错误!',
        type: 'error'
      });
      }
    },
    async getLinelist(){
      this.lineList=[];
      const {result,data}=await GetAdmData.getDetailShow({
        templateId:this.$route.query.templateid,
        operate: "relLineMap",
      })
      if (result == "success") {
        this.lineList=data.relLineTree;
			}
    },
    async getOnlyClassCode(){
      const handleData = (list = [], path = "") => {
        if (!list.length) return [];
        let result = [];
        list.forEach((item) => {
            const arr = handleData(item.children||[], item.graphCode);
            if (arr.length) {
              const params={id:item.graphCode, classify:item.name};
              result.push(params);
              result=result.concat(arr)
            }else {
              const link=path + "/" + item.relCode
              const params = {
                id: link,
                name: item.name,
              }
              result.push(params);
            }
        });
        return result;
      };
      const {result,data}=await GetAdmData.getOnlyClassCode({
        classCode:this.params.classCodes
      })
      if (result == "success") {
        this.relationList=handleData(data);
			}
    },
    addLine(type){
      this.lineType=type;
      this.measureTableShow=true;
    },
    delALine(id){
      const {lineSupply:{lineIds}}=this.params
      lineIds.splice(lineIds.findIndex(item=>item==id),1)
    },
    delBLine(id){
      const {lineReturn:{lineIds}}=this.params
      lineIds.splice(lineIds.findIndex(item=>item==id),1)
    }
  },
};
</script>
<style lang="scss">
.p-checkbox .p-checkbox-checked{
  background-color: #246FE5;
  border-color: #246FE5;
}
.m-drop-btn-confirm{
  color:#246FE5;
}
.p-select-header:hover{
  border:1px solid #246FE5;
}
.p-select-option-box .p-select-option-menu .p-select-option-selected{
  background-color:#D9EBFF;
}
.p-select-option-box .p-select-option-menu .p-select-option .p-select-option-content .p-select-option-main-selected{
  color:#246FE5
}
</style>
<style lang="scss" scoped>
.toDataTableDialog {
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

.toDataTable {
  display: flex;
  flex-direction: column;
  height:360px;
  padding:12px 24px;
  gap:16px;
  overflow-y: auto;
  .switch{
    display: flex;
    align-items: center;
    gap:40px;
    .label{
      color: #424C59;
      font-feature-settings: 'clig' off, 'liga' off;

      /* 正常内文/Regular */
      font-family: "Microsoft YaHei UI";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      .red{
        color:#F55047; 
      }
    }
  }
  .group{
    display: grid;
    grid-template-columns:repeat(2,1fr);
    gap:12px 16px;
    .inline{
      display: flex;
      flex-direction: column;
      gap:4px;
      .label{
        color: #424C59;
        font-feature-settings: 'clig' off, 'liga' off;

        /* 正常内文/Regular */
        font-family: "Microsoft YaHei UI";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        .red{
          color:#F55047; 
        }
      }
    }
  }
  .relationBox{
    display: flex;
    flex-direction: column;
    gap:8px;
    .title{
      color: #424C59;
      font-feature-settings: 'clig' off, 'liga' off;

      /* 正常内文/Regular */
      font-family: "Microsoft YaHei UI";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
    .item{
      display: flex;
      justify-content: space-between;
      height:32px;
      align-items: center;
      flex-grow: 1;
      gap:8px;
      .line{
        display: flex;
        flex-grow: 1;
        align-items: center;
        gap:8px;
        .name{
          flex-grow: 1;
          width:0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color:#1B2129
        }
        .relation{
          display: flex;
          padding: 1px 8px;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          background: #D9EBFF;
          flex-shrink:0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          color:  #1B4ACC;
          font-feature-settings: 'clig' off, 'liga' off;

          /* 正常内文/Regular */
          font-family: "Microsoft YaHei UI";
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
        }
      }
      .del{
        flex-shrink: 0;
        display: flex;
        width: 44px;
        padding: 5px 8px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        color: #F55047;
        font-feature-settings: 'clig' off, 'liga' off;

        /* 正常内文/Regular */
        font-family: "Microsoft YaHei UI";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }
    }
    .addBtn{
      display: flex;
      width: 118px;
      height:32px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #C4C9CF;
      cursor: pointer;

      color: #1B2129;
      font-feature-settings: 'clig' off, 'liga' off;

      /* 正常内文/Regular */
      font-family: "Microsoft YaHei UI";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }
  }
}
</style>
