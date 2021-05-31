module.exports = (x1, y1, x2, y2, x) =>
  (y1 * (x2 - x) + y2 * (x - x1)) / (x2 - x1);
