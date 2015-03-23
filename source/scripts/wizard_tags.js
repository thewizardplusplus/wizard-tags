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
					event_handlers.onClick
				);

				root_container.appendChild(inner_container);
				return inner_container;
			}
		};
	})();

	return function(root_element_query, options) {
		options = OptionsProcessor.process(options);

		var root_container = ContainersManager.getRoot(root_element_query);
		console.log(root_container);
		var inner_container = ContainersManager.makeInner(
			root_container,
			{
				onClick: function() {
					console.log('click on inner container');
				}
			}
		);
		console.log(inner_container);
	};
})();
