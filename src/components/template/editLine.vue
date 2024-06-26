<template>
    <div>
        <el-dialog title="编辑信息" :visible.sync="addSpaceVisible"  width="840px" :close-on-click-modal="false" @close="$emit('close', false)">
            
            <div class="header">
                <div class="box">
                    <div class="tle_v tle_new">
                        <span class="tle">线段名称<em>*&nbsp;&nbsp;</em></span>
                        <br />
                        <el-input maxlength="20" style="width:240px;height:32px" v-model="spaceName" placeholder="请输入名称"></el-input>
                    </div>

                    <div class="tle_v" style="margin: 0 0 0 16px;height: 32px;">
                        <span class="tle">线段类型<em>*&nbsp;&nbsp;</em></span>
                        <el-radio-group v-model="radio" :disabled="true">
                            <el-radio :label="1">母线</el-radio>
                            <el-radio :label="0">辅助线</el-radio>
                            <el-radio :label="2">环管</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <!-- <div class="box">
                    <div class="tle_v">
                        <span class="tle">线段类型<em>*&nbsp;&nbsp;</em></span>
                        <el-radio-group v-model="radio" :disabled="true">
                            <el-radio :label="1">母线</el-radio>
                            <el-radio :label="0">辅助线</el-radio>
                            <el-radio :label="2">环管</el-radio>
                        </el-radio-group>
                    </div>

                   
                </div> -->

                <div class="box" v-if="radio===1" style="width:100%">
                    <div class="tle_v" style="width:100%">
                        <span class="tle">承载对象类型</span>
                        <br />
                        <el-cascader :disabled="true" ref="cascaderSelect" :class="[placeholderValueFlag?'color-name':'']" :placeholder="placeholderValue" v-model="classCode" :options="getterTreeList" :filterable="true" style="width:100%;"
                         :props="{ value: 'classCode',label: 'name',children: 'children',multiple: false, checkStrictly:false}" :show-all-levels="true"></el-cascader>
                    </div>
                </div>
                <div class="box" v-if="radio===2" style="width:100%">
                    <div class="tle_v" style="width:100%">
                        <span class="tle">承载管道类型</span>
                        <br />
                        <el-cascader :disabled="true" ref="cascaderSelect" :class="[placeholderValueFlag?'color-name':'']" :placeholder="placeholderValue" v-model="riserTree" :options="riserTreeMap" :filterable="true" style="width:100%;"
                         :props="{ value: 'id',label: 'name',children: 'children',multiple: false, checkStrictly:false}" :show-all-levels="true"></el-cascader>
                    </div>
                </div>
                <div class="check-box" v-if="radio===0">
                    <!-- <div class="check-head">
                        <span :class="[ checkIndex===0 ? 'click' : '']" @click="checkIndex=0">全部</span>
                        <span :class="[ checkIndex===1 ? 'click' : '']" @click="checkIndex=1">已选择</span>
                    </div>
                    <div class="check-list" v-if="checkIndex===0">
                        <el-checkbox-group v-model="checkValue">
                            <el-checkbox v-for="item in relLineMap" :label="item.id" :key="item.id">
                                <div class="name-box" style="margin-bottom: 6px;">
                                    <el-tooltip class="item" effect="dark" :content="item.templateConnector1+'  →  '+item.templateConnector2" placement="top">
                                        <span class="name-left" :style="{color:item.conflictWithDicFlag?'#FA9B96':''}">{{ item.templateConnector1+'&nbsp;→&nbsp;'+item.templateConnector2 }}</span>
                                    </el-tooltip>
                                    <span class="name-right">
                                        {{ item.name }}
                                    </span>
                                </div></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="check-list" v-else>
                        <div class="name-box" style="flex-direction: column;align-items: flex-start;">
                            <template v-for="item in relLineMap"  >
                                <div  class="name-tem" v-if="checkValue.includes(item.id)" :key="item.id">
                                    <el-tooltip class="item" effect="dark" :content="item.templateConnector1+'  →  '+item.templateConnector2" placement="top">
                                        <span class="name-left" :style="{color:item.conflictWithDicFlag?'#FA9B96':''}">{{ item.templateConnector1+'&nbsp;→&nbsp;'+item.templateConnector2 }}</span>
                                    </el-tooltip>
                                    <span class="name-right">
                                        {{ item.name }}
                                    </span>
                                </div>
                               
                            </template>
                            
                        </div>
                    </div> -->
                    <div class="check-list">
                        <div class="list-left">
                            <el-checkbox-group v-model="checkValue">
                                <div style="margin-bottom:20px;" v-for="(value,key,index) in relLineMap" :key="key+''+index">
                                    <div class="list-left-name">{{key}}</div>
                                    <el-checkbox v-for="item in value" :label="item.id" :key="item.id">
                                        <div class="name-box" style="margin-bottom: 6px;">
                                                <span class="name-left space-name" :style="{color:item.conflictWithDicFlag?'#FA9B96':''}">{{ item.templateConnector1+'&nbsp;→&nbsp;'+item.templateConnector2 }}</span>
                                        </div></el-checkbox>
                                </div>
                                
                            </el-checkbox-group>
                        </div>
                        <div class="list-line"></div>
                        <div class="list-right">
                            <div  class="list-left-name">已选 <span style="color:#1B2129;">{{checkValue.length}}</span> 
                                <span v-if="checkValue.length" class="clear" @click="deleteList(false)">清空</span>
                            </div>
                            <div class="name-box" style="flex-direction: column;align-items: flex-start;">
                                <div   :style="{marginBottom:isConFun(value)?'20px':'0',}" v-for="(value,key,index) in relLineMap" :key="key+''+index"  >
                                    <div v-if="showName(value)" class="list-left-name">{{key}}</div>
                                    <div class="content-box" v-for="item in value" :key="item.id">
                                        <div  class="name-tem" style="margin-bottom:10px;" v-if="checkValue.includes(item.id)" :key="item.id">
                                                <span class="name-left space-name" :style="{color:item.conflictWithDicFlag?'#FA9B96':''}">{{ item.templateConnector1+'&nbsp;→&nbsp;'+item.templateConnector2 }}</span>
                                                <i class="el-icon-error" style="margin-right: 6px;color:#8B949E;cursor: pointer;" @click="deleteList(item.id)"></i>
                                            
                                        </div>
                                    </div>
                                   
                                
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

       
    
            <div slot="footer" class="dialog-footer">
                <el-button @click="$emit('close', false)">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    </template>
    
    <script>

const uuid = require('uuid')
import setFilter from "@/store/http/setFilter";
import getTemplate from "@/store/http/getTemplate";

import {
    mapGetters,
    mapActions
} from "vuex";
    
    export default {
        data() {
            return {
                addSpaceVisible: false,
                spaceId:'',
                spaceName:'',
                // tableList:[],
                // list:[],
                classCode:'',
                radio:1,

                relLineMap:[],
                checkIndex:0,
                checkValue:[],

                riserTreeMap:[],
                riserTree:[],

                placeholderValueFlag :false,
                placeholderValue:'试试搜索：请输入'
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: true
            },
            dataValue: {
                type: Object,
                default: {}
            },
            
        },
        computed: {
            ...mapGetters(["getterTreeList"]),
           
        },
        created(){

             setFilter.getDetailShow({
                templateId:this.$route.query.templateid,
                "operate": "relLineMap",
             }).then(res=>{
            //    let keys = Object.keys(res.data.relLineMap)
            //    let values = Object.values(res.data.relLineMap)
            //    let relLineMap = []
            //    for(let i = 0; i<values.length;i++){
            //         for(let j = 0;j<values[i].length;j++){
            //             values[i][j].name = keys[i]
            //             relLineMap.push(values[i][j])
            //         }
                
            //    }
            //    this.relLineMap = relLineMap
            this.relLineMap =  res.data.relLineMap||{}
            }).catch(res => {
              this.$message({
                message: '加载失败',
                type: 'error'
              })
            })

            setFilter.getShow({
                templateId:this.$route.query.templateid,
             }).then(res=>{
               if(res&&res.data.riserTree){
                let riserTreeMap = res.data.riserTree


                 let getterTreeList = JSON.parse(JSON.stringify(this.getterTreeList));
                 const listFun = (list) => {
                     for (let i = 0; i < list.length; i++) {
                         list[i].id = list[i].classCode
                         if (list[i].children) {
                             listFun(list[i].children);
                         } else {
                             if (list[i].classCode.length === 6 && list[i].classCode[2] === "P" && list[i].classCode[3] === "P") {
                                 list[i].disabled = false;
                             } else {
                                 list[i].disabled = true;
                                 // list.splice(i,1)
                             }
                         }
                     }
                 };
                 listFun(getterTreeList);
         
               
                 const loop = (list) => {
                     for (let i = list.length - 1; i >= 0; i--) {
                         if (list[i].children) {
                             loop(list[i].children);
                         } else {
                             if (list[i].disabled === true) {
                                 list.splice(i, 1);
                             }
                         }
                     }
                 };
                 loop(getterTreeList);
 
 
                 riserTreeMap.push({name:'字典树的管道类型',id:'auxiliary', children:[...getterTreeList] })
                 this.riserTreeMap = riserTreeMap





                let pipe = []
                if(this.dataValue.loopRiserMainPipe||this.dataValue.lineType=='Loop'){
                    if(this.dataValue.loopRiserMainPipe){
                       let riserTree = []
                        for(let i = 0;i<res.data.riserTree.length;i++){
                            riserTree = [res.data.riserTree[i].id]
                            if(res.data.riserTree[i].children&&res.data.riserTree[i].children.length){
                                for(let j = 0;j<res.data.riserTree[i].children.length;j++){
                                    if(res.data.riserTree[i].children[j].id===this.dataValue.loopRiserMainPipe){
                                        riserTree.push(res.data.riserTree[i].children[j].id)
                                        pipe = riserTree
                                    }
                                }
                            }
                        } 
                    }else{
                        let funFor = (list,arr)=>{
                            for(let i = 0;i<list.length;i++){
                                let newArr = JSON.parse(JSON.stringify(arr))
                                newArr.push(list[i].id)
                                if(list[i].children){
                                    funFor(list[i].children,newArr)
                                }
                                console.error(list[i].id,this.dataValue.equipmentTypes[0])
                                if(list[i].id===this.dataValue.equipmentTypes[0]){
                                    pipe = newArr
                                }
                            }
                        }
                        funFor(getterTreeList,['auxiliary'])

                    }
                    
                    }
                    if(pipe.length){
                        this.riserTree = pipe
                    }else{
                        this.placeholderValueFlag = true
                        this.placeholderValue =  this.dataValue.equipmentTypes? this.dataValue.equipmentTypes[this.dataValue.equipmentTypes.length-1]:this.placeholderValue
                    }
               }
            }).catch(res => {
              this.$message({
                message: '加载失败',
                type: 'error'
              })
            })
           
        },
        mounted() {
            // this.spaceId = uuid.v1()
            console.error(this.dataValue)
            this.spaceId = this.dataValue.id
            this.spaceName = this.dataValue.name
            if(this.dataValue.equipmentTypes&&this.dataValue.equipmentTypes.length){
                if(this.dataValue.loopRiserMainPipe||this.dataValue.lineType=='Loop'){
                    this.radio = 2
                    return
                }
                let newclassCode = []
                const listFun = (list,fatherArrList)=>{
                for(let i = 0;i<list.length;i++){
                    let fatherArr = JSON.parse(JSON.stringify(fatherArrList))
                        if(list[i].classCode===this.dataValue.equipmentTypes[this.dataValue.equipmentTypes.length-1]){
                            fatherArr.push(list[i].classCode)
                            newclassCode = fatherArr
                            break
                        }
                        if(list[i].children){
                            fatherArr.push(list[i].classCode)
                            listFun(list[i].children,fatherArr)
                        }
                    }

                }
                listFun(this.getterTreeList,[])
                // this.classCode = this.dataValue.equipmentTypes
                this.classCode = newclassCode
                if(!newclassCode.length){
                    this.placeholderValueFlag = true
                    this.placeholderValue = this.dataValue.equipmentTypes[this.dataValue.equipmentTypes.length-1]
                }
                this.radio = 1
                return
            }else if(this.dataValue.templateLineIds&&this.dataValue.templateLineIds.length&&!this.dataValue.loopRiserMainPipe){
                this.checkValue = this.dataValue.templateLineIds
                this.radio = 0
            }

        },
        methods: {
            sure() {
                console.error(this.checkValue)
                if (this.spaceName == '') {
                    this.$message({
                        message: '名称不能为空',
                        type: 'error'
                    })
                    return
                }
                if(this.radio===1){
                    if (!this.classCode.length) {
                        this.$message({
                            message: '请选择对象类型',
                            type: 'error'
                        })
                        return
                    }
                }else if(this.radio===0){
                    if (!this.checkValue.length) {
                        this.$message({
                            message: '请选择线段关系',
                            type: 'error'
                        })
                        return
                    }
                }
              
                let containerInfo = {
                    templateId: this.$route.query.templateid,
                    operate : 'updateMainPipe',
                    mainPipe:{
                        "id": this.spaceId,
                        "name": this.spaceName,
                    }
                            
                        }

                if(this.radio===0){
                    containerInfo.mainPipe.templateLineIds = this.checkValue
                }
                getTemplate
				.graphTemplateModify(containerInfo)
				.then((res) => {
                    if (res.result === 'fail') {
						this.$message({
							type: "error",
							message: res.message,
						});
						return;
					}

					this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.$emit('close',res)
				}).catch(()=>{
                    this.$message({
                        type:'error',
                        message:'修改失败'
                    })
                    this.$emit('close')
                })    
               
            },
            showName(arr){
                let list = arr||[]
                let flag = false
                for(let i = 0;i<arr.length;i++){
                    if(this.checkValue.includes(list[i].id)){
                        return true
                    }
                   
                }
                return false
            },
            deleteList(id){
                if(id){
                    this.checkValue =  this.checkValue.filter(item => item != id)
                }else{
                    this.checkValue = []
                }
            },
            isConFun(arr){
                for(let i = 0;i<arr.length;i++){
                    if(this.checkValue.includes(arr[i].id)){
                        return true
                    }
                }
                return false
            },
           

        },
        watch: {
            visible: {
                deep: true,
                immediate: true,
                handler: function (val) {
                    this.addSpaceVisible = val
                }
            },
           
        }
    }
    </script>
    
    <style lang="scss" scoped>
    .tle_v {
        min-width: 40px;
        // display: flex;
        align-items: center;
        margin-bottom: 20px;
        .color-name{
			::v-deep .el-input__inner::placeholder{
				color:#FA9B96;
			}
        }
    
        .tle {
            font-family: 'Microsoft YaHei UI';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #2E3742;
            float: left;
            margin-bottom: 8px;
    
            em {
                color: #F55047;
            }
        }
        ::v-deep .el-input__inner {
            // width:230px;
            height:32px
        }
    }
    ::v-deep .el-dialog__body{
        padding-top: 10px;
    }
    .header{
        display: flex;
       flex-direction: column;
        .box{
            display: flex;
            align-items: center;
            .tle_new{
                display: flex;
                align-items: center;
                }
        }
        .id{
            width:150px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .btn{
            align-self: flex-end;
            background: #246FE5;
            color:#fff;
            margin-right: 10px;
        }
        .check-box{
            display: flex;
            flex-direction: column;
            position: relative;
            .check-head{
                display: flex;
                margin-bottom: 22px;
                span{
                    font-size: 14px;
                    color: #1B2129;
                    font-weight: 400;
                    border-bottom:2px solid transparent ;
                    padding: 12px 0;
                    margin-right:32px ;
                    cursor: pointer;
                }
                .click{
                    color: #246FE5;
                    border-bottom-color: #246FE5;
                }
            }
            .check-list{
                width: 792px;
                height: 306px;
                border-top: 1px solid #E1E5EB;
                border-bottom: 1px solid #E1E5EB;
                padding: 20px 0;
                overflow-y: scroll;
                .list-left,.list-right{
                    float: left;
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    
                    .list-left-name{
                        font-size: 14px;
                        color: #8B949E;
                        width: 100%;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin: 0px 0 10px 0;
                    }
                    ::v-deep .el-checkbox{
                        margin-bottom: 5px;
                    }
                   
                }
                .list-right{
                    float: right;
                    padding-left:10px;
                    box-sizing: border-box;
                   
                }
                .list-line{
                   width: 1px;
                   height: 100%;
                   background: #E1E5EB;;
                   position: absolute;
                   left: calc(50% - 10px);
                   top: 0;
                }
                .clear{
                    float: right;
                    cursor: pointer;
                    color: #C4C9CF;
                }
                .name-box{
                    display: flex;
                    align-items: center;
                    margin-bottom: 2px;
                    width: 100%;
                    &>div{
                        width: 100%;
                    }
                    .content-box{
                        width: 100%;
                    }
                    .name-tem{
                        display: flex;
                        align-items: center;
                        margin-bottom: 6px;
                        width: 100%;
                        justify-content: space-between;
                    }
                    .name-left{
                        max-width: 452px;
                        color: #1B2129;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }
                    .space-name{
                        width: 360px;
                        white-space: pre-wrap;
                    }
                    .name-right{
                        max-width: 324px;
                        color: #1B4ACC;
                        background: #D9EBFF;
                        font-size: 14px;
                        padding: 4px 8px;
                        margin-left: 8px;
                        box-sizing: border-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        border-radius: 4px;

                    }
                }
            }

        }
       
    }
.table-box{
    width: 100%;
    margin: 48px 0;
    font-size: 14px;
 .table-delete{
    color:#246FE5 ;
    padding-left: 40px;
    cursor: pointer;
 }
}

::v-deep .el-checkbox-group{
    display: flex;
    flex-direction: column;
}
    </style>
    