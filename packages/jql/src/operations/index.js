/** @format */

const { $eq, $ne, $gt, $lt, $gte, $lte } = require('./equality');
const { $in, $notIn, $iIn, $iNotIN } = require('./existence');
const { $between, $notBetween, $iBetween, $iNotBetween } = require('./range');
const { $regex, $notRegex } = require('./regex');
const { $or, $and } = require('./contextual');

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
  $iNotIN,
  $between,
  $notBetween,
  $iBetween,
  $iNotBetween,
  $regex,
  $notRegex,
  $or,
  $and
};
