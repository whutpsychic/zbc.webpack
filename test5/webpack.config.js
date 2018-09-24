
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = [

	{
		entry: { main: "./src/index.js" },
		output: {
			path: path.resolve(__dirname, './dist'),
			publicPath: "./",
			filename: "bundle.js"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: ['babel-loader']
				},
				{
					test: /\.css$/,
					//use:['style-loader','css-loader']
					use: ExtractTextPlugin.extract({
						use: 'css-loader',
						fallback: 'style-loader'
					})
				},
				{
					test: /\.scss$/,
					use:['style-loader','css-loader?minimize','sass-loader']
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					use:['url-loader']
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "海纳Mes demo",
				filename: "app.html",
				template:"./public/index.html"
			}),
			new ExtractTextPlugin("main.css")
		]
	}
];

module.exports = config;
