function WizardTags(element_query, options) {
	var LIST_UPDATE_TIMEOUT = 300;

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
	var CreateList = function(query) {
		list = document.createElement('ul');
		list.className = 'wizard-tags-autocomplete-list';
		if (typeof options.list_maximal_height !== "undefined") {
			list.style.maxHeight = options.list_maximal_height + 'px';
		}

		var tags = TagsGenerator(query);
		for (var i = 0; i < tags.length; i++) {
			var text = tags[i];

			var item = document.createElement('li');
			item.innerText = text;
			item.addEventListener(
				'click',
				function() {
					AddTag(this.innerText);
				}
			);

			list.appendChild(item);
		}

		root.appendChild(list);
	};
	var RemoveList = function() {
		root.removeChild(list);
	};

	var input = document.createElement('input');
	input.addEventListener(
		'focus',
		function() {
			CreateList(input.value);
		}
	);
	var list_update_timer = null;
	input.addEventListener(
		'keyup',
		function() {
			clearTimeout(list_update_timer);
			list_update_timer = setTimeout(
				function() {
					RemoveList();
					CreateList(input.value);
				},
				LIST_UPDATE_TIMEOUT
			);
		}
	);
	input.addEventListener(
		'blur',
		function() {
			setTimeout(RemoveList, 1);
		}
	);
	root.appendChild(input);

	var AddTag = function(text) {
		var tag = document.createElement('span');
		tag.className = 'wizard-tags-tag-view';
		tag.innerText = text;

		root.insertBefore(tag, input);
	};
	AddTag('test 1');
	AddTag('test 2');
}
