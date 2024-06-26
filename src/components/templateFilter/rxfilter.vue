<!-- 过滤设置 -->
<template>
  <div class="rxfilterBox">
    <div class="head">
      <Button :size="size" type="primary" @click="confirm">保存</Button>
    </div>
    <div class="rxfilterType">
      <keep-alive>
        <refilterType ref="filter"></refilterType>
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
    ...mapState("rxfilter", ["filterTabList"]),
    ...mapGetters("rxfilter", ["relChain"]),
    chainLists() {
      return this.relChain?.relChainListList?.chainLists || []
    },
  },
  watch: {
    "relChain.relChainListList": {
      handler(newData, oldData) {
        this.isSave = newData === oldData;
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.merge({
      filterTabList: [{}]
    })
  },

  mounted() {
  },

  methods: {
    ...mapMutations("rxfilter", ["merge"]),
    async confirm(fuc) {
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

        const { templateid } = this.$route.query
        const params = {
          templateId: templateid,
          operate: "updateInfo",
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
          return await setFilter.setModify(params);
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
          fuc || fuc();
        }
      }
    },
    next(fuc) {
      if (this.isSave) {
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
  },
};
</script>
<style lang="scss" scoped>
.rxfilterBox {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  position: relative;

  .head {
    height: 48px;
    padding: 0 24px;
    display: flex;
    position: absolute;
    right: 0;
    top: -48px;
    align-items: center;
  }

  .rxfilterType {
    display: flex;
    flex-grow: 1;
    background: #f7f9fa;
    padding: 8px 16px 16px;
  }

}
</style>