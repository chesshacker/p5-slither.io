function differenceBetweenAngles(firstAngle, secondAngle) {
  var difference = secondAngle - firstAngle;
  while (difference < -Math.PI) difference += 2 * Math.PI;
  while (difference > Math.PI) difference -= 2 * Math.PI;
  return difference;
}

function limitRange(number, limit) {
  if (number > limit) {
    return limit;
  } else if (number < -limit) {
    return -limit;
  }
  return number;
}

module.exports = {
  differenceBetweenAngles,
  limitRange
}
