<!-- 设置锚点 -->
<template>
<div class="legend_panel">
    <div class="legend" :style="{height:disHeight+'px',width:disWidth+'px'}">

        <div class="tAnchor">
            <div class="grid" v-for="(item,i) in tAnchor">
                <div  :class="[{'multiple-T':item.multiple}]">
                    <div v-show="item.visible" class="anchor-bor"></div>
                    <div class="anchor" :class="[{'anchor_chk':item.checked},{'anchor_locked':item.locked}]" v-show="item.visible" @click="changeAnchor('tAnchor',item)"></div>
                </div>
                
            </div>
        </div>
        <div class="bAnchor">
            <div class="grid" v-for="(item,i) in bAnchor">
                <div  :class="[{'multiple-B':item.multiple}]">
                    <div v-show="item.visible"  class="anchor-bor"></div>
                    <div class="anchor" :class="[{'anchor_chk':item.checked},{'anchor_locked':item.locked}]" v-show="item.visible" @click="changeAnchor('bAnchor',item)"></div>
                </div>
                
            </div>
        </div>
        <div class="lAnchor">
            <div class="grid" v-for="(item,i) in lAnchor">
                <div  :class="[{'multiple-L':item.multiple}]">
                    <div v-show="item.visible"  class="anchor-bor"></div>
                    <div class="anchor" :class="[{'anchor_chk':item.checked},{'anchor_locked':item.locked}]" v-show="item.visible" @click="changeAnchor('lAnchor',item)"></div>
                </div>
                
            </div>
        </div>
        <div class="rAnchor">
            <div class="grid" v-for="(item,i) in rAnchor">
                <div  :class="[{'multiple-R':item.multiple}]">
                    <div v-show="item.visible"  class="anchor-bor"></div>
                    <div class="anchor" :class="[{'anchor_chk':item.checked},{'anchor_locked':item.locked}]" v-show="item.visible" @click="changeAnchor('rAnchor',item)"></div>
                </div>
               
            </div>
        </div>
    </div>
</div>
</template>

    
<script>
import GetAdmData from "@/store/http/getAdmData";

export default {
    data() {
        return {

            disWidth: 0,
            disHeight: 0,

            tAnchor: [{
                'code': 'T1',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'T2',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'T3',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'T4',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'T5',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }],
            bAnchor: [{
                'code': 'B1',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'B2',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'B3',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'B4',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'B5',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }],
            lAnchor: [{
                'code': 'L1',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'L2',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'L3',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'L4',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'L5',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }],
            rAnchor: [{
                'code': 'R1',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'R2',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'R3',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'R4',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }, {
                'code': 'R5',
                'multiple': false,
                'checked': false,
                'visible': true,
                'locked':false
            }],

            changedAnchor: {}
        }
    },
    props: {
        queryBody: {
            type: Object,
            default: {}
        },
        addChangedAnchor:{
            type: Object,
            default: {}
        }
    },
    methods: {
        changeAnchor(anchorObj, item) {

            if(item.locked) return

            // this.tAnchor.forEach(item => {
            //     item.checked = false
            // })
            // this.bAnchor.forEach(item => {
            //     item.checked = false
            // })
            // this.lAnchor.forEach(item => {
            //     item.checked = false
            // })
            // this.rAnchor.forEach(item => {
            //     item.checked = false
            // })

            item.checked = !item.checked
            // this.changedAnchor = item
            // this.$emit('update:addChangedAnchor',item)
        },
        async getTextsAnchor(data) {
            this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            let params = data
            await GetAdmData.getInstantiationDetail(params).then((result) => {
                if (result.result == 'success') {
                    let rst = result.data
                    this.setLegendSize(rst.legend.legendContent.size)
                    this.setAnchor(rst.legend.legendContent.anchors)
                }
            })

            this.$loading().close();
        },
        getChangedAnchors(){
            let t = this.tAnchor.filter(x => x.checked == true && x.locked == false)
            let b = this.bAnchor.filter(x => x.checked == true && x.locked == false)
            let l = this.lAnchor.filter(x => x.checked == true && x.locked == false)
            let r = this.rAnchor.filter(x => x.checked == true && x.locked == false)

            let lst = []
            return lst.concat(t).concat(b).concat(l).concat(r)             
        },
        setLegendSize(size) {
            let bl = size.x / 100

            this.disWidth = size.x / bl
            this.disHeight = size.y / bl

            // if (size.y < 56) {
            //     this.vis_lr2 = false
            // } else if (size.y < 26) {
            //     this.vis_lr1 = false
            // } else {
            //     this.vis_lr1 = true
            //     this.vis_lr2 = true
            // }
        },
        setAnchor(anchors) {
            this.tAnchor.forEach(item => {
                item.checked = false
                item.visible = false
                item.locked = false
            })
            this.bAnchor.forEach(item => {
                item.checked = false
                item.visible = false
                item.locked = false
            })
            this.lAnchor.forEach(item => {
                item.checked = false
                item.visible = false
                item.locked = false
            })
            this.rAnchor.forEach(item => {
                item.checked = false
                item.visible = false
                item.locked = false
            })

            let t = anchors.filter(x => x.code.indexOf('T') > -1)
            let b = anchors.filter(x => x.code.indexOf('B') > -1)
            let l = anchors.filter(x => x.code.indexOf('L') > -1)
            let r = anchors.filter(x => x.code.indexOf('R') > -1)

            t.forEach(item => {
                item.visible = true
            });
            b.forEach(item => {
                item.visible = true
            });
            l.forEach(item => {
                item.visible = true
            });
            r.forEach(item => {
                item.visible = true
            });

   
            let lockT = this.queryBody.anchors.filter(x => x.code.indexOf('T') > -1)
            let lockB = this.queryBody.anchors.filter(x => x.code.indexOf('B') > -1)
            let lockL = this.queryBody.anchors.filter(x => x.code.indexOf('L') > -1)
            let lockR = this.queryBody.anchors.filter(x => x.code.indexOf('R') > -1)

            lockT.forEach(item => {
                item.locked = true
            });
            lockB.forEach(item => {
                item.locked = true
            });
            lockL.forEach(item => {
                item.locked = true
            });
            lockR.forEach(item => {
                item.locked = true
            });


            this.tAnchor = Object.values([].concat(this.tAnchor, t).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
            this.bAnchor = Object.values([].concat(this.bAnchor, b).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
            this.lAnchor = Object.values([].concat(this.lAnchor, l).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
            this.rAnchor = Object.values([].concat(this.rAnchor, r).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));


            this.tAnchor = Object.values([].concat(this.tAnchor, lockT).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
            this.bAnchor = Object.values([].concat(this.bAnchor, lockB).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
            this.lAnchor = Object.values([].concat(this.lAnchor, lockL).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
            this.rAnchor = Object.values([].concat(this.rAnchor, lockR).reduce((r, c) => (r[c.code] = Object.assign((r[c.code] || {}), c), r), {}));
        }

    },
    watch: {
        queryBody: {
            deep: true,
            immediate: true,
            handler: function (val) {
                this.getTextsAnchor(val)
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
        background: #F1F4F6;
        border: 2px solid #246FE5;

        .txt {
            width: 100px;
            height: 34px;
            line-height: 34px;
            text-align: left;
            display: block;
            // position: absolute;
            background: #fff;
            cursor: pointer;
            flex: 0 0 26px;
            border-radius: 56px;
            color: #626C78;
            font-family: 'Microsoft YaHei UI';
            font-size: 14px;
            font-weight: 400;
        }

        .txt_chk {
            background: #D9EBFF;
            color: #246FE5;
        }

        .top_panel {
            position: absolute;
            height: 0;
            width: 0;
            top: -26px;
            display: flex;
            justify-content: end;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .btm_panel {
            position: absolute;
            height: 0;
            width: 0;
            bottom: -26px;
            display: flex;
            // justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .lft_panel {
            height: 100%;
            position: absolute;
            width: 1px;
            left: -26px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: end;
            gap: 6px;
        }

        .rgt_panel {
            height: 100%;
            position: absolute;
            width: 1px;
            right: -26px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
        }

        .T1 {
            top: -64px;
        }

        .T2 {
            top: -34px;
        }

        .B1 {
            bottom: -34px;
        }

        .B2 {
            bottom: -64px;
        }

        .L1 {
            right: 0;
            position: static;
        }

        .L2 {
            right: 0;
            position: static;
        }

        .R1 {
            left: 0;
            position: static;
        }

        .R2 {
            left: 0;
            position: static;
        }

        .tAnchor,
        .bAnchor,
        .lAnchor,
        .rAnchor {
            position: absolute;
            display: flex;
            flex-direction: row;
            width: 83.33%;
            height: 0px;

            .grid {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;

                .anchor {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1.5px solid #64A6F7;
                    cursor: pointer;

                }

                .anchor_chk {
                    background: #14C4C4;
                    border: 1.5px solid #14C4C4;
                }

                .anchor_locked{
                    background: #8D9399;
                    border: 1.5px solid #8D9399;
                }
                .multiple-L{
                    position: relative;
                    .anchor-bor{
                        position: absolute;
                        left:-1.5px;
                        top:-0px;
                        display: block;
                        width: 0;
                        height: 0;
                        border-top: 4px solid transparent;
                        border-bottom: 4px solid transparent;
                        border-right: none;
                        border-left: 9px solid #64A6F7;
                        transform: scale(1.4);
                    }
                    .anchor {
                        width: 0;
                        height: 0;
                        border-radius: 0;
                        background: transparent;
                        border-top: 4px solid transparent;
                        border-bottom: 4px solid transparent;
                        border-right: none;
                        border-left: 9px solid #fff;
                        position:absolute;
                        left: -2.5px;
                        cursor: pointer;

                    }
                    .anchor_chk {
                        border-left-color: #14C4C4;
                    }
                    .anchor_locked {
                        border-left-color: #8D9399;
                    }
                   
                }
                .multiple-B{
                    position: relative;
                    .anchor-bor{
                        position: absolute;
                        left:0px;
                        top:-3.5px;
                        display: block;
                        width: 0;
                        height: 0;
                        border-top: none;
                        border-bottom:  9px solid #64A6F7;
                        border-right: 4px solid transparent;;
                        border-left: 4px solid transparent;;
                        transform: scale(1.4);
                        }
                    .anchor{
                        width: 0;
                        height: 0;
                        border-radius: 0;
                        background: transparent;
                        border-top: none;
                        border-bottom: 9px solid #fff;
                        border-right: 4px solid transparent;
                        border-left: 4px solid transparent;
                        position:absolute;
                        top: -3.5px;
                        cursor: pointer;

                       
                        
                    }
                    .anchor_chk{
                        border-bottom: 9px solid #14C4C4;
                    }
                    .anchor_locked{
                        border-bottom: 9px solid #8D9399;
                    }
                }
                .multiple-T{
                    position: relative;
                    .anchor-bor{
                        position: absolute;
                        left:0.5px;
                        top:-2px;
                        display: block;
                        width: 0;
                        height: 0;
                        border-top: 9px solid #64A6F7;
                        border-bottom: none;
                        border-right: 4px solid transparent;
                        border-left: 4px solid transparent;
                        transform: scale(1.4);
                        }
                    .anchor{
                        width: 0;
                        height: 0;
                        border-radius: 0;
                        background: transparent;
                        border-top: 9px solid #fff;
                        border-bottom: none;
                        border-right: 4px solid transparent;
                        border-left:4px solid transparent;
                        position:absolute;
                        top: -3.5px;
                        cursor: pointer;
                       
                        
                    }
                    
                    .anchor_chk{
                        border-top: 9px solid #14C4C4;
                    }
                    .anchor_locked{
                        border-top: 9px solid #8D9399;
                    }
                }
                .multiple-R{
                    position: relative;
                    .anchor-bor{
                        position: absolute;
                        left:-5px;
                        top:-0px;
                        display: block;
                        width: 0;
                        height: 0;
                        border-top: 4px solid transparent;
                        border-bottom: 4px solid transparent;
                        border-right: 9px solid #64A6F7;
                        border-left: none;
                        transform: scale(1.3);
                    }
                    .anchor{
                        width: 0;
                        height: 0;
                        border-radius: 0;
                        background: transparent;
                        border-top: 4px solid transparent;
                        border-bottom: 4px solid transparent;
                        border-right:  9px solid #fff;
                        border-left: none;
                        position:absolute;
                        left: -4.5px;
                        cursor: pointer;
                       
                        
                    }
                    .anchor_chk{
                        border-right: 9px solid #14C4C4;
                    }
                    .anchor_locked{
                        border-right: 9px solid #8D9399;
                    }
                }
            }
        }

        .tAnchor,
        .bAnchor {
            // overflow-x: clip;
        }

        .lAnchor,
        .rAnchor {
            flex-direction: column;
            height: 83.33%;
            width: 0px;
            top: 8.33%;
            // overflow-y: clip;

            .grid {

                .anchor {
                    flex: 0 0 9px;
                }
            }
        }

        .tAnchor {
            top: -1px;
        }

        .bAnchor {
            bottom: -1px;
        }

        .lAnchor {
            left: -1px;
        }

        .rAnchor {
            right: -1px;
        }
    }
}
</style>
