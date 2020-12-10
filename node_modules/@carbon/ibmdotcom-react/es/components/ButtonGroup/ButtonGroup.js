import _extends from "@babel/runtime/helpers/extends";

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Fragment, useEffect, useLayoutEffect, useRef } from 'react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Button group.
 */

var ButtonGroup = function ButtonGroup(_ref) {
  var buttons = _ref.buttons,
      enableSizeByContent = _ref.enableSizeByContent;
  var groupRef = useRef(null);
  var observedPseudoButtonNodesRef = useRef(new Set());
  var shouldUseResizeObserver = enableSizeByContent && typeof ResizeObserver !== 'undefined';
  var resizeObserverButtonsRef = useRef(!shouldUseResizeObserver ? null : new ResizeObserver(function (entries) {
    var groups = entries.reduce(function (acc, entry) {
      var group = entry.target.closest('.bx--buttongroup');

      if (group) {
        acc.add(group);
      }

      return acc;
    }, new Set());
    groups.forEach(function (group) {
      var width = Array.prototype.reduce.call(group.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn'), function (acc, item) {
        return Math.max(acc, item.offsetWidth);
      }, 0);
      var height = Array.prototype.reduce.call(group.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn'), function (acc, item) {
        return Math.max(acc, item.offsetHeight);
      }, 0);
      var hasWordWrap = height > 48;
      var mobileWidth = root.innerWidth <= 320;
      Array.prototype.forEach.call(group.querySelectorAll('.bx--buttongroup-item:not(.bx--buttongroup-item--pseudo) .bx--btn'), function (item) {
        item.style.width = mobileWidth ? "100%" : "".concat(width + 1, "px");
        item.classList.toggle("".concat(prefix, "--btn--multiline"), hasWordWrap);
      });
    });
  }));
  useLayoutEffect(function () {
    var observedPseudoButtonNodes = observedPseudoButtonNodesRef.current;
    var resizeObserverButtons = resizeObserverButtonsRef.current;

    if (shouldUseResizeObserver) {
      var groupNode = groupRef.current;
      observedPseudoButtonNodes.forEach(function (item) {
        if (!groupNode.contains(item)) {
          resizeObserverButtons.unobserve(item);
          observedPseudoButtonNodes.delete(item);
        }
      });
      var latestPseudoButtonNodes = groupNode.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn');
      Array.prototype.forEach.call(latestPseudoButtonNodes, function (item) {
        if (!observedPseudoButtonNodes.has(item)) {
          resizeObserverButtons.observe(item);
          observedPseudoButtonNodes.add(item);
        }
      });
    } else {
      observedPseudoButtonNodes.forEach(function (item) {
        resizeObserverButtons.unobserve(item);
        observedPseudoButtonNodes.delete(item);
      });
    }
  }, [buttons, shouldUseResizeObserver]);
  useEffect(function () {
    return function () {
      var resizeObserverButtons = resizeObserverButtonsRef.current;

      if (resizeObserverButtons) {
        resizeObserverButtons.disconnect();
      }
    };
  }, []);
  useEffect(function () {
    if (buttons.length > 1) {
      setSameHeight();
      root.addEventListener('resize', setSameHeight);
      return function () {
        return root.removeEventListener('resize', setSameHeight);
      };
    }
  }, [buttons]);
  /**
   * Set the buttons to have the same height based on the tallest one
   */

  var setSameHeight = function setSameHeight() {
    root.requestAnimationFrame(function () {
      var containerNode = groupRef.current;

      if (containerNode) {
        sameHeight(containerNode.getElementsByClassName("".concat(prefix, "--buttongroup-item")));
      }
    });
  };

  return React.createElement("ol", {
    className: "".concat(prefix, "--buttongroup"),
    "data-autoid": "".concat(stablePrefix, "--button-group"),
    ref: groupRef
  }, buttons.map(function (button, key) {
    return React.createElement(Fragment, {
      key: key
    }, React.createElement("li", {
      className: "".concat(prefix, "--buttongroup-item")
    }, React.createElement(Button, _extends({
      "data-autoid": "".concat(stablePrefix, "--button-group-").concat(key)
    }, button, {
      type: "button",
      kind: key === buttons.length - 1 ? 'primary' : 'tertiary'
    }), button.copy)), !shouldUseResizeObserver ? undefined : React.createElement("li", {
      className: "".concat(prefix, "--buttongroup-item ").concat(prefix, "--buttongroup-item--pseudo")
    }, React.createElement(Button, _extends({
      tabIndex: -1
    }, button, {
      type: "button",
      kind: key === buttons.length - 1 ? 'primary' : 'tertiary'
    }), button.copy)));
  }));
};

ButtonGroup.propTypes = {
  /**
   * Array of button objects to render.
   * Use the following for each items:
   *
   * | Name         | Data Type | Description                                                                                                                    |
   * | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
   * | `href`       | String    | URL for the button item                                                                                                        |
   * | `copy`       | String    | Button copy                                                                                                                    |
   * | `renderIcon` | Object    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
   *
   * Visit the [Button documentation](http://react.carbondesignsystem.com/?path=/story/buttons--default)
   * from Carbon for a full list of available props.
   */
  buttons: PropTypes.arrayOf(PropTypes.shape({
    copy: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    renderIcon: PropTypes.elementType
  })).isRequired,

  /**
   * `true` to make the buttons change their sizes by their contents.
   */
  enableSizeByContent: PropTypes.bool
};
ButtonGroup.defaultProps = {
  enableSizeByContent: true
};
export default ButtonGroup;