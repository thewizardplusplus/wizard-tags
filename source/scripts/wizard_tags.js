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

	return function(root_element_query, options) {
		options = OptionsProcessor.process(options);
		console.log(options);
	};
})();
