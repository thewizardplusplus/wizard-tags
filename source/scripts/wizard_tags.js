function WizardTags(element_query, options) {
	options = options || {};
	options.tags = options.tags || [];

	var TagsGenerator = function() {
		return [];
	};
	if (options.tags instanceof Function) {
		TagsGenerator = options.tags;
	}

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

			var tags = TagsGenerator();
			for (var i = 0; i < tags.length; i++) {
				var item = document.createElement('li');
				item.innerText = tags[i];

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
