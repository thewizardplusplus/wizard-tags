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

	return function(root_element_query, options) {
		options = OptionsProcessor.process(options);

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
		var input = MakeInput(
			inner_container,
			options.separators,
			{
				addTag: function(text) {
					console.log('add tag in input with text: ' + text);
				},
				updateAutocompleteList: function(query) {
					console.log('change query in input: ' + query);
				}
			}
		);
	};
})();
