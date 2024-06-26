<!-- 添加关系归属 -->
<template>
  <Dialog class="relationshipDialog" :visible.sync="visibleModel" @close="close" width="520px" destroy-on-close
    append-to-body :close-on-click-modal="false">
    <div class="head" slot="title">
      <div class="title">
        <span class="txt">添加关系归属</span>
      </div>
    </div>
    <div class="container">
      <Tree class="filter-tree" node-key="id" :data="treeData" :props="defaultProps"
        :default-checked-keys.sync="checkedKeys" show-checkbox ref="tree" highlight-current>
        <template slot-scope="{ node, data }">
          <Tooltip class="item" :visible-arrow="false" effect="dark" :content="data.label" placement="top">
            <p class="Label" :class="{ error: data.conflictWithDicFlag }">
              {{ data.label }}
            </p>
          </Tooltip>
        </template>
      </Tree>
    </div>
    <div slot="footer">
      <Button :size="size" @click="close">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
  </Dialog>
</template>

<script>
import { Button, Dialog, Select, Option, Tree, Input, Tooltip } from "element-ui";
import refilterType from "./refilterType";
import GetAdmData from "@/store/http/getAdmData";
import setFilter from "@/store/http/setFilter";
import { cloneDeep } from "lodash";
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    attachId: {
      type: String,
      default: ""
    },
    selectList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      size: "small",

      defaultProps: {
        label: "label",
        children: "children"
      },
      treeData: [],
      checkedKeys: [],
    };
  },

  components: {
    Button,
    refilterType,
    Dialog,
    Select, Option, Tree,
    Input,
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
  },
  watch: {
    visibleModel(value) {
      if (value) {
        this.init();
      }
    },
  },
  created() {
    this.getTypeTree()
  },

  mounted() { },

  methods: {
    close() {
      this.visibleModel = false;
    },
    async init() {
      const attachLineList = []
      this.selectList.forEach(item => {
        if (item?.children) {
          item?.children.forEach(C => {
            attachLineList.push(C.id)
          })
        }
      })
      this.checkedKeys = attachLineList;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(attachLineList, true)
      })
    },
    async confirm() {
      if (!this.$route.query.templateid) return;
      const checklist = this.$refs.tree.getCheckedNodes(false, true)
      const all = checklist.filter(item => item.children)
      const allCheck = checklist.filter(item => !item.children)
      const attachLineList = allCheck.map(item => item.id);
      const list = all.map(item => {
        const children = item.children.filter(C => {
          return attachLineList.includes(C.id)
        })
        return {
          id: item.id,
          label: item.label,
          children
        }
      })
      const params = {
        templateId: this.$route.query.templateid,
        operate: "attach-line",
        attachId: this.attachId,
        attachLineList
      }
      const { result, data } = await setFilter.setDetailModify(params)
      if (result == "success") {
        this.close();
        this.$emit("confirm", cloneDeep(list))
      }
    },
    async getTypeTree() {
      if (!this.$route.query.templateid) return;
      this.treeData = [];
      const params = {
        templateId: this.$route.query.templateid,
        operate: "relLineMap"
      }
      const {
        result,
        data
      } = await setFilter.getDetailShow(params);
      if (result == "success") {
        // const tree = data.relLineTree;
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
        // const keys = Object.keys(data.relLineMap);
        this.treeData = handleData(data.relLineTree)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.relationshipDialog {
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
  display: flex;
  justify-content: space-between;
  height: 48px;
  align-items: center;
  padding: 0 24px;

  .title {
    font-size: 14px;

    .txt {
      color: #1b2129;
      font-weight: 700;
    }
  }
}

// .head {
//   font-size: 16px;
//   font-weight: 700;
//   // border-bottom: 1px solid #e1e5eb;
//   padding: 20px;

//   .txt {
//     color: #2e3742;
//     padding-right: 6px;
//     margin-right: 8px;
//   }
// }

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 382px;
  padding: 11px 32px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fff;

  .item {
    padding-bottom: 15px;

    .label {
      color: #626C78;
      font-size: 14px;
      line-height: 22px;
      padding-bottom: 8px;

      .red {
        color: #f55047
      }
    }
  }

  .inline {
    .select {
      width: 100%;
    }
  }

  .filter-tree {

    //树节点文字超出是否显示。。。&hover
    ::v-deep {
      .Label {
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 0;

        &.error {
          color: #E63C35;
        }
      }
    }
  }
}
</style>
