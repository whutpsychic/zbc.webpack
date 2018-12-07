import { m3fn3 } from "./module3";


m3fn3();

function doit() {
	var item = document.getElementById("btn");

	item.addEventListener("click", function() {
		const m1 = import("./module4").then(m1 => {
			console.log(m1)
		});
	});
}

doit();