<template>
    <div class="project-edit">
      <el-dialog
          title="小附件图例显隐与关系线设置"
          :visible.sync="dialogVisible"
          width="820px"
          :append-to-body='true'
          :close-on-click-modal="false"
          :modal-append-to-body='false'
          :before-close="handleClose">
          <div class="box">
            <div class="head-list">
                <div class="left" ref="menulist">
                    <span :class="['label',activeId===item.id?'active':'']"  v-for="(item,index) in equipmentList" :key="item.id" @click="enterItem(item,index)"> {{ item.name }}</span>
                </div>
                <div class="right" v-if="equipmentListIndex!=null">
                    <span @click="changeRec">
                        <img v-if="equipmentListIndex>0" src="@/assets/images/instantiation/left-ok.svg" alt="" srcset="">
                        <img v-else src="@/assets/images/instantiation/left-no.svg" alt="" srcset="">
                    </span>
                   
                    <span @click="changeAdd">
                        <img v-if="equipmentListIndex<equipmentList.length-1" src="@/assets/images/instantiation/right-ok.svg" alt="" srcset="">
                        <img v-else src="@/assets/images/instantiation/right-no.svg" alt="" srcset="">
                    </span>
                </div>
            </div>
            <div class="border"></div>
              
            <!-- 内容 -->
            <div style="margin:12px 0;" v-if="activeId">
                实例化是否显示 &nbsp; &nbsp;
                <el-radio-group :disabled="isRadio" v-model="radio" @change="radioChange">
                    <el-radio :label="false">显示</el-radio>
                    <el-radio :label="true">不显示</el-radio>
                </el-radio-group>
            </div>
            <div class="border" v-if="activeId"></div>


            <div class="content" v-if="activeId && equipmentList[equipmentListIndex].typeCode==='equipment'">

                <div class="left">
                    <p class="title">文本框显示设置</p>
                    <div class="left-box">
                       
                        <div class="center-g">
                            <div class="T">
                                <div class="t2" v-if="textList.T2">
                                    <el-checkbox v-model="textList.T2.checked">T2</el-checkbox>
                                </div>
                                <div class="t1" v-if="textList.T1">
                                    <el-checkbox v-model="textList.T1.checked">T1</el-checkbox>
                                </div>
                            </div>

                            <div class="B">
                                <div  v-if="textList.B1">
                                    <el-checkbox v-model="textList.B1.checked">B1</el-checkbox>
                                </div>
                                <div v-if="textList.B2">
                                    <el-checkbox v-model="textList.B2.checked">B2</el-checkbox>
                                </div>
                            </div>

                            <div class="L">
                                <div  v-if="textList.L1">
                                    <el-checkbox v-model="textList.L1.checked">L1</el-checkbox>
                                </div>
                                <div  v-if="textList.L2">
                                    <el-checkbox v-model="textList.L2.checked">L2</el-checkbox>
                                </div>
                            </div>

                            <div class="R">
                                <div  v-if="textList.R1">
                                    <el-checkbox v-model="textList.R1.checked">R1</el-checkbox>
                                </div>
                                <div  v-if="textList.R2">
                                    <el-checkbox v-model="textList.R2.checked">R2</el-checkbox>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="right">
                    <p class="title">锚点偏移设置</p>
                    <div class="right-box">
                        <div class="legend" :style="{width:legendInfo.x+'px',height:legendInfo.y+'px'}">

                            <div class="t" v-for="item in anchorAll['T']"   :key="item">
                                <div v-if="legendAnchor[item].checked" :style="{position:'absolute',left:legendAnchor[item].x+'px',top:legendAnchor[item].y+'px'}" @mousedown="legendDrag('T',item,$event)">
                                    <img v-if="legendAnchor[item].multiple" src="@/assets/images/instantiation/h-m.svg" alt="" srcset="">
                                    <img v-else src="@/assets/images/instantiation/j.svg" alt="" srcset="">
                                </div>
                                
                            </div>

                            <div class="l" v-for="item in anchorAll['L']"   :key="item">
                                <div v-if="legendAnchor[item].checked" :style="{position:'absolute',left:legendAnchor[item].x+'px',top:legendAnchor[item].y+'px'}"  @mousedown="legendDrag('L',item,$event)">
                                    <img v-if="legendAnchor[item].multiple" src="@/assets/images/instantiation/z-m.svg" alt="" srcset="">
                                    <img v-else src="@/assets/images/instantiation/j.svg" alt="" srcset="">
                                </div>
                                
                            </div>

                            <div class="r" v-for="item in anchorAll['R']"   :key="item">
                                <div v-if="legendAnchor[item].checked" :style="{position:'absolute',left:legendAnchor[item].x+'px',top:legendAnchor[item].y+'px'}" @mousedown="legendDrag('R',item,$event)">
                                    <img v-if="legendAnchor[item].multiple" src="@/assets/images/instantiation/z-m.svg" alt="" srcset="">
                                    <img v-else src="@/assets/images/instantiation/j.svg" alt="" srcset="">
                                </div>
                                
                            </div>
                            <div class="b" v-for="item in anchorAll['B']"   :key="item">
                                <div v-if="legendAnchor[item].checked" :style="{position:'absolute',left:legendAnchor[item].x+'px',top:legendAnchor[item].y+'px'}" @mousedown="legendDrag('B',item,$event)">
                                    <img v-if="legendAnchor[item].multiple" src="@/assets/images/instantiation/h-m.svg" alt="" srcset="">
                                    <img v-else src="@/assets/images/instantiation/j.svg" alt="" srcset="">
                                </div>
                                
                            </div>



                        </div>
                    </div>

                    <div class="right-alert">
                        <div>
                            <img src="@/assets/images/instantiation/j.svg" alt="" srcset="">
                            <span>静态锚点</span>
                        </div>
                        <div>
                            <img src="@/assets/images/instantiation/h-m.svg" alt="" srcset="">
                            <span>横向动态锚点</span>
                        </div>
                        <div>
                            <img src="@/assets/images/instantiation/z-m.svg" alt="" srcset="">
                            <span>纵向动态锚点</span>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div class="attachs-title" v-if="activeId && equipmentList[equipmentListIndex].typeCode==='attachs'">
                    <div :class="['attachs-left',attachsIndex===0?'attachs-checked':'']" @click="attachsIndex=1">文本框显示设置</div>
                    <div :class="['attachs-right',attachsIndex===1?'attachs-checked':'']" @click="attachsIndex=1">关系线显示设置</div>    
                </div>
            </div>

            <div class="content" v-if="activeId && equipmentList[equipmentListIndex].typeCode==='attachs'&&attachsIndex===0">
                <div class="left">
                    <p class="title">横向图例显示设置</p>
                    <div class="left-box">
                    
                        <div class="center-g">
                            <div class="T"  @mouseenter="topTooltipVisLeft = true" @mouseleave="topTooltipVisLeft = false">
								<div class="input-box">
                                    <span v-if="!TarrLeft.length" style="color:#c4c9cf;">请选择</span>
									<template v-for="(item, index) in TarrLeft">
										<div class="item"  :key="item" v-if="index<2">
											<span class="name">{{item}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delChecked(item)">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
										<div class="item" :key="index" v-if="index==1&&TarrLeft.length>2">
											<span class="name">+{{TarrLeft.length-2}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delCheckedArr('T')">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
									</template>
									
								</div>
								<el-popover placement="right" width="160" trigger="click">
									<div class="t_Content">
										<div class="t2" v-if="textListLeft.T9">
											<el-checkbox :disabled="radio" v-model="textListLeft.T9.checked">T9</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T9</el-checkbox>
										</div>
										<div class="t2" v-if="textListLeft.T8">
											<el-checkbox :disabled="radio" v-model="textListLeft.T8.checked">T8</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T8</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListLeft.T7">
											<el-checkbox :disabled="radio" v-model="textListLeft.T7.checked">T7</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T7</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListLeft.T6">
											<el-checkbox :disabled="radio" v-model="textListLeft.T6.checked">T6</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T6</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListLeft.T5">
											<el-checkbox :disabled="radio" v-model="textListLeft.T5.checked">T5</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T5</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListLeft.T4">
											<el-checkbox :disabled="radio" v-model="textListLeft.T4.checked">T4</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T4</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListLeft.T3">
											<el-checkbox :disabled="radio" v-model="textListLeft.T3.checked">T3</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T3</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListLeft.T2">
											<el-checkbox :disabled="radio" v-model="textListLeft.T2.checked">T2</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T2</el-checkbox>
										</div>
										
										<div class="t1" v-if="textListLeft.T1">
											<el-checkbox :disabled="radio" v-model="textListLeft.T1.checked">T1</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T1</el-checkbox>
										</div>
										
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" class="click-icon" slot="reference" width="17" height="16" viewBox="0 0 17 16" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7469 7.53812C11.0361 7.77805 11.0361 8.22174 10.7469 8.46167L6.28663 12.162C5.89559 12.4864 5.30353 12.2083 5.30353 11.7002L5.30353 4.29958C5.30353 3.7915 5.89559 3.5134 6.28662 3.83781L10.7469 7.53812Z" fill="#C4C9CF" />
									</svg>
									
								</el-popover>
								<div class="t_tooltip" v-if="topTooltipVisLeft&&TarrLeft.length">
									<div class="item" v-for="(item) in TarrLeft" :key="item">
										{{item}}
									</div>
								</div>
                                
                            </div>

                            <div class="B"  @mouseenter="btmTooltipVisLeft = true" @mouseleave="btmTooltipVisLeft = false">
								<div class="input-box">
                                    <span v-if="!BarrLeft.length" style="color:#c4c9cf;">请选择</span>
									<template v-for="(item, index) in BarrLeft">
										<div class="item"  :key="item" v-if="index<2">
											<span class="name">{{item}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delChecked(item)">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
										<div class="item" :key="index" v-if="index==1&&BarrLeft.length>2">
											<span class="name">+{{BarrLeft.length-2}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delCheckedArr('B')">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
									</template>
									
								</div>
								<el-popover placement="right" width="160" trigger="click">
									<div class="t_Content">
										<div  v-if="textListLeft.B1">
											<el-checkbox :disabled="radio" v-model="textListLeft.B1.checked">B1</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B1</el-checkbox>
										</div>
										<div  v-if="textListLeft.B2">
											<el-checkbox :disabled="radio" v-model="textListLeft.B2.checked">B2</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B2</el-checkbox>
										</div>
										<div  v-if="textListLeft.B3">
											<el-checkbox :disabled="radio" v-model="textListLeft.B3.checked">B3</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B3</el-checkbox>
										</div>
										<div  v-if="textListLeft.B4">
											<el-checkbox :disabled="radio" v-model="textListLeft.B4.checked">B4</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B4</el-checkbox>
										</div>
										<div  v-if="textListLeft.B5">
											<el-checkbox :disabled="radio" v-model="textListLeft.B5.checked">B5</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B5</el-checkbox>
										</div>
										<div  v-if="textListLeft.B6">
											<el-checkbox :disabled="radio" v-model="textListLeft.B6.checked">B6</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B6</el-checkbox>
										</div>
										<div  v-if="textListLeft.B7">
											<el-checkbox :disabled="radio" v-model="textListLeft.B7.checked">B7</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B7</el-checkbox>
										</div>
										<div  v-if="textListLeft.B8">
											<el-checkbox :disabled="radio" v-model="textListLeft.B8.checked">B8</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B8</el-checkbox>
										</div>
										<div  v-if="textListLeft.B9">
											<el-checkbox :disabled="radio" v-model="textListLeft.B9.checked">B9</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B9</el-checkbox>
										</div>
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" class="click-icon" slot="reference" width="17" height="16" viewBox="0 0 17 16" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7469 7.53812C11.0361 7.77805 11.0361 8.22174 10.7469 8.46167L6.28663 12.162C5.89559 12.4864 5.30353 12.2083 5.30353 11.7002L5.30353 4.29958C5.30353 3.7915 5.89559 3.5134 6.28662 3.83781L10.7469 7.53812Z" fill="#C4C9CF" />
									</svg>
									
								</el-popover>
								<div class="b_tooltip" v-if="btmTooltipVisLeft&&BarrLeft.length">
									<div class="item" v-for="(item) in BarrLeft" :key="item">
										{{item}}
									</div>
								</div>
                               
                            </div>

                            <div class="L">
                                <div  v-if="textListLeft.L1">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.L1.checked">L1</el-checkbox>
                                </div>
                                <div  v-if="textListLeft.L2">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.L2.checked">L2</el-checkbox>
                                </div>
                            </div>

                            <div class="R">
                                <div  v-if="textListLeft.R1">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.R1.checked">R1</el-checkbox>
                                </div>
                                <div  v-if="textListLeft.R2">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.R2.checked">R2</el-checkbox>
                                </div>
                            </div>
                            <div class="C">
                                <div  v-if="textListLeft.C1">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.C1.checked">C1</el-checkbox>
                                </div>
                                <div  v-if="textListLeft.C2">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.C2.checked">C2</el-checkbox>
                                </div>
                                <div  v-if="textListLeft.C3">
                                    <el-checkbox :disabled="radio" v-model="textListLeft.C3.checked">C3</el-checkbox>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="left" style="border-left: 1px solid #E8ECF0;padding-left:10px;overflow:hidden;">
                    <p class="title">纵向图例显示设置</p>
                    <div class="left-box">
                    
                        <div class="center-g">
                            <!-- <div class="T">
                                <div class="t2" v-if="textListRight.T2">
                                    <el-checkbox :disabled="radio" v-model="textListRight.T2.checked">T2</el-checkbox>
                                </div>
                                <div class="t1" v-if="textListRight.T1">
                                    <el-checkbox :disabled="radio" v-model="textListRight.T1.checked">T1</el-checkbox>
                                </div>
                            </div>

                            <div class="B">
                                <div  v-if="textListRight.B1">
                                    <el-checkbox :disabled="radio" v-model="textListRight.B1.checked">B1</el-checkbox>
                                </div>
                                <div v-if="textListRight.B2">
                                    <el-checkbox :disabled="radio" v-model="textListRight.B2.checked">B2</el-checkbox>
                                </div>
                            </div> -->
                            <div class="T"  @mouseenter="topTooltipVisRight = true" @mouseleave="topTooltipVisRight = false">
								<div class="input-box">
                                    <span v-if="!TarrRight.length" style="color:#c4c9cf;">请选择</span>
									<template v-for="(item, index) in TarrRight">
										<div class="item"  :key="item" v-if="index<2">
											<span class="name">{{item}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delCheckedRight(item)">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
										<div class="item" :key="index" v-if="index==1&&TarrRight.length>2">
											<span class="name">+{{TarrRight.length-2}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delCheckedArrRight('T')">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
									</template>
									
								</div>
								<el-popover placement="right" width="160" trigger="click">
									<div class="t_Content">
										<div class="t2" v-if="textListRight.T9">
											<el-checkbox :disabled="radio" v-model="textListRight.T9.checked">T9</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T9</el-checkbox>
										</div>
										<div class="t2" v-if="textListRight.T8">
											<el-checkbox :disabled="radio" v-model="textListRight.T8.checked">T8</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T8</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListRight.T7">
											<el-checkbox :disabled="radio" v-model="textListRight.T7.checked">T7</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T7</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListRight.T6">
											<el-checkbox :disabled="radio" v-model="textListRight.T6.checked">T6</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T6</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListRight.T5">
											<el-checkbox :disabled="radio" v-model="textListRight.T5.checked">T5</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T5</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListRight.T4">
											<el-checkbox :disabled="radio" v-model="textListRight.T4.checked">T4</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T4</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListRight.T3">
											<el-checkbox :disabled="radio" v-model="textListRight.T3.checked">T3</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T3</el-checkbox>
										</div>
										
										<div class="t2" v-if="textListRight.T2">
											<el-checkbox :disabled="radio" v-model="textListRight.T2.checked">T2</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T2</el-checkbox>
										</div>
										
										<div class="t1" v-if="textListRight.T1">
											<el-checkbox :disabled="radio" v-model="textListRight.T1.checked">T1</el-checkbox>
										</div>
										<div class="t2" v-else>
											<el-checkbox disabled >T1</el-checkbox>
										</div>
										
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" class="click-icon" slot="reference" width="17" height="16" viewBox="0 0 17 16" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7469 7.53812C11.0361 7.77805 11.0361 8.22174 10.7469 8.46167L6.28663 12.162C5.89559 12.4864 5.30353 12.2083 5.30353 11.7002L5.30353 4.29958C5.30353 3.7915 5.89559 3.5134 6.28662 3.83781L10.7469 7.53812Z" fill="#C4C9CF" />
									</svg>
									
								</el-popover>
								<div class="t_tooltip" v-if="topTooltipVisRight&&TarrRight.length">
									<div class="item" v-for="(item) in TarrRight" :key="item">
										{{item}}
									</div>
								</div>
                                
                            </div>

                            <div class="B"  @mouseenter="btmTooltipVisRight = true" @mouseleave="btmTooltipVisRight = false">
								<div class="input-box">
                                    <span v-if="!BarrRight.length" style="color:#c4c9cf;">请选择</span>
									<template v-for="(item, index) in BarrRight">
										<div class="item"  :key="item" v-if="index<2">
											<span class="name">{{item}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delCheckedRight(item)">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
										<div class="item" :key="index" v-if="index==1&&BarrRight.length>2">
											<span class="name">+{{BarrRight.length-2}}</span>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 16" fill="none" @click="delCheckedArrRight('B')">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30353 7.33322L11.6369 3.99988L12.3035 4.66655L8.9702 7.99988L12.3035 11.3332L11.6369 11.9999L8.30353 8.66655L4.9702 11.9999L4.30353 11.3332L7.63687 7.99988L4.30353 4.66655L4.9702 3.99988L8.30353 7.33322Z" fill="#424C59" />
												<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9702 3.71704L8.30353 7.05037L11.6369 3.71704L12.5864 4.66655L9.25304 7.99988L12.5864 11.3332L11.6369 12.2827L8.30353 8.94939L4.9702 12.2827L4.02069 11.3332L7.35402 7.99988L4.02069 4.66655L4.9702 3.71704ZM11.6369 4.28273L8.30353 7.61606L4.9702 4.28273L4.58638 4.66655L7.91971 7.99988L4.58638 11.3332L4.9702 11.717L8.30353 8.38371L11.6369 11.717L12.0207 11.3332L8.68736 7.99988L12.0207 4.66655L11.6369 4.28273Z" fill="#424C59" />
											</svg>
										</div>
									</template>
									
								</div>
								<el-popover placement="right" width="160" trigger="click">
									<div class="t_Content">
										<div  v-if="textListRight.B1">
											<el-checkbox :disabled="radio" v-model="textListRight.B1.checked">B1</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B1</el-checkbox>
										</div>
										<div  v-if="textListRight.B2">
											<el-checkbox :disabled="radio" v-model="textListRight.B2.checked">B2</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B2</el-checkbox>
										</div>
										<div  v-if="textListRight.B3">
											<el-checkbox :disabled="radio" v-model="textListRight.B3.checked">B3</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B3</el-checkbox>
										</div>
										<div  v-if="textListRight.B4">
											<el-checkbox :disabled="radio" v-model="textListRight.B4.checked">B4</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B4</el-checkbox>
										</div>
										<div  v-if="textListRight.B5">
											<el-checkbox :disabled="radio" v-model="textListRight.B5.checked">B5</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B5</el-checkbox>
										</div>
										<div  v-if="textListRight.B6">
											<el-checkbox :disabled="radio" v-model="textListRight.B6.checked">B6</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B6</el-checkbox>
										</div>
										<div  v-if="textListRight.B7">
											<el-checkbox :disabled="radio" v-model="textListRight.B7.checked">B7</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B7</el-checkbox>
										</div>
										<div  v-if="textListRight.B8">
											<el-checkbox :disabled="radio" v-model="textListRight.B8.checked">B8</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B8</el-checkbox>
										</div>
										<div  v-if="textListRight.B9">
											<el-checkbox :disabled="radio" v-model="textListRight.B9.checked">B9</el-checkbox>
										</div>
										<div v-else>
											<el-checkbox disabled >B9</el-checkbox>
										</div>
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" class="click-icon" slot="reference" width="17" height="16" viewBox="0 0 17 16" fill="none">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7469 7.53812C11.0361 7.77805 11.0361 8.22174 10.7469 8.46167L6.28663 12.162C5.89559 12.4864 5.30353 12.2083 5.30353 11.7002L5.30353 4.29958C5.30353 3.7915 5.89559 3.5134 6.28662 3.83781L10.7469 7.53812Z" fill="#C4C9CF" />
									</svg>
									
								</el-popover>
								<div class="b_tooltip" v-if="btmTooltipVisRight&&BarrRight.length">
									<div class="item" v-for="(item) in BarrRight" :key="item">
										{{item}}
									</div>
								</div>
                               
                            </div>

                            <div class="L">
                                <div  v-if="textListRight.L1">
                                    <el-checkbox :disabled="radio" v-model="textListRight.L1.checked">L1</el-checkbox>
                                </div>
                                <div  v-if="textListRight.L2">
                                    <el-checkbox :disabled="radio" v-model="textListRight.L2.checked">L2</el-checkbox>
                                </div>
                            </div>

                            <div class="R">
                                <div  v-if="textListRight.R1">
                                    <el-checkbox :disabled="radio" v-model="textListRight.R1.checked">R1</el-checkbox>
                                </div>
                                <div  v-if="textListRight.R2">
                                    <el-checkbox :disabled="radio" v-model="textListRight.R2.checked">R2</el-checkbox>
                                </div>
                            </div>
                            <div class="C">
                                <div  v-if="textListRight.C1">
                                    <el-checkbox :disabled="radio" v-model="textListRight.C1.checked">C1</el-checkbox>
                                </div>
                                <div  v-if="textListRight.C2">
                                    <el-checkbox :disabled="radio" v-model="textListRight.C2.checked">C2</el-checkbox>
                                </div>
                                <div  v-if="textListRight.C3">
                                    <el-checkbox :disabled="radio" v-model="textListRight.C3.checked">C3</el-checkbox>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>




            <div class="check-btn" style="margin-bottom:10px;" v-if="activeId && equipmentList[equipmentListIndex].typeCode==='attachs'&&attachsIndex===1">
                <el-checkbox :indeterminate="isIndeterminate" v-model="allBtn" @change="handleCheckAllChange" >全选</el-checkbox>
                
                <el-button type="text" style="margin-left:10px"  @click="invertBtnChange">反选</el-button>
            </div>


            <div class="content" v-if="activeId && equipmentList[equipmentListIndex].typeCode==='attachs'&&attachsIndex===1">
                <div class="check-list" >
                        <el-checkbox-group v-model="legendAnchor" :disabled="radio" @change="changeLegendAnchorFun">
                            <el-checkbox v-for="item in legendAnchorList" :label="item.id" :key="item.id">
                                <div class="name-box" style="margin-bottom: 6px;">
                                    <el-tooltip class="item" effect="dark" :content="item.templateConnector1+'  →  '+item.templateConnector2" placement="top">
                                        <span class="name-left">{{ item.templateConnector1+'&nbsp;→&nbsp;'+item.templateConnector2 }}</span>
                                    </el-tooltip>
                                    <span class="name-right">
                                        {{ item.name }}
                                    </span>
                                </div></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>











            
          </div>
  
          <span  slot="footer" class="dialog-footer">
             <div v-if="activeId">
                <el-button size="mini"  @click="handleClose">取消</el-button>
                <el-button size="mini" type="primary"  @click="save">确定</el-button>

             </div>
          </span>
          </el-dialog>
    </div>
  </template>
  
  <script>
  import getTemplate from "@/store/http/getTemplate";
  import GetAdmData from "@/store/http/getAdmData";
  import setFilter from "@/store/http/setFilter"
  
  export default {
    name: "Edit",
    props:['dialogVisible','instantiationAttachData'],
    data() {
      return {
        equipmentList:[],
        equipmentListIndex:null,
        activeId:null,
        textList:{},

        attachsIndex:1,
        textListLeft:{},
        textListRight: {},
        TarrLeft:[],
		BarrLeft:[],
		topTooltipVisLeft: false,
		btmTooltipVisLeft: false,

        TarrRight:[],
		BarrRight:[],
		topTooltipVisRight: false,
		btmTooltipVisRight: false,

        legendAnchorList:[],
        legendInfo:{
            x:0,
            y:0,
        },

        anchorAll:{T:['T1','T2','T3','T4','T5',],B:['B1','B2','B3','B4','B5',],L:['L1','L2','L3','L4','L5',],R:['R1','R2','R3','R4','R5']},
        legendAnchor:{},


        templateLegendList:[],

        // 默认基本值
        legendAnchorOrigin:{},
        isRadio:false,
        radio:false,

        // 全选 反选功能
        isIndeterminate:false,
        allBtn:false,
        invertBtn:false,

      
      }
    },
     computed: {
     
    },
    mounted() {
      
    },
    created(){
        // this.graphTemplateLoad()
        // console.error(this.instantiationAttachData)
        if(this.instantiationAttachData){
            this.equipmentList = JSON.parse(JSON.stringify(this.instantiationAttachData))
            if(this.equipmentList.length){
                this.enterItem(this.equipmentList[0],0)
            }
        }else{
            this.graphTemplateLoad()
        }
    },
    watch:{
		textListLeft: {
			deep: true,
			immediate: true,
			handler: function (val) {
				let T = ['T1','T2','T3','T4','T5','T6','T7','T8','T9'];
				let Tarr = []

				let B = ['B1','B2','B3','B4','B5','B6','B7','B8','B9'];
				let Barr = []
				for(let i = 0;i<T.length;i++){
					if(this.textListLeft[T[i]]&&this.textListLeft[T[i]].checked){
						Tarr.push(T[i])
					}
				}
				this.TarrLeft = Tarr
				for(let i = 0;i<B.length;i++){
					if(this.textListLeft[B[i]]&&this.textListLeft[B[i]].checked){
						Barr.push(B[i])
					}
				}
				this.BarrLeft = Barr
			},
		},
        textListRight: {
			deep: true,
			immediate: true,
			handler: function (val) {
				let T = ['T1','T2','T3','T4','T5','T6','T7','T8','T9'];
				let Tarr = []

				let B = ['B1','B2','B3','B4','B5','B6','B7','B8','B9'];
				let Barr = []
				for(let i = 0;i<T.length;i++){
					if(this.textListRight[T[i]]&&this.textListRight[T[i]].checked){
						Tarr.push(T[i])
					}
				}
				this.TarrRight = Tarr
				for(let i = 0;i<B.length;i++){
					if(this.textListRight[B[i]]&&this.textListRight[B[i]].checked){
						Barr.push(B[i])
					}
				}
				this.BarrRight = Barr
			},
		},
	},
    methods: {
      handleCheckAllChange(val){
        if(val){
            this.legendAnchor = JSON.parse(JSON.stringify(this.equipmentList[this.equipmentListIndex].legendAnchor))
            this.equipmentList[this.equipmentListIndex].legendAnchorChange = JSON.parse(JSON.stringify(this.legendAnchor))
        }else{
            this.legendAnchor = []
            this.equipmentList[this.equipmentListIndex].legendAnchorChange = []
        }   
        this.isIndeterminate = false;
        },
      handleClose(){
          this.$emit('editChose');
      },
      async graphTemplateLoad() {
        this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let annexFilter = []
            await setFilter.getDetailShow({
                    templateId: this.$route.query.templateid,
                    // operate: "relLineMap"
                    operate: "attach-list"
            }).then(res=>{
                annexFilter = res.data.attachs
            })
            let all = []
            console.error(annexFilter)
            for(let i = 0;i<annexFilter.length;i++){
                        annexFilter[i]['typeCode'] = 'attachs'
                        annexFilter[i].legendId = annexFilter[i].id
                        annexFilter[i]['textListLeft'] = null;
                        annexFilter[i]['textListLeftChange'] = null;
                        annexFilter[i]['textListRight'] = null;
                        annexFilter[i]['textListRightChange'] = null;
                        annexFilter[i]['legendAnchor'] = null
                        annexFilter[i]['legendAnchorChange'] = null
                        annexFilter[i]['layoutHidden'] = false
                        annexFilter[i]['hidden'] = false
                        all.push(annexFilter[i])
                    }
            
            this.equipmentList = all
                
            this.$loading().close();
            if(this.equipmentList.length){
                this.enterItem(this.equipmentList[0],0)
            }
        },
   
        enterItem(item,index){
            this.activeId = item.id
            this.equipmentListIndex = index
            if(item.typeCode==='attachs'){
                this.enterItemAttachs(item,index)
                return
            }
             },
        enterItemAttachs(item,index){
             // hidden
            this.isRadio = this.equipmentList[index].layoutHidden
            this.radio = this.equipmentList[index].hidden


            let textListLeft = {}
            let textListRight = {}

            let loadTextList = item.attachLegends
            // loadTextList = [{textList:['T1','T2','B1','B2','L1','L2','R1','R2','C1','C2','C3']},{textList:['T1','T2','B1','B2','L1','L2','R1','R2','C1','C2']}]
            let loadValidAnchors = []
            // 修改为从load中拿到的信息
            for(let i = 0 ;i<loadTextList[0].textList.length;i++){
                textListLeft[loadTextList[0].textList[i]] = {
                    checked : true
                }
            }
            for(let i = 0 ;i<loadTextList[1].textList.length;i++){
                textListRight[loadTextList[1].textList[i]] = {
                    checked : true
                }
            }


            //   文本
            if(this.equipmentList[index].textListLeft){
                this.textListLeft = this.equipmentList[index].textListLeftChange
            }else{
                this.equipmentList[index].textListLeft = JSON.parse(JSON.stringify(textListLeft))
                this.equipmentList[index].textListLeftChange = textListLeft
                this.textListLeft = this.equipmentList[index].textListLeftChange

            }
            if(this.equipmentList[index].textListRight){
                this.textListRight = this.equipmentList[index].textListRightChange
            }else{
                this.equipmentList[index].textListRight = JSON.parse(JSON.stringify(textListRight))
                this.equipmentList[index].textListRightChange = textListRight
                this.textListRight = this.equipmentList[index].textListRightChange

            }

            // 关系清空
            this.legendAnchorList = []
            // 获取关系
            setFilter.getDetailShow({
                    templateId: this.$route.query.templateid,
                    attachId:item.id,
                    // operate: "relLineMap"
                    operate: "attach-detail"
            }).then(res=>{
                let relLineName = Object.keys(res.data.relLineMap)
                let relLineMap = Object.values(res.data.relLineMap)

                if(relLineMap.length){
                    let legendAnchorChange = []
                    // 组装关系列表数据
                    for(let i = 0;i<relLineMap.length;i++){
                        for(let j = 0;j<relLineMap[i].length;j++){
                            relLineMap[i][j].name = relLineName[i]
                            loadValidAnchors.push(relLineMap[i][j])
                            legendAnchorChange.push(relLineMap[i][j].id)
                        }
                    }
                    this.legendAnchorList = loadValidAnchors

                    if(this.equipmentList[index].legendAnchor){
                        this.legendAnchor = this.equipmentList[index].legendAnchorChange
                    }else{
                        this.equipmentList[index].legendAnchor = [...legendAnchorChange]
                        this.equipmentList[index].legendAnchorChange = legendAnchorChange
                        this.legendAnchor = this.equipmentList[index].legendAnchorChange

                    }
                    this.showBtn(this.legendAnchor)
                }else{
                    setFilter.getDetailShow({
                            templateId: this.$route.query.templateid,
                            operate: "relLineMap"
                    }).then(res=>{
                         relLineName = Object.keys(res.data.relLineMap)
                         relLineMap = Object.values(res.data.relLineMap)
                        let legendAnchorChange = []
                         // 组装关系列表数据
                        for(let i = 0;i<relLineMap.length;i++){
                            for(let j = 0;j<relLineMap[i].length;j++){
                                relLineMap[i][j].name = relLineName[i]
                                loadValidAnchors.push(relLineMap[i][j])
                                legendAnchorChange.push(relLineMap[i][j].id)
                            }
                        }
                        this.legendAnchorList = loadValidAnchors

                        if(this.equipmentList[index].legendAnchor){
                            this.legendAnchor = this.equipmentList[index].legendAnchorChange
                        }else{
                            this.equipmentList[index].legendAnchor = [...legendAnchorChange]
                            this.equipmentList[index].legendAnchorChange = legendAnchorChange
                            this.legendAnchor = this.equipmentList[index].legendAnchorChange

                        }
                        this.showBtn(this.legendAnchor)

                    })
                }

                

            })

        },
        showBtn(val){
            if(val.length){
                if(val.length===this.legendAnchorList.length){
                    this.isIndeterminate = false;
                    this.allBtn = true
                }else{
                    this.isIndeterminate = true;
                    this.allBtn = false
                }
            }else{
                this.isIndeterminate = false;
                this.allBtn = false
            }
        },
        changeLegendAnchorFun(){
            
            this.equipmentList[this.equipmentListIndex].legendAnchorChange = JSON.parse(JSON.stringify(this.legendAnchor))
            this.showBtn(this.legendAnchor)

        },
        invertBtnChange(){
            let invertArr = []
            this.equipmentList[this.equipmentListIndex].legendAnchor
            for(let i = 0; i<this.equipmentList[this.equipmentListIndex].legendAnchor.length;i++){
               if(!this.legendAnchor.includes(this.equipmentList[this.equipmentListIndex].legendAnchor[i])){
                invertArr.push(this.equipmentList[this.equipmentListIndex].legendAnchor[i])
               }
            }
            this.legendAnchor = invertArr
            this.equipmentList[this.equipmentListIndex].legendAnchorChange = JSON.parse(JSON.stringify(this.legendAnchor))
            this.showBtn(this.legendAnchor)
        },

      
       
        save(){
            let legendDescMap = {}  //图例

            let templateAttachDescMap = {} //小附件
            // console.error(this.equipmentList)
            for(let i = 0;i<this.equipmentList.length;i++){
                if(this.equipmentList[i].textList||this.equipmentList[i].legendAnchor){

                    if(this.equipmentList[i].typeCode==='equipment'){
                        legendDescMap[this.equipmentList[i].legendId] = {
                        anchorOffset:{},
                        textHidden:{},
                        hidden:this.equipmentList[i].hidden
                    }
                     for(let item in this.equipmentList[i].textListChange){
                        if(this.equipmentList[i].textListChange[item].checked!==this.equipmentList[i].textList[item].checked){
                            if(legendDescMap[this.equipmentList[i].legendId]['textHidden'][item]){
                                legendDescMap[this.equipmentList[i].legendId]['textHidden']={[item]:{}}
                            }
                            legendDescMap[this.equipmentList[i].legendId]['textHidden'][item] = !this.equipmentList[i].textListChange[item].checked
                        }
                     }

                     for(let item in this.equipmentList[i].legendAnchorChange){
                        if(this.equipmentList[i].legendAnchorChange[item].x!==this.equipmentList[i].legendAnchor[item].x){
                            if(!legendDescMap[this.equipmentList[i].legendId]['anchorOffset'][item]){
                                legendDescMap[this.equipmentList[i].legendId]['anchorOffset'][item]={x:null,y:null}
                            }

                            legendDescMap[this.equipmentList[i].legendId]['anchorOffset'][item]['x'] = this.equipmentList[i].legendAnchorChange[item].x-this.equipmentList[i].legendAnchor[item].x
                            console.error( legendDescMap[this.equipmentList[i].legendId]['anchorOffset'])
                        }
                        if(this.equipmentList[i].legendAnchorChange[item].y!==this.equipmentList[i].legendAnchor[item].y){
                            if(!legendDescMap[this.equipmentList[i].legendId]['anchorOffset'][item]){
                                legendDescMap[this.equipmentList[i].legendId]['anchorOffset'][item]={x:null,y:null}
                            }
                            legendDescMap[this.equipmentList[i].legendId]['anchorOffset'][item]['y'] = this.equipmentList[i].legendAnchorChange[item].y-this.equipmentList[i].legendAnchor[item].y
                        }
                     }
                    }else{
                        templateAttachDescMap[this.equipmentList[i].legendId] = {
                            descs:[{textHidden:{}, "legendOffset": 0},{textHidden:{}, "legendOffset": 0}],
                            lineList:[],
                            hidden:this.equipmentList[i].hidden
                        }

                        for(let item in this.equipmentList[i].textListLeft){
                            if(this.equipmentList[i].textListLeftChange[item].checked!==this.equipmentList[i].textListLeft[item].checked){
                                if(templateAttachDescMap[this.equipmentList[i].legendId].descs[0]['textHidden'][item]){
                                    templateAttachDescMap[this.equipmentList[i].legendId].descs[0]['textHidden']={[item]:{}}
                                }
                                templateAttachDescMap[this.equipmentList[i].legendId].descs[0]['textHidden'][item] = !this.equipmentList[i].textListLeftChange[item].checked
                            }
                        }

                        for(let item in this.equipmentList[i].textListRight){
                            if(this.equipmentList[i].textListRightChange[item].checked!==this.equipmentList[i].textListRight[item].checked){
                                if(templateAttachDescMap[this.equipmentList[i].legendId].descs[1]['textHidden'][item]){
                                    templateAttachDescMap[this.equipmentList[i].legendId].descs[1]['textHidden']={[item]:{}}
                                }
                                templateAttachDescMap[this.equipmentList[i].legendId].descs[1]['textHidden'][item] = !this.equipmentList[i].textListRightChange[item].checked
                            }
                        }
                        
                        for(let  legendIndex = 0;legendIndex<this.equipmentList[i].legendAnchorChange.length;legendIndex++){
                            templateAttachDescMap[this.equipmentList[i].legendId].lineList.push(this.equipmentList[i].legendAnchorChange[legendIndex])
                        }
                    }



                    

                }
            }


            // console.error(legendDescMap,templateAttachDescMap)
            // return

            this.$emit('editInfo',templateAttachDescMap)
            this.handleClose()
    
        },

        radioChange(){
            for(let i = 0;i<this.equipmentList.length;i++){
                if(this.activeId === this.equipmentList[i].id){
                    this.equipmentList[i].hidden = this.radio
                }
            }
        },
        changeRec(){
            if(this.equipmentListIndex>0){
                let item = {}
                for(let i=0;i<this.equipmentList.length;i++){
                    if(i===this.equipmentListIndex-1){
                        item = this.equipmentList[i]
                    }
                }
                this.enterItem(item,this.equipmentListIndex-1)
                this.scrollChange()
            }

        },
        changeAdd(){
            if(this.equipmentListIndex<this.equipmentList.length-1){
                let item = {}
                for(let i=0;i<this.equipmentList.length;i++){
                    if(i===this.equipmentListIndex+1){
                        item = this.equipmentList[i]
                    }
                }
                this.enterItem(item,this.equipmentListIndex+1)
                this.scrollChange()
            }
        },
        delChecked(key){
			this.textListLeft[key].checked = false
		},
		delCheckedArr(code){
			let delArr = []
			if(code==='T'){
				for(let i = 0;i<this.TarrLeft.length;i++){
					if(i>1){
						delArr.push(this.TarrLeft[i])
					}
				}
				for(let i = 0;i<delArr.length;i++){
					this.textListLeft[delArr[i]].checked = false
				}
			}else if(code==='B'){
				for(let i = 0;i<this.BarrLeft.length;i++){
					if(i>1){
						delArr.push(this.BarrLeft[i])
					}
				}
				for(let i = 0;i<delArr.length;i++){
					this.textListLeft[delArr[i]].checked = false
				}
			}
			
		},
        delCheckedRight(key){
			this.textListRight[key].checked = false
		},
		delCheckedArrRight(code){
			let delArr = []
			if(code==='T'){
				for(let i = 0;i<this.TarrRight.length;i++){
					if(i>1){
						delArr.push(this.TarrRight[i])
					}
				}
				for(let i = 0;i<delArr.length;i++){
					this.textListRight[delArr[i]].checked = false
				}
			}else if(code==='B'){
				for(let i = 0;i<this.BarrRight.length;i++){
					if(i>1){
						delArr.push(this.BarrRight[i])
					}
				}
				for(let i = 0;i<delArr.length;i++){
					this.textListRight[delArr[i]].checked = false
				}
			}
			
		},
        scrollChange(){
            const container = this.$refs.menulist; // 获取容器元素
      
            if (this.equipmentListIndex>=0&& container) {
                
                const itemWidth = container.clientWidth / container.childElementCount; // 每个列表项的宽度
                
                let scrollToX = container.children[this.equipmentListIndex].offsetLeft-60
                
                
                if (scrollToX > container.scrollWidth - container.offsetWidth) {
                scrollToX = container.scrollWidth - container.offsetWidth;
                } else if (scrollToX < 0) {
                scrollToX = 0;
                }
                if(this.equipmentListIndex==0){
                    scrollToX = 0 
                    console.error(3333,scrollToX)
                }
                // 设置滚动位置
                container.scrollLeft = scrollToX;
            
            }

        }
     
  
    }
  }
  </script>
  
  <style scoped lang="scss">
.head-list{
    display: flex;
    .left{
        flex: 1;
        overflow-x: auto;
        height: 30px;
        overflow-y: hidden;
        white-space:nowrap;
       
        .label{
            margin-right: 32px;
            border-bottom:2px solid transparent;
            padding-bottom: 10px;
            cursor: pointer;
        }
        .active{
            border-bottom-color: #246FE5;
            color: #246FE5;
        }
    }
    .right{
        width: 40px;
    }
}
.border{
    margin: 0 -20px;
    width: calc(100% + 40px);
    height: 1px;
    background:#E8ECF0;
}

.content{
    display: flex;
    .left{
        width:50%;
        height: 400px;
        position:relative;
        .title{
            color:#2E3742;
            font-size: 14px;
            margin-top:12px;
            border-left:2px solid #0091FF;
            padding-left: 6px;

        }
    .left-box{
        width:100%;
        height:100%;
        .center-g{
            width: 80px;
            height:100px;
            background: #EBF6FF;
            border:3px solid #246FE5;
            margin:auto;
            margin-top: 160px;
            position:relative;
            .T{
                position:absolute;
                bottom:110px;
                // right:10px;
                left: -60px;
            }

            .L{
                position:absolute;
                bottom:20px;
                right:90px;
                height:60px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .R{
                position:absolute;
                bottom:20px;
                left:90px;
                height:60px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .C{
                position: absolute;
                bottom: 6px;
                left: 8px;
                height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .B{
                position:absolute;
                top:110px;
                // right:10px;
                left:-60px;
            }
            .L,.R,.C{
                &>div{
                    background: #D9EBFF;
                    border-radius: 20px;
                    padding:4px 10px;
                    margin-bottom:4px;
                }
            }
			.T,.B{
				.input-box{
					height: 32px;
					width: 194px;
					display: flex;
					// justify-content: center;
					flex-direction: row;
					align-items: center;
					gap: 6px;
					border: 1px solid #c4c9cf;
					border-radius: 4px;
					background-color: #fff;
					padding: 0 0px 0 4px;
						.prompt {
							color: var(--Grey-Grey-400, #c4c9cf);
							font-weight: 400;
							line-height: 24px;
						}

						.item {
							width: 49px;
							height: 24px;
							background-color: #e8ecf0;
							border-radius: 4px;
							margin: 0 2px;
							display: flex;
							justify-content: center;
							flex-direction: row;
							align-items: center;
							cursor: pointer;

							.name {
								line-height: 24px;
								color: #1b2129;
								font-weight: 400;
								padding: 6px;
							}
							svg {
							}
						}
				}
				.t_tooltip {
				position: absolute;
				bottom: 40px;
				min-width: 40px;
				height: 40px;
				border-radius: 8px;
				border: 1px solid var(--Grey-Grey-300, #e1e5eb);
				background: var(--Grey-Grey-0, #fff);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 0 4px 0 8px;

				.item {
					width: 29px;
					height: 24px;
					border-radius: 4px;
					background: var(--Grey-Grey-200, #e8ecf0);
					font-weight: 400;
					color: var(--Grey-Grey-900, #1b2129);
					text-align: center;
					line-height: 24px;
					margin-right: 4px;
				}
			}
			.b_tooltip {
				position: absolute;
				top: 40px;
				min-width: 40px;
				height: 40px;
				border-radius: 8px;
				border: 1px solid var(--Grey-Grey-300, #e1e5eb);
				background: var(--Grey-Grey-0, #fff);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 0 4px 0 8px;

				.item {
					width: 29px;
					height: 24px;
					border-radius: 4px;
					background: var(--Grey-Grey-200, #e8ecf0);
					font-weight: 400;
					color: var(--Grey-Grey-900, #1b2129);
					text-align: center;
					line-height: 24px;
					margin-right: 4px;
				}
			}
			.t_Content {
				display: flex;
				flex-direction: column;
				padding: 20px 20px 0px 20px;

				.el-checkbox {
					margin-bottom: 18px;
				}
			}
			.click-icon{
				position: absolute;
				right: 0;
				bottom: 8px;
			}
			}
            }
        
        }
       
    }



    .right{
        flex:1;
        border-left:1px solid #E8ECF0;
        padding-left:10px;
        .title{
            color:#2E3742;
            font-size: 14px;
            margin-top:12px;
            border-left:2px solid #0091FF;
            padding-left: 6px;

        }
        .right-alert{
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: #F1F4F6;
            border-radius: 4px;
            height: 28px;
            width: 381px;
            margin-top:15px;
            img{
                width:10px;
                height:10px;
            }
        }
        .right-box{
            width:381px;
            height: 330px;
            background: #F7F9FA;
            margin-top:15px;
            display: flex;
            justify-content: center;
            align-items: center;
            .legend{
                background: #D9EBFF;
                position:relative;
                .t,.l,.b,.r{
                    &>div{
                        position:absolute;
                        cursor: pointer;
                        display: flex;
                        user-select: none;
                        -webkit-user-drag: none;
                        img{
                            width:8px;
                            height: 8px;
                        }
                    }
                }
                .t{
                    &>div{
                        margin-top:-3px;
                    }
                }
                .b{
                    &>div{
                        margin-top:-2px;
                    }
                }
                .l{
                    &>div{
                        margin-left:-2px;
                    }
                }
                .r{
                    &>div{
                        margin-left:-2px;
                    }
                }
            }
        }
    }
}



.attachs-title{
    display:flex;
    width:260px;
    height:32px;
    align-items: center;
    // border:1px solid #C4C9CF;
    // border-radius: 4px;
    margin: 8px 0;
    &>div{
        flex:1;
        text-align: center;
        line-height: 32px;
        font-size:14px;
        color:#1B2129;
        cursor: pointer;
    }
    .attachs-left{
        border:1px solid #C4C9CF;
        border-right: none;
        border-radius: 4px 0 0 4px;
    }
    .attachs-right{
        border:1px solid #C4C9CF;
        border-left: none;
        border-radius: 0 4px  4px 0;
    }
    .attachs-checked{
        border:1px solid #246FE5;
        background: #D9EBFF;
        color:#246FE5;
        font-weight: 700;
    }
  
}



.content .check-list{
                width: 792px;
                height: 360px;
                overflow-y: scroll;
                .name-box{
                    display: flex;
                    align-items: center;
                    margin-bottom: 2px;
                    .name-tem{
                        display: flex;
                        align-items: center;
                        margin-bottom: 6px;
                    }
                    .name-left{
                        max-width: 452px;
                        color: #1B2129;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

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
</style>
  