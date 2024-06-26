<template>
	<!-- 布局排版  设置面板 -->
	<transition name="drawer-fade">
		<div class="drawer__wrapper" v-show="visibleModel">
			<div class="drawer__container" :class="visibleModel && 'drawer__open'" @click.self="handleWrapperClick">
				<div class="drawer" :class="[direction]" ref="drawer">
					<div class="head">
						<span>布局排版</span>
						<img src="@/assets/images/x.png" alt="" @click="close" />
					</div>
					<div class="bd">
						<template v-if="!type">
							<div class="hang">
								<span class="tle">空间名称</span>
								<span>{{ options.containerName }}</span>
							</div>
							<div class="hang">
								<span class="tle">空间类型</span>
								<span>{{ options.containerType }}</span>
							</div>
							<div class="fgx" style="margin: 12px 0 10px 0"></div>
						</template>

						<div class="hang">
							<span class="tle">布局方向</span>
							<el-radio-group size="small" v-model="layoutOptions.layout" style="height: 30px">
								<el-radio-button label="vertical"> ↓ </el-radio-button>
								<el-radio-button label="horizontal"> → </el-radio-button>
							</el-radio-group>
						</div>
						<div class="title">{{ layout == "horizontal" ? "Y坐标设置" : "X坐标设置" }}</div>
						<div class="legendList">
							<div class="item" v-for="(item, index) in layoutOptions.childrenAlign" :key="index">
								<div class="name">{{ item.name || "--" }}</div>
								<div class="layout" :class="layout">
									<Tooltip effect="dark" :content="layout == 'horizontal' ? '固定顶' : '固定左'" placement="bottom-start">
										<div class="icon" :class="{ active: item.align == 'begin' }" @click="item.align = 'begin'">
											<i class="icon-begin">
												<i class="path path1"></i>
												<i class="path path2"></i>
											</i>
										</div>
									</Tooltip>
									<Tooltip effect="dark" content="居中充满" placement="bottom-start">
										<div class="icon" :class="{ active: item.align == 'fill' }" @click="item.align = 'fill'">
											<i class="icon-fill">
												<i class="path path1"></i>
												<i class="path path2"></i>
												<i class="path path3"></i>
											</i>
										</div>
									</Tooltip>
									<Tooltip effect="dark" content="居中" placement="bottom-start">
										<div class="icon" :class="{ active: item.align == 'middle' }" @click="item.align = 'middle'">
											<i class="icon-middle">
												<i class="path path1"></i>
												<i class="path path2"></i>
												<i class="path path3"></i>
											</i>
										</div>
									</Tooltip>
									<Tooltip effect="dark" :content="layout == 'horizontal' ? '固定底' : '固定右'" placement="bottom-start">
										<div class="icon" :class="{ active: item.align == 'end' }" @click="item.align = 'end'">
											<i class="icon-end">
												<i class="path path1"></i>
												<i class="path path2"></i>
											</i>
										</div>
									</Tooltip>
								</div>
							</div>
						</div>
					</div>
					<div class="foot">
						<Button type="primary" @click="confirm">确 定</Button>
						<Button @click="cancel">取 消</Button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { RadioGroup, MSelect, Radio } from "meri-design";
import { Button, Tooltip } from "element-ui";
import GetAdmData from "@/store/http/getAdmData";

export default {
	data() {
		return {
			layoutOptions: {},
			direction: "rtl",
		};
	},
	props: {
		options: {
			type: Object,
			default: function () {
				return {
					// "templateId": "cf35149b8b704e9689f14447fc32542b",
					// "operate": "layout",//不用传
					// "containerId": "frame",
					// "containerName": "B1机房",
					// "containerType": "机房"
					templateId: "",
					operate: "layout", //不用传
					containerId: "",
					containerName: "",
					containerType: "",
				};
			},
		},
		type: {
			type: Boolean,
			default: () => false, //false 布局排版 - true 画布布局
		},
		// 是否展开
		visible: {
			type: Boolean,
			default: true,
		},
	},
	components: {
		RadioGroup,
		MSelect,
		Radio,
		Button,
		Tooltip,
	},
	mounted() {
		// this.getInstantiationDetail();
	},
	methods: {
		close() {
			this.$emit("cancel");
			this.$emit("update:visible", false);
		},
		cancel() {
			this.close();
			//取消后进行数据初始化
			this.$nextTick(() => {});
		},
		handleWrapperClick() {
			this.close();
		},
		async confirm() {
			const { templateId, containerId } = this.options;
			const { layout, childrenAlign } = this.layoutOptions;
			const params = {
				templateId,
				operate: "layout",
				containerId,
				layout,
				childrenAlign,
			};
			const { result, data } = await GetAdmData.instantiationDetailModify(params);
			if (result == "success") {
				this.close();
				this.$emit("confirm");
			}
		},
		async getInstantiationDetail() {
			const { templateId, containerId } = this.options;
			const params = {
				templateId,
				operate: "layout",
				containerId,
			};
			const { result, data } = await GetAdmData.getInstantiationDetail(params);
			if (result == "success") {
				this.layoutOptions = data;
			}
		},
	},
	computed: {
		visibleModel: {
			get() {
				return this.visible;
			},
			set(val) {
				this.$emit("cancel");
				this.$emit("update:visible", false);
			},
		},
		layout() {
			return this.layoutOptions.layout;
		},
	},
	watch: {
		visibleModel(val) {
			if (val) {
				this.getInstantiationDetail();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/fonts/style.css";

@keyframes drawer-fade-in {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@mixin drawer-animation($direction) {
	@keyframes #{$direction}-drawer-in {
		0% {
			@if $direction ==ltr {
				transform: translate(-100%, 0px);
			}

			@if $direction ==rtl {
				transform: translate(100%, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, -100%);
			}

			@if $direction ==btt {
				transform: translate(0px, 100%);
			}
		}

		100% {
			@if $direction ==ltr {
				transform: translate(0px, 0px);
			}

			@if $direction ==rtl {
				transform: translate(0px, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, 0px);
			}

			@if $direction ==btt {
				transform: translate(0px, 0px);
			}
		}
	}

	@keyframes #{$direction}-drawer-out {
		0% {
			@if $direction ==ltr {
				transform: translate(0px, 0px);
			}

			@if $direction ==rtl {
				transform: translate(0px, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, 0px);
			}

			@if $direction ==btt {
				transform: translate(0px, 0);
			}
		}

		100% {
			@if $direction ==ltr {
				transform: translate(-100%, 0px);
			}

			@if $direction ==rtl {
				transform: translate(100%, 0px);
			}

			@if $direction ==ttb {
				transform: translate(0px, -100%);
			}

			@if $direction ==btt {
				transform: translate(0px, 100%);
			}
		}
	}
}

@mixin animation-in($direction) {
	.drawer__open .#{$direction} {
		animation: #{$direction}-drawer-in 0.3s 1ms;
	}
}

@mixin animation-out($direction) {
	.#{$direction} {
		animation: #{$direction}-drawer-out 0.3s;
	}
}

@include drawer-animation(rtl);
@include drawer-animation(ltr);

$directions: rtl, ltr;

@each $direction in $directions {
	@include animation-out($direction);
	@include animation-in($direction);
}

.drawer-fade-enter-active {
	animation: drawer-fade-in 0.3s;
}

.drawer-fade-leave-active {
	animation: drawer-fade-in 0.3s reverse;
}

.drawer__wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	margin: 0;
}

.drawer__container {
	position: relative;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
}

.drawer {
	width: 320px;
	background: #ffffff;
	position: absolute;
	top: 46px;
	bottom: 0;
	right: 0;
	z-index: 10;
	box-shadow: 0px 3px 12px rgba(27, 33, 41, 0.12), 0px 0.5px 3px rgba(27, 33, 41, 0.08);
	flex-direction: column;
	display: flex;

	&.ltr {
		left: 0;

		.foot {
			justify-content: flex-end;
		}
	}

	&.rtl {
		right: 0;
	}

	.head {
		height: 56px;
		border-bottom: 1px solid #edf1f5;

		span {
			font-family: "Microsoft YaHei UI";
			font-weight: 700;
			font-size: 16px;
			line-height: 56px;
			color: #1b2129;
			text-indent: 20px;
			float: left;
		}

		img {
			float: right;
			margin: 18px 24px 0 0;
			cursor: pointer;
		}
	}

	.bd {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 20px;
		padding-top: 16px;
		padding-right: 20px;

		.title {
			color: #32383e;
			font-weight: 700;
			padding: 20px 10px 0;
			margin-bottom: 15px;
		}

		.hang {
			min-height: 40px;
			line-height: 36px;
			display: flex;
			align-items: center;
			padding-left: 10px;
			color: #32383e;

			.tle {
				font-family: "Microsoft YaHei UI";
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				color: #626c78;
				padding-right: 20px;
			}
		}

		.fgx {
			height: 1px;
			background: #edf1f5;
			margin: 4px 0 4px 0;
		}

		.legendList {
			padding: 0 10px;
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			height: 0;
			overflow-y: auto;

			.item {
				display: flex;
				flex-direction: column;
				background: #f7f9fa;
				border-radius: 4px;
				padding: 10px;
				margin-bottom: 8px;

				.name {
					color: #2e3742;
					padding-bottom: 13px;
				}

				.layout {
					display: flex;

					&.vertical {
						.icon {
							transform: rotate(-90deg);
						}
					}

					.icon {
						width: 30px;
						height: 30px;
						display: flex;
						flex-shrink: 0;
						justify-content: center;
						align-items: center;
						font-size: 30px;
						cursor: pointer;
						margin-right: 15px;

						&.active {
							background: #246fe5;
							border-radius: 4px;

							.path::before {
								color: #fff;
							}

							.icon-fill,
							.icon-middle {
								.path2::before {
									color: #246fe5;
								}
							}
						}
					}
				}
			}
		}
	}

	.foot {
		height: 72px;
		border-bottom: 1px solid #edf1f5;
		box-shadow: 0px 3px 12px rgba(27, 33, 41, 0.12), 0px 0.5px 3px rgba(27, 33, 41, 0.08);
		padding: 0 20px;
		display: flex;
		align-items: center;

		.el-button--primary {
			padding: 12px 20px !important;
		}
	}
}
</style>
