<!--  -->
<template>
  <div class="item" @click="selectOptionClick" :class="{ active: value === select.value }">
    <slot>
      {{ currentLabel }}
    </slot>
  </div>
</template>

<script>
import emitter from "./emitter";
import _ from "lodash";
export default {
  inject: ['select'],
  props: {
    value: {
      required: true
    },
    label: [String, Number],
  },
  mixins: [emitter],

  data() {
    return {
    };
  },



  components: {},

  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
  },
  created() {
    this.select.options.push(this)
  },

  mounted() {
  },

  methods: {
    selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
      }
    }
  }
};

</script>
<style lang='scss' scoped>
.item {
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: #f5f7fa;
  }

  &.active {
    color: #409eff;
    font-weight: 700;
    // font-size: 12px;
  }
}
</style>