window.addEventListener(
	'load',
	function() {
		var selected_tags_view = document.querySelector('.selected-tags-view');
		var tags_input = new WizardTags(
			'.tags-input',
			{
				tags: ['one', 'two', 'three', 'four', 'five', '', '      six'],
				default_tags: ['one', 'two'],
				separators: ',',
				only_unique: true,
				placeholder: 'Tags',
				sort: 'desc',
				onChange: function() {
					var tags = this.getTags();
					if (tags.length) {
						selected_tags_view.innerHTML = tags.join(', ');
					} else {
						selected_tags_view.innerHTML = '&mdash;';
					}
				}
			}
		);
	}
);
