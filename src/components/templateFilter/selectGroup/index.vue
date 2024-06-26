<template>
  <div class="groupSelect" v-show="path">
    <Select v-model="path">
      <OptionGroup v-for="{ id, name, children } in classList" :key="id" :label="name">
        <Option v-for="child in children" :key="child.path" :label="child.name" :value="child.path">
        </Option>
      </OptionGroup>
    </Select>
    <Select v-model="direction" type="icon">
      <Option v-for="{ code } in directionList" :key="code" :value="code" class="li">
        <arrowGroup :code="code"></arrowGroup>
        <!-- <template v-if="code === '0'">
          -
        </template>
        <template v-if="code === ''">
          无
        </template>
        <img src="@/assets/images/arrow1.png" v-else-if="code === '1'">
        <img src="@/assets/images/arrow2.png" v-else-if="code === '2'">
        <img src="@/assets/images/arrow3.png" v-else-if="code === '3'">
        <template v-if="code === '901'">
          仅向左
        </template>
        <template v-if="code === '902'">
          仅向右
        </template>
        <template v-if="code === '903'">
          必须双向
        </template> -->
      </Option>
    </Select>
  </div>
</template>

<script>
import GetAdmData from "@/store/http/getAdmData";
import emitter from "./emitter";
import OptionGroup from "./option-group.vue";
import Select from "./select.vue";
import Option from "./option.vue";
import arrowGroup from "../../rxfilter/arrowGroup/index.vue";

export default {
  props: ["selectObj", "classCodeFrom", "classCode"],
  mixins: [emitter],
  data() {
    return {
      classList: [],
    };
  },

  components: {
    Select,
    OptionGroup,
    Option,
    arrowGroup
  },

  computed: {
    path: {
      get() {
        if (!this.selectObj) return ""
        const { code } = this.selectObj
        return code;
      },
      set(val) {
        this.$set(this.selectObj, "code", val)
      }
    },
    direction: {
      get() {
        if (!this.selectObj) return ""
        const { direction } = this.selectObj
        return direction;
      },
      set(val) {
        this.$set(this.selectObj, "direction", val)
      }
    },
    directionList() {
      if (!this.path) return [];
      const [Path, Cath] = this.path.split("/")
      const parent = this.classList.find(item => item.id == Path)
      const child = parent?.children.find(item => item.id == Cath)
      if (child?.directions) {
        return [...child?.directions, { code: "" }]
      }
    },
    classCodes() {
      return this.classCodeFrom + this.classCode
    }
  },
  watch: {
    classCodes() {
      if (this.classCodeFrom && this.classCode) {
        this.getClassList();
      }
    },
  },

  mounted() {
    if (this.classCodeFrom && this.classCode) {
      this.getClassList();
    }
  },

  methods: {
    async getClassList() {
      const params = {
        classCodeFrom: this.classCodeFrom,
        classCodeTo: this.classCode
      }
      const handleData = (list = [], path = "", namePath) => {
        if (!list.length) return [];
        let result = [];
        list.forEach((item) => {
          if (item?.children?.length) {
            const arr = handleData(item.children, item.graphCode, item.name);
            if (arr.length) {
              result.push({
                id: item.graphCode,
                name: item.name,
                children: arr,
                path: item.graphCode,
                namePath: item.name
              });
            }
          } else {
            result.push({
              directions: item.directions,
              id: item.relCode,
              name: item.name,
              children: [],
              path: path + "/" + item.relCode,
              namePath: namePath + "/" + item.name
            });
          }
        });
        return result;
      };
      const { result, data } = await GetAdmData.getClassCode(params)
      if (result == "success") {
        this.classList = handleData(data);
        if (this.classList.length) {
          const { path } = this.classList[0].children?.find(
            (item) => item?.id
          );
          this.$nextTick(() => {
            this.$set(this.selectObj, "code", this.path || path)
          })
        }
      }

    }
  }
};

</script>
<style lang="scss">
.menuList {
  display: flex;
  flex-direction: column;

  .li {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F1F4F6;
    border-radius: 4px;

    img {
      width: 11px;
    }

    &.active {
      color: #606266;
      font-size: 12px;
      border: 1px solid #409eff;
    }
  }
}
</style>
<style lang='scss' scoped>
.groupSelect {
  display: flex;
  gap: 15px;
}
</style>