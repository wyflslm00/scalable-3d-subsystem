<!-- 关系组 -->
<template>
  <div class="filterGroup" :class="{ hide: !open }">
    <div class="head">
      <i class="icon" :class="{ 'el-icon-caret-bottom': open, 'el-icon-caret-right': !open }" @click="open = !open"></i>
      <div class="editInput">
        <Input size="mini" class="relationInput" maxlength="20" v-model="options.name"></Input>
        <!-- <span class="relationName">{{ options.name }}</span> -->
      </div>
      <div class="btn" @click="addRelation">
        <i class="el-icon-plus"></i>
        <span>添加关系链</span>
      </div>
    </div>
    <div class="relationship" v-if="relationList.length">
      <div class="joint">
        <span class="item">{{ jointSymbols[options.jointSymbol] }}</span>
      </div>
      <div class="treeBox">
        <Tree class="tree" :data="relationList" node-key="ident" :current-node-key.sync="currentNodeKey" ref="tree"
          default-expand-all :expand-on-click-node="false" highlight-current :props="defaultProps">
          <template slot-scope="{ node, data }">
            <div class="custom-tree-first" v-if="node.level === 1">
              <div class="left">
                <div class="switch">
                  <span v-for="{ value, label } in negations" :key="value" @click="switchChange(data.ident, value)"
                    :class="{ active: data.negation == value }">{{ label
                    }}</span>
                </div>
                <img class="relIcon" src="@/assets/images/relation.png" alt="">
                <div class="editInput">
                  <Input size="mini" class="relationInput" maxlength="20" v-model="data.name"></Input>
                  <!-- <span class="relationName">{{ data.label }}</span> -->
                </div>
              </div>
              <img v-if="isOnly" @click="delRelation(data.index)" class="delIcon" src="@/assets/images/delete.png" alt="">
            </div>
            <div class="custom-tree-sceond" v-else-if="node.level === 2" @click="setCurrentKey(data.ident)">
              <div class="left">
                <div class="name">
                  <Tooltip popper-class="error" :enterable="false" :disabled="!data.conflictWithDicFlag" effect="dark"
                    :content="getError(data.ident)" placement="top" :visible-arrow="false">
                    <span class="txt" :title="data.name" :class="{ error: data.conflictWithDicFlag }">
                      {{ data.name }}
                    </span>
                  </Tooltip>
                  <selectGroup v-if="data.index" :selectObj="curSelectObj(data.ident)"
                    :classCodeFrom.sync="data.classCodeFrom" :classCode.sync="data.classCode">
                  </selectGroup>
                </div>
              </div>
              <div class="btns">
                <Tooltip effect="dark" content="添加链设备" placement="bottom" :visible-arrow="false">
                  <img v-if="showPlus(data.ident)" @click.stop="addDevice(data.ident)" class="icon"
                    src="@/assets/images/plus.png" alt="">
                </Tooltip>
                <Popover placement="bottom-end" :visible-arrow="false" trigger="click" v-if="data.index">
                  <div class="btnGroup">
                    <p @click="querySet(data)">查询设置</p>
                    <p @click="delDevice(data.ident)">删除</p>
                  </div>
                  <span slot="reference" class="more el-icon-more"></span>
                </Popover>
              </div>
            </div>
          </template>
        </Tree>
      </div>
    </div>
    <div class="noMore" v-else>
      暂无数据～
    </div>
    <toDevice :visible.sync="deviceVisible" :dataSource="refilterType.chainTypeList" :options="deviceOption"
      @confirm="deviceConfirm"></toDevice>
    <relationSet :visible.sync="setVisible" :options="setOptions" :row="setRow"></relationSet>
  </div>
</template>

<script>
import { Tree, Tooltip, Popconfirm, Input, Popover } from "element-ui";
import { mapMutations, mapGetters, mapState } from 'vuex'
import toDevice from "@/components/template/toDevice";
import selectGroup from "../rxfilter/selectGroup/index.vue";
import relationSet from "./relationSet.vue";

import _ from "lodash";
export default {
  props: ["options", "groupI"],
  inject: ['refilterType'],
  data() {
    return {
      open: true,
      // expandedKeys: ["0"],
      ident: "",
      defaultProps: {
        children: 'relChainFilter',
        label: 'name'
      },
      deviceVisible: false,
      deviceOption: {},
      negations: [{
        value: false,
        label: "是"
      }, {
        value: true,
        label: "否"
      }],

      jointSymbols: {
        or: "或",
        and: "且",
      },

      setVisible: false,
      setOptions: {},
      setRow: {}
    };
  },

  components: {
    Tree, Tooltip, Popconfirm, Input, toDevice, selectGroup, Popover, relationSet
  },

  computed: {
    ...mapGetters("rxfilter", ["relChain"]),
    ...mapState("rxfilter", ["currentNodeKey"]),
    jointSymbol() {
      const { relChainListList } = this.relChain
      return relChainListList?.jointSymbol
    },
    unJointSymbol() {
      const joint = ["or", "and"];
      const index = joint.findIndex(i => i == this.jointSymbol);
      return joint[+!index];
    },
    relationList() {
      const relChainList = this.options.chainList;
      relChainList.forEach((item, Pi) => {
        item.relChainFilter.forEach((chil, Ci) => {
          const { matchFiltersList, classCodeList, relTypeList } = item
          const classCode = classCodeList[Ci]
          chil.index = Ci;
          chil.ident = `${this.groupI}-${Pi}-${Ci}`;
          chil.classCode = classCode;
          chil.classCodeFrom = Ci ? classCodeList[Ci - 1] : ""
        })
        item.index = Pi;
        item.ident = `${this.groupI}-${Pi}`
        item.disabled = true;
      })
      return relChainList;
    },
    isOnly() {
      const { relChainListList: { chainLists } } = this.relChain;
      const count = chainLists.reduce((num, con) => {
        return con.chainList.length >= 1 ? num + con.chainList.length : num
      }, 0);
      if (count < 2) return false;
      return true;
    },
    showPlus() {
      return (ident) => {
        const [groupI, parent, child] = ident.split("-")
        const index = this.relationList.findIndex(item => item.index == parent)
        if (+child == this.relationList[index]?.relChainFilter.length - 1) {
          const children = this.relationList[index]?.relChainFilter.filter((item, index) => index && item.relObjType != "object");
          if (!children.length) {
            return true
          }
        }
      }
    },
    curSelectObj() {
      return (ident) => {
        const [grouI, first, last] = ident.split("-")
        return this.relationList[+first].relTypeList[last - 1]
      }
    },
    getError() {
      return (ident) => {
        const [grouI, first, last] = ident.split("-")
        const { conflictWithDicFlag, conflictWithDicItems } = this.relationList[+first].relChainFilter[last]
        if (!conflictWithDicFlag) return "";
        const [{ itemType }] = conflictWithDicItems
        return itemType
      }
    }
  },
  watch: {
    jointSymbol(val) {
      this.$set(this.options, "jointSymbol", this.unJointSymbol)
    },
    currentNodeKey(val) {
      this.$refs["tree"].setCurrentKey();
      if (val) {
        const [groupI] = val.split("-")
        if (groupI == this.groupI) {
          this.$refs["tree"].setCurrentKey(val);
        }
      }
    }
  },

  mounted() {
  },

  methods: {
    ...mapMutations("rxfilter", ["merge"]),
    //是否
    switchChange(ident, value) {
      const [groupI, first, child] = ident.split("-");
      const chain = this.options.chainList[+first]
      const isDisable = chain.relChainFilter.findIndex(item => item.relObjType == "dynVar");
      if (isDisable>-1 && !isDisable) {
        this.$set(chain, "negation", false) //基准对象只能为false-是
        return;
      }
      this.$set(chain, "negation", value)
    },
    addDevice(ident) {
      this.ident = ident;
      const [groupI, first, child] = ident.split("-");
      const index = this.relationList.findIndex(item => item.index == first)
      const { classCode } = this.relationList[index].relChainFilter[+child];
      this.deviceOption = {
        classCode
      }
      this.deviceVisible = true;
    },
    querySet(obj) {
      const [grouI, first, last] = obj.ident.split("-")
      const row = this.relationList[+first].relTypeList[last - 1]
      this.setOptions = obj
      this.setRow = row
      this.setVisible = true;
    },
    async delDevice(ident) {
      await this.$confirm("此关系链删除后，链设备也都会被删除，确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
      const [groupI, first, child] = ident.split("-");
      if (this.currentNodeKey == ident) {
        this.merge({
          currentNodeKey: ""
        })
      }
      const { classCodeList, matchFiltersList, relChainFilter, relTypeList } = this.options.chainList[+first]
      relChainFilter.splice(+child)
      classCodeList.splice(+child)
      relTypeList.splice(child - 1)
      matchFiltersList.splice(+child)
    },
    deviceConfirm(obj) {
      const { relObjId,
        relObjType,
        name,
        replationName,
        replationCode,
        classCode,
        direction,
        pipeRiserLimited,
        pipeStepLimited,
        pipeAllowAllType

      } = obj
      if (this.deviceOption?.classCode) {
        const [groupI, first, child] = this.ident.split("-");
        const { classCodeList, matchFiltersList, relChainFilter, relTypeList } = this.options.chainList[+first]
        relChainFilter.push({
          relObjId, relObjType, name, classCode
        })
        classCodeList.push(classCode)
        const params = {
          code: replationCode,
          direction,
          pipeRiserLimited,
          pipeStepLimited,
          pipeAllowAllType
        }
        relTypeList.push(_.omitBy(params, _.isUndefined))
        matchFiltersList.push([])
      } else {
        const relChainFilter = [{ relObjId, relObjType, name, classCode }]
        const classCodeList = [classCode]
        const negation = false;
        const matchFiltersList = [[]]
        const relTypeList = [];
        const newName = `${name}关系链1`
        this.options.chainList.push({
          relChainFilter,
          classCodeList,
          negation,
          matchFiltersList,
          relTypeList,
          name: newName
        })
        this.open = true;
      }
    },
    //添加关系链
    addRelation() {
      // const { length } = this.options.chainList
      // if (length) {
      //   const [first] = this.options.chainList
      //   const { relChainFilter, classCodeList } = first
      //   const [device] = relChainFilter
      //   const [classCode] = classCodeList
      //   const maxN = Math.max(...this.options.chainList.map(item => {
      //     const num = item?.name?.match(/\d+$/)[0]
      //     if (+num) {
      //       return +num
      //     } else {
      //       return 0
      //     }
      //   }))
      //   const Num = maxN > length ? maxN + 1 : length + 1;
      //   this.options.chainList.push({
      //     ..._.cloneDeep(first),
      //     matchFiltersList: [[]],
      //     classCodeList: [classCode],
      //     relChainFilter: [_.cloneDeep(device)],
      //     relTypeList: [],
      //     name: `${device.name}关系链${Num}`,
      //     negation: false
      //   })
      //   this.open = true;
      // } else {
      this.deviceOption = {};
      this.deviceVisible = true;
      // }
    },
    delRelation(ident) {
      const { length } = this.options.chainList
      const [groupI, first, child] = this.currentNodeKey.split("-")
      if (groupI == this.groupI && first == ident) {
        this.merge({
          currentNodeKey: ""
        })
      }
      if (length == 1) {
        const { relChainListList: { chainLists } } = this.relChain
        chainLists.splice(this.groupI, 1)
      } else {
        this.options.chainList.splice(+ident, 1)
      }
    },
    setCurrentKey(ident) {
      this.merge({
        currentNodeKey: ident
      })
    },
  }
};

</script>
<style lang='scss' scoped>
.filterGroup {
  display: flex;
  padding: 12px 9px 12px 3px;
  background: #F7F9FA;
  border-radius: 8px;
  position: relative;
  flex-direction: column;

  &.hide {
    max-height: 50px;
    overflow: hidden;
  }

  .head {
    display: flex;
    flex-grow: 1;
    padding-left: 29px;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;

    .icon {
      position: absolute;
      left: 8px;
      color: #8B949E;
      cursor: pointer;
    }

    .editInput {
      display: flex;
      flex-grow: 1;
      position: relative;

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
            font-weight: 700;
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

      // .relationName {
      //   position: absolute;
      //   font-size: 14px;
      //   font-weight: 700;
      //   color: #2E3742;
      //   opacity: 0;
      //   z-index: 0;
      // }
    }

    .btn {
      color: #1B2129;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .relationship {
    display: flex;
    flex-grow: 1;

    .joint {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      margin-right: 5px;

      &::after {
        content: "";
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        background: #64A6F7;
        left: 12px;
      }

      .item {
        width: 24px;
        height: 24px;
        background: #D9EBFF;
        font-size: 14px;
        color: #246FE5;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        z-index: 1;
      }
    }

    .treeBox {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .tree {
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: transparent;

        ::v-deep {
          >.el-tree-node {
            border-radius: 8px;
            background: #fff;
            overflow: hidden;

            .el-tree-node__children {
              .el-tree-node {
                .el-tree-node__content {
                  border-bottom: none;
                  position: relative;

                }

                .custom-tree-sceond {
                  padding-left: 30px;
                  height: 100%;
                  gap: 8px;

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

                  .left {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-grow: 1;

                    .name {
                      flex-grow: 1;
                      display: flex;
                      width: 0;
                      line-height: 40px;
                      gap: 8px;

                      .txt {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #424C59;
                        font-size: 14px;

                        &.error {
                          color: #E63C35;
                        }
                      }
                    }
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
              // border-bottom: 1px solid #E8ECF0;

              &:hover {
                background: #D9EBFF;
              }

              .el-tree-node__expand-icon {
                font-size: 14px;
                color: #8B949E;

                &.is-leaf {
                  color: transparent;
                }
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

          .switch {
            display: flex;

            span {
              display: flex;
              width: 20px;
              height: 20px;
              background: #F1F4F6;
              font-size: 12px;
              color: #8B949E;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              &:first-child {
                border-radius: 2px 0 0 2px;
              }

              &:last-child {
                border-radius: 0px 2px 2px 0;
              }

              &.active {
                background: #246FE5;
                color: #fff;
              }
            }
          }

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

            // .relationName {
            //   position: absolute;
            //   font-size: 14px;
            //   opacity: 0;
            //   z-index: 0;
            // }
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
        gap: 8px;

        .left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-grow: 1;
        }

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

  .noMore {
    text-align: center;
    color: #626c78;
    font-size: 14px;
    height: 31px;
    line-height: 31px;
  }
}
</style>