"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "match", {
  enumerable: true,
  get: function get() {
    return _match.match;
  }
});
Object.defineProperty(exports, "matches", {
  enumerable: true,
  get: function get() {
    return _match.matches;
  }
});
Object.defineProperty(exports, "getCharacterFor", {
  enumerable: true,
  get: function get() {
    return _match.getCharacterFor;
  }
});
Object.defineProperty(exports, "getNextIndex", {
  enumerable: true,
  get: function get() {
    return _navigation.getNextIndex;
  }
});
exports.keys = void 0;

var keys = _interopRequireWildcard(require("./keys"));

exports.keys = keys;

var _match = require("./match");

var _navigation = require("./navigation");