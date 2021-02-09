import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormItem,
  FormLabel,
  Tag,
  TextInput,
  TooltipDefinition,
} from "carbon-components-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { HelperText } from "../HelperText/HelperText";
import { InvalidText } from "../InvalidText/InvalidText";

import { safeIdName } from "../../methods";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getListStyle = (isDraggingOver) => ({
  paddingBottom: isDraggingOver ? "2rem" : "",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const Styled = styled.div`
  width: 100%;
  & .input-tag {
    padding: 0.5rem;
    min-height: 3rem;
    margin: 0;
    font-family: inherit;
    vertical-align: initial;
    font-size: var(--cds-body-short-01-font-size, 0.875rem);
    font-weight: var(--cds-body-short-01-font-weight, 400);
    line-height: var(--cds-body-short-01-line-height, 1.125rem);
    letter-spacing: var(--cds-body-short-01-letter-spacing, 0.16px);
    outline: 2px solid transparent;
    outline-offset: -2px;
    background-color: var(--cds-field-01, #f4f4f4);
    width: 100%;
    color: var(--cds-text-01, #161616);
    border: none;
    border-bottom-color: currentcolor;
    border-bottom-style: none;
    border-bottom-width: medium;
    border-bottom: 1px solid var(--cds-ui-04, #8d8d8d);
    transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
      outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
    display: flex;
    flex-wrap: wrap;
    & input {
      font-size: 0.875rem;
      border: none;
      width: 100%;
      height: auto;
      padding: 0.5rem;
    }
    & input:focus {
      background-color: #fff;
    }
    & .input-tag__tags {
      display: inline-flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      width: 100%;
      & li {
        max-width: 100%;
        align-items: center;
        display: flex;
        list-style: none;
        & .bx--tag__label {
          padding: 0 1rem 0 0.5rem;
        }
        & .bx--tag__close-icon {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 0 0 0.25rem;
          padding: 0.25rem;
          border: 0;
          background-color: transparent;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      & li.input-tag__tags__input {
        background: none;
        flex-grow: 1;
        padding: 0;
      }
    }
  }
  & .input-tag.invalid {
    outline: 2px solid #da1e28 !important;
    outline-offset: -2px;
  }
  & .bx--tag {
    height: auto;
    padding: 0.25rem 0.5rem;
  }
  & .bx--form-requirement {
    display: block;
    max-height: 12.5rem;
    overflow: visible;
    font-weight: 400;
    color: #da1e28;
  }
`;

const TagInput = ({
  id,
  name,
  delim,
  disabled,
  filter,
  invalid,
  invalidText,
  labelText,
  helperText,
  inputPlaceHolder,
  namespace,
  type,
  unique,
  value,
  validator,
  normalizer,
  onChange,
  // eslint-disable-next-line no-unused-vars
  onClick,
  tooltipMessage,
  ...rest
}) => {
  const [tags, setTags] = useState(value);
  const [focus, setFocus] = useState(false);
  const [pasted, setPasted] = useState(false);
  let tagRef = React.useRef();

  useEffect(() => {
    handleChange();
  }, [tags]);

  useEffect(() => {
    handlePasted();
  }, [pasted]);

  const removeTag = (i) => {
    let t = [...tags];
    t.splice(i, 1);
    setTags(t);
  };

  const addTag = async (v) => {
    let t = [...tags];
    let tag = await normalizer(v);
    if (await validator(tag)) {
      if (!tags || tags.length === 0) {
        t.push(tag);
      } else if (unique) {
        if (!t.find((o) => o.toLowerCase() === tag.toLowerCase())) t.push(tag);
      } else {
        t.push(tag);
      }
      setTags(t);
      clearInput();
    }
  };

  const editTag = (i) => {
    let e = tags[i],
      t = [...tags];
    t.splice(i, 1);
    setTags(t);
    tagRef.current.value = e;
  };

  const onDragEnd = (result) => {
    if (!result || !result.destination) return;
    const items = reorder(tags, result.source.index, result.destination.index);
    setTags(items);
  };

  const inputKeyUp = async (e) => {
    const val = e && e.target && e.target.value;
    if ((e.key === "Enter" || e.key === "Tab") && val) {
      await addTag(val);
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    } else if (e.key === "," && val) {
      let v = val.slice(0, -1);
      await addTag(v);
    }
  };

  const handlePasted = async () => {
    let val = tagRef.current.value || "";
    if (!val) return; // no value nofun
    let parts = val.split(delim) || []; // split the val into its parts
    let t = [...tags]; // get a copy of the tags
    for (let p of parts) {
      let n = await normalizer(p.toString().trim()); // normalize the data
      if (n) {
        let v = await validator(n); // validate the normalized value
        if (v) t.push(n); // push that normalized value if it was validated
      }
    }
    setTags(t);
    clearInput();
  };

  const handleChange = () => {
    if (onChange && typeof onChange === "function") onChange(name, tags);
  };

  const clearInput = () => {
    if (tagRef) tagRef.current.value = "";
  };

  const invalidProps = ({ invalid, errorId }) => ({
    "data-invalid": invalid,
    "aria-invalid": invalid,
    "aria-describedby": errorId,
  });

  if (disabled)
    return (
      <TextInput
        labelText={labelText}
        helperText={helperText}
        value={value}
        disabled
      />
    );

  const errorId = `${name}-error-msg`;
  //--TIM line 286
  return (
    <FormItem id={id} {...rest}>
      {labelText ? (
        <FormLabel>
          {tooltipMessage ? (
            <TooltipDefinition tooltipText={tooltipMessage}>
              {labelText}
            </TooltipDefinition>
          ) : (
            labelText
          )}
        </FormLabel>
      ) : null}
      <Styled>
        <div
          className={`${namespace}${invalid ? " invalid" : ""}${
            focus ? " focus" : ""
          }`}
          onKeyPress={() => {
            tagRef.current.focus();
          }}
          onClick={() => {
            tagRef.current.focus();
          }}
          {...(invalid ? invalidProps({ invalid, errorId }) : {})}
          role="listbox"
          tabIndex={-1}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className={`${namespace}__tags`}
                >
                  {tags &&
                    tags.map((tag, i) => (
                      <Draggable
                        key={`${safeIdName(tag)}-${i}`}
                        draggableId={`${safeIdName(tag)}-${i}`}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={`${namespace}-${i}`}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Tag
                              onClick={() => {
                                editTag(i);
                              }}
                              onClose={(e) => {
                                e.preventDefault();
                                removeTag(i);
                              }}
                              type={type}
                              filter={filter}
                            >
                              {tag}
                            </Tag>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <li className={`${namespace}__tags__input`}>
                    <input
                      type="text"
                      placeholder={inputPlaceHolder}
                      className="bx--text-input"
                      onFocus={() => {
                        setFocus(true);
                      }}
                      onBlur={async (e) => {
                        let v = e.target.value;
                        await addTag(v);
                        setFocus(false);
                      }}
                      onPaste={() => {
                        setPasted(true);
                      }}
                      onKeyUp={inputKeyUp}
                      ref={tagRef}
                    />
                  </li>
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {invalid && invalidText ? (
          <InvalidText name={name} invalid={invalid}>
            {invalidText}
          </InvalidText>
        ) : helperText ? (
          <HelperText className="bx--form__helper-text" source={helperText} />
        ) : null}
      </Styled>
    </FormItem>
  );
};

TagInput.defaultProps = {
  id: "tags",
  name: "tags",
  labelText: "Tags",
  value: [],
  type: "gray",
  title: "Remove",
  filter: true,
  namespace: "input-tag",
  inputPlaceHolder: "",
  delim: ",",
  className: "",
  unique: true,
  normalizer: async (v) => v,
  validator: async (v) => {
    v = v.toString();
    return v && v !== null && v !== undefined;
  },
};

TagInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  delim: PropTypes.string,
  disabled: PropTypes.bool,
  filter: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  namespace: PropTypes.string,
  type: PropTypes.string,
  unique: PropTypes.bool,
  value: PropTypes.any,
  validator: PropTypes.func,
  normalizer: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  tooltipMessage: PropTypes.string,
};

export default TagInput;
