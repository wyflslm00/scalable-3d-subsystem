<!--  -->
<template>
  <Popover v-show="setRow.code" placement="bottom-start" width="420" v-model="visible">
    <span class="btn" slot="reference">关系设置</span>
    <relationSet :options="setOptions" :row="setRow"></relationSet>
    <div class="footer">
      <Button size="mini" @click="visible = false">取消</Button>
      <Button type="primary" size="mini" @click="confirm">确定</Button>
    </div>
  </Popover>
</template>

<script>
import relationSet from "../relationSet/index.vue";
import { Popover, Button } from "element-ui";
import _ from "lodash";
export default {
  props: ["options", "row"],
  data() {
    return {
      visible: false,
      setOptions: {},
      setRow: {}
    };
  },

  components: {
    Popover,
    relationSet,
    Button
  },

  computed: {

  },

  mounted() {
    this.$nextTick(() => {
      this.setOptions = _.cloneDeep(this.options);
      this.setRow = _.cloneDeep(this.row);
    })
  },

  methods: {
    confirm() {
      Object.keys(this.setRow).forEach(key => {
        this.$set(this.row, key, this.setRow[key])
      })
      this.visible = false;
    }
  }
};

</script>
<style lang='scss' scoped>
.btn {
  color: #246FE5;
  font-feature-settings: 'clig' off, 'liga' off;
  /* 正常内文/Regular */
  font-family: Microsoft YaHei UI;
  font-size: 14px;
  cursor: pointer;
}

.footer {
  display: flex;
  justify-content: flex-end;
}
</style>