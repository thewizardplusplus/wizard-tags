var WizardTags = (function() {
	var ProcessOptions = function(options) {
		var processed_options = options || {};
		processed_options.separators = options.separators || ' ';
		processed_options.onChange = options.onChange || function() {};

		return processed_options;
	};
	var GetTagsGenerator = function(options) {
		var tags_generator = function() {
			return [];
		};
		if (options.tags instanceof Function) {
			tags_generator = options.tags;
		} else if (options.tags instanceof Array) {
			tags_generator = function(query) {
				return options.tags.filter(
					function(tag) {
						return tag.substr(0, query.length) == query;
					}
				);
			};
		}

		return tags_generator;
	};
	var MakeRootContainer = function(root_element_query) {
		var root_container = document.querySelector(root_element_query);
		root_container.className = 'wizard-tags';

		return root_container;
	};
	var MakeInnerContainer = function(input) {
		var inner_container = document.createElement('div');
		inner_container.className = 'inner-container';
		inner_container.addEventListener(
			'click',
			function() {
				input.focus();
			}
		);

		return inner_container;
	};
	var AutocompleteListManager = function(tags_generator, root_container) {
		var MakeListContainer = function() {
			var list = document.createElement('ul');
			list.className = 'autocomplete-list';

			return list;
		};
		var MakeListItem = function(text) {
			var item = document.createElement('li');
			item.innerText = text;
			item.addEventListener(
				'click',
				function() {
					//AddTag(this.innerText);
				}
			);
		};
		var MakeAutocompleteList = function(tags) {
			var list = MakeListContainer();
			for (var i = 0; i < tags.length; i++) {
				var item = MakeListItem(tags[i]);
				list.appendChild(item);
			}

			return list;
		};

		this.makeList = function(query) {
			var tags = tags_generator(query);
			var list = MakeAutocompleteList(tags);
			root_container.appendChild(list);

			return list;
		};
		this.removeList = function(list) {
			root_container.removeChild(list);
		};
		this.refreshList = function(old_list, new_query) {
			this.removeList(old_list);
			return this.makeList(new_query);
		};
	};

return function(root_element_query, options) {
	var LIST_UPDATE_TIMEOUT = 300;

	var self = this;
	options = ProcessOptions(options);
	var tags_generator = GetTagsGenerator(options);

	var root = MakeRootContainer(root_element_query);
	var inner_container = MakeInnerContainer(input);
	root.appendChild(inner_container);

	var list = null;
	var list_manager = new AutocompleteListManager(tags_generator, root);

	var input = document.createElement('input');
	input.className = 'input';
	input.setAttribute('size', 1);
	input.addEventListener(
		'focus',
		function() {
			list = list_manager.refreshList(list, input.value);
		}
	);
	var list_update_timer = null;
	input.addEventListener(
		'keyup',
		function() {
			var new_size = input.value.length + 1;
			input.setAttribute('size', new_size);

			var last_symbol = input.value.slice(-1);
			if (options.separators.indexOf(last_symbol) != -1) {
				AddTag(input.value.slice(0, -1));

				input.value = '';
				input.setAttribute('size', 1);

				return;
			}
			
			clearTimeout(list_update_timer);
			list_update_timer = setTimeout(
				function() {
					list = list_manager.refreshList(list, input.value);
				},
				LIST_UPDATE_TIMEOUT
			);
		}
	);
	input.addEventListener(
		'blur',
		function() {
			setTimeout(
				function() {
					list_manager.removeList(list);
				},
				1
			);
		}
	);
	inner_container.appendChild(input);

	var AddTag = function(text) {
		text = text.trim();
		if (text.length == 0) {
			return;
		}

		var tag = document.createElement('span');
		tag.className = 'tag-view';

		var tag_text = document.createElement('span');
		tag_text.className = 'text';
		tag_text.innerText = text;
		tag.appendChild(tag_text);

		var tag_remove_button = document.createElement('span');
		tag_remove_button.className = 'remove-button';
		tag_remove_button.addEventListener(
			'click',
			function() {
				inner_container.removeChild(tag);
				options.onChange.apply(self);
			}
		);
		tag.appendChild(tag_remove_button);

		inner_container.insertBefore(tag, input);
		options.onChange.apply(self);
	};

	this.getTags = function() {
		var tags = [];
		var tags_views = inner_container.querySelectorAll('.tag-view');
		for (var i = 0; i < tags_views.length; i++) {
			var tag = tags_views[i].querySelector('.text').innerText;
			tags.push(tag);
		}

		return tags;
	};
};
})();
