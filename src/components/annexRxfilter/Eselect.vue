<!--  -->
<template>
  <Select size="mini" v-model="setVal" placeholder="请选择">
    <OptionGroup v-for="group in classList" :key="group.graphCode" :label="group.name">
      <Option v-for="item in group.children" :key="item.path" :label="item.name" :value="item.path">
      </Option>
    </OptionGroup>
  </Select>
</template>

<script>
import { Select, OptionGroup, Option } from "element-ui";
import GetAdmData from "@/store/http/getAdmData";
export default {
  props: ["value", "classCodeFrom", "classCode"],
  data() {
    return {
      classList: []
    };
  },

  components: {
    Select, OptionGroup, Option
  },

  computed: {
    setVal: {
      get() {
        const { code, name } = this.value
        return code;
      },
      set(val) {
        const [parent, child] = val.split("/");
        if (this.classList.length) {
          const first = this.classList.find(item => item.graphCode == parent)
          const { path, name } = first.children.find(item => item.relCode == child)
          this.$nextTick(() => {
            this.$emit("input", {
              code: path,
              name
            })
          })
        }
      }
    }
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
      const { result, data } = await GetAdmData.getClassCode(params)
      if (result == "success") {
        this.classList = handleData(data);
        if (this.classList.length) {
          const { path } = this.classList[0].children?.find(
            (item) => item?.relCode
          );
          this.$nextTick(() => {
            this.setVal = path || "";
          })
        }
      }

    }
  }
};

</script>
<style lang='scss' scoped></style>