<!-- 锚点文本配设备过滤设置 -->
<template>
  <Dialog ref="rxfilterDialog" class="rxfilterDialog" :visible.sync="visibleModel" @close="close" width="1300px"
    append-to-body :close-on-click-modal="false">
    <div class="head" slot="title">
      <div class="title">
        <span class="txt"> 配设备过滤设置 </span>
        <span class="name">{{ equipmentLink }} </span>
      </div>
    </div>
    <div class="rxfilterBox">
      <keep-alive>
        <refilterType ref="filter" v-if="filterTabList.length" :key="getKey" :options.sync="options"></refilterType>
      </keep-alive>
    </div>
    <div slot="footer">
      <Button :size="size" @click="cancel">取 消</Button>
      <Button :size="size" type="primary" @click="confirm">确定</Button>
    </div>
  </Dialog>
</template>

<script>
import { Button, Dialog } from "element-ui";
import refilterType from "./refilterType";
import axios from "axios"
import setFilter from "@/store/http/setFilter";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    options: {
      type: Object,
      default: () => ({
        containerId: "",
        containerName: "",
        operate: "anchor-filter",
        templateId: "",
        anchorCode: "",
        anchorEquipmentId: "",
        anchorEquipmentName: "",
      }),
    },
  },
  data() {
    return {
      size: "small",
      isSave: false,
      cacheTime: Date.now()
    };
  },

  components: {
    Button,
    refilterType,
    Dialog,
  },

  computed: {
    equipmentLink() {
      const { containerName, anchorCode, anchorEquipmentName } = this.options;
      const arr = [containerName || "--", anchorCode || "--", anchorEquipmentName || "--"];
      return arr.join("/");
    },
    ...mapState("rxfilter", ["filterTabList", "tabOn"]),
    ...mapGetters("rxfilter", ["relChain"]),
    visibleModel: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", false);
      },
    },
    chainLists() {
      return this.relChain?.relChainListList?.chainLists || []
    },
    curChain() {
      const list = this.chainLists[0]
      return list?.chainList[0]
    },
    filterName() {
      const relChain = this.curChain?.relChainFilter.at(0)
      return relChain?.name?.replace(/\[.+\]/g, "")
    },
    getKey() {
      return `${this.tabOn}${this.cacheTime}`
    }
  },
  watch: {
    visibleModel(value) {
      if (value) {
        this.isSave = false;
        this.cacheTime = Date.now();
        this.getTab();
      }
    },
    "relChain.relChainListList": {
      handler(newData, oldData) {
        if (oldData) {
          this.isSave = true;
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.merge({
      filterTabList: []
    })
  },

  mounted() { },

  methods: {
    ...mapActions("rxfilter", ["queryTab"]),
    ...mapMutations("rxfilter", ["merge"]),
    init() {
      this.changeTab();
    },
    changeTab(index = 0) {
      this.merge({
        tabOn: index
      });
    },
    cancel() {
      this.$refs["rxfilterDialog"].handleClose();
    },
    close() {
      if (this.isSave) {
        this.$msgbox.confirm('离开后数据将无法保存，是否保存', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirm();
        }).catch(() => {
          this.visibleModel = false;
          this.merge({
            filterTabList: [],
          });
        });
      } else {
        this.visibleModel = false;
        this.merge({
          filterTabList: [],
        });
      }
    },
    async confirm() {
      let verify = "";
      const postParams = this.filterTabList.filter(item => item?.relChainListList).map((tab) => {
        const { chainLists, jointSymbol } = tab.relChainListList
        const chainTypeList = chainLists.filter(item => item.chainList.length).map(item => {
          if (item.name === "") verify = "关系链组名称不能为空！"
          const chainList = item.chainList.map(list => {
            const { classCodeList, matchFiltersList, name, negation, relChainFilter, relTypeList } = list
            if (name === "") verify = "关系链路名称不能为空！"
            const matchFilters = matchFiltersList.map(matchList => {
              return matchList.map(matchItem => {
                const [operation, not = false] = matchItem?.operation?.split("=")
                if (matchItem.value === "") verify = "条件不能为空！"
                if (matchItem.infoDataType == "SCOPE") {
                  const [a, b] = matchItem.value.split(",")
                  if (!a || !b) verify = "条件不能为空！";
                  if (a.length == 1 || b.length == 1) {
                    verify = "条件不能为空！"
                  }
                }
                return {
                  ...matchItem,
                  operation,
                  not: Boolean(not)
                }
              })
            })
            const relChainFilterList = relChainFilter.map(chainList => {
              const { classCode, relObjType, relObjId, name } = chainList;
              return {
                classCode,
                relObjType,
                relObjId,
                name
              }
            })
            return {
              classCodeList,
              relChainFilter: relChainFilterList,
              matchFiltersList: matchFilters,
              name,
              negation,
              relTypeList
            };
          })
          return {
            ...item,
            chainList
          };
        })
        const params = {
          ...this.options,
          operate: "anchor-filter",
          classCode: tab.classCode,
          relChainListList: {
            chainLists: chainTypeList,
            jointSymbol
          }
        }
        return params;
      })
      if (verify) {
        return this.$message.error(verify);
      } else {
        const postList = postParams.map(async (params) => {
          return await setFilter.setDetailModify(params);
        })
        const res = await axios.all(postList);
        const success = res.map(item => {
          if (item.result == "success") {
            return item.data
          }
        })
        const hasError = res.filter(item => item.result == "fail");
        if (hasError.length) return this.$message.error(hasError[0].message);
        if (success.length == postParams.length) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.isSave = false;
          this.$emit("confirm", success);
        }
      }
    },
    //获取tab
    async getTab() {
      const params = {
        templateId: this.options.templateId,
        containerId: this.options.containerId
      };
      await this.queryTab(params);
    },
  },
};
</script>
<style lang="scss" scoped>
.rxfilterDialog {
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

    .name {
      color: #8b949e;
    }
  }
}

.rxfilterBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 527px;
  background: #fff;
}
</style>
