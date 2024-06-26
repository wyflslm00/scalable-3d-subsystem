<template>
	<div>
		<div class="shortcut-box">
			<div class="focus" @click="$emit('focus')" title="适应屏幕"></div>
			<div class="reduce" @click="$emit('reduce')"></div>
			<div class="num">{{ Math.round(scale * 100) }}%</div>
			<div class="boost" @click="$emit('boost')"></div>

			<div class="ask">
				<div class="ask-con">
					<div class="box">
						<div class="title">快捷键</div>
						<div class="quick">
							<div class="left">
								<img src="@/assets/images/tools/copy.svg" alt="" />
								<span>复制</span>
							</div>
							<div class="right">
								<span>Ctrl</span>
								<span>C</span>
							</div>
						</div>
						<div class="quick">
							<div class="left">
								<img src="@/assets/images/tools/paste.svg" alt="" />
								<span>粘贴</span>
							</div>
							<div class="right">
								<span>Ctrl</span>
								<span>V</span>
							</div>
						</div>
						<div class="quick">
							<div class="left">
								<img src="@/assets/images/tools/back-yes.svg" alt="" />
								<span>回退</span>
							</div>
							<div class="right">
								<span>Ctrl</span>
								<span>Z</span>
							</div>
						</div>
						<div class="quick">
							<div class="left">
								<img src="@/assets/images/tools/forth-yes.svg" alt="" />
								<span>前进</span>
							</div>
							<div class="right">
								<span>Ctrl</span>
								<span>Shift</span>
								<span>Z</span>
							</div>
						</div>
						<div class="quick">
							<div class="left">
								<img src="@/assets/images/tools/delete.svg" alt="" />
								<span>删除</span>
							</div>
							<div class="right">
								<span>Delete</span>
							</div>
						</div>
						<div class="quick">
							<div class="left">
								<img src="@/assets/images/tools/scale.svg" alt="" />
								<span>放大缩小</span>
							</div>
							<div class="right">
								<span>Ctrl</span>
								<span>滚轮</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		scale: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			// scale:100,
		};
	},
};
</script>

<style lang="scss" scoped>
.shortcut-box {
	position: fixed;
	bottom: 30px;
	right: 25px;
	// width: 160px;
	height: 32px;
	display: flex;
	align-items: center;
	// cursor: pointer;
	// border-radius: 4px;
	// background: #fff;
	// box-shadow: 1px 1px 5px #eee;
	.focus {
		width: 32px;
		height: 32px;
		background: url("@/assets/images/tools/focus.svg") no-repeat center;
		background-color: #fff;
		border-radius: 4px;
		margin-right: 6px;
		cursor: pointer;
	}
	.reduce {
		width: 32px;
		height: 32px;
		background: url("@/assets/images/tools/reduce.svg") no-repeat center;
		background-color: #fff;
		border-radius: 4px 0 0 4px;
		cursor: pointer;
	}
	.num {
		width: 58px;
		height: 32px;
		background-color: #fff;
		text-align: center;
		line-height: 32px;
	}
	.boost {
		width: 32px;
		height: 32px;
		background: url("@/assets/images/tools/boost.svg") no-repeat center;
		background-color: #fff;
		border-radius: 0 4px 4px 0;
		cursor: pointer;
	}
	.ask {
		margin-left: 7px;
		width: 32px;
		height: 32px;
		background: url("@/assets/images/tools/ask.svg") no-repeat center;
		background-size: 100% 100%;
		cursor: pointer;
		position: relative;
		.ask-con {
			display: none;
			position: absolute;
			right: 0;
			bottom: 36px;
			.box {
				width: 240px;
				height: 330px;
				display: flex;
				flex-direction: column;
				background: #ffffff;
				box-shadow: 0px 2px 10px rgba(27, 33, 41, 0.1);
				border-radius: 8px;
				font-size: 14px;
				color: #1b2129;
				padding: 13px 24px;
				box-sizing: border-box;
				.title {
					color: #8b949e;
					padding: 5px 0;
					border-bottom: 1px solid #edf1f5;
				}
				.quick {
					display: flex;
					justify-content: space-between;
					height: 56px;
					align-items: center;
					border-bottom: 1px solid #edf1f5;
					.left {
						display: flex;
						img {
							width: 16px;
							height: 16px;
							margin-right: 8px;
						}
					}
					.right {
						display: flex;
						span {
							padding: 4px;
							border-radius: 4px;
							background: linear-gradient(180deg, #f7f9fa 0%, #f2f5f7 74.48%, #f1f1f1 100%);
							margin-left: 4px;
						}
					}
				}
			}
		}
		&:hover {
			.ask-con {
				display: block;
			}
		}
	}
}
</style>
