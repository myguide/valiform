# Valiform

As the name suggests, Valiform is a small (1.6k minified) library exposing a
JavaScript API to assist with HTML form validation. It is still in the very
early stages of development, and the API may change! You should not be using
this yet.

Anyway here's how it can be used as of right now:

```javascript
// 'my-form' is the id attribute on the form element
var form = Valiform.form("my-form");

// 'first-name' is the id attribute of a text input element
form.input("first-name").rules({
    required: true,
    error: function(e) {
        // Handle the form validation error
    },
    success() {
        // Success!
    }
}).watch();
```

More to come...