<!--  -->
<template>
  <Dropdown @command="handleClick" @visible-change="changeDrawers">
    <span class="el-dropdown-link">
      {{ getName }}<i class="el-icon-caret-bottom" :class="{ extand: drawers }"></i>
    </span>
    <DropdownMenu slot="dropdown">
      <DropdownItem v-for="item in jointSymbols" :key="item.id" :command="item.id">{{ item.label }}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
export default {
  props: ["value"],
  data() {
    return {
      jointSymbols: [
        {
          id: "and",
          label: "且",
        },
        {
          id: "or",
          label: "或",
        },
      ],
      drawers: false
    };
  },


  components: { Dropdown, DropdownMenu, DropdownItem },

  computed: {
    getName() {
      if (!this.value) {
        this.$emit("input", "and")
      } else {
        const obj = this.jointSymbols.find(item => item.id == this.value);
        return obj.label;
      }
    },
  },

  mounted() { },

  methods: {
    handleClick(val) {
      this.$emit("input", val)
    },
    changeDrawers(status) {
      this.drawers = status;
    }
  }
};

</script>
<style lang='scss' scoped>
.el-dropdown-link {
  background: #246FE5;
  border-radius: 2px;
  color: #fff;
  width: 40px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-icon-caret-bottom.extand {
    transform: rotate(180deg);
  }
}
</style>