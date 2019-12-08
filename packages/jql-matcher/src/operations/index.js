/** @format */

const { $eq, $ne, $gt, $lt, $gte, $lte } = require('./equality');
const { $in, $notIn, $iIn, $iNotIn } = require('./existence');
const { $between, $notBetween, $iBetween, $iNotBetween } = require('./range');
const { $regex, $notRegex } = require('./regex');
const { $or, $and } = require('./logical');

module.exports = {
  $eq,
  $ne,
  $gt,
  $lt,
  $gte,
  $lte,
  $in,
  $notIn,
  $iIn,
  $iNotIn,
  $between,
  $notBetween,
  $iBetween,
  $iNotBetween,
  $regex,
  $notRegex,
  $or,
  $and
};
