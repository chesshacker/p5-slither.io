require('reset-css/reset.css');
require('./style.css');
const sketch = require('./src/sketch');
const p5 = require('p5');

new p5(sketch);
