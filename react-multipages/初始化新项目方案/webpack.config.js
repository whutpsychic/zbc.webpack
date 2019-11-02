const path = require("path");
//暂时还不知道
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// --------------------------配置项引入------------------------------
const _defaultPage = require("./webpack.config/defaultPage.js");
const _entries = require("./webpack.config/auto_entries.js");
const _htmlRelations = require("./webpack.config/auto_html-relations.js");
// --------------------------配置项引入------------------------------

//ES6转译
const ES6_translator_config = {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: "babel-loader"
};

//css加载（内联）
const cssRules = {
	test: /\.css$/,
	use: [{ loader: "style-loader" }, { loader: "css-loader" }]
};

//sass
const scssRules = {
	test: /\.s[ac]ss$/i,
	use: [
		{ loader: "style-loader" },
		{ loader: "css-loader" },
		{ loader: "sass-loader" }
	]
};

//引入图片加载规则
const pictureRules = {
	test: /\.(png|jpg|gif|svg)$/,
	use: [
		{
			loader: "url-loader",
			options: {
				limit: 8192,
				outputPath: "images",
				//相对路径设置点
				publicPath: "../images"
			}
		}
	]
};

// ------------------------------------------------
// ------------------最终输出对象------------------
// ------------------------------------------------
module.exports = {
	mode: "production",
	entry: _entries,
	output: {
		filename: "[name]/[name].bundle.[chunkhash].js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [ES6_translator_config, cssRules, scssRules, pictureRules]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		// hot:true,            //默认值为 true，所以可以不用设置
		port: 8000,
		openPage: _defaultPage //默认大开的页面
	},
	plugins: [
		..._htmlRelations,
		new UglifyJsPlugin({
			test: /\.js($|\?)/g,
			exclude: /node_modules/
		})
	]
};
