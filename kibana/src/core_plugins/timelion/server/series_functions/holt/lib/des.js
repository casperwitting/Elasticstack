'use strict';

var _ = require('lodash');

module.exports = function des(points, alpha, beta) {
  var level;
  var prevLevel;
  var trend;
  var prevTrend;
  var value;
  var origin;
  var unknownCount = 0;

  if (points.length < 2) {
    throw new Error('You need at least 2 points to use double exponential smoothing');
  }

  var smoothedPoints = _.map(points, function (point, i) {
    if (i === 0) {
      return point;
    }

    if (i === 1) {
      // Establish initial values for level and trend;
      level = points[0];
      trend = points[1] - points[0]; // This is sort of a lame way to do this
    }

    if (point == null) {
      unknownCount++;
    } else {
      unknownCount = 0;
      // These 2 variables are not required, but are used for clarity.
      prevLevel = level;
      prevTrend = trend;
      level = alpha * point + (1 - alpha) * (prevLevel + prevTrend);
      trend = beta * (level - prevLevel) + (1 - beta) * prevTrend;
    }

    return level + unknownCount * trend;
  }, []);

  return smoothedPoints;
};
