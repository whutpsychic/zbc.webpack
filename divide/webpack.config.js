const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//插件需求
const plugins = [
	new HtmlWebpackPlugin({
		filename: "index.html",
		template: "./index.html",
		chunks: ["index", "commons"]
	}),
	new HtmlWebpackPlugin({
		filename: "index2.html",
		template: "./index2.html",
		chunks: ["index2", "commons"]
	}),
	new HtmlWebpackPlugin({
		filename: "index3.html",
		template: "./index3.html",
		chunks: ["index3", "commons"]
	})
];

//代码分离
const optimization = {
	splitChunks: {
		chunks: "async",
		// minSize: 30000,			//指定当文件包超过多大时应该被分离出来
		minSize: 1,
		minChunks: 1,
		maxAsyncRequests: 5,
		maxInitialRequests: 3,
		automaticNameDelimiter: "~",
		name: true,
		cacheGroups: {
			commons: {
				name: "commons",
				chunks: "initial",
				minChunks: 2
			},
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	},
	//提取 manifest
	runtimeChunk: {
		name: "manifest"
	}
};

//输出配置
module.exports = {
	entry: {
		index: "./src/index.js",
		index2: "./src/index2.js",
		index3: "./src/index3.js"
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	optimization: optimization,

	plugins: plugins
};

//代码不分离(默认效果)
// module.exports = {
// 	entry: "./src/index.js",
// 	output: {
// 		filename: "bundle.js",
// 		path: path.resolve(__dirname, "dist")
// 	},

// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template:"./index.html"
// 		})
// 	]
// };
