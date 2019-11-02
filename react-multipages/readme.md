## 文件夹描述
public ------- 公开的文件夹（内置.html模板页）
src ----------- 所有源码文件


## 实现步骤

#### 1. 基本环境依赖安装
 ```
 npm i -s react
 npm i -s react-dom
 npm i -D webpack
 npm i -D webpack-cli
 ```
####  2. ES6 语法 / jsx 语法转译布置
```
npm i -D @babel/core
npm i -D @babel/plugin-transform-runtime
npm i -D @babel/preset-env
npm i -D @babel/preset-react
npm i -D @babel/runtime
npm i -D babel-loader
```
package.json 中写入
```
"babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ],
    "plugins": [
      "@babel/transform-runtime"
    ]
  }
```
webpack.config.js 中加入
```
//ES6转译
const ES6_translator_config = {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: "babel-loader"
};

module.exports = {
	mode: "production",
	entry: ["./src/pages/page1/index.js"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [ES6_translator_config]
	}
};
```
#### 3. 布置引入 css/视频/图片/scss
由于这是一个多页应用考虑到单一页面的css文件不会有多大，没必要分离请求浪费速度，所以直接揉进 bundle.js 文件没有问题。
依赖安装
```
npm i -D node-sass
npm i -D sass-loader@7
npm i -D css-loader
npm i -D style-loader
npm i -D url-loader
npm i -D file-loader
```
配置webpack.config.js
```
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
				publicPath: "../dist/images"
			}
		}
	]
};

module.exports = {
	mode: "production",
	entry: ["./src/pages/page1/index.js"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [ES6_translator_config, cssRules, scssRules, pictureRules]
	}
};
```
【注意】这里面 sass-loader 使用版本7是因为8由于未知原因不能使用，且百度和Github上没有对应版本8的具体修复或使用教程。当时测试时间 2019-11-01。

#### 4. state={} 写法环境搭建
```
npm i -D @babel/plugin-proposal-class-properties
```
package.js babel=>plugins 中添加那个
```
"babel": {
    "presets": [...],
    "plugins": [
       ...,
      "@babel/plugin-proposal-class-properties"
    ]
  },
```
#### 5. 将html一同打包并输出至dist，实现一个页面一个文件夹，即一个文件夹当中包含一个页面的所有必需文件，且文件与文件之间互相关联。然后设置默认页面指向

```
npm i -D html-webpack-plugin
```
配置 webpack.config.js
多目录输出需要多入口，然后设置各自的关联
但是却不需要过度复杂的输出配置，可以直接使用字符串名称拼接来改变输出目录
```
//所有入口
const _entry = {
	page1: "./src/pages/page1/index.js",
	page2: "./src/pages/page2/index.js"
};

//html模板对应
const _htmlPlugins = [
	new HtmlWebpackPlugin({
		filename: "page1/index.html",
		template: "./public/index.html",
		chunks: ["page1"] //关联指向关键信息
	}),
	new HtmlWebpackPlugin({
		filename: "page2/index.html",
		template: "./public/index.html",
		chunks: ["page2"] //关联指向关键信息
	})
];

module.exports = {
	mode: "production",
	entry: _entry,
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
		openPage: "page1/index.html"		//默认大开的页面
	},
	plugins: [..._htmlPlugins]
};

```
#### 6. webpack-dev-server 以及HMR
```
npm i -D webpack-dev-server
```
配置 webpack.config.js
```
//输出配置
module.exports = {
    entry:...,
    output: ...,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // hot:true,            //默认值为 true，所以可以不用设置
        port: 9000
    }
};
```
package.json 中添加命令
```
{
  "scripts":{
    "start": "webpack-dev-server --open"
  }
}
```
至此可以运行 npm start 启动服务

#### 7.Uglify 代码，最小化文件
#### 8.自动化构建开发环境代码、创建新代码和打包输出
nodejs 开发
已完成

操作指令注释
```
//运行代码
npm start
```
```
//代码打包
npm run build
```
```
//打包代码环境更新（一般不用，前两项都有此操作）
npm run calc
```


## 解决方案整理
【ES6】
```
npm install -s babel
```