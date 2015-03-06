window.addEventListener(
	'load',
	function() {
		var tags_input = new WizardTags(
			'.tags-input',
			{
				tags: function() {
					return ["one", "two", "three", "four", "five"];
				},
				list_maximal_height: 150
			}
		);
	}
);
