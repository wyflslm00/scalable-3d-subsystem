const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
	lintOnSave: false,
	transpileDependencies: true,
	configureWebpack: {
		resolve: {
			fallback: {
				path: false,
			},
		},
	},
	publicPath: "/relation-web/",
	devServer: {
		proxy: {
			"/relation-web/admPost": {
				// target: "http://192.168.0.15:8833", //建立本地服务器端口可能不一样
				// target: "https://qa.ysbdtp.top/relation-web/admPost/", //切换为qa环境地址
				// target: "https://qa.ysbdtp.com/relation-web/admPost/", //切换为qa环境地址
				target: "https://dev.ysbdtp.com/relation-web/admPost/", //切换为qa环境地址
				// target: "https://dev.ysbdtp.top/relation-web/admPost/", //切换为qa环境地址
				// target: "https://pre.ysbdtp.top/relation-web/admPost/", //切换为qa环境地址
				// target: "https://www.ysbdtp.top/relation-web/admPost/", //切换为生产环境地址
				changeOrigin: true,
				pathRewrite: {
					"^/relation-web/admPost": "",
				},
			},
			"/relation-web/loginPost": {
				target: "https://dev-b.yushu.cloud/",
				changeOrigin: true,
				pathRewrite: {
					"^/relation-web/loginPost": "",
				},
			},
		},
	},
	css: {
		loaderOptions: {
			sass: {
				sassOptions: {
					outputStyle: "expanded",
				},
			},
		},
	},
});
