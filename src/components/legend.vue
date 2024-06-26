<template>
<!-- 这个组件没用着 -->
<div class="legend_panel">
    <div class="legend" :style="{height:height+'px',width:width+'px'}">
        <div class="top_panel">
            <div class="txt" v-for="(item,i) in tTxts" :class="[item.code, {'sss':1==2}]">{{ item.code }}</div>
        </div>

        <div class="btm_panel">
            <div class="txt" v-for="(item,i) in bTxts" :class="[item.code]">{{ item.code }}</div>
        </div>

        <div class="lft_panel">
            <!-- <div class="txt L1" v-show="vis_lr1"></div>
            <div class="txt L2" v-show="vis_lr2"></div> -->
            <div class="txt" v-for="(item,i) in lTxts" :class="[item.code]" v-show="item.code == 'L1'? vis_lr1 : vis_lr2">{{ item.code }}</div>
        </div>
        <div class="rgt_panel">
            <!-- <div class="txt R1" v-show="vis_lr1"></div>
            <div class="txt R2" v-show="vis_lr2"></div> -->
            <div class="txt" v-for="(item,i) in rTxts" :class="[item.code]" v-show="item.code == 'R1'? vis_lr1 : vis_lr2">{{ item.code }}</div>
        </div>

        <div class="tAnchor">
            <div class="grid" v-for="(item,i) in tAnchor">
                <div class="anchor"></div>
            </div>
        </div>
        <div class="bAnchor">
            <div class="grid" v-for="(item,i) in bAnchor">
                <div class="anchor"></div>
            </div>
        </div>
        <div class="lAnchor">
            <div class="grid" v-for="(item,i) in lAnchor">
                <div class="anchor"></div>
            </div>
        </div>
        <div class="rAnchor">
            <div class="grid" v-for="(item,i) in rAnchor">
                <div class="anchor"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            vis_lr2: true,
            vis_lr1: true,

            tTxts: [{
                    'code': 'T1',
                    'direction': 'T', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                },
                {
                    'code': 'T2',
                    'direction': 'T', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                }
            ],
            bTxts: [{
                    'code': 'B1',
                    'direction': 'B', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                },
                {
                    'code': 'B2',
                    'direction': 'B', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                }
            ],
            lTxts: [{
                    'code': 'L1',
                    'direction': 'L', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                },
                {
                    'code': 'L2',
                    'direction': 'L', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                }
            ],
            rTxts: [{
                    'code': 'R1',
                    'direction': 'R', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                },
                {
                    'code': 'R2',
                    'direction': 'R', //上下左右分别是 TBLR
                    'vertical': false, // 文本方向
                    'max_length_px': 130,
                    'interval': 0, // 文本框与图例的距离
                    'offset_px': {
                        "x": 0,
                        "y": 0
                    }
                }
            ],

            tAnchor: [{
                'code': 'T1',
                'multiple': false
            }, {
                'code': 'T2',
                'multiple': false
            }, {
                'code': 'T3',
                'multiple': false
            }, {
                'code': 'T4',
                'multiple': false
            }, {
                'code': 'T5',
                'multiple': false
            }],
            bAnchor: [{
                'code': 'B1',
                'multiple': false
            }, {
                'code': 'B2',
                'multiple': false
            }, {
                'code': 'B3',
                'multiple': false
            }, {
                'code': 'B4',
                'multiple': false
            }, {
                'code': 'B5',
                'multiple': false
            }],
            lAnchor: [{
                'code': 'L1',
                'multiple': false
            }, {
                'code': 'L2',
                'multiple': false
            }, {
                'code': 'L3',
                'multiple': false
            }, {
                'code': 'L4',
                'multiple': false
            }, {
                'code': 'L5',
                'multiple': false
            }],
            rAnchor: [{
                'code': 'R1',
                'multiple': false
            }, {
                'code': 'R2',
                'multiple': false
            }, {
                'code': 'R3',
                'multiple': false
            }, {
                'code': 'R4',
                'multiple': false
            }, {
                'code': 'R5',
                'multiple': false
            }]
        }
    },
    props: {
        width: {
            type: Number,
            default: 12
        },
        height: {
            type: Number,
            default: 12
        },
    },
    methods: {

    },
    watch: {
        height: {
            deep: true,
            immediate: true,
            handler: function (val) {
                // console.log(val)
                // if (val < 56) {
                //     this.vis_lr2 = false
                // } else if (val < 26) {
                //     this.vis_lr1 = false
                // } else {
                //     this.vis_lr1 = true
                //     this.vis_lr2 = true
                // }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.legend_panel {
    display: flex;
    min-height: 260px;
    min-width: 460px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: fit-content;

    .legend {
        width: 12px;
        height: 12px;
        background: red;
        position: relative;
        display: flex;
        justify-content: center;

        .txt {
            width: 130px;
            height: 26px;
            line-height: 26px;
            text-align: left;
            display: block;
            // position: absolute;
            background: #cccccc;
            cursor: pointer;
            flex: 0 0 26px;
        }

        .top_panel {
            position: absolute;
            height: 0;
            width: 0;
            top: -9px;
            display: flex;
            justify-content: end;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }

        .btm_panel {
            position: absolute;
            height: 0;
            width: 0;
            bottom: -9px;
            display: flex;
            // justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }

        .lft_panel {
            height: 100%;
            position: absolute;
            width: 1px;
            left: -9px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: end;
            gap: 4px;
        }

        .rgt_panel {
            height: 100%;
            position: absolute;
            width: 1px;
            right: -9px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
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
            width: 100%;
            height: 0px;

            .grid {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;

                .anchor {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: blue;
                    cursor: pointer;

                }
            }
        }

        .tAnchor,
        .bAnchor {
            overflow-x: clip;
        }

        .lAnchor,
        .rAnchor {
            flex-direction: column;
            height: 100%;
            width: 0px;
            overflow-y: clip;

            .grid {

                .anchor {
                    flex: 0 0 6px;
                }
            }
        }

        .tAnchor {
            top: 0;
        }

        .bAnchor {
            bottom: 0;
        }

        .lAnchor {
            left: 0;
        }

        .rAnchor {
            right: 0;
        }
    }
}
</style>
