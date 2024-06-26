<!--  -->
<template>
  <Tooltip v-if="isImg" :disabled="err" :enterable="false" effect="dark" :content="getTitle" placement="top" :visible-arrow="false">
    <span class="icon" :class="{active:cur,isOnly,error:err}">
      <img :src="comp"/>
    </span>
  </Tooltip>
  <Tooltip v-else :disabled="err" :enterable="false" effect="dark" :content="getTitle" placement="top" :visible-arrow="false">
    <span class="icon" :class="{active:cur,isOnly,error:err}">
      <p :class="['text',{'null':code===''}]">
        <template v-if="code === ''">
          无
        </template>
        <template v-if="code === '0'">
          -
        </template>
      </p>
    </span>
  </Tooltip>
  
</template>

<script>
import { Tooltip } from "element-ui";
import arrow11 from "@/assets/images/arrow1-1.png";
import arrow12 from "@/assets/images/arrow1-2.png";
import arrow13 from "@/assets/images/arrow1-3.png";
import arrow21 from "@/assets/images/arrow2-1.png";
import arrow22 from "@/assets/images/arrow2-2.png";
import arrow23 from "@/assets/images/arrow2-3.png";
import arrow31 from "@/assets/images/arrow3-1.png";
import arrow32 from "@/assets/images/arrow3-2.png";
import arrow33 from "@/assets/images/arrow3-3.png";
import arrow9011 from "@/assets/images/arrow901-1.png";
import arrow9012 from "@/assets/images/arrow901-2.png";
import arrow9013 from "@/assets/images/arrow901-3.png";
import arrow9021 from "@/assets/images/arrow902-1.png";
import arrow9022 from "@/assets/images/arrow902-2.png";
import arrow9023 from "@/assets/images/arrow902-3.png";
import arrow9031 from "@/assets/images/arrow903-1.png";
import arrow9032 from "@/assets/images/arrow903-2.png";
import arrow9033 from "@/assets/images/arrow903-3.png";


export default {
  props:{
    code:{
      type:String,
      default:''
    },
    err:{
      type:Boolean,
      default:false
    },
    cur:{
      type:Boolean,
      default:false
    },
    isOnly:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
    };
  },
  computed:{
    getArrow(){
      const cur=this.cur?"2":"1";
      const err=this.err?"3":cur;
      const key=`arrow${this.code}${err}`;
      return key
    },
    comp(){
      const group={
        arrow11,
        arrow12,
        arrow13,
        arrow21,
        arrow22,
        arrow23,
        arrow31,
        arrow32,
        arrow33,
        arrow9011,
        arrow9012,
        arrow9013,
        arrow9021,
        arrow9022,
        arrow9023,
        arrow9031,
        arrow9032,
        arrow9033
      }
      return group[this.getArrow]
    },
    getTitle(){
      const group={
        arrow:"无方向",
        arrow0:"-",
        arrow1:"包含向右",
        arrow2:"包含向左",
        arrow3:"包含双向",
        arrow901:"仅向右",
        arrow902:"仅向左",
        arrow903:"仅双向",
      }
      const key=`arrow${this.code}`
      return this.err?"":group[key]
    },
    isImg(){
      return this.code!==''&&this.code!=='0'
    }
  },
  components: {
    arrow11,
    arrow12,
    arrow13,
    arrow21,
    arrow22,
    arrow23,
    arrow31,
    arrow32,
    arrow33,
    arrow9011,
    arrow9012,
    arrow9013,
    arrow9021,
    arrow9022,
    arrow9023,
    arrow9031,
    arrow9032,
    arrow9033,
    Tooltip
  },


  mounted(){},

  methods: {}
};

</script>
<style lang='scss' scoped>
.null{
  font-size:12px;
}
.icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: #F1F4F6;
        border-radius: 4px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 12px;
        color:#8B949E;

        &:not(.isOnly){
          &:hover{
              background:#E1E5EB;
          }
          
          &.active {
            border: 1px solid #215DD9;
            color: #246FE5;
            background: #EBF6FF;
          }
          &.error{
            border: 1px solid #E63C35;
            background:#FFF5F5;
          }
        }
        img {
          width: 11px;
        }
      }
</style>