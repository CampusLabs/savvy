# Savvy

The save button your save button could be like.

[Demo](http://orgsync.github.io/savvy) | [Tests](http://orgsync.github.io/savvy/test)

## Install

Savvy's two dependencies are jQuery and Underscore, so include them before
Savvy.

```html
<script src='savvy.js'></script>
```

...or use [bower](https://github.com/twitter/bower)...

```
bower install savvy
```

...and get the JavaScript file from `components/savvy/savvy.js`.

## API

### Savvy([el [, dfd [, options]]])

- **el** - a jQuery object, DOM node, jQuery selector or raw HTML.
- **dfd** - a Deferred object, like one returned by `$.ajax`.
- **options** - An optional object with any or all of the following...
  - **pendingContent** `''` - The content the element should display while the
    deferred object is in a `pending` state.
  - **doneContent** `''` - The content the element should display while the
    deferred object is in a `done` state.
  - **failContent** `''` - The content the element should display while the
    deferred object is in a `fail` state.
  - **duration** `-1` - The time (ms) to wait before returning the element's
    original content after a `done` or `fail`. `-1` keeps the element in the `
    done` or `fail` state until `reset()` is called.

### setElement(el)

Set the `$el` property. This allows the creation of "empty" savvy instances to
be populated later.

### setDfd(dfd)

Update the deferred object for a savvy instance.

### reset()

Return the element to its original state. This will only need to be called
manually when `duration` is `-1`.
