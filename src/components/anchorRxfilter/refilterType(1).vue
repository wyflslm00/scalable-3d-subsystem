<!--  -->
<template>
  <div class="rxfilterType">
    <div class="rxfilter">
      <div class="Left">
        <div class="title">
          <span class="name">关系链过滤</span>
          <Button size="mini" @click="addRelation">新增关系链</Button>
        </div>
        <div class="relationship">
          <Tree class="tree" icon-class="el-icon-arrow-right" :data="relationList" node-key="ident"
            :current-node-key.sync="currentNodeKey" default-expand-all :expand-on-click-node="false" highlight-current
            :props="defaultProps" :default-expanded-keys="expandedKeys">
            <template slot-scope="{ node, data }">
              <div class="custom-tree-first" v-if="node.level === 1">
                <div class="left">
                  <template v-if="data.index">
                    <Vselect v-model="data.jointSymbolOuter"></Vselect>
                  </template>
                  <img class="relIcon" src="@/assets/images/relation.png" alt="">
                  <div class="editInput">
                    <Input clearable size="mini" class="relationInput" maxlength="20" v-model="data.label"></Input>
                    <span class="relationName">{{ data.label }}</span>
                  </div>
                </div>
                <img v-if="isOnly" @click="delRelation(data.ident)" class="delIcon" src="@/assets/images/delete.png"
                  alt="">
              </div>
              <div class="custom-tree-sceond" v-else-if="node.level === 2" @click="getFuncid(data.ident)">
                <div class="left">
                  <span class="name">
                    {{ data.label }}
                  </span>
                  <Eselect v-if="data.index" v-model="data.relTypeList" :classCodeFrom.sync="data.classCodeFrom"
                    :classCode.sync="data.classCode"></Eselect>
                </div>
                <div class="btns">
                  <Tooltip effect="dark" content="添加链设备" placement="bottom" :visible-arrow="false">
                    <img v-if="showPlus(data.ident)" @click.stop="addDevice(data.ident)" class="icon"
                      src="@/assets/images/plus.png" alt="">
                  </Tooltip>
                  <!-- <Tooltip effect="dark" content="信息点过滤" placement="bottom" :visible-arrow="false">
                    <img class="icon" src="@/assets/images/filter.png" alt="">
                  </Tooltip> -->

                  <Tooltip effect="dark" content="删除" placement="bottom" :visible-arrow="false">
                    <Popconfirm v-if="data.index" @confirm="delDevice(data.ident)" confirm-button-text='删除'
                      cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="此设备删除后，下游链设备则都会清空，确定删除吗？">
                      <img slot="reference" class="icon" src="@/assets/images/delete.png" alt="">
                    </Popconfirm>
                  </Tooltip>

                </div>
              </div>
            </template>
          </Tree>
        </div>
      </div>
      <div class="Right">
        <div class="title">信息点过滤<span class="txt">{{ filterLink }}</span></div>
        <div class="filters">
          <Form>
            <div class="subtitle">筛选条件</div>
            <Condition ref="Condition" :matchFilters="getMatchFiltersList" :filters.sync="filters" @change="addConditions"
              @delCon="delConditions"></Condition>
            <Dropdown v-if="filters.length" trigger="click" class="dropdown" @command="addConditions"
              placement="bottom-start">
              <span class="el-dropdown-link">
                <i class="el-icon-plus"></i>
                添加条件
              </span>
              <DropdownMenu slot="dropdown" class="dropdownMenu" v-if="filters.length">
                <DropdownItem :command="item.code" v-for="item in filters" :key="item.id">{{ item.name }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="text" disabled icon="el-icon-plus" v-else>添加条件</Button>

            <template v-if="isIndex">
              <div class="subtitle">关系过滤筛选</div>
              <FormItem>
                <div slot="label">
                  信息点筛选结果与<span class="blue">「{{ firstIndexFilter }}」</span>的关系
                </div>
                <RadioGroup v-model="jointSymbol">
                  <Radio v-for="item in jointSymbols" :key="item.id" :label="item.id">{{ item.label }}</Radio>
                </RadioGroup>
              </FormItem>
            </template>
          </Form>
        </div>
      </div>
    </div>
    <toDevice :visible.sync="deviceVisible" :options="deviceOption" @confirm="deviceConfirm"></toDevice>
  </div>
</template>
<script>
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Form,
  FormItem,
  Select,
  Option,
  Col,
  Row,
  Input,
  Popconfirm,
  Tree,
  Tooltip
} from "element-ui";
import toDevice from "./toDevice";
import Vue from "vue";
import setFilter from "@/store/http/setFilter";
import Condition from "@/components/condition/index";
import Vselect from "./Vselect";
import Eselect from "./Eselect";
// import { mapMutations } from 'vuex'
export default {
  props: ["options"],
  data() {
    return {
      size: "small",
      filters: [],
      deviceVisible: false,

      expandedKeys: ["0"],

      ident: "",
      currentNodeKey: "0-0",
      jointSymbols: [
        {
          id: "and",
          label: "且",
        },
        {
          id: "or",
          label: "或",
        },
      ],
      //包含
      contains: [
        {
          id: "contains",
          label: "包含",
        },
        {
          id: "contains=not",
          label: "不包含",
        },
        {
          id: "notnull",
          label: "非空",
        },
      ],
      //等于
      equals: [
        {
          id: "equals",
          label: "等于",
        },
        {
          id: "equals=not",
          label: "不等于",
        },
        {
          id: "notnull",
          label: "非空",
        },
      ],
      //等于且
      exist: [
        {
          id: "existAny",
          label: "等于&或",
        },
        {
          id: "existAll",
          label: "等于&且",
        },
        {
          id: "notnull",
          label: "非空",
        },
      ],
      //范围下拉
      redios5: [
        {
          id: "(",
          label: ">",
        },
        {
          id: "[",
          label: "≥",
        },
        {
          id: ")",
          label: "<",
        },
        {
          id: "]",
          label: "≤",
        },
      ],
      //scope
      scope: [
        {
          id: "scope",
          label: "在范围内",
        },
        {
          id: "scope=not",
          label: "不在范围内",
        },
        {
          id: "notnull",
          label: "非空",
        },
      ],


      relChainList: [],//关系链

      relationList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      deviceOption: {},
      isSave: false
    };
  },

  components: {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    RadioGroup,
    Vselect,
    Radio,
    Form,
    FormItem,
    Select,
    Option,
    Col,
    Row,
    Input,
    toDevice,
    Popconfirm,
    Condition,
    Tree,
    Eselect,
    Tooltip
  },

  computed: {
    jointSymbol: {
      get() {
        if (!this.ident || !this.relationList.length) return "";
        const [parent, child] = this.ident.split("-")
        const index = this.relationList.findIndex(item => item.ident === parent)
        return this.relationList[index].jointSymbolInner
      },
      set(val) {
        if (!this.ident) return true;
        const [parent, child] = this.ident.split("-")
        const index = this.relationList.findIndex(item => item.ident === parent)
        this.relationList[index].jointSymbolInner = val;
      },
    },
    filterName() {
      if (!this.relationList.length) return "";
      const { label } = this.relationList[0]?.children.at(0)
      return label
    },
    isOnly() {
      if (this.relationList.length === 1) return false;
      return true;

    },
    isIndex() {
      if (this.ident === "") return false;
      const [parent, child] = this.ident.split("-")
      return child == "0"
    },
    firstIndexFilter() {
      if (!this.ident || !this.relationList.length) return "";
      const [parent, child] = this.ident.split("-")
      const index = this.relationList.findIndex(item => item.ident === parent)

      const { label } = this.relationList[index]
      return label
    },
    filterLink() {
      if (!this.ident || !this.relationList.length) return "";
      const [parent, child] = this.ident.split("-")
      const index = this.relationList.findIndex(item => item.ident === parent)
      const { label, children } = this.relationList[index]
      const { label: childName } = children[+child]
      return `/${label}-${childName}`
    },
    showPlus() {
      return (ident) => {
        const [parent, child] = ident.split("-")
        const index = this.relationList.findIndex(item => item.ident === parent)
        if (+child == this.relationList[index]?.children.length - 1) {
          const children = this.relationList[index]?.children.filter((item, index) => index && item.relChainFilter.relObjType != "object");
          if (!children.length) {
            return true
          }
        }
      }
    },
    getMatchFiltersList() {
      if (this.ident === "") return [];
      if (!this.relationList.length) return []
      if (!this.filters.length) return [];
      const [parent, child] = this.ident.split("-")
      const index = this.relationList.findIndex(item => item.ident === parent)
      const { matchFiltersList } = this.relationList[index]?.children[+child]
      return matchFiltersList
    },
  },
  watch: {
    // filterName(val) {
    //   if (!this.index) {
    //     this.setFilterName(val)
    //   }
    // }
    relationList: {
      handler(newObj, oldObj) {
        this.isSave = newObj === oldObj;
      },
      deep: true,
      immediate: true,
    }
  },
  mounted() { },

  methods: {
    init() {
      this.filters = [];
      this.relChainList = [];
      this.relationList = [];
    },
    close() {
      this.$emit("update:visible", false);
    },
    async confirm() {
      const { Condition } = this.$refs
      const verify = Condition.Verify
      const relChainList = this.relationList.map((P) => {
        const { jointSymbolInner,
          jointSymbolOuter, label } = P
        const relChainFilter = [];
        const classCodeList = [];
        const relTypeList = [];
        const matchFiltersList = [];
        P.children.forEach((C, i) => {
          const filtersList = C.matchFiltersList.map((F) => {
            const [operation, not = false] = F.operation.split("=")
            return {
              infoDataType: F.infoDataType,
              jointSymbol: F.jointSymbol,
              infoCode: F.infoCode,
              operation,
              value: F.value,
              not: Boolean(not)
            }
          })
          relChainFilter.push(C.relChainFilter);
          classCodeList.push(C.classCode);
          matchFiltersList.push(filtersList)
          if (i) {
            relTypeList.push(C.relTypeList)
          }
        })
        return {
          jointSymbolInner,
          jointSymbolOuter,
          name: label,
          relChainFilter,
          classCodeList,
          matchFiltersList,
          relTypeList
        }
      })
      const { templateId, containerId, anchorCode, anchorEquipmentId } = this.options
      const params = {
        templateId,
        operate: "anchor-filter",
        anchorCode,
        anchorEquipmentId,
        containerId,
        relChainList,
      }
      const isNullName = relChainList.filter(item => !item.name)
      if (isNullName.length) {
        return Promise.resolve({
          result: "verify",
          message: "关系链路名称不能为空"
        })
      }
      if (verify) {
        return Promise.resolve({
          result: "verify",
          message: "条件不能为空"
        })
      }
      const res = await setFilter.setDetailModify(params);
      this.isSave = false;
      return Promise.resolve(res)
    },
    //添加设备
    addDevice(ident) {
      this.ident = ident;
      const [first, child] = ident.split("-");
      const index = this.relationList.findIndex(item => item.ident === first)
      const { classCode } = this.relationList[index].children[+child]
      this.deviceOption = {
        ...this.options,
        classCode
      }
      this.deviceVisible = true;
    },
    //删除设备
    delDevice(ident) {
      const [oldFirst, oldChild] = this.ident.split("-");
      const [first, newChild] = ident.split("-");
      const index = this.relationList.findIndex(item => item.ident === first)
      this.relationList[index].children.splice(+newChild)
      if (this.ident == ident || newChild < oldChild) {
        this.getFuncid(`${first}-${newChild - 1}`)
      }
    },

    //添加关系
    addRelation() {
      const { relChainFilter, matchFiltersList, classCodeList, relTypeList } = this.relChainList.at(0);
      const first = relChainFilter.at(0);
      const { index } = this.relationList.at(-1);
      const Pi = index + 1
      const label = `${first.name}关系链${Pi + 1}`;
      const Ci = 0;
      const { name } = first
      const classCode = classCodeList[Ci]
      const relType = {}
      const children = [{
        index: Ci,
        ident: `${Pi}-${Ci}`,
        label: name,
        classCode,
        matchFiltersList: [],//过滤条件
        relChainFilter: first, //当前设备
        relTypeList: relType,
        classCodeFrom: ""
      }]
      this.relationList.push({
        label,
        index: Pi,
        ident: `${Pi}`,
        disabled: true,
        jointSymbolInner: "and",
        jointSymbolOuter: "and",
        children
      })
    },
    //删除关系
    delRelation(ident) {
      const index = this.relationList.findIndex(item => item.ident === ident)
      this.relationList.splice(index, 1);
      if (this.relationList.length) {
        const { children, ident: identKey } = this.relationList.at(0)
        const [first] = children
        this.expandedKeys = [identKey]
        this.getFuncid(first.ident)
        this.currentNodeKey = first.ident;
      }
    },
    //弹窗的回调
    deviceConfirm(obj) {
      const {
        relObjId,
        relObjType,
        name,
        replationName,
        replationCode,
        classCode
      } = obj
      const [first, child] = this.ident.split("-");
      const index = this.relationList.findIndex(item => item.ident === first)
      const last = this.relationList[index].children;
      const Ci = +child + 1;
      const relChainFilter = { relObjId, relObjType, name, classCode };
      const relTypeList = { code: replationCode, name: replationName };
      const classCodeFrom = last[child].classCode
      last.push({
        index: Ci,
        ident: `${first}-${Ci}`,
        label: name,
        classCode,
        matchFiltersList: [],//过滤条件
        relChainFilter, //当前设备
        relTypeList,
        classCodeFrom
      })
    },
    // async cancel() {
    //   //取消后进行数据初始化
    //   const state = await this.$msgbox.confirm('数据还未保存，确定离开吗?', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'info'
    //   }).catch(() => { })
    //   if (state == "confirm") {
    //     this.close();
    //     this.init();
    //     this.getDetailShow();
    //   }
    // },

    //删除条件
    delConditions(index) {
      const [first, child] = this.ident.split("-");
      const firstIndex = this.relationList.findIndex(item => item.ident === first)
      const { matchFiltersList } = this.relationList[firstIndex].children[+child]
      matchFiltersList.splice(index, 1);
    },

    //添加条件
    addConditions(val, option) {
      const [first, child] = this.ident.split("-");
      const index = this.relationList.findIndex(item => item.ident === first)
      const { matchFiltersList } = this.relationList[index].children[+child]

      const { dataType, isMultiple, code } = this.filters.find(
        (item) => item.code === String(val)
      );

      const rul1 = this.jointSymbols.at(0); //且或
      const jointSymbol = rul1.id;
      const infoCode = code;
      const rul2 = this.contains.at(0); //包含or不包含
      const rul3 = this.equals.at(0); //等于or不等于
      const rul4 = this.exist.at(0) //等于或
      const rul5 = this.scope.at(0) //范围
      const mold = {
        STRING: rul2.id,
        ENUM: isMultiple ? rul4.id : rul3.id,
        BOOLEAN: rul3.id
      };
      const ruls = ["STRING", "ENUM", "BOOLEAN"]
      //获取值类型
      // const value = ruls.some(key => key == dataType) ? "" : []
      const value = "";
      //获取下拉默认值
      const operation = ruls.some(key => key == dataType) ? mold[dataType] : rul5.id;
      const condition = {
        jointSymbol,
        infoCode,
        operation,
        infoDataType: dataType,
        value,
        not: false,
      };
      if (option instanceof Vue) {
        matchFiltersList.push(condition)
      } else {
        Object.keys(condition).forEach(key => {
          option[key] = condition[key]
        })
      }
    },
    //过滤设置-查询
    async getDetailShow() {
      const { templateId, anchorCode, anchorEquipmentId, containerId } = this.options;
      const params = {
        templateId,
        operate: "anchor-filter",
        anchorCode,
        anchorEquipmentId,
        containerId,
      };
      const { result, data } = await setFilter.getDetailShow(params);
      if (result == "success") {
        const { relChainList } = data;
        this.relChainList = relChainList;
        const firstName = this.options.anchorEquipmentName
        this.relationList = relChainList.map((item, Pi) => {
          const label = item.name ? item.name : `${firstName}关系链${Pi + 1}`;
          const children = item.relChainFilter.map((chil, Ci) => {
            const { matchFiltersList, classCodeList, relTypeList } = item
            const { name } = chil
            const classCode = classCodeList[Ci]
            const relType = relTypeList[Ci] || []
            return {
              index: Ci,
              ident: `${Pi}-${Ci}`,
              label: name,
              classCode,
              matchFiltersList: matchFiltersList[Ci],//过滤条件
              relChainFilter: chil, //当前设备
              relTypeList: relType,
              classCodeFrom: Ci ? classCodeList[Ci - 1] : ""
            }
          })
          return {
            label,
            index: Pi,
            ident: `${Pi}`,
            disabled: true,
            jointSymbolInner: item.jointSymbolInner,
            jointSymbolOuter: item.jointSymbolOuter,
            children
          }
        })
        this.getFuncid();
      }
    },

    //查询设备信息点
    async getFuncid(ident = "0-0") {
      this.ident = ident;
      const [first, child] = ident.split("-");
      const index = this.relationList.findIndex(item => item.ident === first)
      const { classCode } = this.relationList[index].children[+child]
      const params = {
        classCode,
      };
      const { result, data } = await setFilter.getFuncid(params);
      if (result == "success") {
        const ruls = ["STRING", "DOUBLE", "INTEGER", "ENUM", "BOOLEAN"];
        this.filters = data.filter(
          (item) =>
            item.category == "STATIC" &&
            ruls.some((key) => key == item.dataType)
        );
        // this.handleData()
      }
    },
    handleData() {
      //待优化
      const [first, child] = this.ident.split("-");
      const index = this.relationList.findIndex(item => item.ident === first)
      const obj = this.relationList[index].children[+child]
      obj.matchFiltersList = obj.matchFiltersList.map(item => {
        const filter = this.filters.find(
          (rx) => rx.code === String(item.infoCode)
        );
        let value = item.value;
        // const ruls = ["STRING", "ENUM", "BOOLEAN"]
        // const accord = ruls.some(key => key == filter.dataType)
        // if (!accord) {
        //   value = item.operation.indexOf("exist") > -1 ? item.value.split(";") : item.value.split(",")
        // }

        const params = {
          ...item,
          // isMultiple: filter?.isMultiple,
          // valueDataType: filter?.dataType,
          value
        }
        if (item.not) {
          params.operation = `${item.operation}=${item.not}`
        }
        params.dataSource = filter?.dataSource || []
        return params;
      })

    }
  }
};

</script>
<style lang="scss">
.el-popconfirm {
  width: 275px;

  .el-popconfirm__main {
    align-items: flex-start;

    .el-popconfirm__icon {
      line-height: 19px;
    }
  }

  .el-popconfirm__action {
    padding-top: 10px;
  }
}
</style>
<style lang='scss' scoped>
.dropdownMenu {
  max-height: 200px;
  overflow-y: auto;
}

.blue {
  color: #246fe5
}

.rxfilterType {
  display: flex;
  flex-grow: 1;

  .rxfilter {
    display: flex;
    flex-grow: 1;
    background: #f7f9fa;
    // padding: 8px 16px 16px;

    .Left {
      display: flex;
      flex-shrink: 0;
      width: 530px;
      background: #fff;
      border-right: 1px solid #e1e5eb;
      flex-direction: column;
      padding: 15px 20px;
      box-sizing: border-box;

      .title {
        font-size: 16px;
        font-weight: 700;
        color: #2e3742;
        padding-bottom: 13px;
        display: flex;
        justify-content: space-between;
      }

      .relationship {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        overflow-y: auto;
        height: 0;

        .tree {
          ::v-deep {
            .el-tree-node {
              .el-tree-node__children {
                .el-tree-node {
                  .el-tree-node__content {
                    border-bottom: none;
                    position: relative;

                  }

                  .custom-tree-sceond {
                    padding-left: 30px;
                    height: 100%;

                    &::before {
                      content: "";
                      display: block;
                      position: absolute;
                      margin-left: -20px;
                      width: 6px;
                      height: 6px;
                      background: #fff;
                      border-radius: 50%;
                      border: 3px solid #14c4c4;
                      z-index: 2;
                      box-sizing: content-box;
                    }

                    &::after {
                      content: "";
                      display: block;
                      position: absolute;
                      margin-left: -15px;
                      margin-top: 30px;
                      width: 1px;
                      height: 100%;
                      border-left: 1px dashed #C4C9CF;
                    }

                  }

                  &:first-child {
                    .custom-tree-sceond {

                      &::before {
                        border-color: #246fe5;
                      }
                    }
                  }

                  &:last-child {
                    .custom-tree-sceond {

                      &::after {
                        border-left: none;
                      }
                    }
                  }
                }
              }

              .el-tree-node__content {
                height: 42px;
                border-bottom: 1px solid #E8ECF0;

                &:hover {
                  background: #D9EBFF;
                }
              }

              &.el-tree-node[aria-disabled="true"] {
                &>.el-tree-node__content {
                  background: transparent;
                }
              }
            }
          }
        }

        .custom-tree-first {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: space-between;

          .left {
            display: flex;
            flex-grow: 1;
            align-items: center;

            .relIcon {
              width: 16px;
              height: 16px;
              background: #D9EBFF;
              border-radius: 2px;
              padding: 2px;
              box-sizing: border-box;
              margin-left: 6px;
            }



            .editInput {
              display: flex;
              flex-grow: 1;
              position: relative;
              padding-left: 7px;

              .relationInput {
                max-width: 230px;
                z-index: 1;

                ::v-deep {
                  .el-input__inner:not(:focus) {
                    border: none;
                    background-color: transparent;
                    box-shadow: none;
                    font-size: inherit;
                    line-height: inherit;
                    padding: 0;
                    margin: 0;
                    font-size: 14px;
                    min-height: inherit;
                    width: 100%;
                    min-width: inherit;
                    overflow: visible;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }

                  .el-input__inner:not(:focus):hover {
                    border-color: #E1E5EB;
                    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
                    color: #C4C9CF;
                    outline: none;
                    background: #fff;

                  }

                  .el-input__inner:not(:focus):hover+.el-input__suffix {
                    display: none;
                  }

                  .el-input__inner:focus {
                    border-color: #409EFF;
                    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
                    outline: none;
                    padding: 0;
                    color: #1B2129;
                  }
                }

              }

              .relationName {
                position: absolute;
                font-size: 14px;
                opacity: 0;
                z-index: 0;
              }
            }
          }

          .delIcon {
            width: 16px;
            height: 16px;
            margin-right: 10px;

          }

        }

        .custom-tree-sceond {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: space-between;

          .left {}

          .btns {
            display: flex;
            gap: 20px;
            padding-right: 10px;

            .icon {
              width: 16px;
              height: 16px;
              cursor: pointer;
            }
          }
        }

      }
    }

    .Right {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      background: #fff;

      .title {
        font-size: 16px;
        font-weight: 700;
        color: #1b2129;
        flex-shrink: 0;
        height: 48px;
        padding-left: 15px;
        border-bottom: 1px solid #e1e5eb;
        display: flex;
        align-items: center;

        .txt {
          color: #626C78;
          font-size: 14px;
          font-weight: 400;
          padding-left: 5px;
        }
      }

      .filters {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        height: 0;
        overflow-y: auto;
        background: #fff;
        padding: 20px 15px;

        .subtitle {
          font-size: 14px;
          font-weight: 700;
          color: #000000;
          border-left: 2px solid #246fe5;
          padding-left: 5px;
          margin-bottom: 12px;
        }


        .dropdown {
          width: 75px;
          margin-bottom: 29px;

          .el-dropdown-link {
            cursor: pointer;
            color: #0091ff;
          }
        }
      }
    }
  }
}
</style>