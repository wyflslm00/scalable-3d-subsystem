<template>
<div class="legend_panel">
    <div class="legend">
        <!-- <div class="pipe" v-for="item in pipeList" :class="[{ 'pipe_chk_no':item.checked1 }]" @click="changePipe(item)"></div> -->

        <template v-for="item in pipeList">
            <el-tooltip class="item" effect="dark" placement="bottom">
                <div class="pipe" :class="[{ 'pipe_chk_no':item.checked1 }]" @click="changePipe(item)"></div>
                <div slot="content">{{ riserName + '(' + item.typeName + ')' }}</div>
            </el-tooltip>
        </template>
    </div>
</div>
</template>

    
<script>

import GetAdmData from "@/store/http/getAdmData";

export default {
    data() {
        return {
            pipeList: []
        }
    },
    props: {
        equipList:{
            type: Array,
            default: []
        },
        queryBody: {
            type: Object,
            default: function () {}
        },
        addChangedAnchor: {
            type: Object,
            default: {}
        },
        riserName:{
            type:String,
            default:''
        }
    },
    methods: {
        changePipe(item) {
            if(item.locked) return
            item.checked1 = !item.checked1

            this.pipeList = this.pipeList.concat([])            
        },
        async getChangedAnchors(){


            let marker = this.pipeList.filter(x => x.checked1 == true && x.locked == false)

            marker.forEach(element => {
                element.locked = true
            });

            const params = {
                "templateId":  this.$route.query.templateid,
                "operate": "pipe-line",
                "mainPipeId": marker.id
            }
                
            // const { result, data } = await GetAdmData.getAnchorsTexts(params)
     
            return marker            
        }
    },
    watch: {
        queryBody: {
            deep: true,
            immediate: true,
            handler: function (val) {
                
                if(val.children) {
                    this.pipeList = val.children
                }
                else{
                    let tmp = this.equipList.filter(x=> x.id == val.containerId) 
                    if(tmp) {
                        val.children = tmp[0].children
                        this.pipeList = val.children
                    }
               }
            }
        }
    }
}
</script>

    
<style lang="scss" scoped>
.legend_panel {
    display: flex;
    height: 400px;
    width: 734px;
    background: #F1F4F6;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // width: fit-content;

    .legend {
        background: red;
        position: relative;
        display: flex;
        justify-content: center;
        background: #FFFFFF;
        height: 184px;
        padding-right: 18px;

        .pipe {
            width: 4px;
            background: #D9EBFF;
            float: left;
            margin-left: 18px;
            cursor: pointer;
            transition: 0.5s;
        }

        .pipe:hover {
            // width: 8px;
            -webkit-transform: scaleX(2);
        }

        .pipe_chk_no {
            background: #246FE5;
        }

        .pipe_unchhk_yes {
            background: #CBF7F3;
        }

        .pipe_chk_yes {
            background: #14C4C4;
        }
    }
}
</style>
