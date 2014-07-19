# flight-history

A [Flight](https://github.com/twitter/flight) component for bi-directional handling 
of push|hash state.

## Installation

```bash
bower install --save flight-history
```

## Example

Initialize and specify routes

```javascript
var History = require('flight-history');
History.attachTo(window, {
    routeBase: '/app',     // Prepended to all routes. Default: ''
    routes: {'/': 'uiRootNavigation', 
            '/user/{id}/': 'uiUserPageNavigation'
    }
});
```

Using the above snippet as a reference, browser navigation to 

* `/app/` triggers the `uiRootNavigation` event with an empty data object.
* `/app/user/1234/` triggers the `uiUserPageNavigation` event with data object `{id: 1234}`

Conversely:

* On the `uiRootNavigation` event, the URL `/app/` will be added to browser history using pushstate (if supported) or hash state
* On the `uiUserPageNavigation` event with data `{id: 442242}`, the URL `/app/user/442242/` will be added to browser history

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

## To Do

* Tests
* Allow regex customization (currently `{thing}` is replaced with `[\\w\\s\\d-]+` for location matching)
* Allow splitting triggers into the the event fired on browser navigation and the event that triggers the push|hash state change. 
