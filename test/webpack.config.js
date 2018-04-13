const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let options = {
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
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		title: '测试模板',
		filename: 'fucker.html',
		template:'./app/index.html'
	})]
};




module.exports = options;
