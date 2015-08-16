/* The observer pattern is a software design pattern in which an object,
 * called the subject, maintains a list of its dependents, called observers,
 * and notifies them automatically of any state changes, usually by calling
 * one of their methods. It is mainly used to implement distributed
 * event handling systems
 *
 * This Object represents the subject implementation of the observer pattern
 *
*/

var Subject = ( function() {

  var Subject = function() {
    this._list = [];
  };

  Subject.prototype.observe = function observeObject( obj ) {
    this._list.push( obj );
  };

  Subject.prototype.unobserve = function unobserveObject( obj ) {
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      if( this._list[ i ] === obj ) {
        this._list.splice( i, 1 );
        return true;
      }
    }
    return false;
  };

  Subject.prototype.notify = function notifyObservers() {
    var args = Array.prototype.slice.call( arguments, 0 );
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      this._list[ i ].update.apply( null, args );
    }
  };

  return Subject;

}());

module.exports.init = function() {
  return new Subject();
};
