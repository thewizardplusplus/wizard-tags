function WizardTags(element_query, options) {
	options = options || {};
	options.list_maximal_height = options.list_maximal_height || 200;

	var root = document.querySelector(element_query);
	root.className = 'wizard-tags';
	root.innerText = "Ololo!";

	var list = document.createElement('ul');
	list.className = 'wizard-tags-autocomplete-list';
	list.style.maxHeight = options.list_maximal_height + 'px';

	for (var i = 0; i < 10; i++) {
		var item = document.createElement('li');
		item.innerText = "ololo #" + i;

		list.appendChild(item);
	}

	root.appendChild(list);
}
