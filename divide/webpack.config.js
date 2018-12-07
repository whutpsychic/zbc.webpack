const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

//插件需求
const plugins = [
	new HtmlWebpackPlugin({
		filename: "index.html",
		template: "./index.html",
		chunks: ["index", "commons", "manifest"]
	}),
	new HtmlWebpackPlugin({
		filename: "index2.html",
		template: "./index2.html",
		chunks: ["index2", "commons", "manifest"]
	}),
	new HtmlWebpackPlugin({
		filename: "index3.html",
		template: "./index3.html",
		chunks: ["index3", "commons", "manifest"]
	}),
	new CleanWebpackPlugin("dist/*.*")
];

//代码优化
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

//非js文件加载规则

//引入图片加载规则
const pictureRules1 = {
	test: /\.(png|jpg|gif)$/,
	use: [
		{
			loader: "file-loader",
			options: {
				outputPath: "images/"
			}
		}
	]
};

//引入图片加载规则
const pictureRules= {
	test: /\.(png|jpg|gif)$/,
	use: [
		{
			loader: "url-loader",
			options: {
				limit: 8192,
				outputPath: "images/"
			}
		}
	]
};

//css 加载（内联）
const cssRules = {
	test: /\.css$/,
	use: [{ loader: "style-loader" }, { loader: "css-loader" }]
};

//css 加载（外挂）
const cssRules2 = {
	test: /\.css$/,
	use: [{ loader: "style-loader/url" }, { loader: "url-loader" }]
};

//输出配置
module.exports = {
	entry: {
		index: "./src/index.js",
		index2: "./src/index2.js",
		index3: "./src/index3.js"
	},
	output: {
		filename: "[name].[chunkhash].js",
		chunkFilename: "[name].chunk.js",
		path: path.resolve(__dirname, "dist")
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		// hot:true,			//默认值为 true，所以可以不用设置
		port: 9000
	},

	module: {
		rules: [
			//内联式解决，图片外放
			cssRules,
			pictureRules

			// // 外挂，图片外放
			// cssRules2,
			// pictureRules
		]
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

// module.exports = {
// 	entry:...,
// 	output: ...,
// 	devServer: {
// 		contentBase: path.join(__dirname, "dist"),
// 		// hot:true,			//默认值为 true，所以可以不用设置
// 		port: 9000
// 	}
// };

// -----------------------
// 作者水平有限，如有错误，欢迎指正交流。

// -----------------------
