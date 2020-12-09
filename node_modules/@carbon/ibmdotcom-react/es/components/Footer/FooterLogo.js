/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';

var FooterLogo = function FooterLogo(props) {
  return React.createElement("svg", props, React.createElement("title", null, "IBM Logo"), React.createElement("path", {
    d: "M30.444 60.208v4.03H0v-4.03h30.444zm78.291-.001v4.03H86.983v-4.03h21.752zm47.858 0v4.03H134.84v-4.03h21.753zm-33.416 0l-1.398 4.03-1.38-4.03h2.778zm-88.384 0h42.775c-2.797 2.426-6.39 3.925-10.327 4.025l-.423.006H34.793v-4.03h42.775zm-4.35-8.46v4.03H0v-4.03h30.444zm52.402 0c-.332 1.248-.8 2.44-1.389 3.555l-.259.474H34.793v-4.029h48.052zm73.748-.005v4.031H134.84v-4.03h21.753zm-47.858 0v4.031H86.983v-4.03h21.752zm17.375 0l-1.398 4.031h-5.85l-1.395-4.03h8.643zM21.745 43.285v4.03H8.698v-4.03h13.047zm61.195 0a17.32 17.32 0 0 1 .476 3.51l.008.52H68.796v-4.03H82.94zm-26.401 0v4.03H43.491v-4.03H56.54zm72.502-.007l-1.396 4.03H115.93l-1.397-4.03h14.507zm18.85 0v4.03h-13.05v-4.03h13.05zm-39.156 0v4.03H95.684v-4.03h13.051zm-86.99-8.454v4.03H8.698v-4.03h13.047zm56.117 0a16.945 16.945 0 0 1 2.926 3.582l.264.447h-37.56v-4.03h34.37zm30.873-.01v4.03H95.684v-4.03h13.051zm39.157 0v4.03H134.84v-4.03h13.052zm-15.919 0l-1.396 4.03h-17.579l-1.396-4.03h20.371zm-50.778-8.452a16.963 16.963 0 0 1-2.82 3.674l-.37.355H43.49v-4.029h37.704zm-59.45 0v4.03H8.698v-4.03h13.047zm126.147-.013v4.031H134.84v-3.839l-1.33 3.839h-11.456l1.373-4.03h24.465zm-27.743 0l1.372 4.031h-11.456l-1.33-3.839v3.84H95.684v-4.032h24.465zm-98.404-8.448v4.03H8.698V17.9h13.047zm61.68 0c0 1.215-.134 2.399-.375 3.542l-.11.487H68.796V17.9h14.628zM56.538 17.9v4.03H43.491V17.9H56.54zm91.352-.015v4.03h-22.954l1.37-4.03h21.584zm-30.624 0l1.372 4.03H95.684v-4.03h21.583zM30.444 9.437v4.03H0v-4.03h30.444zm50.753 0a17.048 17.048 0 0 1 1.498 3.499l.15.531H34.794v-4.03h46.403zm75.396-.018v4.03h-28.776l1.373-4.03h27.403zm-42.207 0l1.372 4.031H86.982V9.42h27.404zM30.444.978v4.03H0V.977h30.444zm36.374 0c3.96 0 7.594 1.415 10.448 3.772l.303.257H34.794V.977h32.024zm89.775-.022v4.031h-25.894l1.372-4.03h24.522zm-45.098 0l1.372 4.03H86.982V.955h24.513z"
  }));
};

FooterLogo.defaultProps = {
  className: "bx--footer-logo__logo",
  viewBox: "0 0 157 65"
};
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
var stablePrefix = ddsSettings.stablePrefix;
var prefix = settings.prefix;
/**
 * Footer logo component
 *
 * @returns {object} JSX object
 */

var Logo = function Logo() {
  return React.createElement("div", {
    "data-autoid": "".concat(stablePrefix, "--footer-logo"),
    className: "".concat(prefix, "--footer-logo")
  }, React.createElement("a", {
    "data-autoid": "".concat(stablePrefix, "--footer-logo__link"),
    className: "".concat(prefix, "--footer-logo__link"),
    href: "https://www.ibm.com/"
  }, React.createElement(FooterLogo, null)));
};

export default Logo;