function WizardTags(element_query, options) {
	options = options || {};

	var root = document.querySelector(element_query);
	root.className = 'wizard-tags';

	var list = null;
	var input = document.createElement('input');
	input.addEventListener(
		'focus',
		function() {
			list = document.createElement('ul');
			list.className = 'wizard-tags-autocomplete-list';
			if (typeof options.list_maximal_height !== "undefined") {
				list.style.maxHeight = options.list_maximal_height + 'px';
			}

			for (var i = 0; i < 10; i++) {
				var item = document.createElement('li');
				item.innerText = "ololo #" + i;

				list.appendChild(item);
			}

			root.appendChild(list);
		}
	);
	input.addEventListener(
		'blur',
		function() {
			root.removeChild(list);
		}
	);
	root.appendChild(input);
}
