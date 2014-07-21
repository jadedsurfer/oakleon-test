oakleon-test
============

The assignment:

Implement a dynamically generated input form using React [http://facebook.github.io/react/](http://facebook.github.io/react/). Generate a form based on some JSON that looks like the following [JSON data](http://facebook.github.io/react/). Feel free to extend the JSON with ideas of your own. The idea here is that the form for editing an object is generated at runtime based only on that object.

## Check it out

On Mac, download the repo, cd in the directory and use:
```
python -m SimpleHTTPServer
```
Fire up the browser and enjoy a dynamically rendered form.

Alternately, you can install the dependencies and use node to serve index.html.
```
npm install
node server.js
```

## Notes about the implementation

I realize it is possible with react.js to accomplish the implementation with linking to everything scripts directly from page. In other words, I didn't need gulp, browserify, or node. However, I wanted to better simulate what kind of components a production level app might use. Thus the dependencies are numerous.

### The Data

The data format used to the generate the form is unusual for a number of reasons:
-Fields are in an array of objects rather than on the root level with the ID
-There are duplicate field names
-While most field values are primitives, one of the field values is an object

### Assumptions

To deal with this format, I made the following assumptions in the processing logic:
* "id" field should be hidden on the form but populated (since this is rarely needed by business users and would most likely be used in the url anyway)
* Duplicate fields, like tag and comments, should have the values combined to produce one field (this one is probably the most controversial and would require a better understanding of the use case/requirements; it also assumes that the REST API would parse those fields and separate the values)
* All other fields in the "fields" array should have some visible representation on the form (this could be tweaked with some additional logic in the future)
* The field object's first key as the field label should be used as the lable unless it is "required" (labeling could be configured by another object or an additional "_label" attribute in the future)
* "required" is a reserved word and should not be used as a field name (ideally this would be in a properties object like in json schema or at least have an _ in front of it for easier processing)
* Fields with numeric values and "date" in the key should have the value converted from Unix value (milliseconds from epoch) to a human readable date (REST api will convert date back into UNIX date for post and put)
* Any field that has an object as a value should be treated like a multi-select
* Fields with a boolean value should be converted into checkboxes.

### Source files
I'll go through the source files in the order they are used by the app.

#### src/index.js
Initializes the app. Would normally be a place to coordinate multiple top level components or page elements. I've also used it to embed the data file. From a performance standpoint, it is best for the server to deliver it with the page so the user doesn't have to wait for another round trip while the page fetches the file. 

#### src/components/app.jsx
Top level component. Currently, I use it clean up and enhance data.js and to render the dynamic form. 

#### src/components/process-config.jsx
Cleans up and adds metadata to the fields in data.js. It deals with the duplicate fields and data types as well as adding a consistent structure to each field to make subsequent use of the data easier. The logic is a little tricky so this file is commented well.

#### src/components/utils.jsx
Utility functions. Determines data types and converts unix timestamps into readable dates.

#### src/components/form.jsx
Renders a form that wraps the field list. This puts the form element on the page with a nice heading, adds the hidden id field, and adds a submit button. It loops through the field list and adds a Field component for each field from data.js. Keep in mind that it uses the processed version of data.js.

I had a FieldList component at one point, but it seemed overkill to have a component that bascially just looped through the field array. I moved the trivial about of functionality to this Form component.

#### src/components/field.jsx
Renders a field. There are subtle differences between multi-select boxes, checkboxes, and general input boxes so those are separate functions. I used the react-bootstrap library to save time in creating robust input components. Despite using this 3rd party library, I ran into trouble handling the change event while selecting multiple values in the select box. That needs to be investigated further. 

## Future Directions
There are plenty of ways this implementation could be enhanced. I aimed to do what I felt would be something workable I could present to a client for feedback. Next steps would be directed by a better understanding of the use cases and more access to sample data. The tests were mostly for structuring the work and sanity testing the changes. While they did help during the couple of significant refactorings I did, they would need to be augmented to really test the error handling.

Hope you enjoy my first try with react.js!


