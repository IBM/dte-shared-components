import React, { Component } from "react";
import PropTypes from "prop-types";

export const toSearchString = (searchParams = {}) => {
  return Object.keys(searchParams)
    .map((key) => `${key}=${encodeURIComponent(searchParams[key])}`)
    .join("&");
};

export const createMailtoLink = (email, headers) => {
  let link = `mailto:${email}`;
  if (headers) {
    link += `?${toSearchString(headers)}`;
  }
  return link;
};

class Mailto extends Component {
  handleClick(event) {
    event.preventDefault();
    const { email, headers } = this.props;
    window.location.href = createMailtoLink(email, headers);
  }

  renderLink() {
    // eslint-disable-next-line no-unused-vars
    const { email, obfuscate, mask, headers, children, ...others } = this.props;
    return (
      <a href={createMailtoLink(email, headers)} {...others}>
        {children}
      </a>
    );
  }

  renderObfuscatedLink() {
    // eslint-disable-next-line no-unused-vars
    const { email, obfuscate, mask, headers, children, ...others } = this.props;
    return (
      <a
        onClick={this.handleClick.bind(this)}
        href={`mailto:${mask}`}
        {...others}
      >
        {children}
      </a>
    );
  }

  render() {
    const { obfuscate } = this.props;
    return obfuscate ? this.renderObfuscatedLink() : this.renderLink();
  }
}

Mailto.defaultProps = {
  obfuscate: false,
  mask: "*****",
};

Mailto.propTypes = {
  email: PropTypes.string,
  headers: PropTypes.any,
  children: PropTypes.any,
  obfuscate: PropTypes.bool,
  mask: PropTypes.string,
};

export default Mailto;
