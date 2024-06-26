<!-- 关系设置 -->
<template>
  <div class="relationSet">
    <div class="title">选择关系</div>
    <div class="inline">
      <div class="label">关系类型</div>
      <Tooltip popper-class="error" :enterable="false" :disabled="!row.conflictWithDicFlag" effect="dark"
        :content="getError" placement="top" :visible-arrow="false">
        <Select v-model="path" :isRead="false" class="select">
          <OptionGroup v-for="{ id, name, children } in classList" :key="id" :label="name">
            <Option v-for="child in children" :key="child.path" :label="child.name" :value="child.path">
            </Option>
          </OptionGroup>
        </Select>
      </Tooltip>
    </div>
    <div class="inline">
      <div class="label">方向</div>
      <div class="direction">
        <Tooltip popper-class="error" :enterable="false" :disabled="!row.conflictWithDicFlag" effect="dark"
          content="方向有变化" placement="top" :visible-arrow="false">
            <arrowGroup v-if="hasDirection" :code="direction" :err="hasDirection"></arrowGroup>
            <!-- <template v-if="direction === '0'">
              -
            </template>
            <template v-if="direction === ''">
              无
            </template>
            <img src="@/assets/images/arrow1-1.png" v-if="direction === '1'">
            <img src="@/assets/images/arrow2-2.png" v-if="direction === '2'">
            <img src="@/assets/images/arrow3-3.png" v-if="direction === '3'"> -->
        </Tooltip>
        <!-- <span
          :class="{ active: direction === code }"> -->
          <arrowGroup v-for="{ code } in directionList" :key="code" @click.native="direction = code" :code="code" :cur="direction === code"></arrowGroup>
          <!-- <template v-if="code === ''">
            无
          </template>
          <template v-if="code === '0'">
            -
          </template>
          <img src="@/assets/images/arrow1.png" v-if="code === '1'">
          <img src="@/assets/images/arrow2.png" v-if="code === '2'">
          <img src="@/assets/images/arrow3.png" v-if="code === '3'">
          <template v-if="code === '901'">
            仅向左
          </template>
          <template v-if="code === '902'">
            仅向右
          </template>
          <template v-if="code === '903'">
            必须双向
          </template> -->
        <!-- </span> -->
      </div>
    </div>
    <template v-if="hasPipe">
      <div class="title">查询设置</div>
      <div class="inline">
        <div class="label">查询步数</div>
        <RadioGroup class="radio" v-model="pipeStepLimited">
          <Radio :label="false">不限</Radio>
          <Radio :label="true">1步</Radio>
        </RadioGroup>
      </div>
      <div class="inline">
        <div class="label">是否允许路过立管</div>
        <RadioGroup class="radio" v-model="pipeRiserLimited" @change="pipeRiserLimitedChange">
          <Radio :label="false">允许</Radio>
          <Radio :label="true">不允许</Radio>
        </RadioGroup>
      </div>
      <!-- <div class="inline">
        <div class="label">允许路过</div>
        <RadioGroup class="radio" :disabled='pipeRiserLimited' v-model="pipeRiserOuterLimited">
          <Radio :label="false">所有立管</Radio>
          <Radio :label="true">模版外立管</Radio>
        </RadioGroup>
      </div> -->
      <div class="inline">
        <div class="label">允许途径</div>
        <RadioGroup class="radio" v-model="pipeAllowAllType">
          <Radio :label="false">管道/阀门/传感器</Radio>
          <Radio :label="true">所有对象</Radio>
        </RadioGroup>
      </div>
      <div class="inline">
        <div class="label">禁止路过</div>
        <RadioGroup class="radio" :disabled='pipeRiserLimited' v-model="pipeRiserOuterLimited">
          <Radio :label="false">不限制</Radio>
          <Radio :label="true">模版内立管和环管</Radio>
        </RadioGroup>
      </div>
      <div class="inline">
        <div class="label">禁止路过</div>
        <RadioGroup class="radio" :disabled='pipeRiserLimited' v-model="pipePipeOuterLimited">
          <Radio :label="false">不限制</Radio>
          <Radio :label="true">模版内设备管件</Radio>
        </RadioGroup>
      </div>
    </template>
  </div>
</template>

<script>
import OptionGroup from "@/components/rxfilter/selectGroup/option-group.vue";
import Select from "@/components/rxfilter/selectGroup/select.vue";
import Option from "@/components/rxfilter/selectGroup/option.vue";
import GetAdmData from "@/store/http/getAdmData";
import { RadioGroup, Radio, Tooltip } from "element-ui";
import arrowGroup from "../rxfilter/arrowGroup/index.vue";

const handleData = (list = [], path = "", namePath) => {
  if (!list.length) return [];
  let result = [];
  list.forEach((item) => {
    if (item?.children?.length) {
      const arr = handleData(item.children, item.graphCode, item.name);
      if (arr.length) {
        const params = {
          id: item.graphCode,
          name: item.name,
          children: arr,
          path: item.graphCode,
          namePath: item.name
        }
        result.push(params);
      }
    } else {
      const params = {
        directions: item.directions,
        id: item.relCode,
        name: item.name,
        children: [],
        path: path + "/" + item.relCode,
        namePath: namePath + "/" + item.name
      }
      params["hasPipe"] = item?.hasPipe
      result.push(params);
    }
  });
  return result;
};

export default {
  props: ["options", "row"],
  data() {
    return {
      treeData: [],
    };
  },

  components: {
    OptionGroup,
    Select,
    Option,
    RadioGroup,
    Radio,
    Tooltip,
    arrowGroup
  },

  computed: {
    path: {
      get() {
        if (!this.row) return ""
        const { code } = this.row
        return code;
      },
      set(val) {
        const [Path, Cath] = val.split("/")
        const parent = this.classList.find(item => item.id == Path)
        const child = parent?.children.find(item => item.id == Cath)
        this.$set(this.row, "code", val)
        this.$set(this.row, "name", child?.name || "")
        this.$set(this.row, "hasPipe", child?.hasPipe)

        if (!this.hasDirection) {
          this.$set(this.row, "conflictWithDicFlag", false)
        }
      }
    },
    direction: {
      get() {
        if (!this.row) return ""
        const { direction } = this.row
        return direction;
      },
      set(val) {
        this.$set(this.row, "direction", val)
        if (!this.hasDirection) {
          this.$set(this.row, "conflictWithDicFlag", false)
        }
      }
    },
    pipeStepLimited: {
      get() {
        if (!this.row) return ""
        const { pipeStepLimited = false } = this.row
        return pipeStepLimited;
      },
      set(val) {
        this.$set(this.row, "pipeStepLimited", val)
      }
    },
    pipeRiserLimited: {
      get() {
        if (!this.row) return ""
        const { pipeRiserLimited = false } = this.row
        return pipeRiserLimited;
      },
      set(val) {
        this.$set(this.row, "pipeRiserLimited", val)
      }
    },
    
    pipeAllowAllType: {
      get() {
        if (!this.row) return ""
        const { pipeAllowAllType = false } = this.row
        return pipeAllowAllType;
      },
      set(val) {
        this.$set(this.row, "pipeAllowAllType", val)
      }
    },
    pipeRiserOuterLimited: {
      get() {
        if (!this.row) return ""
        const { pipeRiserOuterLimited = false } = this.row
        return pipeRiserOuterLimited;
      },
      set(val) {
        this.$set(this.row, "pipeRiserOuterLimited", val)
      }
    },
    pipePipeOuterLimited: {
      get() {
        if (!this.row) return ""
        const { pipePipeOuterLimited = false } = this.row
        return pipePipeOuterLimited;
      },
      set(val) {
        this.$set(this.row, "pipePipeOuterLimited", val)
      }
    },
    hasPipe() {
      return this.row?.hasPipe
    },
    // hasOuterLimited() {
    //   return this.row.hasOwnProperty("pipeRiserOuterLimited")
    // },

    directionList() {
      if (!this.path) return [];
      const [Path, Cath] = this.path.split("/")
      const parent = this.classList.find(item => item.id == Path)
      const child = parent?.children.find(item => item.id == Cath)
      if (child?.directions) {
        return [...child?.directions, { code: "" }]
      }
      return []
    },
    hasDirection() {
      const isHas = this.directionList.some(item => item.code === this.row.direction);
      return !isHas
    },
    classCodes() {
      const { classCodeFrom, classCode } = this.options
      return classCodeFrom + classCode
    },
    classList() {
      if (!this.treeData.length) return []
      const list = handleData(this.treeData);
      if (list.length) {
        const children = list[0].children?.find(
          (item) => item?.id
        );
        const path = this.path || children?.path
        const [Path, Cath] = path.split("/")
        const parent = list.find(item => item.id == Path)
        const child = parent?.children.find(item => item.id == Cath)
        this.$nextTick(() => {
          this.$set(this.row, "code", path)
          this.$set(this.row, "name", child?.name || "")
          this.$set(this.row, "hasPipe", child?.hasPipe)
          if (!this.hasDirection) {
            this.$set(this.row, "conflictWithDicFlag", false)
          }
        })
      }
      return list
    },
    getError() {
      const { conflictWithDicFlag, conflictWithDicItems } = this.row
      if (!conflictWithDicFlag) return "";
      const [{ itemType }] = conflictWithDicItems
      return itemType
    }
  },
  watch: {
    classCodes(val) {
      if (val) {
        this.getClassList();
      }
    },
  },

  mounted() {
    if (this.classCodes) {
      this.getClassList();
    }
  },

  methods: {
    async getClassList() {
      const { classCodeFrom, classCode } = this.options
      const params = {
        classCodeFrom,
        classCodeTo: classCode
      }
      const { result, data } = await GetAdmData.getClassCode(params)
      if (result == "success") {
        this.treeData = data;
      }
    },
    pipeRiserLimitedChange(val){
      if(val){
        this.pipeRiserOuterLimited = false
        this.pipePipeOuterLimited = false
      }
    },
  }
};

</script>
<style lang='scss' scoped>
.relationSet {
  display: flex;
  flex-direction: column;
  padding: 14px 24px;
  gap: 16px;
  line-height: inherit;

  .title {
    color: #2E3742;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Microsoft YaHei UI;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    padding-left: 6px;
    border-left: 3px solid #246FE5;
  }

  .inline {
    display: flex;
    flex-grow: 1;
    align-items: center;
    gap: 12px;

    .label {
      color: #626C78;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Microsoft YaHei UI;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }

    .select {
      ::v-deep {
        .select-head {
          height: 32px;
          cursor: pointer;
          border-radius: 4px;
          border: 1px solid #C4C9CF;
          padding: 0 8px 0 12px;
        }
      }
    }

    .error {
      &::v-deep {
        input {
          color: #E63C35;
        }
      }
    }

    .direction {
      display: flex;
      // padding-top: 10px;
      align-items: center;
      gap: 10px;

      // span {
      //   // display: flex;
      //   // align-items: center;
      //   // justify-content: center;
      //   // flex-shrink: 0;
      //   // background: #F1F4F6;
      //   // border-radius: 4px;
      //   // width: 24px;
      //   // height: 24px;
      //   // cursor: pointer;
      //   // font-size: 12px;
      //   // color:#8B949E;

      //   // &:hover{
      //   //   background:#E1E5EB;
      //   // }
        
      //   // &.active {
      //   //   border: 1px solid #215DD9;
      //   //   color: #246FE5;
      //   //   background: #EBF6FF;
      //   // }

      //   // &.errorIcon {
      //   //   border: 1px solid #E63C35;
      //   //   background:#FFF5F5;
      //   //   color: #E63C35;
      //   // }

      //   // img {
      //   //   width: 11px;
      //   // }
      // }
    }
  }
}
</style>