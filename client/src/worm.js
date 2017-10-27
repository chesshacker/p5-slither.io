const { forEachWorm } = require('shared');

function drawWorms(p) {
  forEachWorm((worm) => {
    p.ellipse(worm.x, worm.y, worm.size);
    worm.parts.forEach((part) => {
      p.ellipse(part.x, part.y, worm.size);
    });
  });
}

// TODO -- select player corresponding to worm
const getWormPosition = (player) => ({
  x: 0,
  y: 0
});

module.exports = {
  drawWorms,
  getWormPosition
}
