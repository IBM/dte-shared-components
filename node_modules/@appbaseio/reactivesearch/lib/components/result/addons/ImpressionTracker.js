'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debounce = function debounce(method, delay) {
	clearTimeout(method._tId);
	// eslint-disable-next-line
	method._tId = setTimeout(function () {
		method();
	}, delay);
};

var ImpressionTracker = function (_React$Component) {
	_inherits(ImpressionTracker, _React$Component);

	function ImpressionTracker() {
		var _temp, _this, _ret;

		_classCallCheck(this, ImpressionTracker);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.currentHits = [], _this.trackedIds = {}, _this.waitingToBeTracked = {}, _this.setTrackerInterval = function () {
			_this.intervalID = setInterval(_this.tracker, 1000);
		}, _this.clearTrackerInterval = function () {
			if (_this.intervalID) {
				clearInterval(_this.intervalID);
				// Reset interval ID
				_this.intervalID = null;
			}
		}, _this.tracker = function () {
			if (!_this.hitIds.length) {
				_this.clearTrackerInterval();
				return;
			}
			// only run at client-side
			if (window && document) {
				_this.hitIds.forEach(function (id) {
					var element = document.getElementById(id);
					if (element) {
						if (_this.inViewPort(element)) {
							// Add the hit id in the list of tracked ids
							var hitObject = _this.currentHits.find(function (hit) {
								return hit._id === id;
							});
							_this.trackedIds[id] = true;
							// Add hit to waiting list to be recorded
							_this.addToWaitingList(hitObject);
						}
					}
				});
			}
			debounce(_this.recordImpression, 300);
		}, _this.addToWaitingList = function (hitObject) {
			var queryId = _this.queryId;
			if (hitObject && queryId) {
				var impression = {
					id: hitObject._id,
					index: hitObject._index
				};
				// Check if query id already present in waiting list
				if (_this.waitingToBeTracked[queryId]) {
					_this.waitingToBeTracked[queryId].push(impression);
				} else {
					_this.waitingToBeTracked[queryId] = [impression];
				}
			}
		}, _this.recordImpression = function () {
			if (Object.keys(_this.waitingToBeTracked).length) {
				var trackImpressions = _this.props.trackImpressions;

				var untrackedHits = _extends({}, _this.waitingToBeTracked);
				Object.keys(untrackedHits).forEach(function (queryId) {
					if (untrackedHits[queryId] && untrackedHits[queryId].length) {
						trackImpressions(queryId, untrackedHits[queryId]);
						// Removed tracked impressions from waiting list
						delete _this.waitingToBeTracked[queryId];
					}
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	// Represents the list of hits returned by the query
	// An array of hits objects
	// An object to track the recorded impressions
	// It can have the values in following shape
	// { "hit_id": { "index": "test" }}

	// An object to know the the untracked impression i.e not recorded by BE
	// It can have the values in following shape
	// { "query_id": [{ "id": "hit_id", "index": "test"}]}


	ImpressionTracker.prototype.componentDidMount = function componentDidMount() {
		var hits = this.props.hits;

		this.setCurrentHits(hits);
		// Add scroll events to track the impressions
		if (window) {
			window.addEventListener('scroll', this.tracker);
		}
	};

	ImpressionTracker.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		var hits = this.props.hits;

		if (hits && hits !== prevProps.hits) {
			// Only compare hit ids for performance reasons
			var prevHitIds = prevProps.hits.map(function (hit) {
				return hit._id;
			});
			var currentHitIds = hits.map(function (hit) {
				return hit._id;
			});
			if (!(0, _helper.isEqual)(currentHitIds, prevHitIds)) {
				this.setCurrentHits(hits);
			}
		}
	};

	ImpressionTracker.prototype.componentWillUnmount = function componentWillUnmount() {
		// Clear the interval
		this.clearTrackerInterval();
	};

	ImpressionTracker.prototype.inViewPort = function inViewPort(el) {
		var rect = el.getBoundingClientRect();
		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
	};

	ImpressionTracker.prototype.setCurrentHits = function setCurrentHits(hits) {
		this.currentHits = hits;
		// Reset the tracked Ids for new hits
		this.trackedIds = {};
		if (hits.length) {
			this.tracker();
			// Run the tracker function on an interval of 1s to track the impressions for
			// non-scroll views for e.g on tab change
			this.setTrackerInterval();
		}
	};

	ImpressionTracker.prototype.render = function render() {
		var children = this.props.children;

		return children;
	};

	_createClass(ImpressionTracker, [{
		key: 'hitIds',
		get: function get() {
			var _this2 = this;

			return this.currentHits.map(function (hit) {
				return hit._id;
			}).filter(function (id) {
				return !_this2.trackedIds[id];
			});
		}
	}, {
		key: 'queryId',
		get: function get() {
			var state = this.context && this.context.store ? this.context.store.getState() : null;

			return state ? state.analytics.searchId : null;
		}
	}]);

	return ImpressionTracker;
}(_react2.default.Component);

ImpressionTracker.contextType = _utils.ReactReduxContext;


ImpressionTracker.propTypes = {
	trackImpressions: _types2.default.funcRequired,
	hits: _types2.default.hits,
	children: _propTypes.node
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		trackImpressions: function trackImpressions(queryID, impressions) {
			return dispatch((0, _actions.recordImpressions)(queryID, impressions));
		}
	};
};

exports.default = (0, _utils.connect)(null, mapDispatchToProps)(ImpressionTracker);