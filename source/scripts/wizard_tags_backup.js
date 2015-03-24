var WizardTags = (function() {
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


};
})();
