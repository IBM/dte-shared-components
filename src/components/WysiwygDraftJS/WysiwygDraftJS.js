import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ContentState, EditorState, convertToRaw } from "draft-js";
import { FormItem, FormLabel, TextArea } from "carbon-components-react";
import { draftToMarkdown } from "markdown-draft-js";
import { Editor } from "react-draft-wysiwyg";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { HelperText, InvalidText } from "components";

import { markdownToHtml } from "lib/utils";

const Styled = styled.span`
  & .wysiwyg-wrapper {
    width: 100%;
    & .wysiwyg-toolbar {
      padding: 0;
      border: none;
      border-radius: 0;
      margin-bottom: 0.25em;
    }
    & .wysiwyg-editor.rdw-editor-main {
      height: auto;
    }
    & .wysiwyg-editor.focus {
      outline: 2px solid var(--cds-focus, #0f62fe);
      outline-offset: -2px;
    }
    & .public-DraftStyleDefault-block {
      margin: 0;
    }
    & .rdw-dropdown-wrapper {
      color: #161616;
      & a {
        color: #161616;
      }
      & a:hover {
        color: #000;
        font-weight: 500;
      }
    }
    & .rdw-dropdown-optionwrapper {
      box-shadow: none;
      border-radius: 0;
      border-color: #e0e0e0;
    }
    & .rdw-link-modal,
    & .rdw-image-modal {
      width: 300px;
      height: auto;
      box-shadow: none;
      border-radius: 0;
      border-color: #e0e0e0;
      & .rdw-image-modal-url-input {
        margin-top: 0;
      }
      & .rdw-image-modal-header-option,
      & .rdw-link-modal-label,
      & .rdw-image-modal-label {
        box-sizing: border-box;
        margin: 0;
        margin-bottom: 0px;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-family: inherit;
        vertical-align: baseline;
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.32px;
        color: #393939;
        font-weight: 400;
        display: inline-block;
        vertical-align: baseline;
        margin-bottom: 0;
        line-height: 1rem;
      }
      & input {
        padding: 1rem;
        box-sizing: border-box;
        font-family: inherit;
        vertical-align: initial;
        font-size: var(--cds-body-short-01-font-size, 0.875rem);
        font-weight: var(--cds-body-short-01-font-weight, 400);
        line-height: var(--cds-body-short-01-line-height, 1.125rem);
        letter-spacing: var(--cds-body-short-01-letter-spacing, 0.16px);
        outline: 2px solid transparent;
        outline-offset: -2px;
        background-color: var(--cds-field-01, #f4f4f4);
        color: var(--cds-text-01, #161616);
        border: none;
        border-bottom-color: currentcolor;
        border-bottom-style: none;
        border-bottom-width: medium;
        border-bottom: 1px solid var(--cds-ui-04, #8d8d8d);
        transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
          outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
      }
      & input:active,
      & input:focus {
        outline: 2px solid var(--cds-focus, #0f62fe);
        outline-offset: -2px;
      }
    }
    & .rdw-image-modal-header-label-highlighted,
    & .rdw-image-mandatory-sign {
      display: none;
    }
    & .rdw-link-modal-btn,
    & .rdw-image-modal-btn {
      background-color: #393939;
      border-width: 3px;
      border-style: solid;
      border-color: transparent;
      color: #ffffff;
      border-radius: 0;
      font-weight: 400;
      letter-spacing: 0;
    }
    & .rdw-link-modal-btn:disabled,
    & .rdw-image-modal-btn:disabled {
      cursor: not-allowed;
      color: #8d8d8d;
      background: #c6c6c6;
      border-color: #c6c6c6;
      border-radius: 0;
    }
  }

  & .wysiwyg-wrapper.invalid {
    outline: 2px solid #da1e28;
    outline-offset: -2px;
  }
`;

const draftToMarkdownOptions = {
  preserveNewlines: true,
  entityItems: {
    image: {
      open: function () {
        return "";
      },
      close: function (entity) {
        return entity && entity.data && entity.data.src
          ? `![${entity.data.src}](${entity.data.src})`
          : "";
      },
    },
    IMAGE: {
      open: function () {
        return "";
      },
      close: function (entity) {
        return entity && entity.data && entity.data.src
          ? `![${entity.data.src}](${entity.data.src})`
          : "";
      },
    },
  },
};

const draftToHtmlOptions = { trigger: "#", separator: " " };

const handleInput = function (value, format) {
  const blocksFromHtml =
    format === "markdown" ? htmlToDraft(markdownToHtml(value)) : htmlToDraft(value);
  const { contentBlocks, entityMap } = blocksFromHtml;
  return ContentState.createFromBlockArray(contentBlocks, entityMap);
  // needs to be simplified back to a simple convert rather than md => html => draft
  // return format === "markdown"
  //   ? convertFromRaw(markdownToDraft(value, markdownToDraftOptions)) //convertFromRaw(convertMdToDraft(value))
  //   : convertFromRaw(htmlToDraft(value));
};

const handleOutput = function (value, format) {
  return format == "markdown"
    ? draftToMarkdown(convertToRaw(value), draftToMarkdownOptions) // convertDraftToMd(convertToRaw(value))
    : draftToHtml(convertToRaw(value), draftToHtmlOptions);
};

const WysiwygDraftJS = ({
  label,
  labelText,
  helperText,
  invalid,
  invalidText,
  disabled,
  value,
  name,
  format,
  outputFormat,
  onBlur,
  onChange,
  onFocus,
  ...rest
}) => {
  const wysiwygEditorState = value
    ? EditorState.createWithContent(handleInput(value, format))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(wysiwygEditorState);

  if (disabled) {
    // eslint-disable-next-line no-unused-vars
    const { wrapperClassName, toolbarClassName, editorClassName, toolbar, ...subrest } = rest;
    return (
      <TextArea labelText={labelText} helperText={helperText} value={value} disabled {...subrest} />
    );
  }

  rest.wrapperClassName = invalid ? "wysiwyg-wrapper invalid" : "wysiwyg-wrapper ";

  return (
    <Styled>
      <FormItem>
        {label || labelText ? <FormLabel>{label || labelText}</FormLabel> : null}
        <Editor
          handlePastedText={() => false}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onBlur={(e) => {
            try {
              e.target.parentElement.parentElement.parentElement.classList.remove("focus");
            } catch (err) {
              // do nothing
            }
            if (onBlur) onBlur(e);
          }}
          onChange={() => {
            if (onChange)
              onChange(name, handleOutput(editorState.getCurrentContent(), outputFormat));
          }}
          onFocus={(e) => {
            try {
              e.target.parentElement.parentElement.parentElement.classList.add("focus");
            } catch (err) {
              // do nothing
            }
            if (onFocus) onFocus(e);
          }}
          {...rest}
        />
        {helperText ? <HelperText className="bx--form__helper-text" source={helperText} /> : null}
        <InvalidText name={name} invalid={invalid}>
          {invalidText}
        </InvalidText>
      </FormItem>
    </Styled>
  );
};

WysiwygDraftJS.defaultProps = {
  value: "",
  name: "wysiwyg",
  id: "wysiwyg",
  labelText: "wysiwyg",
  helperText: "",
  placeholder: "",
  wrapperClassName: "wysiwyg-wrapper",
  toolbarClassName: "wysiwyg-toolbar",
  editorClassName: "wysiwyg-editor bx--text-area",
  toolbar: {
    options: [
      "inline",
      "blockType",
      "list",
      // "textAlign",
      "link",
      "image",
    ],
    inline: {
      inDropdown: false,
      options: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "monospace",
        // "superscript",
        // "subscript",
      ],
    },
    blockType: {
      inDropdown: true,
      options: ["Normal", "H1", "H2", "H3", "H4", "H5", "Blockquote", "Code"],
    },
    list: {
      inDropdown: false,
      options: ["unordered", "ordered", "indent", "outdent"],
    },
    // textAlign: {
    //   inDropdown: false,
    //   options: ["left", "center", "right", "justify"],
    // },
    link: {
      inDropdown: false,
      showOpenOptionOnHover: true,
      defaultTargetOption: "_blank",
      options: ["link", "unlink"],
    },
    image: {
      urlEnabled: true,
      uploadEnabled: false,
      alignmentEnabled: false,
      previewImage: true,
      inputAccept: "image/gif, image/jpeg, image/jpg, image/png, image/svg",
      alt: { present: false, mandatory: false },
      defaultSize: {
        height: "auto",
        width: "auto",
      },
    },
  },
  format: "markdown",
  outputFormat: "markdown",
};

WysiwygDraftJS.propTypes = {
  label: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string,
  format: PropTypes.string,
  outputFormat: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};

export default WysiwygDraftJS;
