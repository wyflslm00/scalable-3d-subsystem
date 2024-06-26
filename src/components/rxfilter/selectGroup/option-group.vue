<!--  -->
<template>
  <div class="selectGroup">
    <div class="selectGroup_Title">{{ label }}</div>
    <div class="groupBox">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String
  },
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {}
};

</script>
<style lang='scss' scoped>
.selectGroup {
  .selectGroup_Title {
    font-size: 12px;
    color: #909399;
    line-height: 30px;
    padding: 0 5px;

  }

  .groupBox {
    border-bottom: 1px solid #e4e7ed;
    padding-bottom: 8px;
  }
}
</style>