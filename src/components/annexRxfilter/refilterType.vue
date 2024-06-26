<!--  -->
<template>
  <div class="rxfilterType">
    <div class="rxfilter">
      <div class="Left">
        <!-- addRelation -->
        <Button size="small" type="primary" @click="
          showAnnex = true;
        annexObj = {};
        ">添加小附件</Button>
        <addAnnex :visible.sync="showAnnex" v-if="showAnnex" :annexObj="annexObj" :annexList="annexList"
          @confirm="getAnnexList"></addAnnex>

        <!-- <div class="title">
          <span class="name">关系链过滤</span>
          <Button size="mini" @click="addRelation">新增关系链</Button>
        </div> -->
        <div class="relationship">
          <div class="list" v-if="annexList.length">
            <div class="item" :class="{ active: item.id == annexObj.id }" v-for="item in annexList" :key="item.id">
              <div class="attach" @click="changeCur(item)">
                <p class="attachName" :class="{ error: getError1(item) }">
                  <Tooltip popper-class="error" :enterable="false" :disabled="!getError1(item)" effect="dark"
                    :content="getError1(item)" placement="top" :visible-arrow="false">
                    <span>
                      {{ item.name }}
                    </span>
                  </Tooltip>
                </p>
                <p class="attachType" :class="{ error: getError2(item) }">
                  <Tooltip popper-class="error" :enterable="false" :disabled="!getError2(item)" effect="dark"
                    :content="getError2(item)" placement="top" :visible-arrow="false">
                    <span>
                      类型：{{ item.className || "--" }}
                    </span>
                  </Tooltip>
                </p>
              </div>

              <Tooltip effect="dark" content="编辑" placement="bottom" :visible-arrow="false">
                <img class="icon" src="@/assets/images/edit.png" style="margin-right: 8px" alt=""
                  @click="eidtDevice(item)" />
              </Tooltip>

              <Tooltip effect="dark" content="删除" placement="bottom" :visible-arrow="false">
                <Popconfirm @confirm="delDevice(item)" confirm-button-text="删除" cancel-button-text="取消"
                  icon="el-icon-info" icon-color="red" title="此小附件删除后，小附件相关设置都会清空，确定删除吗？">
                  <img slot="reference" class="icon" src="@/assets/images/delete.png" alt="" />
                </Popconfirm>
              </Tooltip>
            </div>
          </div>
          <div class="noMore" v-else>
            <img src="@/assets/images/no_template.png" alt="" />
            <p class="txt">页面暂无内容</p>
            <p class="label">请添加小附件</p>
          </div>
        </div>
      </div>
      <div class="Right" v-if="annexList.length">
        <div class="title">
          <div>
            {{ annexObj.name || "信息点过滤" }}
            <span class="txt" v-show="annexObj.className">类型：{{ annexObj.className }}</span>
          </div>
          <Button :disabled="!annexList.length" size="mini" type="primary" @click="confirm">保存</Button>
        </div>
        <div class="filters">
          <div class="subtitle">筛选条件</div>
          <Form>
            <Condition ref="Condition" :matchFilters="matchFilterList" :filters.sync="filters" @change="addConditions"
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
          </Form>
          <div class="subtitle">关系归属</div>
          <div>
            <Button :disabled="!annexList.length" size="mini" icon="el-icon-plus"
              @click="relationshipShow = true">添加关系归属</Button>
          </div>
          <Divider></Divider>
          <div class="relationList">
            <div class="relationItem" v-for="(item, index) in relationList" :key="index">
              <div class="relationName" :class="{ error: item.conflictWithDicFlag }">{{ item.label }}</div>
              <div class="list">
                <div class="item" v-for="C in item.children" :key="C.id" :class="{ error: C.conflictWithDicFlag }">
                  {{ C.label }}
                  <i class="icon el-icon-close" @click="delRelation(C, index)"></i>
                </div>
              </div>
            </div>
          </div>
          <addRelationship :visible.sync="relationshipShow" :attachId="annexObj.id" :selectList.sync="relationList"
            @confirm="relationShipConfirm"> </addRelationship>
        </div>
      </div>
      <div class="noMoee" v-else>
        <img src="@/assets/images/no_template.png" alt="" />
        <p class="txt">页面暂无内容</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Dropdown, DropdownMenu, DropdownItem, RadioGroup, Radio, Form, FormItem, Select, Option, Col, Row, Input, Popconfirm, Tree, Tooltip, Divider } from "element-ui";
import Vue from "vue";
import setFilter from "@/store/http/setFilter";
import Condition from "@/components/condition/index";
import addAnnex from "./addAnnex.vue";
import addRelationship from "./addRelationship.vue";

import Vselect from "./Vselect";
import Eselect from "./Eselect";
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      showAnnex: false,
      relationshipShow: false,
      size: "small",
      filters: [],

      annexList: [],

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
      matchFilterList: [], //当前过滤条件
      annexObj: {
        classCode: "",
        id: "",
        name: "",
      },

      relChainList: [], //关系链

      relationList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      isSave: false,
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
    Popconfirm,
    Condition,
    Tree,
    Eselect,
    Tooltip,
    addAnnex,
    Divider,
    addRelationship,
  },

  computed: {
    getError1() {
      return (data) => {
        const { conflictWithDicList = [] } = data;
        const obj = conflictWithDicList.find(item => item.errorType !== "对象类型不存在");
        if (obj) return obj?.errorType
      }
    },
    getError2() {
      return (data) => {
        const { conflictWithDicList = [] } = data;
        const obj = conflictWithDicList.find(item => item.errorType === "对象类型不存在");
        if (obj) return obj?.errorType
      }
    }
  },
  watch: {
    annexObj(obj) {
      if (obj?.id) {
        this.getDetailShow(obj.id);
      } else {
        this.init();
      }
    },
    matchFilterList: {
      handler(newObj, oldObj) {
        this.isSave = newObj === oldObj;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getAnnexList();
  },

  methods: {
    init() {
      this.filters = [];
      this.matchFilterList = [];
      this.relationList = [];
    },
    close() {
      this.$emit("update:visible", false);
    },
    relationShipConfirm(list) {
      this.relationList = list;
    },
    async confirm() {
      const { Condition } = this.$refs;
      const verify = Condition.Verify;
      const matchFilterList = this.matchFilterList.map((F) => {
        const [operation, not = false] = F.operation.split("=");
        return {
          infoDataType: F.infoDataType,
          jointSymbol: F.jointSymbol,
          infoCode: F.infoCode,
          operation,
          value: F.value,
          not: Boolean(not),
        };
      });
      const params = {
        templateId: this.$route.query.templateid,
        operate: "attach-filter",
        attachId: this.annexObj.id,
        matchFilterList,
      };

      if (verify) {
        this.$message.error("条件不能为空");
        return Promise.resolve({
          result: "verify",
          message: "条件不能为空",
        });
      }
      const res = await setFilter.setDetailModify(params);
      if (res.result == "success") {
        this.$message({
          message: "保存成功",
          type: "success",
        });
      }
      this.isSave = false;
      return Promise.resolve(res);
    },
    async eidtDevice(item) {
      this.annexObj = {};
      this.$nextTick(() => {
        this.annexObj = item;
        this.showAnnex = true;
      });
    },
    //删除设备
    async delDevice(item) {
      const params = {
        templateId: this.$route.query.templateid,
        operate: "attach-delete",
        attachId: item.id,
      };
      const { result } = await setFilter.setDetailModify(params);
      if (result == "success") {
        if (this.annexObj.id == item.id) {
          this.annexObj = {
            classCode: "",
            id: "",
            name: "",
          };
        }
        this.getAnnexList();
      }
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
      this.matchFilterList.splice(index, 1);
    },

    //添加条件
    addConditions(val, option) {
      const { dataType, isMultiple, code } = this.filters.find((item) => item.code === String(val));

      const rul1 = this.jointSymbols.at(0); //且或
      const jointSymbol = rul1.id;
      const infoCode = code;
      const rul2 = this.contains.at(0); //包含or不包含
      const rul3 = this.equals.at(0); //等于or不等于
      const rul4 = this.exist.at(0); //等于或
      const rul5 = this.scope.at(0); //范围
      const mold = {
        STRING: rul2.id,
        ENUM: isMultiple ? rul4.id : rul3.id,
        BOOLEAN: rul3.id,
      };
      const ruls = ["STRING", "ENUM", "BOOLEAN"];
      //获取值类型
      // const value = ruls.some(key => key == dataType) ? "" : []
      const value = "";
      //获取下拉默认值
      const operation = ruls.some((key) => key == dataType) ? mold[dataType] : rul5.id;
      const condition = {
        jointSymbol,
        infoCode,
        operation,
        infoDataType: dataType,
        value,
        not: false,
      };
      if (option instanceof Vue) {
        this.matchFilterList.push(condition);
      } else {
        Object.keys(condition).forEach((key) => {
          option[key] = condition[key];
        });
      }
    },
    //查询小附件列表
    async getAnnexList() {
      if (!this.$route.query.templateid) return;
      const params = {
        templateId: this.$route.query.templateid,
        operate: "attach-list",
      };
      const { result, data } = await setFilter.getDetailShow(params);
      if (result == "success") {
        this.annexList = data.attachs.map((item) => {
          item.classCode = (item?.classCodes || []).at(0);
          item.className = (item?.classNames || []).at(0);
          return item;
        });
        if (!this.annexObj.id) {
          if (this.annexList.length) {
            this.annexObj = this.annexList.at(0);
          }
        }
      }
    },
    changeCur(obj) {
      this.annexObj = obj;
    },
    async delRelation(item, index) {
      const list = this.relationList[index];
      const ident = list.children.findIndex((obj) => obj.id == item.id);
      if (list.children.length === 1) {
        this.relationList.splice(index, 1);
      } else {
        list.children.splice(ident, 1);
      }
      const attachLineList = [];
      this.relationList.forEach((P) => {
        if (P?.children) {
          P?.children.forEach((C) => {
            attachLineList.push(C.id);
          });
        }
      });
      const params = {
        templateId: this.$route.query.templateid,
        operate: "attach-line",
        attachId: this.annexObj.id,
        attachLineList,
      };
      const { result, data } = await setFilter.setDetailModify(params);
      if (result == "success") {
        console.log(this.relationList);
      }
    },
    //过滤设置-查询
    async getDetailShow(attachId) {
      const params = {
        templateId: this.$route.query.templateid,
        operate: "attach-detail",
        attachId,
      };
      this.relationList = [];
      this.matchFilterList = [];
      const { result, data } = await setFilter.getDetailShow(params);
      await this.getFuncid();
      if (result == "success") {
        const { matchFilterList, relLineTree = [] } = data;
        this.matchFilterList = matchFilterList;
        const handleData = (list = [], ident = 0) => {
          if (!list.length) return [];
          let result = [];
          list.forEach((item, index) => {
            const children = handleData(item?.children || [], ident + 1);
            if (ident == 0) {
              result.push({
                label: item.name,
                children,
                id: item.code,
                conflictWithDicFlag: item?.conflictWithDicFlag || false
              });
            } else {
              result.push({
                id: item.id,
                label: `${item.templateConnector1}→${item.templateConnector2}`,
                conflictWithDicFlag: item?.conflictWithDicFlag || false
              })
            }

          });
          return result;
        };
        this.relationList = handleData(relLineTree)
      }
    },

    //查询设备信息点
    async getFuncid() {
      const { classCode } = this.annexObj;
      const params = {
        classCode,
      };
      const { result, data } = await setFilter.getFuncid(params);
      if (result == "success") {
        const ruls = ["STRING", "DOUBLE", "INTEGER", "ENUM", "BOOLEAN"];
        this.filters = data.filter((item) => item.category == "STATIC" && ruls.some((key) => key == item.dataType));
      }
    },
  },
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
<style lang="scss" scoped>
.dropdownMenu {
  max-height: 200px;
  overflow-y: auto;
}

.blue {
  color: #246fe5;
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
      width: 280px;
      background: #fff;
      border-right: 1px solid #e1e5eb;
      flex-direction: column;
      padding: 12px 15px;
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
        margin-top: 12px;

        .list {
          .item {
            display: flex;
            flex-direction: row;
            // justify-content: space-between;
            height: 72px;
            align-items: center;
            padding: 0 12px;
            border-radius: 2px;
            cursor: pointer;
            border-bottom: 2px solid #e8ecf0;
            border-left: 2px solid transparent;

            img {
              display: none;
            }

            .attach {
              margin-right: 15px;
              display: flex;
              flex-grow: 1;
              height: 100%;
              justify-content: center;
              flex-direction: column;

              .attachName {
                font-size: 14px;
                font-weight: 700;
                color: #424c59;
                line-height: 22px;

                &.error {
                  color: #E63C35;
                }
              }

              .attachType {
                padding-top: 4px;
                font-size: 14px;
                color: #8b949e;

                &.error {
                  color: #E63C35;
                }
              }
            }

            &:hover {
              background: #f1f4f6;
              border-bottom: 2px solid transparent;

              img {
                display: flex;
              }
            }

            &.active {
              background: #ebf6ff;
              border-bottom: 2px solid transparent;
              border-left-color: #246fe5;

              img {
                display: flex;
              }
            }
          }
        }

        .noMore {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          img {
            width: 90px;
          }

          .txt {
            color: #626c78;
            font-size: 14px;
            line-height: 22px;
            padding-top: 12px;
          }

          .label {
            font-size: 14px;
            line-height: 22px;
            color: #8b949e;
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
        padding: 0 15px;
        border-bottom: 1px solid #e1e5eb;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .txt {
          color: #626c78;
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

        .relationList {
          .relationItem {
            padding-top: 12px;
            border-bottom: 1px dashed #e8ecf0;

            &:last-child {
              border-bottom: none;
            }

            .relationName {
              font-size: 14px;
              font-weight: 700;
              color: #626c78;
              line-height: 22px;

              &.error {
                color: #E63C35
              }
            }

            .list {
              padding: 8px 0 12px;
              display: flex;
              flex-wrap: wrap;
              gap: 8px;

              .item {
                height: 28px;
                display: flex;
                align-items: center;
                background: #e8ecf0;
                border-radius: 38px;
                font-size: 14px;
                padding: 0 8px;

                &.error {
                  border: 1px solid #FA9B96;
                  background: #FFF5F5;
                  color: #FA9B96;

                  .icon {
                    color: #424C59;
                  }

                }

                .icon {
                  margin-left: 5px;
                  cursor: pointer;
                }
              }
            }
          }
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

    .noMoee {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 90px;
      }

      .txt {
        color: #626c78;
        font-size: 14px;
        line-height: 22px;
        padding-top: 12px;
      }
    }
  }
}
</style>
