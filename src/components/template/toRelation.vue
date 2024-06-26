<!-- 编辑关系 -->
<template>
  <Dialog :visible.sync="visibleModel" @close="close" width="420px" destroy-on-close append-to-body :close-on-click-modal="false"
    class="toRelationDialog">
    <div class="head" slot="title">
      <span class="txt">
        编辑链设备
      </span>
    </div>
    <Form class="relationForm">
      <FormItem label="设备名称">{{ options.chainName }}</FormItem>
      <FormItem label="关系选择">
        <Select :size="size" v-model="classCode" placeholder="请选择">
          <OptionGroup v-for="group in classList" :key="group.graphCode" :label="group.name">
            <Option v-for="item in group.children" :key="item.path" :label="item.name" :value="item.path">
            </Option>
          </OptionGroup>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :size="size" @click="cancel">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, Button, Form, FormItem, Select, OptionGroup, Option } from "element-ui";
import GetAdmData from "@/store/http/getAdmData";

export default {
  props: {
    visible: {
      type: Boolean,
      default: () => true,
    },
    options: {
      type: Object,
      default: () => ({
        classCodeFrom: "", //起点设备类型
        classCodeTo: "", //终点设备类型
        chainName: "",
        replationCode: ""
      })
    }
  },
  data() {
    return {
      size: "small",
      classList: [], //设备列表
      classCode: this.options.replationCode
    };
  },

  components: { Dialog, Button, Select, Form, FormItem, OptionGroup, Option },

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
    options(obj) {
      if (obj && this.visibleModel) {
        this.getClassCode();
      }
    }
  },

  created() {
  },
  mounted() { },

  methods: {
    close() {
    },
    cancel() {
      this.$emit("update:visible", false);
      this.$nextTick(() => {
        //初始化数据
        this.anchorList = [];
      });
    },
    confirm() {
      const tile = this.classList.reduce((a, b) => {
        return b.children ? a.concat(b.children) : a.concat(b)
      }, [])
      const curClass = tile.find(item => this.classCode == item.path)
      const params = {
        replationName: curClass.namePath,
        replationCode: curClass.classCode
      }
      this.$emit("update:visible", false);
      this.$emit("confirm", params);
    },
    async getClassCode() {
      const params = {
        classCodeFrom: this.options.classCodeFrom, //起点设备类型
        classCodeTo: this.options.classCodeTo, //终点设备类型
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
  },
};
</script>
<style lang='scss' scoped>
.toRelationDialog {
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

.relationForm {
  padding: 20px;
  border-bottom: 1px solid #e1e5eb;
}
</style>