
import { zprint, editDomText} from './functions';
import data from './data';

zprint('开始搞事情');
zprint(data.text);
zprint(data.value);

document.getElementById('p').onclick = () => {
	editDomText(document.getElementById('p'), 'xxxxxxxxxxxxxxxxxxxxx')
}
