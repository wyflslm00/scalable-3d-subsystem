<!-- 不再使用此文件 -->
<!-- 添加间接关系 -->
<template>
  <Dialog :visible.sync="visibleModel" @close="close" width="840px" destroy-on-close append-to-body
    :close-on-click-modal="false" class="toIndirectDialog">
    <div class="head" slot="title">
      <span class="txt"> 添加间接关系 </span>
    </div>
    <div class="toIndirect">
      <div class="relationName">
        <span class="label">关系名称</span>
        <Input class="input" v-model="relationName" placeholder="最多输入20字" :size="size" maxlength="20"></Input>
      </div>
      <div class="relationBox">
        <div class="title">关系链</div>
        <div class="relationList">
          <div class="item" v-for="(item, index) in relChainList" :key="index">
            <div class="relation" v-if="index">
              <div class="label">选择关系{{ index }}</div>
              <selectGroup :selectObj="item" :classCodeFrom.sync="item.classCodeFrom" :classCode.sync="item.classCode">
              </selectGroup>
              <span class="btn" v-if="item.code">查询设置</span>
            </div>
            <div class="device">
              <div class="deviceName">
                <span class="icon" v-if="!index">起</span>
                <span class="icon" v-else-if="index == relChainList.length - 1">终</span>
                <span class="icon halfway" v-else>途</span>

                <span class="name">{{ item.name }}</span>
              </div>
              <div class="btn">
                <!-- <Popover v-if="addShow(index)" placement="bottom-end" width="567" v-model="popoverVisible"
                  @show="queryClassList(item)" @hide="deviceCancel">
                  <Input prefix-icon="el-icon-search" placeholder="输入关键字搜索" v-model="treeFilterText" size="small"
                    clearable></Input>
                  <div class="popoverTreeBox">
                    <Tree class="filter-tree" node-key="path" :data="classTree" :props="defaultProps"
                      :filter-node-method="filterNode" ref="tree" highlight-current @node-click="changeTreeNode"></Tree>
                  </div>
                  <div class="popoverFoot">
                    <Button size="mini" @click="deviceCancel">取消</Button>
                    <Button type="primary" size="mini" @click="deviceConfirm(index)">确定</Button>
                  </div>
                  <Button slot="reference" icon="el-icon-circle-plus-outline" type="text">新增</Button>
                </Popover> -->
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
    <toDevice :visible.sync="deviceVisible" :dataSource="treeData" :options="deviceOption" @confirm="deviceConfirm">
    </toDevice>
  </Dialog>
</template>

<script>
import { Dialog, Button, Tree, Input, Select, Option, OptionGroup, Popover, Popconfirm, RadioGroup, Radio } from "element-ui";
import getAdmData from "@/store/http/getAdmData";
import selectGroup from "../rxfilter/selectGroup/index.vue";
import toDevice from "./toDevice.vue";

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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // popoverVisible: false,
      size: "small",
      relationName: "", //关系名称
      // treeFilterText: "", //设备搜索名称

      relChainList: [
        //   {
        //   relObjId: "ACCCCC",
        //   name: "冷却塔",
        //   classCode: "ACCCCC",
        //   relationCode: "",
        //   relationList: [],
        //   loading: false,
        // }, {
        //   relObjId: "ACCCOP",
        //   name: "冷却水泵",
        //   classCode: "ACCCOP",
        //   relationCode: "",
        //   relationList: [],
        //   loading: false,
        // }, {
        //   relObjId: "ACCCSC",
        //   name: "冷冻泵1",
        //   classCode: "ACCCSC",
        //   relationCode: "",
        //   relationList: [],
        //   loading: false,
        // }, {
        //   relObjId: "ACCCSC",
        //   name: "冷冻泵",
        //   classCode: "ACCCSC",
        //   relationCode: "",
        //   relationList: [],
        //   loading: false,
        // }
      ], //关系链路
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
        const Len = this.relChainList.length;
        if (Len == 1) return true;
        if (i == Len - 2) return true;
      };
    },
    //显示删除按钮
    delShow() {
      return (i) => {
        const Len = this.relChainList.length;
        if (i <= Len - 2 && Len > 1 && i > 0) return true;
      };
    },
    // classTree() {
    //   if (!this.classCodeList.length) return [];
    //   const hasKey = (key) => this.classCodeList.some((code) => code === key);
    //   const handleData = (list = [], path = "") => {
    //     if (!list.length) return [];
    //     let result = [];
    //     list.forEach((item) => {
    //       const iskey = hasKey(item.classCode);
    //       const route = path + "/" + item.classCode;
    //       const relObjType = "object";
    //       if (item?.children?.length) {
    //         if (iskey) {
    //           result.push({
    //             ...item,
    //             children: handleData(item.children, route),
    //             path: route,
    //             relObjType,
    //           });
    //         } else {
    //           const arr = handleData(item.children, route);
    //           if (arr.length) {
    //             result.push({
    //               ...item,
    //               children: arr,
    //               path: route,
    //               relObjType,
    //               disabled: !iskey,
    //             });
    //           }
    //         }
    //       } else {
    //         if (iskey) {
    //           result.push({
    //             ...item,
    //             children: [],
    //             path: route,
    //             relObjType,
    //           });
    //         }
    //       }
    //     });
    //     return result;
    //   };
    //   return handleData(this.treeData);
    // },
  },
  watch: {
    // treeFilterText(val) {
    //   //搜索防抖
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //     this.timer = null;
    //   }
    //   this.timer = setTimeout(() => {
    //     const key = this.relChainList.length - 2;
    //     this.$refs.tree.at(0).filter(val);
    //     clearTimeout(this.timer);
    //     this.timer = null;
    //   }, 500);
    // },
    visibleModel(val) {
      if (val) {
        this.handleQueryRelationList();
      }
    },
  },

  created() {
    this.getTypeTree();
  },
  mounted() { },

  methods: {
    close() { },
    cancel() {
      this.$emit("update:visible", false);
      this.$nextTick(() => {
        //初始化数据
        this.relChainList = [];
        this.selectObj = {};
        this.relationName = ""; //关系名称
        // this.treeFilterText = ""; //设备搜索名称
      });
    },
    confirm() {
      const isverify = this.relChainList.filter((item, index) => index).every((item) => item.relationCode !== "");
      if (!isverify) return this.$message.error("请选择关系！");

      const options = this.relChainList.map(({ relObjId, name, code, direction, classCode, pipeRiserLimited, pipeStepLimited, hasPipe }) => {
        const params = {
          relObjId,
          name,
          classCode,
          relationCode: code,
          directionName: direction,
          pipeRiserLimited,
          pipeStepLimited,
        };
        if (hasPipe) {
          params.pipeRiserLimited = pipeRiserLimited || false;
          params.pipeStepLimited = pipeStepLimited || false;
        }
        return _.omitBy(params, _.isUndefined);
      });

      const params = {
        relationName: this.relationName,
        relChainList: options,
      };
      this.$emit("update:visible", false);
      this.$emit("confirm", params);
    },
    deviceConfirm(obj) {
      const index = this.selected;
      if (index === null) {
        return this.$message.error("请选择设备");
      }

      // this.popoverVisible = false;
      // const { classCode, objType, name } = this.selectObj;
      const Len = this.relChainList.length;
      const classCodeFrom = this.relChainList[index].classCode;

      const { relObjId,
        relObjType,
        name,
        replationName,
        replationCode,
        classCode,
        direction,
        pipeRiserLimited,
        pipeStepLimited
      } = obj

      const params = {
        relObjId: classCode,
        name: name,
        classCode: classCode,
        code: replationCode,
        direction,
        classCodeFrom,
        pipeRiserLimited,
        pipeStepLimited
      };
      // const params = {
      //   relObjId,
      //   name,
      //   classCode,
      //   relationCode: code,
      //   directionName: direction,
      //   pipeRiserLimited,
      //   pipeStepLimited,
      // };
      console.log(params)
      //新增设备及关系
      const addIndex = index + 1;
      this.relChainList.splice(addIndex, 0, params);
      this.relChainList[Len].classCodeFrom = classCode;
    },
    // deviceConfirm(obj) {
    //   const [groupI, first, child] = this.ident.split("-");
    //   const { classCodeList, matchFiltersList, relChainFilter, relTypeList } = this.options.chainList[+first]
    //   const { relObjId,
    //     relObjType,
    //     name,
    //     replationName,
    //     replationCode,
    //     classCode,
    //     direction,
    //     pipeRiserLimited,
    //     pipeStepLimited
    //   } = obj

    //   relChainFilter.push({
    //     relObjId, relObjType, name, classCode
    //   })
    //   classCodeList.push(classCode)
    //   const params = {
    //     code: replationCode,
    //     direction,
    //     pipeRiserLimited,
    //     pipeStepLimited
    //   }
    //   relTypeList.push(_.omitBy(params, _.isUndefined))
    //   matchFiltersList.push([])
    // },
    // deviceCancel() {
    //   this.popoverVisible = false;
    //   this.$nextTick(() => {
    //     this.treeFilterText = "";
    //     this.selectObj = {};
    //   });
    // },
    addDevice(index) {
      this.selected = index;
      const classCode = this.relChainList[index].classCode;
      console.log(classCode)
      this.deviceOption = {
        classCode
      }
      this.deviceVisible = true;
    },
    //删除设备链
    delDevice(index) {
      //待更改
      const oldLen = this.relChainList.length;
      const oldLastIndex = oldLen - 1;
      for (let i = index; i < oldLastIndex; i++) {
        this.relChainList.splice(index, 1);
      }
      const newLen = this.relChainList.length;
      const newLastIndex = newLen - 1;
      this.relChainList[newLastIndex].code = "";
      this.relChainList[newLastIndex].direction = "";
      this.relChainList[newLastIndex].classCodeFrom = this.relChainList[newLastIndex - 1].classCode;
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
    handleQueryRelationList() {
      const result = this.options.map((item, index) => {
        const classCodeFrom = index ? this.options[index - 1].classCode : "";
        return {
          relObjId: item.relObjId,
          name: item.name,
          classCode: item.classCode,
          code: item.relationCode,
          direction: item?.direction || "",
          classCodeFrom,
          pipeStepLimited: item?.pipeStepLimited,
          pipeRiserLimited: item?.pipeRiserLimited,
        };
      });
      this.relChainList = result;
      // this.relChainList.forEach((item, index) => {
      //   if (!index) return;
      //   this.queryRelationList(item, index);
      // });
    },
    // async queryRelationList(option, index) {
    //   const relation = option;
    //   if (relation.relationList.length) return;
    //   const { classCode: classCodeFrom } = this.relChainList[index - 1];
    //   const { classCode: classCodeTo } = this.relChainList[index];
    //   const params = {
    //     classCodeFrom, //起点设备类型
    //     classCodeTo, //终点设备类型
    //   };
    //   relation.loading = true;
    //   const { result, data } = await getAdmData.getClassCode(params);
    //   const handleData = (list = [], path = "", namePath) => {
    //     if (!list.length) return [];
    //     let result = [];
    //     list.forEach((item) => {
    //       if (item?.children?.length) {
    //         const arr = handleData(item.children, item.graphCode, item.name);
    //         if (arr.length) {
    //           result.push({
    //             ...item,
    //             children: arr,
    //             path: item.graphCode,
    //             namePath: item.name,
    //           });
    //         }
    //       } else {
    //         result.push({
    //           ...item,
    //           children: [],
    //           path: path + "/" + item.relCode,
    //           namePath: namePath + "/" + item.name,
    //         });
    //       }
    //     });
    //     return result;
    //   };
    //   if (result == "success") {
    //     const list = handleData(data);
    //     relation.relationList = list;
    //     if (list.length == 1) {
    //       const { path } = relation.relationList[0].children?.find((item) => item?.relCode);
    //       this.$nextTick(() => {
    //         relation.relationCode = relation.relationCode || path;
    //       });
    //     }
    //     relation.loading = false;
    //   }
    // },
    //查询可以链接的设备
    // async queryClassList(option) {
    //   const { classCode } = option;
    //   const params = {
    //     classCode,
    //   };
    //   const { result, data } = await getAdmData.getClassCodeList(params);
    //   if (result == "success") {
    //     this.classCodeList = data;
    //   }
    // },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.name.indexOf(value) !== -1;
    // },
    // changeTreeNode(data) {
    //   const hasKey = (key) => this.classCodeList.some((code) => code === key);
    //   if (!hasKey(data.classCode)) return;
    //   this.selectObj = data;
    // },
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

  .relationName {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #e1e5eb;
    padding: 0 25px;

    .label {
      flex-shrink: 0;
      padding-right: 15px;
      color: #626c78;
    }

    .input {
      width: 242px;
    }
  }

  .relationBox {
    display: flex;
    flex-direction: column;
    padding: 0 25px;

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
      max-height: 409px;
      overflow-y: auto;

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
            color: #246FE5;
            font-feature-settings: 'clig' off, 'liga' off;
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
