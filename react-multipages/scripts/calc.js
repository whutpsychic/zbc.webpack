const fs = require("fs");

let arr = fs.readdirSync("./src/pages");

// -----------------------------------------------------------------------
//入口模板
const entriesItemTemplate = x => `./src/pages/${x}/index.js`;
const entriesTemplate = x => `//所有入口（动态）
const _entry = ${x};

module.exports = _entry;`;

//生成入口文件对象
let _entryObj = {};
for (let i in arr) {
	_entryObj[arr[i]] = entriesItemTemplate(arr[i]);
}

_entryObj = JSON.stringify(_entryObj);

// console.log(_entryObj);

fs.writeFile(
	"./webpack.config/entries.js",
	entriesTemplate(_entryObj),
	() => {}
);
// -----------------------------------------------------------------------
//html关系模板
const htmlItemTemplate = x => `new HtmlWebpackPlugin({
		filename: "${x}/index.html",
		template: _template,
		chunks: ["${x}"] //关联指向关键信息
	})`;

const htmlTemplate = x => `const HtmlWebpackPlugin = require("html-webpack-plugin");
// -----------------------------------
const _template = "./public/index.html";

//html模板对应（动态）
const _htmlPlugins = ${x};

module.exports = _htmlPlugins;`;

let _result = arr.map((item, i) => {
	return htmlItemTemplate(item);
});

let htmlObj = htmlTemplate(_result.toString());

// console.log(htmlObj);

fs.writeFile("./webpack.config/html-relations.js", htmlObj, () => {});
