<!-- 选择链设备 -->
<template>
  <Dialog :title="title" :visible.sync="visibleModel" @close="close" width="880px" destroy-on-close append-to-body
    :close-on-click-modal="false" class="addDevice">
    <div class="container">
      <div class="Left">
        <Input prefix-icon="el-icon-search" placeholder="输入关键字搜索" v-model="treeFilterText" size="small" clearable></Input>
        <div class="treeBox">
          <Tree class="filter-tree" :class="{ hasSystem: expandedKeys.length }" node-key="path" :data="treeData"
            :props="defaultProps" :default-expanded-keys="expandedKeys" :filter-node-method="filterNode" ref="tree"
            highlight-current @node-click="changeTreeNode">
            <template slot-scope="{ node, data }">
              <p class="name" :class="{ disabled: data.disabled }">{{ node.label }}</p>
            </template>
          </Tree>
        </div>
      </div>
      <div class="Right" v-if="options.classCode">
        <div class="title">
          <span class="txt">已选设备：</span>
          <span class="name" :title="selectObj.name || '--'">{{ selectObj.name || "--" }}</span>
        </div>
        <div class="label">关系类型<span class="red">*</span></div>
        <Select :size="size" v-model="classCode" placeholder="请选择">
          <OptionGroup v-for="group in classList" :key="group.graphCode" :label="group.name">
            <Option v-for="item in group.children" :key="item.path" :label="item.name" :value="item.path"> </Option>
          </OptionGroup>
        </Select>
        <div class="label" v-if="directionList.length">方向</div>
        <div class="direction">
          <!-- <span
            :class="{ active: direction === code }"> -->
            <arrowGroup v-for="{ code } in directionList" :key="code" @click.native="direction = code" :code="code" :cur="direction === code"></arrowGroup>


            <!-- <template v-if="code === ''">
              无
            </template>
            <template v-if="code === '0'">
              -
            </template>
            <img src="@/assets/images/arrow1.png" v-if="code === '1'">
            <img src="@/assets/images/arrow2.png" v-if="code === '2'">
            <img src="@/assets/images/arrow3.png" v-if="code === '3'">
            <template v-if="code === '901'">
              仅向左
            </template>
            <template v-if="code === '902'">
              仅向右
            </template>
            <template v-if="code === '903'">
              必须双向
            </template> -->
          <!-- </span> -->
        </div>
        <template v-if="hasPipe">
          <div class="label">查询步数</div>
          <RadioGroup class="radio" v-model="pipeStepLimited">
            <Radio :label="false">不限</Radio>
            <Radio :label="true">1步</Radio>
          </RadioGroup>
          <div class="label">是否允许路过立管</div>
          <RadioGroup class="radio" v-model="pipeRiserLimited">
            <Radio :label="false">允许</Radio>
            <Radio :label="true">不允许</Radio>
          </RadioGroup>
          <template v-if="indirect">
            <div class="label">禁止路过</div>
            <RadioGroup class="radio" v-model="pipeRiserOuterLimited">
              <Radio :label="false">不限制</Radio>
              <Radio :label="true">模版内立管和环管</Radio>
            </RadioGroup>
          </template>
          <template v-if="indirect">
            <div class="label">禁止路过</div>
            <RadioGroup class="radio" v-model="pipePipeOuterLimited">
              <Radio :label="false">不限制</Radio>
              <Radio :label="true">模版内设备管件</Radio>
            </RadioGroup>
          </template>
          <div class="label">允许途径</div>
          <RadioGroup class="radio" v-model="pipeAllowAllType">
            <Radio :label="false">管道/阀门/传感器</Radio>
            <Radio :label="true">所有对象</Radio>
          </RadioGroup>
        </template>
      </div>
    </div>
    <div slot="footer">
      <Button :size="size" @click="cancel">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
  </Dialog>
</template>

<script>
/**
 * props
 *   visible - <Boolean>  对话框显隐
 * Event
 *   close 关闭的回调事件
 */
import { Dialog, Button, Form, FormItem, Input, Tree, Select, Option, OptionGroup, Radio, RadioGroup } from "element-ui";
import GetAdmData from "@/store/http/getAdmData";
import setFilter from "@/store/http/setFilter";
import arrowGroup from "../rxfilter/arrowGroup/index.vue";

export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    options: {
      type: Object,
      default: () => ({
        templateId: "",
        // operate: "filter",
        containerId: "",
        classCode: "",
      }),
    },
    //是否是间接关系
    indirect: {
      type: Boolean,
      default: () => false
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      title: "选择链设备",
      size: "small",
      itemWidth: "width:200px",
      treeFilterText: "",
      timer: null,
      selectObj: {},

      pipeStepLimited: undefined,
      pipeRiserLimited: undefined,
      pipeRiserOuterLimited: undefined,
      pipePipeOuterLimited:undefined,
      pipeAllowAllType: undefined,

      classCode: "",
      direction: "",
      directionList: [],
      //关系类型列表
      classList: [],
      //可选设备类型
      classCodeList: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      expandedKeys: []
    };
  },

  components: {
    Dialog,
    Button,
    Form,
    FormItem,
    Input,
    Tree,
    Select,
    Option,
    OptionGroup,
    Radio,
    RadioGroup,
    arrowGroup
  },

  watch: {
    treeFilterText(val) {
      //搜索防抖
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$refs.tree.filter(val);
        clearTimeout(this.timer);
        this.timer = null;
      }, 500);
    },
    classCode(val) {
      if (!val) return;
      const [Path, Cath] = val.split("/")
      const { children } = this.classList.find(item => item.graphCode == Path)
      const { directions } = children.find(item => item.relCode == Cath)
      this.directionList = [...directions, { code: "" }]
    },
    hasPipe(val) {
      const bool = val ? false : undefined;
      this.pipeStepLimited = bool;
      this.pipeRiserLimited = bool;
      if (this.indirect) {
        this.pipeRiserOuterLimited = bool;
        this.pipePipeOuterLimited = bool;

      }
      this.pipeAllowAllType = bool;
    },
    selectObj(newObj, oldObj) {
      //用于减少接口请求
      if (this.visibleModel && this.options?.classCode) {
        this.getClassCode();
      }
    },
    visibleModel(val) {
      if (val) {
        this.treeData = [];
        this.expandedKeys = []
        this.treeFilterText = "";
        this.classCode = "";
        this.direction = "";
        this.directionList = [];
        this.classList = [];
        this.selectObj = {};


        this.getClassCodeList();
      }
    },
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
    hasPipe() {
      if (!this.classCode) return false;
      const [Path, Cath] = this.classCode.split("/")
      const parent = this.classList.find(item => item.graphCode == Path)
      const obj = parent?.children.find(item => item.relCode == Cath)
      return obj?.hasPipe || false
    },
  },
  created() { },

  mounted() { },

  methods: {
    close(val) { },
    cancel() {
      this.$emit("update:visible", false);
      this.$nextTick(() => {
        this.selectObj = {};
        this.classCode = "";
      });
    },
    confirm() {
      if (!this.classCode && this.options?.classCode) {
        return this.$message.error("请选择关系类型");
      }
      this.$emit("update:visible", false);
      const tile = this.classList.reduce((a, b) => {
        return b.children ? a.concat(b.children) : a.concat(b);
      }, []);
      const curClass = tile.find((item) => this.classCode == item.path);
      //待返回添加的名称
      const { relObjType, classCode, relObjId, name, prefix = "" } = this.selectObj;

      const params = {
        relObjId: relObjId,
        relObjType: relObjType,
        classCode,
        name: `${prefix}${name}`,
        replationName: curClass?.namePath,
        replationCode: curClass?.path,
        direction: this.direction,
        pipeStepLimited: this.pipeStepLimited,
        pipeRiserLimited: this.pipeRiserLimited,
        pipeRiserOuterLimited: this.pipeRiserOuterLimited,
        pipePipeOuterLimited: this.pipePipeOuterLimited,
        pipeAllowAllType: this.pipeAllowAllType
      };
      this.$emit("confirm", params);
    },

    handleTree(data) {
      const hasKey = (key) => this.classCodeList.some((code) => code === key);
      const handleData = (list = [], path = "") => {
        if (!list.length) return [];
        let result = [];
        list.forEach((item, index) => {
          const iskey = !this.options?.classCode || hasKey(item.classCode);
          const route = path + "/" + item.classCode + index;
          const relObjType = item?.relObjType ? item?.relObjType : "object";
          if (item?.children?.length) {
            if (iskey) {
              result.push({
                ...item,
                children: handleData(item.children, route),
                path: route,
                relObjType,
              });
            } else {
              const arr = handleData(item.children, route);
              if (arr.length) {
                result.push({
                  ...item,
                  children: arr,
                  path: route,
                  relObjType,
                  disabled: !iskey,
                });
              }
            }
          } else {
            if (iskey) {
              result.push({
                ...item,
                children: [],
                path: route,
                relObjType,
              });
            }
          }
        });
        return result;
      };
      return handleData(data);
    },

    changeTreeNode(data) {
      const hasKey = (key) => this.classCodeList.some((code) => code === key);
      if (this.options?.classCode && !hasKey(data.classCode)) return;
      this.selectObj = data;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    async getClassCode() {
      const { relObjType, classCode, relObjId } = this.selectObj;
      // relObjType == "object" ? classCode : relObjId
      const params = {
        classCodeFrom: this.options.classCode, //起点设备类型
        classCodeTo: classCode, //终点设备类型
      };
      const { result, data } = await GetAdmData.getClassCode(params);
      const handleData = (list = [], path = "", namePath) => {
        if (!list.length) return [];
        let result = [];
        list.forEach((item) => {
          if (item?.children?.length) {
            const arr = handleData(item.children, item.graphCode, item.name);
            if (arr.length) {
              result.push({
                ...item,
                children: arr,
                path: item.graphCode,
                namePath: item.name,
              });
            }
          } else {
            result.push({
              ...item,
              children: [],
              path: path + "/" + item.relCode,
              namePath: namePath + "/" + item.name,
            });
          }
        });
        return result;
      };
      if (result == "success") {
        this.classList = handleData(data);
        if (this.classList.length) {
          const { path } = this.classList[0].children?.find((item) => item?.relCode);
          this.$nextTick(() => {
            this.classCode = path || "";
          });
        }
      }
    },
    //查询可以链接的设备
    async getClassCodeList() {
      if (this.dataSource.length && !this.options.classCode) {
        this.handleDataSource(this.dataSource)
        return;
      }
      const params = {
        classCode: this.options.classCode,
      };
      this.classCodeList = []
      const { result, data } = await GetAdmData.getClassCodeList(params);
      if (result == "success") {
        this.classCodeList = data;
        if (this.dataSource.length) {
          this.handleDataSource(this.dataSource)
        } else {
          await this.getDetailShow();
        }
      }
    },
    handleDataSource(tree) {
      const list = this.handleTree(tree)
      const obj = _.find(list, (row) => row.relObjType !== "object")
      this.treeData = list;
      this.expandedKeys = obj?.path ? [obj?.path] : []
    },
    async getDetailShow() {
      const send = _.cloneDeep(this.options)
      if (send.classCode) {
        delete send.classCode
      }
      const params = {
        ...send,
      };
      const {
        result,
        data: { chainTypeList },
      } = await setFilter.getDetailShow(params);
      if (result == "success") {
        if (chainTypeList?.length) {
          this.handleDataSource(chainTypeList)
        }
      }
    },
  },
};
</script>
<style lang="scss">
.addDevice {
  .el-dialog__body {
    padding: 0 20px;
  }
}
</style>
<style lang="scss" scoped>
.container {
  display: flex;
  // border-bottom: 1px solid #edf1f5;
  // border-top: 1px solid #edf1f5;

  .Left {
    height: 459px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding-right: 12px;
    padding-top: 20px;
    box-sizing: border-box;

    .treeBox {
      margin-top: 17px;
      overflow-y: auto;
      height: 410px;

      .filter-tree {
        &.hasSystem {
          ::v-deep>.el-tree-node {
            &:first-child {
              border-bottom: 1px solid #e1e5eb;
            }
          }
        }

        ::v-deep .el-tree-node[aria-disabled="true"] {
          &>.el-tree-node__content {
            background: transparent;
            cursor: default;

            .is-leaf+.name.disabled {
              color: #C0C4CC;
            }
          }
        }

        // .name {
        //   &.disabled {
        //     color: #a9abae;
        //   }
        // }
      }
    }
  }

  .Right {
    display: flex;
    flex-shrink: 0;
    width: 285px;
    border-left: 1px solid #edf1f5;
    flex-direction: column;
    padding: 10px 16px;
    box-sizing: border-box;

    .title {
      display: flex;
      height: 44px;
      flex-shrink: 0;
      align-items: center;
      padding-left: 16px;
      margin-bottom: 13px;
      background: linear-gradient(90deg, rgba(36, 120, 229, 0.1) 0%, rgba(36, 111, 229, 0) 100%);
      border-left: 2px solid #0091ff;
      border-radius: 0px 8px 8px 0px;

      .txt {
        font-size: 16px;
        color: #646c73;
        font-weight: 700;
        flex-shrink: 0;
      }

      .name {
        font-size: 16px;
        font-weight: 700;
        color: #0091ff;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .label {
      padding: 0 0 8px;
      font-size: 14px;
      line-height: 22px;
      color: #626c78;

      .red {
        color: #f55047;
      }
    }

    .el-select {
      margin-bottom: 16px;
    }

    .radio {
      padding: 0 0 16px;
    }

    .direction {
      display: flex;
      padding-bottom: 16px;
      gap: 10px;

      // span {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   flex-shrink: 0;
      //   background: #F1F4F6;
      //   border-radius: 4px;
      //   width: 24px;
      //   height: 24px;
      //   cursor: pointer;
      //   font-size: 12px;
      //   color:#8B949E;
      //   &:hover{
      //     background:#E1E5EB;
      //   }
        
      //   &.active {
      //     border: 1px solid #215DD9;
      //     color: #246FE5;
      //     background: #EBF6FF;
      //   }

      //   img {
      //     width: 11px;
      //   }
      // }
    }
  }
}
</style>
