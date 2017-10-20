// returns desired heading in radians
function getMouseInput(p) {
  const dx = p.mouseX - p.windowWidth/2;
  const dy = p.mouseY - p.windowHeight/2;
  const desiredHeading = Math.atan2(dy, dx);
  const goFast = p.mouseIsPressed;
  return { desiredHeading, goFast };
}

module.exports = {
  getMouseInput
}
