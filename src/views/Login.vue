<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
			<div class="title-container">
				<h3 class="title">可扩展三维展示控制管理系统</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<!-- <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M63.444 64.996c20.633 0 37.359-14.308 37.359-31.953 0-17.649-16.726-31.952-37.359-31.952-20.631 0-37.36 14.303-37.358 31.952 0 17.645 16.727 31.953 37.359 31.953zM80.57 75.65H49.434c-26.652 0-48.26 18.477-48.26 41.27v2.664c0 9.316 21.608 9.325 48.26 9.325H80.57c26.649 0 48.256-.344 48.256-9.325v-2.663c0-22.794-21.605-41.271-48.256-41.271z" stroke="#979797" />
					</svg> -->
					<svg viewBox="0 0 1024 1024" class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
						<path d="M504.59685925 253.55757036m-207.0452148 0a207.04521482 207.04521482 0 1 0 414.09042963 0 207.04521482 207.04521482 0 1 0-414.09042963 0Z" stroke="#979797"></path>
						<path d="M856.54945185 647.38038517C656.42192592 519.8279111 658.4850963 519.8279111 514.42725925 519.8279111c-141.63057778 0-141.99466667 0-358.02074073 132.64971852-47.81700741 31.7970963-75.85185185 188.59804445-75.85185185 230.22554074 0 108.86257778 192.48165925 78.88592592 429.86761481 78.88592593s429.86761482 29.97665185 429.86761482-78.88592593c0.12136297-43.93339259-31.06891852-202.67614815-83.74044445-235.32278519z" stroke="#979797"></path>
					</svg>
				</span>
				<el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" autocomplete="on" />
			</el-form-item>

			<el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
				<el-form-item prop="password">
					<span class="svg-container">
						<svg t="1719457921168" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6046" width="14" height="14"><path d="M747.776 397.632V203.776A139.84 139.84 0 0 0 607.936 64H418.112a139.776 139.776 0 0 0-139.776 139.776V397.44A127.616 127.616 0 0 0 160 524.48V832a128 128 0 0 0 128 128h448a128 128 0 0 0 128-128V524.48c0-66.752-51.2-120.832-116.224-126.848z m-175.68 321.344v92.48a34.88 34.88 0 0 1-34.88 35.008h-46.4a34.944 34.944 0 0 1-34.944-35.008v-92.48A112.896 112.896 0 0 1 398.72 621.44c0-62.656 51.648-113.536 115.264-113.536s115.264 50.816 115.264 113.536a112.448 112.448 0 0 1-57.152 97.536z m57.216-322.496H398.72V243.328c0-38.592 31.296-69.888 69.888-69.888h90.816c38.592 0 69.888 31.296 69.888 69.888v153.152z"></path></svg>
					</span>
					<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
					<span class="show-pwd" @click="showPwd">
						<svg class="svg-icon" v-if="passwordType == 'password'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
							<path d="M469.333333 681.386667c-36.053333-2.432-71.253333-8.533333-104.96-17.92l-69.802666 149.674666a42.368 42.368 0 0 1-56.533334 20.266667 42.666667 42.666667 0 0 1-20.821333-56.32l66.986667-143.658667a451.712 451.712 0 0 1-148.906667-112.682666 388.693333 388.693333 0 0 1-70.570667-119.338667 42.666667 42.666667 0 1 1 80.128-29.354667 303.445333 303.445333 0 0 0 55.210667 93.098667C270.634667 547.413333 383.018667 597.333333 505.728 597.333333c122.752 0 235.136-49.962667 305.706667-132.181333a303.445333 303.445333 0 0 0 55.210666-93.098667 42.666667 42.666667 0 0 1 80.128 29.354667 388.693333 388.693333 0 0 1-70.570666 119.338667 423.68 423.68 0 0 1-18.773334 20.48l104.362667 104.362666a42.666667 42.666667 0 0 1-0.298667 60.032 42.368 42.368 0 0 1-60.032 0.298667l-109.653333-109.653333c-20.48 14.08-42.24 26.581333-65.024 37.418666l66.901333 143.36a42.666667 42.666667 0 0 1-20.821333 56.362667 42.368 42.368 0 0 1-56.533333-20.266667l-69.717334-149.546666a520.533333 520.533333 0 0 1-91.946666 16.810666v130.645334A42.666667 42.666667 0 0 1 512 853.333333c-23.722667 0-42.666667-18.944-42.666667-42.24v-129.706666z" stroke="#979797"></path>
							<path d="M176.128 524.373333a42.368 42.368 0 0 1 60.032 0.256 42.666667 42.666667 0 0 1 0.298667 60.074667l-121.216 121.216a42.368 42.368 0 0 1-60.074667-0.298667 42.666667 42.666667 0 0 1-0.298667-60.032l121.258667-121.258666z" fill="#3D3D3D"></path>
						</svg>
						<svg class="svg-icon" v-if="passwordType != 'password'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
							<path d="M512.002844 249.457778c189.155556 0 361.415111 183.751111 427.207112 262.542222-65.792 78.791111-238.051556 262.542222-427.207112 262.542222S150.587733 590.791111 84.795733 512C150.587733 433.208889 322.847289 249.457778 512.002844 249.457778zM512.002844 170.666667C277.279289 170.666667 78.395733 394.638222 11.323733 479.715556a51.683556 51.683556 0 0 0 0 64.568888C78.395733 629.361778 277.279289 853.333333 512.002844 853.333333s433.607111-223.971556 500.679112-309.048889a51.683556 51.683556 0 0 0 0-64.568888C945.609956 394.638222 746.7264 170.666667 512.002844 170.666667z m0 262.542222c42.410667 0 76.8 35.271111 76.8 78.791111s-34.389333 78.791111-76.8 78.791111-76.8-35.271111-76.8-78.791111 34.389333-78.791111 76.8-78.791111z m0-78.734222c-62.122667 0-118.129778 38.371556-141.880888 97.251555-23.779556 58.88-10.638222 126.606222 33.28 171.662222a150.755556 150.755556 0 0 0 167.367111 34.133334C628.169956 633.173333 665.602844 575.715556 665.602844 512c0-87.011556-68.750222-157.525333-153.571555-157.525333z" stroke="#979797"></path>
						</svg>
					</span>
				</el-form-item>
			</el-tooltip>

			<el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">登录</el-button>
		</el-form>
	</div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
	name: "Login",
	components: {},
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!validUsername(value)) {
				callback(new Error("请输入正确的用户名"));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 5) {
				callback(new Error("密码不能少于5位数字"));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				username: "admin",
				password: "admin",
			},
			loginRules: {
				username: [{ required: true, trigger: "blur", validator: validateUsername }],
				password: [{ required: true, trigger: "blur", validator: validatePassword }],
			},
			passwordType: "password",
			capsTooltip: false,
			loading: false,
			redirect: undefined,
			otherQuery: {},
		};
	},
	watch: {
		$route: {
			handler: function (route) {
				const query = route.query;
				if (query) {
					this.redirect = query.redirect;
					this.otherQuery = this.getOtherQuery(query);
				}
			},
			immediate: true,
		},
	},
	created() {
		// window.addEventListener('storage', this.afterQRScan)
	},
	mounted() {
		if (this.loginForm.username === "") {
			this.$refs.username.focus();
		} else if (this.loginForm.password === "") {
			this.$refs.password.focus();
		}
	},
	destroyed() {
		// window.removeEventListener('storage', this.afterQRScan)
	},
	methods: {
		checkCapslock(e) {
			const { key } = e;
			this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
		},
		showPwd() {
			if (this.passwordType === "password") {
				this.passwordType = "";
			} else {
				this.passwordType = "password";
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
				} else {
					console.log("登录错误!!");
					return false;
				}
			});
		},
		getOtherQuery(query) {
			return Object.keys(query).reduce((acc, cur) => {
				if (cur !== "redirect") {
					acc[cur] = query[cur];
				}
				return acc;
			}, {});
		},
	},
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

.svg-icon {
	width: 14px;
	height: 14px;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	color: #889aa4;

	path {
		width: 14px;
		height: 14px;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 12px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}

	.thirdparty-button {
		position: absolute;
		right: 0;
		bottom: 6px;
	}

	@media only screen and (max-width: 470px) {
		.thirdparty-button {
			display: none;
		}
	}
}
</style>
