# Description

## Inclusion

```html
<link
    rel = "stylesheet"
    href = "path_to_wizard_tags/styles/wizard_tags.css" />
<link
    rel = "stylesheet"
    href = "path_to_wizard_tags/styles/default_theme.css" />
<script src = "path_to_wizard_tags/scripts/wizard_tags.js"></script>
```

With Ratchet library ([http://goratchet.com/](http://goratchet.com/)) can use
special theme:

```html
<link
    rel = "stylesheet"
    href = "path_to_wizard_tags/styles/ratchet_android_theme.css" />
```

## Using

```javascript
new WizardTags(root_element_query, options)
```

* `root_element_query` &mdash; query for function `Element.querySelector()` for
search of root element;
* `options` &mdash; options of tag editor.

## Options

Name | Type | Default | Description
--- | --- | --- | ---
tags | Array | &mdash; | list of available tags
 | Function || callback which returns list of available tags that correspond to the query (callback signature: `array function(string query)`)
case_sensitive | Boolean | `false` | if `true` default tags generator case sensitive, else &mdash; case insensitive
search_mode | String | `'tag'` | if `'tag'` default tags generator searches by tag prefix, if `'words'` default tags generator search by tag words prefix
sort | String | `'asc'` | method of sorting a list of available tags; available values: `'asc'` &mdash; ascending, `'desc'` &mdash; descending, `'priorities-asc'` &mdash; ascending by priorities tags, `'priorities-desc'` &mdash; descending by priorities tags
 | Function || function for sorting a list of available tags; function signature correspond to callback signature of function `Array.sort()`
priorities_tags | Object | `{}` | hash-table of priorities tags (e.g. `{'tag 1': 1, 'tag 2': 2}`); if it does not contain a tag, its priority is 0
default_tags | Array | `[]` (empty array) | the initial value of the tag editor
separators | String | `' '` (one space) | a group of characters that are used to mark the end of the tag; on enter one of its created the tag from other characters in the input field
only_unique | Boolean | `false` | if `true` disables the addition of same tags
placeholder | String | `'Tags'` | text that displayed in empty tag editor
onChange | Function | &mdash; | callback that is called when the tag list changes

## API

### Methods

* `String getVersion(void)` &mdash; returns version of library, such as
&laquo;1.1&raquo;;
* `Array getTags(void)` &mdash; returns list of current added tags;
* `void addCurrentText(void)` &mdash; creates the tag from all characters in the
input field.

## Hotkeys

* <kbd>Enter</kbd> &mdash; creates the tag from all characters in the input
field;
* <kbd>Backspace</kbd> &mdash; the first press selects the last tag, the next
press deletes it; if after the first time press any other key, the selection of
the tag will be reset.
