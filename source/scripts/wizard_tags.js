function WizardTags(element_query) {
	var root = document.querySelector(element_query);
	root.className = 'wizard-tags';
	root.innerText = "Ololo!";

	var list = document.createElement('ul');
	list.className = 'wizard-tags-autocomplete-list';

	for (var i = 0; i < 10; i++) {
		var item = document.createElement('li');
		item.innerText = "ololo #" + i;

		list.appendChild(item);
	}

	root.appendChild(list);
}
