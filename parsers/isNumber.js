module.exports = function(number) {

  if (!number) {

    return false;
  }

  if (number == "") {

    return false;
  }

  if (isNaN(number)) {

    return false;
  }

  return true;
}
