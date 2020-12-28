import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkUnderline from "remark-underline";
import remarkSubSuper from "remark-sub-super";
import ReactMarkdownWithHtml from "react-markdown/with-html";

import styled from "styled-components";

import { CodeSnippet } from "carbon-components-react";

// import { trackCTA } from "lib/analytics";
// import { copyToClipboard } from "lib/utils";

let Styled = styled.span`
  & ol,
  & ul {
    list-style: inside;
  }
  & ol {
    list-style-type: decimal;
  }
  & li {
    padding-bottom: 0.25rem;
  }
  & p,
  & ol,
  & ul,
  & {
    margin: 0 0 1.5rem 0;
  }
  & blockquote,
  & pre {
    margin: 0.5rem 1rem 1.5rem 1rem;
  }
  & blockquote p {
    display: inline;
  }

  & h1 {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 2.2rem;
    letter-spacing: 0;
  }
  & h2 {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: 0;
  }
  & h3 {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.625rem;
    letter-spacing: 0;
  }
  & h4,
  h5 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.375rem;
    letter-spacing: 0;
  }
  h6 {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.375rem;
    letter-spacing: 0;
  }
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin: 0 0 1.5rem 0;
  }
`;

const inlineCode = ({ value, copyToClipboard }) => (
  <CodeSnippet
    type="inline"
    feedback="Copied to clipboard"
    onClick={() => {
      copyToClipboard(value);
    }}
  >
    {value}
  </CodeSnippet>
);

const code = ({ value, copyToClipboard }) => (
  <CodeSnippet
    type="multi"
    feedback="Copied to clipboard"
    onClick={() => {
      copyToClipboard(value);
    }}
  >
    {value}
  </CodeSnippet>
);

const underline = ({ children }) => {
  return <u>{children[0]?.props?.value}</u>;
};

const link = ({ href, children, ...rest, trackCTA }) => {
  return (
    <a
      onClick={(e) => {
        e.stopPropagation();
        trackCTA({ url: href, name: href, type: "Link" });
      }}
      href={href}
      {...rest}
    >
      {children || href}
    </a>
  );
};

const Markdown = ({ linkTarget = "_blank", escapeHtml, ...rest }) => {
  let renderers = { code, inlineCode, underline, sub: "sub", sup: "sup" };
  if (linkTarget === "_blank")
    renderers = Object.assign({}, renderers, { link });
  if (escapeHtml === false) {
    return (
      <Styled>
        <ReactMarkdownWithHtml
          plugins={[remarkUnderline, { marker: "++", tagType: "u" }]}
          linkTarget={linkTarget}
          renderers={renderers}
          escapeHtml={false}
          {...rest}
        />
      </Styled>
    );
  }
  return (
    <Styled>
      <ReactMarkdown
        plugins={[
          remarkSubSuper,
          [remarkUnderline, { marker: "++", tagType: "u" }],
        ]}
        linkTarget={linkTarget}
        renderers={renderers}
        {...rest}
      />
    </Styled>
  );
};

Markdown.defaultProps = {
  source: "",
  className: "markdown",
  // disallowedTypes: [ 'paragraph' ],
  unwrapDisallowed: true,
  linkTarget: "_blank",
  escapeHtml: true,
};

Markdown.propTypes = {
  ...ReactMarkdown.propTypes,
  linkTarget: PropTypes.string,
  escapeHtml: PropTypes.bool,
};

export default Markdown;
