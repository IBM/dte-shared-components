"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _VideoPlayer = _interopRequireDefault(require("@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer"));

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * utilizes the videoplayerAPI to extract video data and
 * returns video title with duration for CTA
 *
 * @param {string} type type of CTA
 * @param {Array} videoId array of video ids
 * @returns {*} JSX Object
 */
function useVideoData(type, videoId) {
  var _useState = (0, _react.useState)([{
    title: '',
    duration: '',
    key: 0
  }]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      videoTitle = _useState2[0],
      setVideoTitle = _useState2[1];

  var getVideoData;
  (0, _react.useEffect)(function () {
    getVideoData();
  }, [getVideoData, type]);
  /**
   * retrieve duration and title information from the video if
   * the type of the CTA is `video`
   *
   * sets the `videoTitle` state with an array of title objects
   *
   */

  getVideoData = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var title;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(type === 'video' || type.includes('video'))) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return Promise.all(videoId.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(vidId) {
                var video, time;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _VideoPlayer.default.api(vidId.src);

                      case 2:
                        video = _context.sent;
                        time = _VideoPlayer.default.getVideoDuration(video.msDuration);
                        return _context.abrupt("return", {
                          title: video.name,
                          duration: time,
                          key: vidId.key
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 3:
            title = _context2.sent;
            setVideoTitle(title);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [type, videoId]);
  return videoTitle;
}

var _default = useVideoData;
exports.default = _default;