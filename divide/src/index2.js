
import { m2fn1 } from './module2';
import { m3fn3 } from './module3';
import m4fn from './module4';

let _t = new Date();
console.warn(_t.valueOf())

import("./module1").then((m1)=>{
	// m1.default.fn1();
	console.log(1)
})

// m2fn1();
// m3fn3();
m4fn();

let _t2 = new Date();
console.warn(_t2.valueOf()-_t.valueOf())
