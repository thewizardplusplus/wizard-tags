window.addEventListener(
	'load',
	function() {
		var selected_tags_view = document.querySelector('.selected-tags-view');
		var tags_input = new WizardTags(
			'.tags-input',
			{
				tags: ["one", "two", "three", "four", "five"],
				separators: ',',
				onChange: function() {
					var tags = this.getTags();
					if (tags.length) {
						selected_tags_view.innerText = tags.join(', ');
					} else {
						selected_tags_view.innerHTML = '&mdash;';
					}
				}
			}
		);
	}
);
