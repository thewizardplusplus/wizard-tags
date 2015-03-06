function WizardTags(element_query, options) {
	options = options || {};

	var root = document.querySelector(element_query);
	root.className = 'wizard-tags';

	var list = document.createElement('ul');
	list.className = 'wizard-tags-autocomplete-list';
	if (typeof options.list_maximal_height !== "undefined") {
		list.style.maxHeight = options.list_maximal_height + 'px';
	}

	var input = document.createElement('input');
	input.addEventListener(
		'focus',
		function() {
			list.style.display = 'block';
		}
	);
	input.addEventListener(
		'blur',
		function() {
			list.style.display = 'none';
		}
	);
	root.appendChild(input);

	for (var i = 0; i < 10; i++) {
		var item = document.createElement('li');
		item.innerText = "ololo #" + i;

		list.appendChild(item);
	}

	root.appendChild(list);
}
