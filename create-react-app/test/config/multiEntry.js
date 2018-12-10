"use strict";

module.exports = {
	resolve: function(resolveModule, resolveApp, arr) {
		return arr.map(item => {
			return resolveModule(resolveApp, item);
		}).join(',');
	},

	paths: ["src/index", "src/index2", "src/index3"]
};
