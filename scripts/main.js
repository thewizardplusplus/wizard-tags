window.addEventListener(
	'load',
	function() {
		var tags_input = new WizardTags(
			'.tags-input',
			{
				tags: ["one", "two", "three", "four", "five"],
				list_maximal_height: 150
			}
		);
	}
);
