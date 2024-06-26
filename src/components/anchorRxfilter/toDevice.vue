<!-- 选择链设备 -->
<template>
  <Dialog :title="title" :visible.sync="visibleModel" @close="close" width="880px" destroy-on-close append-to-body
    :close-on-click-modal="false">
    <div class="container">
      <div class="Left">
        <Input prefix-icon="el-icon-search" placeholder="输入关键字搜索" v-model="treeFilterText" size="small" clearable></Input>
        <div class="treeBox">
          <Tree class="filter-tree" node-key="path" :data="treeData" :props="defaultProps"
            :filter-node-method="filterNode" ref="tree" highlight-current @node-click="changeTreeNode">
            <template slot-scope="{node,data}">
              <p class="name" :class="{ disabled: data.disabled }">{{ node.label }}</p>
            </template>
          </Tree>
        </div>
      </div>
      <div class="Right">
        <div class="title">
          <span class="txt">已选设备：</span>
          <span class="name" :title="selectObj.name || '--'">{{ selectObj.name || "--" }}</span>
        </div>
        <div class="label">
          关系类型<span class="red">*</span>
        </div>
        <Select :size="size" v-model="classCode" placeholder="请选择">
          <OptionGroup v-for="group in classList" :key="group.graphCode" :label="group.name">
            <Option v-for="item in group.children" :key="item.path" :label="item.name" :value="item.path">
            </Option>
          </OptionGroup>
        </Select>
        <!-- <Select :size="size" v-model="classCode">
          <Option v-for="item in classList" :key="item.relCode" :value="item.relCode
          " :label="item.name"></Option>
                                                                                                                                                                                                                            </Select> -->
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
import {
  Dialog,
  Button,
  Form,
  FormItem,
  Input,
  Tree,
  Select,
  Option,
  OptionGroup,
} from "element-ui";
import GetAdmData from "@/store/http/getAdmData";
import setFilter from "@/store/http/setFilter";
// const initTree = () => ([
//   {
//     classCode: "father",
//     name: "父容器",
//     disabled: true,
//     children: [],
//   },
//   {
//     classCode: "brother",
//     name: "兄容器",
//     disabled: true,
//     children: [],
//   },
//   {
//     classCode: "dict",
//     name: "数据字典",
//     disabled: true,
//     children: [],
//   },
// ]);
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    options: {
      type: Object,
      default: () => ({
        templateId: "cf35149b8b704e9689f14447fc32542b",
        operate: "filter",
        containerId: "ACCCOP-1",
        classCode: ""
      }),
    },
  },
  data() {
    return {
      title: "选择链设备",
      size: "small",
      itemWidth: "width:200px",
      treeFilterText: "",
      timer: null,
      selectObj: {},

      classCode: "",
      //关系类型列表
      classList: [],
      //可选设备类型
      classCodeList: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
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
    selectObj(newObj, oldObj) {
      //用于减少接口请求
      if (newObj.classCode != oldObj.classCode) {
        this.classCode = ""
        this.classList = []
        this.getClassCode();
      }
    },
    visibleModel(val) {
      if (val) {
        this.treeData = [];
        this.getClassCodeList();
      }
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
  },
  created() {
  },

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
      if (!this.classCode) {
        return this.$message.error("请选择关系类型");
      }
      this.$emit("update:visible", false);
      const tile = this.classList.reduce((a, b) => {
        return b.children ? a.concat(b.children) : a.concat(b)
      }, [])
      const curClass = tile.find(item => this.classCode == item.path)
      // const relObjId= this.selectObj.relObjType=="container"?this.selectObj.containerId:this.selectObj.classCode
      //待返回添加的名称
      const { relObjType, classCode, relObjId, name, prefix } = this.selectObj
      // relObjType == "object" ? classCode : relObjId
      // const id = relObjType == "object" ? classCode : relObjId
      const params = {
        relObjId: relObjId,
        relObjType: relObjType,
        classCode,
        name: `${prefix}${name}`,
        replationName: curClass.namePath,
        replationCode: curClass.path
      }
      this.$emit("confirm", params);
    },
    handleTree(data) {
      const hasKey = (key) => this.classCodeList.some((code) => code === key);
      const handleData = (list = [], path = "") => {
        if (!list.length) return [];
        let result = [];
        list.forEach((item) => {
          const iskey = hasKey(item.classCode);
          const route = path + "/" + item.classCode
          const relObjType = item?.relObjType ? item?.relObjType : "object";
          if (item?.children?.length) {
            if (iskey) {
              result.push({
                ...item,
                children: handleData(item.children, route),
                path: route,
                relObjType
              });
            } else {
              const arr = handleData(item.children, route);
              if (arr.length) {
                result.push({
                  ...item,
                  children: arr,
                  path: route,
                  relObjType,
                  disabled: !iskey
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
      return handleData(data)
    },
    async getTree() {
      const { result, data } = await GetAdmData.getTypeTree();
      if (result == "success") {
        const dict = this.treeData.at(-1);
        dict.children = this.handleTree(data);
      }
    },
    changeTreeNode(data) {
      const hasKey = (key) => this.classCodeList.some((code) => code === key);
      if (!hasKey(data.classCode)) return;
      this.selectObj = data;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    async getClassCode() {
      const { relObjType, classCode, relObjId } = this.selectObj
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
                namePath: item.name
              });
            }
          } else {
            result.push({
              ...item,
              children: [],
              path: path + "/" + item.relCode,
              namePath: namePath + "/" + item.name
            });
          }
        });
        return result;
      };
      if (result == "success") {
        this.classList = handleData(data);
        if (this.classList.length) {
          const { path } = this.classList[0].children?.find(
            (item) => item?.relCode
          );
          this.$nextTick(() => {
            this.classCode = path || "";
          })
        }
      }
    },
    //查询可以链接的设备
    async getClassCodeList() {
      const params = {
        classCode: this.options.classCode,
      };
      const { result, data } = await GetAdmData.getClassCodeList(params);
      if (result == "success") {
        this.classCodeList = data;
        await this.getDetailShow();
        // await this.getTree();
      }
    },
    async getDetailShow() {
      const { templateId, containerId, anchorCode, anchorEquipmentId } = this.options
      const params = {
        templateId,
        containerId,
        anchorCode,
        anchorEquipmentId,
        operate: "anchor-chain"
      }
      const { result, data: { chainTypeList } } = await setFilter.getDetailShow(params);
      if (result == "success") {
        if (chainTypeList?.length) {
          const list = this.handleTree(chainTypeList)
          const obj = _.find(list, (row) => row.relObjType !== "object")
          this.treeData = list;
          this.expandedKeys = [obj.path]
        }
      }
    }
  },
};
</script>
<style lang='scss' scoped>
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
      background: linear-gradient(90deg,
          rgba(36, 120, 229, 0.1) 0%,
          rgba(36, 111, 229, 0) 100%);
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
      padding: 13px 0 4px;
      font-size: 14px;
      line-height: 22px;
      color: #626c78;

      .red {
        color: #f55047;
      }
    }
  }
}
</style>