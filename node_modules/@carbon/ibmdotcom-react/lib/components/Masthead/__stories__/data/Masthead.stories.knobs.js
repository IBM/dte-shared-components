"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MastheadLinks = _interopRequireDefault(require("./MastheadLinks.js"));

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Knobs for Masthead. Also used by DotcomShell.stories.js
 *
 * type {{}}
 */
var mastheadKnobs = {
  navigation: {
    default: 'default',
    custom: _MastheadLinks.default,
    none: null
  },
  platform: {
    none: null,
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud'
    }
  }
};
var _default = mastheadKnobs;
exports.default = _default;