const fs = require("fs");
const pn = require("../webpack.config/pageName.js");

let arr = fs.readdirSync("./src/pages");

// -----------------------------------------------------------------------
//入口模板
const entriesItemTemplate = x => `./src/pages/${x}/index.js`;
const entriesTemplate = x => `//本文件为自动生成，切勿手动修改
//所有入口（动态）
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
	"./webpack.config/auto_entries.js",
	entriesTemplate(_entryObj),
	() => {
		console.log("入口文件写入成功！");
	}
);
// -----------------------------------------------------------------------
//html关系模板
const htmlItemTemplate = (x, t) => `new HtmlWebpackPlugin({
		filename: "${x}/index.html",
		template: _template,
		chunks: ["${x}"], //关联指向关键信息
		templateParameters: {
      title: "${t}"
    }
	})`;

const htmlTemplate = x => `//本文件为自动生成，切勿手动修改
const HtmlWebpackPlugin = require("html-webpack-plugin");
// -----------------------------------
const _template = "./public/index.html";

//html模板对应（动态）
const _htmlPlugins = [${x}];

module.exports = _htmlPlugins;`;

let _result = arr.map((item, i) => {
	let _t = pn[item] || "";
console.log(_t)
	return htmlItemTemplate(item, _t);
});

let htmlObj = htmlTemplate(_result.toString());

// console.log(htmlObj);

fs.writeFile("./webpack.config/auto_html-relations.js", htmlObj, () => {
	console.log("html关联文件写入成功！");
});
