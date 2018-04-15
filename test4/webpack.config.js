
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//导入css
//const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
       
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










