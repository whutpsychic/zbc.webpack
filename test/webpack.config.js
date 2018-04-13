﻿const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//导入css
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//var exStylecss = new ExtractTextPlugin('./app/test.css');








let options = [
//01
	{
	entry: {
		main: './app/main.js'
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, './dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader?minimize']
				//use: exStylecss.extract({
				//	fallback: "style-loader",
				//	use: ["css-loader"]
				//})
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '测试模板',
			filename: 'index.html',
			template: './app/index.html'
		}),

	]
	},

];




module.exports = options;
