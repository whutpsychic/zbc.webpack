const HtmlWebpackPlugin = require("html-webpack-plugin");
// -----------------------------------
const _template = "./public/index.html";

//html模板对应（动态）
const _htmlPlugins = new HtmlWebpackPlugin({
		filename: "page1/index.html",
		template: _template,
		chunks: ["page1"] //关联指向关键信息
	}),new HtmlWebpackPlugin({
		filename: "page2/index.html",
		template: _template,
		chunks: ["page2"] //关联指向关键信息
	});

module.exports = _htmlPlugins;