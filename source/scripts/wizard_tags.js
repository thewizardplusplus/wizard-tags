var WizardTags = (function() {
	var OptionsProcessor = (function() {
		var MakeDefaultTagsGenerator = function(tags) {
			return function(query) {
				return tags.filter(
					function(tag) {
						return tag.substr(0, query.length) == query;
					}
				);
			};
		};
		var GetTagsGenerator = function(options) {
			var tags_generator = function() {
				return [];
			};
			if (options.tags instanceof Function) {
				tags_generator = options.tags;
			} else if (options.tags instanceof Array) {
				tags_generator = MakeDefaultTagsGenerator(options.tags);
			}

			return tags_generator;
		};

		return {
			process: function(options) {
				var processed_options = options || {};
				processed_options.tags = GetTagsGenerator(processed_options);
				processed_options.separators =
					processed_options.separators
					|| ' ';
				processed_options.onChange =
					processed_options.onChange
					|| function() {};

				return processed_options;
			}
		};
	})();
	var ContainersManager = (function() {
		return {
			getRoot: function(root_element_query) {
				var root_container = document.querySelector(root_element_query);
				root_container.className = 'wizard-tags';

				return root_container;
			},
			makeInner: function(root_container, event_handlers) {
				var inner_container = document.createElement('div');
				inner_container.className = 'inner-container';
				inner_container.addEventListener(
					'click',
					event_handlers.updateAutocompleteList
				);

				root_container.appendChild(inner_container);
				return inner_container;
			}
		};
	})();
	var MakeInput = (function() {
		var LIST_UPDATE_TIMEOUT = 300;

		var UpdateInputSize = function(input) {
			var new_size = input.value.length + 1;
			input.setAttribute('size', new_size);
		};
		var ClearInput = function(input) {
			input.value = '';
			UpdateInputSize(input);
		};

		return function(inner_container, separators, event_handlers) {
			var input = document.createElement('input');
			input.className = 'input';
			UpdateInputSize(input);

			input.addEventListener(
				'focus',
				function() {
					event_handlers.updateAutocompleteList(this.value);
				}
			);

			var list_update_timer = null;
			input.addEventListener(
				'keyup',
				function() {
					UpdateInputSize(this);

					var last_symbol = this.value.slice(-1);
					if (
						last_symbol.length
						&& separators.indexOf(last_symbol) != -1
					) {
						event_handlers.addTag(this.value.slice(0, -1));
						ClearInput(this);

						return;
					}

					clearTimeout(list_update_timer);
					var self = this;
					list_update_timer = setTimeout(
						function() {
							event_handlers.updateAutocompleteList(self.value);
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
							event_handlers.updateAutocompleteList('');
						},
						1
					);
				}
			);

			inner_container.appendChild(input);
			return input;
		};
	})();
	var TagManager = function(inner_container, input, event_handlers) {
		var MakeTagView = function() {
			var tag_view = document.createElement('span');
			tag_view.className = 'tag-view';

			return tag_view;
		};
		var MakeTextView = function(text) {
			var text_view = document.createElement('span');
			text_view.className = 'text-view';
			text_view.innerHTML = text;

			return text_view;
		};
		var RemoveTag = function(inner_container, tag_view, event_handlers) {
			inner_container.removeChild(tag_view);
			event_handlers.onTagListChange();
		};
		var MakeRemoveButton = function(
			inner_container,
			tag_view,
			event_handlers
		) {
			var remove_button = document.createElement('span');
			remove_button.className = 'remove-button';
			remove_button.addEventListener(
				'click',
				function() {
					RemoveTag(inner_container, tag_view, event_handlers);
				}
			);

			return remove_button;
		};
		var MakeTag = function(text, inner_container, event_handlers) {
			var tag_view = MakeTagView();

			var text_view = MakeTextView(text);
			tag_view.appendChild(text_view);

			var remove_button = MakeRemoveButton(
				inner_container,
				tag_view,
				event_handlers
			);
			tag_view.appendChild(remove_button);

			return tag_view;
		};

		this.getTags = function() {
			var tags = [];
			var tags_views = inner_container.querySelectorAll('.tag-view');
			for (var i = 0; i < tags_views.length; i++) {
				var tag = tags_views[i].querySelector('.text-view').innerHTML;
				tags.push(tag);
			}

			return tags;
		};
		this.addTag = function(text, inner_container, input, event_handlers) {
			text = text.trim();
			if (text.length == 0) {
				return;
			}

			var tag = MakeTag(text, inner_container, event_handlers);
			inner_container.insertBefore(tag, input);

			event_handlers.onTagListChange();
		};
	};

	return function(root_element_query, options) {
		options = OptionsProcessor.process(options);

		var self = this;
		var root_container = ContainersManager.getRoot(root_element_query);
		var inner_container = ContainersManager.makeInner(
			root_container,
			{
				updateAutocompleteList: function() {
					var query = input.value;
					console.log('change query in input: ' + query);
				}
			}
		);
		var tags_event_handlers = {
			onTagListChange: function() {
				options.onChange.apply(self);
			}
		};
		var tag_manager = new TagManager(
			inner_container,
			input,
			tags_event_handlers
		);
		var input = MakeInput(
			inner_container,
			options.separators,
			{
				addTag: function(text) {
					tag_manager.addTag(
						text,
						inner_container,
						input,
						tags_event_handlers
					);
				},
				updateAutocompleteList: function(query) {
					console.log('change query in input: ' + query);
				}
			}
		);

		this.getTags = function() {
			return tag_manager.getTags();
		};
	};
})();
