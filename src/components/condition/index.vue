<!--  -->
<template>
  <div class="conditions">
    <component v-for="item, index in matchFilters" :key="index" :index.sync="index" :is="getComponent(item)"
      :options.sync="item" :filters.sync="filters" @change="addConditions" @delCon="delConditions"></component>
  </div>
</template>

<script>
import BOOLEAN from "@/components/condition/BOOLEAN";
import ENUM from "@/components/condition/ENUM";
import SCOPE from "@/components/condition/SCOPE";
import STRING from "@/components/condition/STRING";
export default {
  props: {
    matchFilters: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  },

  components: {
    BOOLEAN,
    ENUM,
    SCOPE,
    STRING
  },
  computed: {
    getComponent() {
      return (option) => {
        if (!this.filters.length) return;
        const { infoCode, infoDataType } = option
        const obj = this.filters.find(
          (rx) => rx.code === String(infoCode)
        );
        if (obj?.dataSource?.length) {
          return obj?.dataType
        } else if (obj?.dataType == "STRING" || infoDataType == "STRING") {
          return "STRING"
        } else if (infoDataType == "BOOLEAN" || infoDataType == "ENUM") {
          return infoDataType
        }
        return "SCOPE"
      }
    },
    Verify() {
      const isFalsy = this.matchFilters.filter(item => {
        const comp = this.getComponent(item);
        if (!item.value) {
          return true;
        }
        if (comp == "SCOPE") {
          const [a, b] = item.value.split(",")
          if (!a || !b) return true;
          if (a.length == 1 || b.length == 1) {
            return true
          }
        }
      })
      return isFalsy.length != 0
    }
  },

  mounted() { },

  methods: {
    delConditions(index) {
      this.$emit("delCon", index)
    },
    addConditions(val, option) {
      this.$emit("change", val, option)
    }
  }
};

</script>
<style lang='scss' scoped>
.conditions {
  padding-bottom: 30px;

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .col {
    margin-right: 30px;
  }

  .close {
    cursor: pointer;
  }
}
</style>