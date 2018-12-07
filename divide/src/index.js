
import { m2fn1 } from './module2';
import { m3fn1, m3fn2 } from './module3';

import './style.css';
import png from './png/png1.png';

m2fn1();
m3fn1();
m3fn2();
m3fn2();

function doit() {
	var item = document.getElementById("btn");

	item.addEventListener("click", function() {
		const m1 = import("./module1").then(m1 => {
			console.log(m1)
			m1.default.fn1();
		});
	});
}

doit();


