var WizardTags = (function() {
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
	var TagManager = function(inner_container, change_handler) {
		var MakeTagView = function() {
			var tag_view = document.createElement('span');
			tag_view.className = 'tag-view';

			return tag_view;
		};
		var MakeTextView = function(text) {
			var text_view = document.createElement('span');
			text_view.className = 'text-view';
			text_view.innerText = text;

			return text_view;
		};
		var MakeRemoveButton = function(tag) {
			var remove_button = document.createElement('span');
			remove_button.className = 'remove-button';
			remove_button.addEventListener(
				'click',
				function() {
					this.removeTag(tag);
				}
			);

			return remove_button;
		};
		var MakeTag = function(text) {
			var tag_view = MakeTagView();

			var text_view = MakeTextView(text);
			tag_view.appendChild(text_view);

			var remove_button = MakeRemoveButton(tag);
			tag_view.appendChild(remove_button);

			return tag_view;
		};

		this.getTags = function() {
			var tags = [];
			var tags_views = inner_container.querySelectorAll('.tag-view');
			for (var i = 0; i < tags_views.length; i++) {
				var tag = tags_views[i].querySelector('.text-view').innerText;
				tags.push(tag);
			}

			return tags;
		};
		this.addTag = function(text) {
			text = text.trim();
			if (text.length == 0) {
				return;
			}

			var tag = MakeTag(text);
			inner_container.insertBefore(tag, input);

			change_handler();
		};
		this.removeTag = function(tag) {
			inner_container.removeChild(tag);
			change_handler();
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
};
})();
