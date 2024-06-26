<!-- 配置小附件 -->
<template>
  <div class="rxfilterBox">
    <refilterType ref="filter"></refilterType>
  </div>
</template>

<script>
import refilterType from "./refilterType";

export default {
  data() {
    return {
      size: "small",
    };
  },

  components: {
    refilterType,
  },

  computed: {
  },
  watch: {

  },
  created() {
    this.getDetailShow()
  },

  mounted() {
  },
  beforeDestroy() {

  },

  methods: {
    next(fuc) {
      const refNode = `filter`;
      const { isSave } = this.$refs[refNode];
      if (isSave) {
        this.$msgbox.confirm('离开后数据将无法保存，是否保存', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirm(fuc);
        }).catch(() => {
          fuc()
        });
      } else {
        fuc()
      }
    },
    async confirm(fuc) {
      const refNode = `filter`;
      const { confirm } = this.$refs[refNode];
      const res = await confirm();
      if (res.result == "success") {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        fuc();
        // this.close();
        // this.$emit("confirm", res.data);
      } else {
        this.$message.error(res.message);
      }
    },
    getDetailShow() {
      const refNode = `filter`;
      this.$nextTick(() => {
        const { init, getDetailShow, filterName } = this.$refs[refNode];
        init();
        // getDetailShow();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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

.rxfilterBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  background: #fff;
}
</style>
