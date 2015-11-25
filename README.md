# nitty [![Build Status](https://travis-ci.org/PatrickEifler/nitty.svg?branch=master)](https://travis-ci.org/PatrickEifler/nitty)

A package providing nitty-gritty helpers for the implementation of client-side web services written in ES5.

### Installation

```
$ npm install nitty
```

### How to use nitty

```js
// Require nitty components

var Ctrl = require("nitty").ctrl;
var Api = require("nitty").api;
var Context = require("nitty").context;
var Presenter = require("nitty").presenter;
var SingletonFactory = require("nitty").singleton_factory;
var dispatcher = require("nitty").dispatcher;

/*  Define the params of the Ctrl Object
  * Ctrl - Constructor
  *
  * @api (type: Api)
  * The api the ctrl should register to
  *
  * @signal
  * The signal the ctrl should register and dispatch
  *
  * @context (type: Object)
  * The context object encapsulates the objects
  * which will be bound to the signal
  *
  * @dataMapper (type: Function)
  * The dataMapper function represents the callback for custom
  * manipulation on the api update params
*/

/* Initialize the Api giving it the scope "integration"
 * The api instance registers to the success event of the given scope (success_integration).
*/
var api = Api.createInstance(
  "integration"
);

/* Declare the Signal holder
 * The SignalRegister initializes a signal instance into this holder.
*/

var updatedSignal;

/* Declare the DataMapper callback
 * The params argument is the response object from the api update call.
 * For example { integration: passed }
*/
var dataMapper = function(params) {
  return params;
};

//Initialize the Presenter as a singleton object
var presenter = SingletonFactory.createInstance(Presenter.createInstance());

//Declare the Object passed to the view
var toBePassedToView = {};

/* Initialize the Context
 * The context instance subscribes to the signal.
 * Internally the set callback will be triggered if the signal fires. 
*/
var context = Context.createInstance(function(data) {
  presenter.mapObj(data, function() {
    toBePassedToView = { passed: data.integration.passed };
  });
});

/* Initialize the Ctrl
 * The ctrl instance wires up its arguments.
*/
var ctrl = Ctrl.createInstance(
  api, updatedSignal, context, dataMapper
);

/* Integration Test
 *
 * The Signal should be wired up with the Context
*/
assert.strictEqual(this.ctrl.signal.getNumberOfListeners(),1);
assert.isTrue(this.ctrl.signal.hasListener(context.set, context));
/* 
 * The Api is scoped to integration and registered to success_integration event.
 * The updated data { integration: {passed: true} } was propagated to the Context.
 * The toBePassedToView object was updated in the Context Set Callback. 
*/ 
dispatcher.dispatch("success_integration", { integration: {passed: true} });
assert.deepEqual(toBePassedToView, {passed: true});

```
### Description

### What about all these components?

### Base Modules

#### Ctrl

A controller class which wires up an api, a signal and its context, as well as a mapping function.
The api is listening to a given scope. If the scope event is dispatched, the setter function of the 
signal context is called and returns the mapped data, which can be in turn remapped or
just delegated within a presenter.

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

#### Subject (Observer Pattern)
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
