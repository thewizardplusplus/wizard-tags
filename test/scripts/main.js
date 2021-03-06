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
					'six',
					'multi words tag'
				],
				case_sensitive: true,
				search_mode: 'words',
				default_tags: ['one', 'two'],
				separators: ',',
				only_unique: true,
				placeholder: 'Themes',
				sort: 'priorities-desc',
				priorities_tags: {'six': 2, 'four': 1},
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
		if (version_view) {
			version_view.innerHTML = tags_input.getVersion();
		}

		var test_form = document.querySelector('.test-form');
		if (test_form) {
			test_form.addEventListener(
				'submit',
				function(event) {
					console.log('attempt to submit test form');

					event.preventDefault();
					return false;
				}
			);
		}

		var adding_button = document.querySelector('.adding-button');
		if (adding_button) {
			adding_button.addEventListener(
				'click',
				function() {
					tags_input.addCurrentText();
				}
			);
		}
	}
);
