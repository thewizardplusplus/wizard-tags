function WizardTags(element_query, options) {
	var LIST_UPDATE_TIMEOUT = 300;

	var self = this;
	options = options || {};
	options.separators = options.separators || ' ';
	options.onChange = options.onChange || function() {};

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

	var inner_container = document.createElement('div');
	inner_container.className = 'inner-container';
	inner_container.addEventListener(
		'click',
		function() {
			input.focus();
		}
	);
	root.appendChild(inner_container);

	var list = null;
	var CreateList = function(query) {
		list = document.createElement('ul');
		list.className = 'autocomplete-list';

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
		if (list != null) {
			root.removeChild(list);
			list = null;
		}
	};

	var input = document.createElement('input');
	input.className = 'input';
	input.setAttribute('size', 1);
	input.addEventListener(
		'focus',
		function() {
			RemoveList();
			CreateList(input.value);
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
}
