var create_instance = function(Constructor) {
  var _instance,
      _getInstance = function(options) {
        if(!_instance) {
          _instance = new Constructor(options);
        }
        return _instance;
      };

  Constructor.getInstance = _getInstance;

  return Constructor;
};

module.exports = {
  create_instance: create_instance
};
