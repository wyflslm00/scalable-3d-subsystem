<!-- 添加间接关系 -->
<template>
  <Dialog :visible.sync="visibleModel" @close="close" width="840px" destroy-on-close append-to-body
    :close-on-click-modal="false" class="toIndirectDialog">
    <div class="head" slot="title">
      <span class="txt"> 添加间接关系 </span>
    </div>
    <div class="toIndirect">
      <div class="relationType">
        <div class="label">关系类型</div>
        <Select filterable style="width:242px" clearable :disabled="!!graphTypeName||!!relTypeName" :size="size" v-model="replationCode" placeholder="请选择">
          <OptionGroup v-for="group in relTree" :key="group.graphCode" :label="group.name">
            <Option v-for="item in group.children" :key="item.path" :label="item.name" :value="item.path"> </Option>
          </OptionGroup>
        </Select>
      </div>
      <div class="relationName">
        <div class="inline">
          <span class="label">图类型</span>
          <Input clearable class="input" :disabled="!!replationCode" v-model="graphTypeName" placeholder="最多输入20字" :size="size" maxlength="20"></Input>
        </div>
        <div class="inline">
          <span class="label">边类型</span>
          <Input clearable class="input" :disabled="!!replationCode" v-model="relTypeName" placeholder="最多输入20字" :size="size" maxlength="20"></Input>
        </div>
      </div>
      <div class="relationBox">
        <div class="title">关系链</div>
        <div class="relationList">
          <div class="item" v-for="(item, index) in relChainFilter" :key="`${item.key}${index}${relChainFilter.length}`">
            <div class="relation" v-if="index && relChainFilter.length > 2">
              <div class="label">选择关系{{ index }}</div>
              <selectGroup :selectObj="curSelectObj(index)" :classCodeFrom="getClassCodeFrom(index)"
                :classCode.sync="item.classCode">
              </selectGroup>
              <relationSet :options="{ classCodeFrom: getClassCodeFrom(index), classCode: item.classCode }"
                :row="curSelectObj(index)">
              </relationSet>
              <!-- <span class="btn" v-if="item.code">查询设置</span> -->
            </div>
            <div class="device">
              <div class="deviceName">
                <span class="icon" v-if="!index">起</span>
                <span class="icon" v-else-if="index == relChainFilter.length - 1">终</span>
                <span class="icon halfway" v-else>途</span>
                <Tooltip popper-class="error" :enterable="false" :disabled="!item.conflictWithDicFlag" effect="dark"
                  :content="getError(item)" placement="top" :visible-arrow="false">
                  <span class="name" :class="{ error: item.conflictWithDicFlag }">{{ item.name }}</span>
                </Tooltip>
              </div>
              <div class="btn">
                <Button v-if="addShow(index)" @click="addDevice(index)" icon="el-icon-circle-plus-outline"
                  type="text">新增</Button>

                <Popconfirm v-if="delShow(index)" @confirm="delDevice(index)" confirm-button-text="删除"
                  cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="此设备删除后，下游链设备则都会清空，确定删除吗？">
                  <Button slot="reference" type="text">删除</Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button :size="size" @click="cancel">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
    <toDevice :visible.sync="deviceVisible" indirect :dataSource="treeData" :options="deviceOption"
      @confirm="deviceConfirm">
    </toDevice>
  </Dialog>
</template>

<script>
import { Dialog, Button, Tree, Input, Select, Option, OptionGroup, Popover, Popconfirm, RadioGroup, Radio, Tooltip } from "element-ui";
import getAdmData from "@/store/http/getAdmData";
import selectGroup from "../rxfilter/selectGroup/index.vue";
import toDevice from "@/components/template/toDevice.vue";
import relationSet from "./relationSet.vue";

/**
 * 模拟数据
 * {
        relObjId: "ACCCCC",
        name: "冷却塔",
        classCode: "ACCCCC",
        relationCode: ""  //关系编码
      }, {
        relObjId: "ACCCOP",
        name: "冷却水泵",
        classCode: "ACCCOP",
        relationCode: ""
      }, {
        relObjId: "ACCCSC",
        name: "冷冻泵",
        classCode: "ACCCSC",
        relationCode: ""
      }, {
        relObjId: "ACCCOP",
        name: "冷冻泵",
        classCode: "ACCCOP",
        relationCode: ""
      }
 * */
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => true,
    },
    options: {
      type: Object,
      default: () => ({
        // graphTypeName: "",
        // relTypeName: "",
        // relChainList: [],
        relCodeVirtual:"",
        graphCodeVirtual:"",

        graphTypeName: "",
        relTypeName: "",
        relChainFilter: [],
        relTypeList: []
      }),
    },
  },
  data() {
    return {
      // popoverVisible: false,
      size: "small",
      graphTypeName: "", //图类型名称
      relTypeName: "",//边类型名称
      // relCodeVirtual:"",//关系类型编码
      // graphCodeVirtual:"",//图类型编码
      replationName:"",
      replationCode:"",
      // treeFilterText: "", //设备搜索名称

      // relChainList: [
      // ], //关系链路
      relChainFilter: [],
      relTypeList: [],

      // classCodeList: [], //可连接的设备列表
      treeData: [], //设备原始树
      // timer: null,
      // defaultProps: {
      //   children: "children",
      //   label: "name",
      // },
      selected: null,

      deviceVisible: false,
      deviceOption: {},

      relTree:[] //关系树
    };
  },

  components: {
    Dialog,
    Button,
    Tree,
    Input,
    Select,
    Option,
    OptionGroup,
    Popover,
    Popconfirm,
    selectGroup,
    // popoverSetting,
    toDevice,
    relationSet,
    Tooltip
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

    //显示新增按钮
    addShow() {
      return (i) => {
        const Len = this.relChainFilter.length;
        if (Len == 1) return true;
        if (i == Len - 2) return true;
      };
    },
    //显示删除按钮
    delShow() {
      return (i) => {
        const Len = this.relChainFilter.length;
        if (i <= Len - 2 && Len > 1 && i > 0) return true;
      };
    },
    curSelectObj() {
      return (index) => {
        return this.relTypeList.at(index - 1)
      }
    },
    getError() {
      return (data) => {
        const { conflictWithDicFlag, conflictWithDicItems } = data;
        if (!conflictWithDicFlag) return "";
        const [{ itemType }] = conflictWithDicItems
        return itemType
      }
    },
    getClassCodeFrom() {
      return (index) => {
        return this.relChainFilter[index - 1].classCode;
      }
    }
  },
  watch: {
    visibleModel(val) {
      if (val) {
        this.graphCommonRelTree();
        this.handleQueryRelationList();
      }
    },
    replationCode(val){
      if(val){
        this.graphTypeName="";
        this.relTypeName="";
      }
    },
    graphTypeName(val){
      if(val){
        this.replationCode=""
      }
    },
    relTypeName(val){
      if(val){
        this.replationCode=""
      }
    }
  },

  created() {
    this.getTypeTree();
  },
  mounted() {
    console.log(this.options)
  },

  methods: {
    close() {
      this.visibleModel = false
    },
    cancel() {
      this.close();
      this.$nextTick(() => {
        //初始化数据
        this.selected = null;
        this.graphTypeName = ""; //图类型名称
        this.relTypeName = "";//边类型名称
        this.replationCode="";
        // this.relCodeVirtual="";
        // this.graphCodeVirtual="";
        this.relChainFilter = [];
        this.relTypeList = [];
        // this.treeFilterText = ""; //设备搜索名称
      });
    },
    confirm() {
      const isverify = this.relTypeList.every((item) => item.code !== "");
      // if (!this.graphTypeName || !this.relTypeName) return this.$message.error("请输入图类型名称或边类型名称");
      if (!isverify) return this.$message.error("间接关系未设置完整！")

      const relChainFilter = this.relChainFilter.map(item => {
        const { name, relObjId, relObjType, classCode } = item;
        return {
          name,
          relObjId,
          relObjType,
          classCode,
        }
      })
      const relTypeList = this.relTypeList.map(item => {
        const { code, direction, name, pipeAllowAllType, pipeRiserLimited, pipeRiserOuterLimited, pipeStepLimited, hasPipe } = item;
        const params = {
          code,
          direction,
          name,
          pipeAllowAllType,
          pipeRiserLimited,
          pipeRiserOuterLimited,
          pipeStepLimited
        }
        if (hasPipe) {
          params.pipeRiserLimited = pipeRiserLimited || false;
          params.pipeStepLimited = pipeStepLimited || false;
          params.pipeAllowAllType = pipeAllowAllType || false;
          params.pipeRiserOuterLimited = pipeRiserOuterLimited || false;
        }
        return _.omitBy(params, _.isUndefined);
      })

      const options = this.relChainFilter.map(({ name, relObjId, classCode }, index) => {
        const { code = "", direction = "", hasPipe = false, pipeRiserLimited = false, pipeStepLimited = false, pipeAllowAllType = false, pipeRiserOuterLimited = false } = this.relTypeList[index - 1] || {};
        const params = {
          relObjId,
          name,
          classCode,
          relationCode: code,
          directionName: direction,
          pipeRiserLimited,
          pipeStepLimited,
          pipeAllowAllType,
          pipeRiserOuterLimited
        };
        if (hasPipe) {
          params.pipeRiserLimited = pipeRiserLimited || false;
          params.pipeStepLimited = pipeStepLimited || false;
          params.pipeAllowAllType = pipeAllowAllType || false;
          params.pipeRiserOuterLimited = pipeRiserOuterLimited || false;
        }
        return _.omitBy(params, _.isUndefined);
      });


      const [Path, Cath] = this.replationCode.split("/")
      const parent = this.relTree.find(item => item.id == Path)
      const obj = parent?.children.find(item => item.id == Cath)
      const replationName=obj?.namePath||"";
      
      const params = {
        relCodeVirtual:Cath,
        graphCodeVirtual:Path,
        replationName,
        graphTypeName: this.graphTypeName,
        relTypeName: this.relTypeName,
        relChainFilter,
        relTypeList,
        relChainList: options,
        dependLineList:this.options.dependLineList
      };
      console.log("------", _.cloneDeep(params))
      this.$emit("confirm", _.cloneDeep(params));
      this.cancel();
    },
    deviceConfirm(obj) {
      const index = this.selected;
      if (index === null) {
        return this.$message.error("请选择设备");
      }

      const { relObjId, relObjType, name, replationName, replationCode, classCode, direction, pipeRiserLimited, pipeStepLimited, pipeAllowAllType, pipeRiserOuterLimited } = obj;

      const relChainFilter = {
        relObjId: classCode,
        classCode,
        name,
        relObjType,
        key: Date.now(),
      };

      const relTypeList = {
        code: replationCode,
        name: replationName,
        direction,
        pipeStepLimited,
        pipeRiserLimited,
        pipeRiserOuterLimited,
        pipeAllowAllType
      }

      //新增设备及关系
      const addIndex = index + 1;
      this.relChainFilter.splice(addIndex, 0, relChainFilter);
      this.relTypeList.splice(index, 0, relTypeList)
      this.relTypeList[addIndex].code = "";
      this.relTypeList[addIndex].direction = "";

    },
    addDevice(index) {
      this.selected = index;
      const classCode = this.relChainFilter[index].classCode;
      this.deviceOption = {
        classCode,
      };
      this.deviceVisible = true;
    },
    //删除设备链
    delDevice(index) {
      const oldLen = this.relChainFilter.length;
      const oldLastIndex = oldLen - 1;
      for (let i = index; i < oldLastIndex; i++) {
        this.relChainFilter.splice(index, 1);
        this.relTypeList.splice(index - 1, 1)
      }
      const newLen = this.relTypeList.length;
      const newLastIndex = newLen - 1;
      this.relTypeList[newLastIndex].code = "";
      this.relTypeList[newLastIndex].direction = "";

    },
    async getTypeTree() {
      const { result, data } = await getAdmData.getTypeTree();
      if (result == "success") {
        this.treeData = data;
      }
    },
    handleData(list) {
      return list.reduce((a, b) => {
        if (b.objType == "equipment" && !b.children) {
          return a.concat([b]);
        }
        if (b.children) {
          return this.handleData(b.children);
        }
      }, []);
    },
    async graphCommonRelTree(){
      this.relTree=[];
      const {data}=await getAdmData.graphCommonRelTree({});
      const handleData = (list = [], path = "", namePath) => {
        if (!list.length) return [];
        let result = [];
        list.forEach((item) => {
          if (item?.children?.length) {
            const arr = handleData(item.children, item.graphCode, item.name);
            if (arr.length) {
              const params = {
                id: item.graphCode,
                name: item.name,
                children: arr,
                path: item.graphCode,
                namePath: item.name
              }
              result.push(params);
            }
          } else {
            const params = {
              // directions: item.directions,
              id: item.relCode,
              name: item.name,
              children: [],
              path: path + "/" + item.relCode,
              namePath: namePath + "/" + item.name
            }
            params["hasPipe"] = item?.hasPipe
            result.push(params);
          }
        });
        return result;
      };
      this.relTree=handleData(data);
    },
    handleQueryRelationList() {
      console.log(this.options)
      const initRelTypeList = {
        code: "",
        name: "",
        direction: "",
        pipeStepLimited: false,
        pipeRiserLimited: false,
        pipeRiserOuterLimited: false,
        pipeAllowAllType: false
      }
      const { graphTypeName, relTypeName, relChainFilter = [], relTypeList = [],replationName,graphCodeVirtual,relCodeVirtual } = this.options;
      this.graphTypeName = graphTypeName;
      this.relTypeName = relTypeName;
      this.replationName=replationName

      this.replationCode=graphCodeVirtual&&relCodeVirtual?`${graphCodeVirtual}/${relCodeVirtual}`:"";
      // this.graphCodeVirtual=graphCodeVirtual
      // this.relCodeVirtual=relCodeVirtual

      this.relChainFilter = _.cloneDeep(relChainFilter).map((item, index) => {
        const sourceType = index == 0 || index == relChainFilter.length - 1;
        const sourceName = sourceType ? "[模版]" : "";
        const name = sourceType ? item.name.replace(/\[.+\]/g, "") : item.name;
        return {
          ...item,
          name: `${sourceName}${name}`,
          key: `${Date.now()}${index}`,
        }
      });

      this.relTypeList = relChainFilter.length > 2 ? _.cloneDeep(relTypeList) : [initRelTypeList];


      // const result = this.options.relChainList.map((item, index) => {
      //   const sourceType = index == 0 || index == this.options.relChainList.length - 1;
      //   const classCodeFrom = index ? this.options.relChainList[index - 1].classCode : "";
      //   const sourceName = sourceType ? "[模版]" : "";
      //   item.name = sourceType ? item.name.replace(/\[.+\]/g, "") : item.name;
      //   return {
      //     relObjId: item.relObjId,
      //     name: `${sourceName}${item.name}`,
      //     classCode: item.classCode,
      //     code: item.relationCode,
      //     direction: item?.directionName || "",
      //     classCodeFrom,
      //     pipeStepLimited: item?.pipeStepLimited,
      //     pipeRiserLimited: item?.pipeRiserLimited,
      //     pipeAllowAllType: item?.pipeAllowAllType,
      //     pipeRiserOuterLimited: item?.pipeRiserOuterLimited,
      //     key: `${Date.now()}${index}`,
      //     conflictWithDicFlag: item?.conflictWithDicFlag,
      //     conflictWithDicItems: item?.conflictWithDicItems || []
      //   };
      // });
      // this.relChainList = _.cloneDeep(result);
      // this.relChainList.forEach((item, index) => {
      //   if (!index) return;
      //   this.queryRelationList(item, index);
      // });
    },
  },
};
</script>

<style lang="scss">
.popoverTreeBox {
  margin-top: 16px;
  height: 348px;
  overflow-y: auto;

  .filter-tree {
    .el-tree-node[aria-disabled="true"]>.el-tree-node__content {
      background: transparent;
    }
  }
}

.popoverFoot {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
<style lang="scss" scoped>
.toIndirectDialog {
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

.toIndirect {
  display: flex;
  flex-direction: column;
  height: 479px;
  gap:5px;
  .relationType{
    display: flex;
    align-items: center;
    padding:10px 25px 0;
    // height: 50px;

    .label {
      flex-shrink: 0;
      padding-right: 15px;
      color: #626c78;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width:80px;
      .red {
        color: red;
      }
    }
  }
  .relationName {
    display: flex;
    align-items: center;
    height: 50px;
    flex-shrink: 0;
    border-bottom: 1px solid #e1e5eb;
    padding: 0 25px;
    gap: 50px;
    .inline{
      display: flex;
    }
    .label {
      flex-shrink: 0;
      padding-right: 15px;
      color: #626c78;
      display: flex;
      flex-grow: 1;
      align-items: center;
      width:80px;
      justify-content: flex-end;
      .red {
        color: red;
      }
    }

    .input {
      width: 242px;
      display: flex;
      flex-grow: 1;
    }
  }

  .relationBox {
    display: flex;
    flex-direction: column;
    padding: 0 25px;
    flex-grow: 1;

    .title {
      color: #2e3742;
      font-weight: 700;
      border-left: 2px solid #246fe5;
      padding-left: 5px;
      margin: 15px 0;
    }

    .relationList {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      height: 0;
      flex-grow: 1;

      .item {
        background: #f7f9fa;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        padding: 0 8px;
        margin-bottom: 8px;

        .relation {
          display: flex;
          flex-shrink: 0;
          height: 32px;
          align-items: center;
          position: relative;
          margin-top: 10px;
          gap: 15px;

          &::before {
            content: "";
            position: absolute;
            left: 6px;
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #c4c9cf;
          }

          &::after {
            content: "";
            position: absolute;
            left: 9px;
            top: 15px;
            display: block;
            width: 1px;
            height: 100%;
            border-left: 1px dashed #c4c9cf;
          }

          .label {
            color: #626c78;
            padding-left: 32px;
            flex-shrink: 0;
          }

          .btn {
            color: #246fe5;
            font-feature-settings: "clig" off, "liga" off;
            /* 正常内文/Regular */
            font-family: Microsoft YaHei UI;
            font-size: 14px;
            cursor: pointer;
          }
        }

        .device {
          display: flex;
          flex-shrink: 0;
          height: 38px;
          align-items: center;
          justify-content: space-between;

          .deviceName {
            display: flex;
            align-items: center;

            .icon {
              display: flex;
              flex-shrink: 0;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              justify-content: center;
              align-items: center;
              color: #fff;
              background: #33d4d2;
              font-size: 12px;
              z-index: 1;

              &.halfway {
                background: #246fe5;
              }
            }

            .name {
              padding-left: 12px;
              font-weight: 700;
              color: #626c78;

              &.error {
                color: #E63C35;
              }
            }
          }

          .btn {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
          }
        }
      }
    }
  }
}
</style>
