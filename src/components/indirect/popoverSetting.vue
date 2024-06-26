<!--  -->
<template>
  <Popover v-if="options.hasPipe" placement="bottom-start" width="420" v-model="popoverVisibleSetting"
    @show="settingChange()" @hide="settingCancel">
    <div class="settingBox">
      <div class="popoverTitle">
        查询设置
      </div>
      <div class="item">
        <span class="label">查询步数</span>
        <RadioGroup class="radio" v-model="settingObj.pipeStepLimited">
          <Radio :label="false">不限</Radio>
          <Radio :label="true">1步</Radio>
        </RadioGroup>
      </div>
      <div class="item">
        <span class="label">是否允许路过立管</span>
        <RadioGroup class="radio" v-model="settingObj.pipeRiserLimited">
          <Radio :label="false">允许</Radio>
          <Radio :label="true">不允许</Radio>
        </RadioGroup>
      </div>
    </div>
    <div class="popoverFoot">
      <Button size="mini" @click="settingCancel">取消</Button>
      <Button type="primary" size="mini" @click="settingConfirm()">确定</Button>
    </div>
    <Button slot="reference" type="text">更改设置</Button>
  </Popover>
</template>

<script>
import { Button, Popover, RadioGroup, Radio } from "element-ui";
export default {
  props: ["options"],
  data() {
    return {
      popoverVisibleSetting: false,
      settingObj: {}
    };
  },

  components: {
    Button,
    Popover,
    RadioGroup,
    Radio
  },

  computed: {},

  mounted() { },

  methods: {
    settingChange() {
      this.settingObj = {
        pipeStepLimited: this.options?.pipeStepLimited || false,
        pipeRiserLimited: this.options?.pipeRiserLimited || false
      }
    },
    settingCancel() {
      this.popoverVisibleSetting = false;
      this.settingObj = {}
    },
    settingConfirm() {
      const { pipeStepLimited, pipeRiserLimited } = this.settingObj
      this.$set(this.options, "pipeStepLimited", pipeStepLimited)
      this.$set(this.options, "pipeRiserLimited", pipeRiserLimited)
      this.popoverVisibleSetting = false;
    },
  }
};

</script>
<style lang='scss'>
.settingBox {
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  .popoverTitle {
    font-size: 14px;
    font-weight: 700;
    color: #2e3742;
    display: flex;
    line-height: 40px;
    align-items: center;

    &:before {
      content: "";
      display: flex;
      width: 3px;
      height: 14px;
      background: #246fe5;
      margin-right: 3px;
    }
  }

  .item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .label {
      font-size: 14px;
      color: #626c78;
      padding-right: 20px;
    }
  }
}

.popoverFoot {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>