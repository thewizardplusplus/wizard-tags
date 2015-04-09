# Description

## Inclusion

    <link
        rel = "stylesheet"
        href = "path_to_wizard_tags/styles/wizard_tags.css" />
    <link
        rel = "stylesheet"
        href = "path_to_wizard_tags/styles/default_theme.css" />
    <script src = "path_to_wizard_tags/scripts/wizard_tags.js"></script>

With Ratchet library ([http://goratchet.com/](http://goratchet.com/))) can use
special theme:

    <link
        rel = "stylesheet"
        href = "path_to_wizard_tags/styles/ratchet_android_theme.css" />

## Using

    new WizardTags(root_element_query, options)

* `root_element_query` &mdash; query for function `Element.querySelector()` for
search of root element;
* `options` &mdash; options of tag editor.

## Options

Name | Type | Default | Description
--- | --- | --- | ---
tags | Array | &mdash; | list of available tags
| Function || callback which returns list of available tags that correspond to the query (callback signature: `array function(string query)`)
sort | String | &mdash; | method of sorting a list of available tags; available values: `asc` &mdash; ascending, `desc` &mdash; descending
| Function || function for sorting a list of available tags; function signature correspond to callback signature of function `Array.sort()`
default_tags | Array | `[]` (empty array) | the initial value of the tag editor
separators | String | `' '` (one space) | a group of characters that are used to mark the end of the tag; on enter one of its created the tag from other characters in the input field
only_unique | Boolean | `false` | if `true` disables the addition of same tags
placeholder | String | `'Tags'` | text that displayed in empty tag editor
onChange | Function | &mdash; | callback that is called when the tag list changes

## API

### Methods

* `Array getTags(void)` &mdash; returns list of current added tags.

## Hotkeys

* <kbd>Enter</kbd> &mdash; created the tag from all characters in the input
field.