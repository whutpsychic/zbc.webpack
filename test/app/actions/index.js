function component() {
	var element = document.createElement('div');

	/* 需要引入 lodash，下一行才能正常工作 */
	element.innerHTML = 'xxxxxxxxxxxxxxxxx';

	return element;
}

document.body.appendChild(component());

