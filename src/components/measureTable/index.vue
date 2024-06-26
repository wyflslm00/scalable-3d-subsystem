<template>
  <transition name="drawer-fade">
    <div class="drawer__wrapper" v-show="visibleModel">
      <div class="drawer__container" :class="visibleModel && 'drawer__open'" @click.self="handleClose">
        <div class="drawer" :class="[direction]" ref="drawer">
          <div class="head">
            <span>多点测量表/阀门列表</span>
            <img src="@/assets/images/x.png" alt="" @click="handleClose" />
          </div>
          <div class="main">
            <div class="addBtn" @click="addShow=true">添加多点测量表/阀门</div>
            <div class="list">
              <div class="item" v-for="item in measureTwoLines" :key="item.id">
                <div class="left">
                  <div class="title">
                    {{item.name}}
                  </div>
                  <div class="type">
                    类型：{{getClassName(item.measureType)}}
                  </div>
                </div>
                <div class="right">
                  <img class="icon" @click="tableColumn=item" src="@/assets/images/edit.png" alt="">
                  <img class="icon" @click="del(item)" src="@/assets/images/delete.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <addDataTable :visible.sync="addShow" :row.sync="tableColumn" :legendList="measureData.legendList" @success="handleSuccess"></addDataTable>
      <Modal
        :show="modalStatusTip"
        :title="getTitle"
        mode="tip"
        type="error"
        @close="modalClose"
      >
          <template #content>
              此{{getType}}删除后，{{getType}}相关设置都会清空，该操作不可逆，请谨慎操作
          </template>
          <template #handle>
              <Button @click="modalClose" type="default">取消</Button>
              <Button @click="modalConfirm" type="error">删除</Button>
          </template>
      </Modal>

    </div>
  </transition>
</template>

<script>
import addDataTable from "./addDataTable.vue";
import { cloneDeep } from "lodash";
import GetTemplate from "@/store/http/getTemplate";
import GetAdmData from "@/store/http/getAdmData";
import {Modal,Button} from "meri-design";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        measureData:{
          type:Object,
          default:()=>({
            legendList:[],//边界图例
            measureTwoLines:[]//测量表列表
          })
        }
    },
    components:{
      addDataTable,
      Modal,
      Button
    },
    data(){
      return {
        direction: "rtl",
        addShow: false,
        measureTwoLines:[],
        tableColumn:{},
        treeData:[],
        modalStatusTip:false,
        delObj:{},
      }
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
      getClassName(){
        return (val)=>{
          const type={
            mulPoint:"多点测量表",
            bypassValue:"阀门"
          }
          return type[val];
        }
      },
      getTitle(){
        const name=this.delObj?.name||""
        return `确定删除“${name}”?`;
      },
      getType(){
        return this.delObj?.measureType=="mulPoint"?"多点测量表":"阀门"
      }
    },
    watch: {
      visibleModel(val) {
        if (val) {
          this.measureTwoLines=cloneDeep(this.measureData.measureTwoLines);
          // this.getAttachTypeList();
        }
      },
      "tableColumn.id"(val){
        if(val){
          this.addShow=true;
        }
      }
    },
    methods:{
      modalClose(){
        this.modalStatusTip=false;
      },
      async modalConfirm(){
        const params={
          templateId:this.$route.query.templateid,
          operate: "delMeasureMeter",
          measureMeter:{
            id:this.delObj.id
          }
        }
        const { result, data } = await GetTemplate.graphTemplateModify(params);
        if(result=="success"){
          this.measureTwoLines.splice(this.measureTwoLines.findIndex(item=>item.id==this.delObj.id),1);
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.modalStatusTip=false;
          this.delObj={}
        }
      },
      async getAttachTypeList() {
        this.treeData = [];
        const handleTree=(arr=[])=>{
          return arr.reduce((cont, item)=>{
            return item.children?cont.concat(item.children):cont;
          },[])
        }
        const { result, data } = await GetAdmData.getAttachTypeList();
        if (result == "success") {
          this.treeData = handleTree(data);
        }
      },
      handleClose(){
        this.$emit('close')
      },
      handleSuccess(data){
        if(this.measureTwoLines.some(item=>item.id==data.id)){
          this.measureTwoLines.splice(this.measureTwoLines.findIndex(item=>item.id==data.id),1,data);
        }else{
          this.measureTwoLines.push(data)
        }
      },
      async del(obj){
        this.modalStatusTip=true;
        this.delObj=obj;
      }
    }

}
</script>

<style lang="scss" scoped>
@keyframes drawer-fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@mixin drawer-animation($direction) {
  @keyframes #{$direction}-drawer-in {
    0% {
      @if $direction ==ltr {
        transform: translate(-100%, 0px);
      }

      @if $direction ==rtl {
        transform: translate(100%, 0px);
      }

      @if $direction ==ttb {
        transform: translate(0px, -100%);
      }

      @if $direction ==btt {
        transform: translate(0px, 100%);
      }
    }

    100% {
      @if $direction ==ltr {
        transform: translate(0px, 0px);
      }

      @if $direction ==rtl {
        transform: translate(0px, 0px);
      }

      @if $direction ==ttb {
        transform: translate(0px, 0px);
      }

      @if $direction ==btt {
        transform: translate(0px, 0px);
      }
    }
  }

  @keyframes #{$direction}-drawer-out {
    0% {
      @if $direction ==ltr {
        transform: translate(0px, 0px);
      }

      @if $direction ==rtl {
        transform: translate(0px, 0px);
      }

      @if $direction ==ttb {
        transform: translate(0px, 0px);
      }

      @if $direction ==btt {
        transform: translate(0px, 0);
      }
    }

    100% {
      @if $direction ==ltr {
        transform: translate(-100%, 0px);
      }

      @if $direction ==rtl {
        transform: translate(100%, 0px);
      }

      @if $direction ==ttb {
        transform: translate(0px, -100%);
      }

      @if $direction ==btt {
        transform: translate(0px, 100%);
      }
    }
  }
}

@mixin animation-in($direction) {
  .drawer__open .#{$direction} {
    animation: #{$direction}-drawer-in 0.3s 1ms;
  }
}

@mixin animation-out($direction) {
  .#{$direction} {
    animation: #{$direction}-drawer-out 0.3s;
  }
}

@include drawer-animation(rtl);
@include drawer-animation(ltr);

$directions: rtl, ltr;

@each $direction in $directions {
  @include animation-out($direction);
  @include animation-in($direction);
}

.drawer-fade-enter-active {
  animation: drawer-fade-in 0.3s;
}

.drawer-fade-leave-active {
  animation: drawer-fade-in 0.3s reverse;
}

.drawer__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
}

.drawer__container {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.drawer {
  width: 400px;
  background: #ffffff;
  position: absolute;
  top: 46px;
  bottom: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0px 3px 12px rgba(27, 33, 41, 0.12), 0px 0.5px 3px rgba(27, 33, 41, 0.08);
  flex-direction: column;
  display: flex;

  &.ltr {
    left: 0;

    .foot {
      justify-content: flex-end;
    }
  }

  &.rtl {
    right: 0;
  }

  .head {
    height: 56px;
    border-bottom: 1px solid #edf1f5;

    span {
      font-family: "Microsoft YaHei UI";
      font-weight: 700;
      font-size: 16px;
      line-height: 56px;
      color: #1b2129;
      text-indent: 20px;
      float: left;
    }

    img {
      float: right;
      margin: 18px 24px 0 0;
      cursor: pointer;
    }
  }
  .main{
    padding:16px 24px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap:8px;
    .addBtn{
      display: flex;
      height: 32px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #C4C9CF;
      background: #FFF;
      flex-shrink:0;
      color:  #1B2129;
      font-feature-settings: 'clig' off, 'liga' off;

      /* 正常内文/Regular */
      font-family: "Microsoft YaHei UI";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      cursor: pointer;
    }
    .list{
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      height:0;
      overflow-y: auto;
      .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 2px;
        border-bottom: 1px solid #E8ECF0;
        height:72px;
        padding-right:22px;
        padding-left:17px;
        flex-shrink:0;

        &:hover{
          background:#F1F4F6;
          border:none;
          .right .icon{
            display: flex;
          }
        }
        .left{
          font-size: 14px;
          font-style: normal;
          line-height: 22px; /* 157.143% */
          flex-grow: 1;
          width:0;
          .title{
            color: #424C59;
            font-feature-settings: 'clig' off, 'liga' off;

            /* 正常内文/Bold */
            font-family: "Microsoft YaHei UI";
            font-weight: 700;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .type{
            color:  #8B949E;
            font-variant-numeric: lining-nums tabular-nums;

            /* 正文/正常内文 */
            font-family: "PingFang SC";
            font-weight: 400;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            
          }
        }
        .right{
          display: flex;
          flex-shrink:0;
          gap:19px;
          .icon{
            display: none;
            flex-shrink:0;
            width:16px;
            height:16px;
            cursor: pointer;
          }
        }
      }
    }
  }

  // .foot {
  //   height: 72px;
  //   border-bottom: 1px solid #edf1f5;
  //   box-shadow: 0px 3px 12px rgba(27, 33, 41, 0.12), 0px 0.5px 3px rgba(27, 33, 41, 0.08);
  //   padding-left: 20px;
  //   display: flex;
  //   align-items: center;

  //   .el-button--primary {
  //     padding: 12px 20px !important;
  //   }
  // }
}

.expand {
  right: 0;
}

</style>