'use strict';

var _tool = require('./tool1.js');

var _tool2 = _interopRequireDefault(_tool);

var _tool3 = require('./tool2.js');

var _tool4 = _interopRequireDefault(_tool3);

var _tool5 = require('./tool3.js');

var _tool6 = _interopRequireDefault(_tool5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hello(txt) {
	console.log(txt);
}

hello("hehe");

(0, _tool2.default)();
(0, _tool4.default)();
(0, _tool6.default)();