import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

import ReactQuill from "react-quill"; // ES6
import { debounce, merge } from "lodash";

import { FormItem, FormLabel, TextArea } from "carbon-components-react";

import { HelperText } from "../HelperText/HelperText";
import { InvalidText } from "../InvalidText/InvalidText";

import { markdownToHtml, htmlToMarkdown } from "../../lib/utils";

const StyledFormItem = styled(FormItem)`
  & .wysiwyg-wrapper {
    font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
    width: 100%;

    & ins {
      text-decoration-line: underline;
    }

    & .ql-editor {
      transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
        outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
      outline: 2px solid transparent;
      outline-offset: -2px;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.125rem;
      letter-spacing: 0.16px;
      min-height: 2.75rem;
      color: #161616;
      background-color: #f4f4f4;
      overflow-y: scroll; // make the editor resizable
      resize: vertical;
      & p {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.125rem;
        letter-spacing: 0.16px;
      }
      & p,
      & blockquote,
      & code,
      & pre,
      & ol,
      & ul {
        padding-bottom: 0.5rem;
      }
    }
    & .ql-editor.ql-blank::before {
      color: #a8a8a8;
      opacity: 1;
      font-style: normal;
    }

    & .ql-toolbar,
    & .ql-container {
      border: none;
      font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
    }
    & .ql-toolbar {
      background: #fff;
    }
    & .ql-container {
      border-bottom: 1px solid #8d8d8d;
    }

    & .ql-toolbar button:hover,
    & .ql-toolbar button:hover,
    & .ql-toolbar button:focus,
    & .ql-toolbar button:focus,
    & .ql-toolbar button.ql-active,
    & .ql-toolbar button.ql-active,
    & .ql-toolbar .ql-picker-label:hover,
    & .ql-toolbar .ql-picker-label:hover,
    & .ql-toolbar .ql-picker-label.ql-active,
    & .ql-toolbar .ql-picker-label.ql-active,
    & .ql-toolbar .ql-picker-item:hover,
    & .ql-toolbar .ql-picker-item:hover,
    & .ql-toolbar .ql-picker-item.ql-selected,
    & .ql-toolbar .ql-picker-item.ql-selected {
      color: var(--cds-focus, #0f62fe);
    }
    & .ql-toolbar button:hover .ql-fill,
    & .ql-toolbar button:hover .ql-fill,
    & .ql-toolbar button:focus .ql-fill,
    & .ql-toolbar button:focus .ql-fill,
    & .ql-toolbar button.ql-active .ql-fill,
    & .ql-toolbar button.ql-active .ql-fill,
    & .ql-toolbar .ql-picker-label:hover .ql-fill,
    & .ql-toolbar .ql-picker-label:hover .ql-fill,
    & .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    & .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    & .ql-toolbar .ql-picker-item:hover .ql-fill,
    & .ql-toolbar .ql-picker-item:hover .ql-fill,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    & .ql-toolbar button:hover .ql-stroke.ql-fill,
    & .ql-toolbar button:hover .ql-stroke.ql-fill,
    & .ql-toolbar button:focus .ql-stroke.ql-fill,
    & .ql-toolbar button:focus .ql-stroke.ql-fill,
    & .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    & .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
      color: var(--cds-focus, #0f62fe);
    }
    & .ql-toolbar button:hover .ql-stroke,
    & .ql-toolbar button:hover .ql-stroke,
    & .ql-toolbar button:focus .ql-stroke,
    & .ql-toolbar button:focus .ql-stroke,
    & .ql-toolbar button.ql-active .ql-stroke,
    & .ql-toolbar button.ql-active .ql-stroke,
    & .ql-toolbar .ql-picker-label:hover .ql-stroke,
    & .ql-toolbar .ql-picker-label:hover .ql-stroke,
    & .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    & .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    & .ql-toolbar .ql-picker-item:hover .ql-stroke,
    & .ql-toolbar .ql-picker-item:hover .ql-stroke,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    & .ql-toolbar button:hover .ql-stroke-miter,
    & .ql-toolbar button:hover .ql-stroke-miter,
    & .ql-toolbar button:focus .ql-stroke-miter,
    & .ql-toolbar button:focus .ql-stroke-miter,
    & .ql-toolbar button.ql-active .ql-stroke-miter,
    & .ql-toolbar button.ql-active .ql-stroke-miter,
    & .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    & .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    & .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    & .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    & .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    & .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
      color: var(--cds-focus, #0f62fe);
    }
    .ql-snow a {
      color: #var(--cds-focus, #0f62fe);
    }
  }

  & .wysiwyg-wrapper.focused {
    & .ql-editor {
      outline: 2px solid var(--cds-focus, #0f62fe);
      outline-offset: -2px;
    }
  }
  & .wysiwyg-wrapper.invalid {
    & .ql-editor {
      outline: 2px solid var(--cds-invalid, #da1e28);
      outline-offset: -2px;
    }
  }
`;

const Wysiwyg = ({
  label,
  labelText,
  helperText,
  invalid,
  invalidText,
  disabled,
  value,
  name,
  toolbar,
  onBlur,
  onChange,
  onFocus,
  className,
  markdownToHtml,
  htmlToMarkdown,
  ...rest
}) => {
  const [editorState, setEditorState] = useState(null);
  const [editorLoadState, setEditorLoadState] = useState(false);
  const [focused, setFocused] = useState(false);

  const quillRef = useRef();

  useEffect(() => {
    if (value) setEditorState(markdownToHtml(value));
    setEditorLoadState(true);
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      updateToolbarTabIndex();
    }, 0);
  }, []);

  const updateToolbarTabIndex = () => {
    const { tabIndex } = rest;
    const quillParentNode =
      quillRef &&
      quillRef.current &&
      quillRef.current.editingArea &&
      quillRef.current.editingArea.parentNode;
    const buttons =
      (quillParentNode &&
        quillParentNode.querySelectorAll &&
        quillParentNode.querySelectorAll("button")) ||
      [];
    const pickers =
      (quillParentNode &&
        quillParentNode.querySelectorAll &&
        quillParentNode.querySelectorAll("span.ql-picker-label")) ||
      [];
    for (const [i, o] of [...buttons, ...pickers].entries()) {
      if (o) o.setAttribute("tabindex", tabIndex ? tabIndex + i + 1 : -1);
    }
  };

  const handleChange = (value) => {
    if (onChange) onChange(name, value);
  };

  const handleFocus = () => {
    if (onFocus) onFocus(quillRef.current);
    setFocused(!focused);
  };

  const handleBlur = () => {
    if (onBlur) onBlur(quillRef.current);
    setFocused(false);
  };

  const handleChangeThrottled = useRef(debounce(handleChange, 500)).current;

  if (disabled) {
    // eslint-disable-next-line  no-unused-vars
    const { toolbar, ...subrest } = rest;
    return (
      <TextArea
        labelText={labelText}
        helperText={helperText}
        value={value}
        disabled
        {...subrest}
      />
    );
  }

  const modules = useMemo(
    () =>
      merge(
        {}, // init with empty object
        {
          toolbar: {
            handlers: {
              image: () => {
                let range = quillRef.current.getEditor().getSelection();
                let value = prompt("What is the image URL"); // maybe we use ConfirmModal component to make it look consistent  use
                if (value) {
                  quillRef.current
                    .getEditor()
                    .insertEmbed(range.index, "image", value);
                }
              },
              underline: (toggle) => {
                // let range = quillRef.current.getEditor().getSelection();
                // let text = quillRef.current.getEditor().getText(range.index, range.length);
                quillRef.current.getEditor().format("underline", toggle);
              },
            }, // add some base handlers
          }, // default toolbar
          keyboard: {
            bindings: {
              tab: {
                key: 9,
                handler: () => {
                  return true;
                },
              },
            },
          }, // disable tab trap to allow for accessibility
          clipboard: {
            matchVisual: false,
          }, // set the clipboard default
        },
        toolbar // allow the toolbar to override
      ),
    []
  );

  // if we dont have a state and we havet loaded then return
  if (editorState === null && editorLoadState === false) return "";

  return (
    <StyledFormItem>
      {label || labelText ? <FormLabel>{label || labelText}</FormLabel> : null}
      <ReactQuill
        className={classNames(className, {
          // stuff class names onto the component to handle states
          ["invalid"]: invalid, // invalid?
          ["focused"]: focused, // focused?
        })}
        ref={quillRef}
        modules={modules}
        defaultValue={editorState}
        onChange={(content) => {
          handleChangeThrottled(htmlToMarkdown(content));
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {helperText ? (
        <HelperText className="bx--form__helper-text" source={helperText} />
      ) : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </StyledFormItem>
  );
};

Wysiwyg.defaultProps = {
  value: "",
  name: "wysiwyg",
  id: "wysiwyg",
  labelText: "wysiwyg",
  helperText: "",
  placeholder: "",
  toolbar: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "code"],
        ["blockquote", "code-block"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ indent: "-1" }, { indent: "+1" }],
        [{ script: "sub" }, { script: "super" }],
        // [{ align: [] }],
        ["link", "image"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  },
  className: "wysiwyg-wrapper",
};

Wysiwyg.propTypes = {
  label: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string,
  toolbar: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
};

export default Wysiwyg;
