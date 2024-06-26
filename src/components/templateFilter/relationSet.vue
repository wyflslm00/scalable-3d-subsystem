<!--  -->
<template>
  <Dialog class="setDialog" :visible.sync="visibleModel" @close="close" width="560px" destroy-on-close append-to-body
    :close-on-click-modal="false">
    <div class="head" slot="title">
      <div class="title">
        <span class="txt">关系设置</span>
      </div>
    </div>
    <relationSet :options="setOptions" :row="setRow"></relationSet>
    <div slot="footer">
      <Button :size="size" @click="cancel">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
  </Dialog>
</template>

<script>
import relationSet from "../relationSet/index.vue";
import { Dialog, Button } from "element-ui";
import _ from "lodash";
export default {
  props: ["visible", "options", "row"],
  data() {
    return {
      size: "mini",
      setOptions: {},
      setRow: {}
    };
  },

  components: {
    Dialog,
    relationSet,
    Button
  },

  computed: {
    visibleModel: {
      get() {
        this.init();
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", false);
      },
    },
  },

  mounted() {
  },

  methods: {
    init() {
      this.setOptions = _.cloneDeep(this.options);
      this.setRow = _.cloneDeep(this.row);
    },
    close() {
      this.visibleModel = false;
    },
    cancel() {
      this.close()
    },
    confirm() {
      Object.keys(this.setRow).forEach(key => {
        this.$set(this.row, key, this.setRow[key])
      })
      this.close()
    }
  }
};

</script>
<style lang='scss' scoped>
.setDialog {
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
</style>