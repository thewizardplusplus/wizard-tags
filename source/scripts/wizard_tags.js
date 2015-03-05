function WizardTags(element_query) {
	var root = document.querySelector(element_query);
	root.innerText = "Ololo!";

	var select = document.createElement('select');
	select.className = 'wizard-tags-select';
	select.setAttribute('multiple', 'multiple');

	for (var i = 0; i < 5; i++) {
		var option = document.createElement('option');
		option.innerText = "ololo #" + i;

		select.appendChild(option);
	}

	root.appendChild(select);
}
