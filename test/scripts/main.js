window.addEventListener(
	'load',
	function() {
		var selected_tags_view = document.querySelector('.selected-tags-view');
		var tags_input = new WizardTags(
			'.tags-input',
			{
				tags: [
					'one',
					'two',
					'three',
					'four',
					'four',
					'five',
					'five',
					'',
					'      six',
					'six'
				],
				default_tags: ['one', 'two'],
				separators: ',',
				only_unique: true,
				placeholder: 'Themes',
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

		var version_view = document.querySelector('.version-view');
		version_view.innerHTML = tags_input.getVersion();

		var test_form = document.querySelector('.test-form');
		test_form.addEventListener(
			'submit',
			function(event) {
				console.log('attempt to submit test form');

				event.preventDefault();
				return false;
			}
		);
	}
);
