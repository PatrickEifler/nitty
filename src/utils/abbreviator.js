exports.shortenNumber = function(number, decimal_places) {
  decimal_places = decimal_places || 1;
  var str,
      factor = Math.pow(10, decimal_places);

  if (number <  1000000000) {
    str = Math.floor(number / (1000000 / factor)) / factor;
  }

  return str;
};

exports.unshortNumber = function(number) {
  var unshorten_number = number * 1000000;
  unshorten_number.toString();
  return unshorten_number;
};
