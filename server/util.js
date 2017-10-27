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
BOARD_SIZE = 300
function randomPosition() {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE - BOARD_SIZE/2),
    y: Math.floor(Math.random() * BOARD_SIZE - BOARD_SIZE/2)
  };
}

module.exports = {
  differenceBetweenAngles,
  limitRange,
  randomPosition
}
