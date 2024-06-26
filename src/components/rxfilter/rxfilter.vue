<!-- 过滤设置 -->
<template>
  <div v-if="visibleModel" class="rxfilterBox">
    <div class="head">
      <div class="title">
        <span @click="close" class="back el-icon-arrow-left"></span>
        <span class="txt">
          过滤设置
        </span>
        <span class="name">
          /
          {{ filterName }}
        </span>
      </div>
      <Button :size="size" type="primary" @click="confirm">保存</Button>
    </div>
    <div class="tagList" v-if="filterTabList.length > 1">
      <div class="item" :class="{ active: tabOn == index, error: item.conflictWithDic }"
        v-for="(item, index) in filterTabList" :key="index" @click="changeTab(index)">
        <span class="name">
          {{ item.name }}
        </span>
        <span class="icon" v-if="item.conflictWithDic"></span>
      </div>
    </div>
    <div class="rxfilterType">
      <keep-alive>
        <refilterType ref="filter" v-if="filterTabList.length" :key="getKey" :options.sync="options"></refilterType>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {
  Button
} from "element-ui";
import setFilter from "@/store/http/setFilter";
import refilterType from "./refilterType";
import axios from "axios"
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
        templateId: "5ef1cc5d-b1ed-4218-913c-af1fb9c3c5da",
        operate: "filter",
        containerId: "a998aa70-09d6-11ee-bc89-8926628569c3"
        // mainPipeId:"" //母线
      }),
    },
  },
  data() {
    return {
      // relationVisible: false,
      size: "small",
      isSave: false,
      cacheTime: Date.now()
    };
  },

  components: {
    Button,
    refilterType
  },

  computed: {
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

  mounted() {
  },

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
    close() {
      if (this.isSave) {
        this.$msgbox.confirm('离开后数据将无法保存，是否保存', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirm();
        }).catch(() => {
          this.$emit("update:visible", false);
          this.merge({
            filterTabList: [],
          });
        });
      } else {
        this.$emit("update:visible", false);
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
          operate: "filter",
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
        ...this.options,
      };
      await this.queryTab(params);

    },
  },
};
</script>
<style lang="scss" scoped>
.rxfilterBox {
  display: flex;
  padding-top: 48px;
  flex-direction: column;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;

  .head {
    display: flex;
    justify-content: space-between;
    height: 48px;
    align-items: center;
    border-bottom: 1px solid #E1E5EB;
    padding: 0 24px;

    .title {
      font-size: 14px;

      .back {
        color: #1B2129;
        cursor: pointer;
      }

      .txt {
        color: #1B2129;
        font-weight: 700;
      }

      .name {
        color: #8B949E
      }
    }
  }

  .tagList {
    height: 42px;
    display: flex;
    align-items: center;
    padding: 0 28px;
    font-size: 16px;
    color: #1B2129;
    gap: 32px;

    .item {
      cursor: pointer;
      height: 42px;
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
    }

    .error {
      .icon {
        background: #F55047;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        right: -6px;
        margin-top: -17px;
      }
    }

    .active {
      font-weight: 700;
      color: #246FE5;
      position: relative;

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 2px;
        background: #246FE5;
        bottom: 0;
        left: 0;
      }
    }
  }

  .rxfilterType {
    display: flex;
    flex-grow: 1;
    background: #f7f9fa;
    padding: 8px 16px 16px;
  }

}
</style>