function WizardTags(element_query, options) {
	options = options || {};

	var TagsGenerator = function() {
		return [];
	};
	if (options.tags instanceof Function) {
		TagsGenerator = options.tags;
	} else if (options.tags instanceof Array) {
		TagsGenerator = function(query) {
			return options.tags.filter(
				function(tag) {
					return tag.substr(0, query.length) == query;
				}
			);
		};
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

			var tags = TagsGenerator(this.value);
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
