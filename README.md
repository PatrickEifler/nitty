# nitty [![Build Status](https://travis-ci.org/PatrickEifler/nitty.svg?branch=master)](https://travis-ci.org/PatrickEifler/nitty)

A package providing nitty-gritty helpers for the implementation of client-side web services written in ES5.

### Installation

```
$ npm install nitty
```

### Example usage

```js
var ctrl = require("nitty").ctrl; ctrl.createInstance(...);
```

### Base Modules

#### Ctrl

A controller class which wires up an api, a signal and its context, as well as a mapping function.
The api is listening to a given scope. If the scope event is dispatched, the setter function of the 
signal context is called and returns the mapped data, which can be in turn remapped or
just delegated within a presenter(See the test/base/base_integration_test for more details).

#### Api
Registers a scope and provides a callback which fires on the success event of the given scope.

#### Context
Provides a set - callback which can be registered as a listener to a signal. 

#### Presenter
A basic presenter for delgating or mapping data objects to view objects.

### Pattern Modules

#### Signals
A Signal is similar to an Event Emitter/Dispatcher or a Pub/Sub system,
the main difference is that each event type has its own controller and 
doesn't rely on strings to broadcast/subscribe to events.

#### Event Dispatcher
Event Emitter/Dispatcher Pattern

### Subject (Observer Pattern)
The observer pattern is a software design pattern in which an object,
called the subject, maintains a list of its dependents, called observers,
and notifies them automatically of any state changes, usually by calling
one of their methods. It is mainly used to implement distributed event handling systems.

#### Singleton
Always returns the same instance of an instance object.

### Query Modules - A way to implement complex filters

#### Query Base Ctrl
A controller class which connects an api object to a given event and accepts a list of enricher functions.
Those enricher functions can be seen as different filters, which enriching the query with filter settings.
When the query updates the api sends the reload request.

#### Query builder
Observes the query object. Builds and updates the query. 

#### Query Cleaner
Cleans up the query object, removing empty strings, undefined types, falsy values. 

#### Querier
Registers a given query type and establishes the interface th get the args of the type. 
Should be used for implementing the query enricher functions. 
