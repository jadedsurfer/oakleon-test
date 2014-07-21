oakleon-test
============

The assignment:

Implement a dynamically generated input form using React [http://facebook.github.io/react/](http://facebook.github.io/react/). Generate a form based on some JSON that looks like the following [JSON data](http://facebook.github.io/react/). Feel free to extend the JSON with ideas of your own. The idea here is that the form for editing an object is generated at runtime based only on that object.

## To use

```
gulp
node server.js
```

And visit http://localhost:3000/.


Of course, I didn't need to use node or gulp or browserify, but I wanted to better simulate what kind of components a production level app might use.

## Assumptions

The data format used to the generate the form is unusual for a number of reasons:
-Fields are in an array of objects rather than on the root level with the ID
-There are duplicate field names
-While most field values are primitives, one of the field values is an object

To deal with this format, I made the following assumptions in the processing logic:
-"id" field will be hidden on the form but populated
-Every field in the "fields" array will have some visible representation on the form (this could be tweaked with some additional logic in the future)
-Use the field object's first key as the field label unless it is "required" (labeling could be configured by another object or an additional "_label" attribute in the future)
-"required" is a reserved word and cannot be used as a field name (ideally this would be in a properties object like in json schema or at least have an _ in front of it for easier processing)
-Fields with numeric values and "date" in the key should have the value converted from Unix value (milliseconds from epoch) to a human readable date (REST api will convert date back into UNIX date for post and put)
-For any field that has an object as a value should be treated like a field group and any of the properties in the object should be processed like any other field
-Fields with a boolean value should be converted into checkboxes.
-Duplicate fields, like tag and comments, should have the values combined to produce one field (this one is probably the most controversial and would require a better understanding of the use case/requirements; it also assumes that the REST API would parse those fields and separate the values

