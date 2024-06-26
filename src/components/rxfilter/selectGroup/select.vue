<!--  -->
<template>
  <Popover placement="bottom-end" trigger="manual" v-model="visible" v-Clickoutside="handleClose">
    <div class="select-head" slot="reference" :class="{ selected: visible }" @click="open">
      <div class="label" :class="[type, { 'error': isError }]">
        <template v-if="!type">
          {{ currentLabel }}
        </template>
        <template v-else>
          <arrowGroup :code="currentValue" :err="isError" :isOnly="true"></arrowGroup>
          <!-- <span class="null" v-if="currentValue === ''">
            无
          </span>
          <template v-if="currentValue === '0'">
            -
          </template>
          <template v-if="currentValue === '901'">
            仅向左
          </template>
          <template v-if="currentValue === '902'">
            仅向右
          </template>
          <template v-if="currentValue === '903'">
            必须双向
          </template>
          <template v-if="!isError">
            <img src="@/assets/images/arrow1.png" v-if="currentValue === '1'">
            <img src="@/assets/images/arrow2.png" v-else-if="currentValue === '2'">
            <img src="@/assets/images/arrow3.png" v-else-if="currentValue === '3'">
          </template>
          <template v-else>
            <img src="@/assets/images/arrow1-1.png" v-if="currentValue === '1'">
            <img src="@/assets/images/arrow2-2.png" v-else-if="currentValue === '2'">
            <img src="@/assets/images/arrow3-3.png" v-else-if="currentValue === '3'">
          </template> -->
        </template>
      </div>
      <i v-if="!isRead" class="icon" :class="{ 'el-icon-caret-bottom': visible, 'el-icon-caret-top': !visible }"></i>
    </div>
    <div class="selectMenus menuList" v-show="visible">
      <slot></slot>
    </div>
  </Popover>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
import { Popover } from "element-ui";
import arrowGroup from "../arrowGroup/index.vue";

export default {
  name: 'ElSelect',
  componentName: 'ElSelect',
  props: {
    type: String,
    value: {
      required: true
    },
    isRead: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      options: [],
      visible: false,
    };
  },
  provide() {
    return {
      'select': this
    };
  },

  components: {
    Popover,
    arrowGroup
  },
  directives: { Clickoutside },
  computed: {
    currentLabel() {
      const selected = this.options.find(item => item.value === this.value)
      return selected?.label || this.value || "-"
    },
    currentValue() {
      const selected = this.options.find(item => item.value === this.value)
      return selected?.value || this.value || ""
    },
    isError() {
      const isHas = this.options.some(item => item.value === this.value);
      return !isHas
    }
  },

  created() {
    this.$on('handleOptionClick', this.handleOptionSelect);
  },

  mounted() {
  },

  methods: {
    handleOptionSelect(option, byClick) {
      this.$emit('input', option.value);
    },
    handleClose() {
      this.visible = false;
    },
    open() {
      if (this.isRead) return;
      this.visible = !this.visible
    }
  },
  // render(createElement){
  //   // const selected = this.options.find(item => item.value === this.value)
  //   return createElement(selected?.$slots?.default)
  // }
};

</script>
<style lang="scss">
.selectMenus {
  .selectGroup {
    &:last-child {
      .groupBox {
        border-bottom: none;
      }
    }
  }

  display: flex;
  flex-direction: column;
  gap:5px;
}

.el-popover {
  min-width: 60px;
}

.select-head {
  display: flex;
  gap: 8px;
  height: 40px;
  align-items: center;
  // padding: 0 10px;
  color: #424C59;

  // &:hover,
  // &.selected {
  //   border-radius: 4px;
  //   background: #fff;
  // }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #424C59;
    font-size: 14px;

    .null {
      font-size: 12px;
    }

    .icon {
      background: #F7F9FA;
      height: 22px;
      width: 22px;
    }

    &.error {
      color: #E63C35;

      .icon {
        border: 1px solid #E63C35;
        background: #fff;
      }
    }

    img {
      width: 11px;
    }
  }
}
</style>
<style lang='scss' scoped></style>