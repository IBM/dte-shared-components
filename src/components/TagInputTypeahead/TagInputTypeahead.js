import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormItem, FormLabel, Tag } from "carbon-components-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { HelperText, InvalidText, TextInput, TypeaheadInput } from "components";

const idSafe = (v) => {
  return v
    .toString()
    .trim()
    .replace(/[\W_]+/g, "")
    .toLowerCase();
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

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
  & .type-ahead-input-component {
    position: relative;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: row;
    align-items: stretch;
    justify-content: space-between;
    & .input-status-section,
    & .input-add-section {
      display: none;
      flex-basis: 5%;
      align-items: stretch;
      margin: 0 0 0 0.5rem;
      justify-content: center;
      &--visible {
        display: flex;
      }
    }
    & .input-status-section {
      & .bx--inline-loading {
        width: auto;
      }
    }
    & .input-add-section {
      & .manual-add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        border: none;
        transition: all 0.2s;
        width: 2.5rem;
        transform: translate(0px, 0px);
        &:hover {
          border: 2px solid #0f62fe;
          width: 3.5rem;
        }
        &:focus {
          outline: none;
        }
      }
    }

    & .react-autosuggest__container {
      position: relative;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
      & .bx--text-input {
        width: 100%;
      }
      & .react-autosuggest__suggestions-container {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        height: 10rem;
      }
      & .react-autosuggest__suggestions-container--open {
        display: block;
        z-index: 9100;
      }
      & .react-autosuggest__suggestions-list {
        width: 100%;
        max-height: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
        border: 1px solid #aaa;
        background-color: #fff;
        list-style-type: none;
        overflow-x: auto;
      }
      & .react-autosuggest__suggestion {
        cursor: pointer;
        padding: 10px 20px;
        overflow-x: auto;
      }
      & .react-autosuggest__suggestion--highlighted {
        background-color: #ddd;
      }
    }
  }
`;

const TagInputTypeahead = ({
  id,
  name,
  className,
  disabled,
  invalid,
  invalidText,
  labelText,
  helperText,
  inputPlaceHolder,
  minimumInputSize,
  suggestionsMaximumSize,
  getSuggestionsHanlder,
  flatSuggestion,
  suggestionToString,
  suggestionToValue,
  suggestionToObject,
  suggestionViewProperty,
  normalizeTagFunc,
  parentSelectSuggestionHandler,
  // eslint-disable-next-line no-unused-vars
  handleInputBlur,
  value,
  type,
  namespace,
  onChange,
  unique,
  validator,
  ...rest
}) => {
  const [tags, setTags] = useState(value);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    handleChange();
  }, [tags]);

  const removeTag = (i) => {
    let t = [...tags];
    t.splice(i, 1);
    setTags(t);
  };

  const addTag = (tag) => {
    let t = [...tags]; // clone the tags
    // normalize the tag
    tag =
      tag && normalizeTagFunc && typeof normalizeTagFunc === "function"
        ? normalizeTagFunc(tag)
        : tag;
    // validate
    if (validator(tag)) {
      if (!tags || tags.length === 0) {
        t.push(tag);
      } else if (unique) {
        try {
          if (!t.find((o) => o && o.includes(tag))) t.push(tag);
        } catch (err) {
          t.push(tag);
        }
      } else {
        t.push(tag);
      }
    }
    // console.log("name", t);
    setTags(t); // push update to tags
  };

  const handleChange = () => {
    // console.log("handleChange", name, tags);
    if (onChange && typeof onChange === "function") onChange(name, tags);
  };

  const onDragEnd = (result) => {
    if (!result || !result.destination) return;
    const items = reorder(tags, result.source.index, result.destination.index);
    setTags(items);
  };

  const selectSuggestionHandler = (suggestion, manualEntry = false) => {
    // console.log(`TagInputTypeahead: ${suggestion} - ${manualEntry}`);
    let wrappedSuggestion = suggestion;
    let wrappedSuggestionCopy;
    // wrap the entry to simulate selected suggestion
    if (manualEntry && !flatSuggestion) {
      wrappedSuggestion = {};
      wrappedSuggestion[suggestionViewProperty] = suggestion;
    }
    // making copy to avoid item normalization before bubbling up selectionSuggestion event
    wrappedSuggestionCopy = { ...wrappedSuggestion };
    addTag(wrappedSuggestion);
    parentSelectSuggestionHandler ? parentSelectSuggestionHandler(wrappedSuggestionCopy) : "";
  };

  const batchSuggestionHandler = (values) => {
    let t = [...tags]; // clone the tags
    for (let tag of values) {
      // normalize the tag
      tag =
        tag && normalizeTagFunc && typeof normalizeTagFunc === "function"
          ? normalizeTagFunc(tag)
          : tag;
      // validate
      if (validator(tag)) {
        if (!tags || tags.length === 0) {
          t.push(tag);
        } else if (unique) {
          try {
            if (!t.find((o) => o && o.includes(tag))) t.push(tag);
          } catch (err) {
            t.push(tag);
          }
        } else {
          t.push(tag);
        }
      }
    }
    setTags(t);
  };

  if (disabled)
    return <TextInput labelText={labelText} helperText={helperText} value={value} disabled />;

  return (
    <FormItem className={`${className}`} {...rest}>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      <Styled>
        <div className={`${namespace}${invalid ? " invalid" : ""}${focus ? " focus" : ""}`}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <ul
                  className={`${namespace}__tags`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {tags &&
                    tags.map((tag, i) => (
                      <Draggable
                        key={`${idSafe(tag)}-${i}`}
                        draggableId={`${idSafe(tag)}-${i}`}
                        index={i}>
                        {(provided) => (
                          <li
                            key={`${namespace}-${i}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <Tag
                              filter
                              type={type}
                              onClose={(e) => {
                                e.preventDefault();
                                removeTag(i);
                              }}>
                              {flatSuggestion ? tag : tag[suggestionViewProperty] || tag}
                            </Tag>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <li className={`${namespace}__tags__input`}>
                    <TypeaheadInput
                      id={id}
                      name={name}
                      inputPlaceHolder={inputPlaceHolder}
                      minimumInputSize={minimumInputSize}
                      suggestionsMaximumSize={suggestionsMaximumSize}
                      getSuggestionsHandler={getSuggestionsHanlder}
                      flatSuggestion={flatSuggestion}
                      itemToString={suggestionToString}
                      itemToValue={suggestionToValue}
                      itemToObject={suggestionToObject}
                      suggestionPropertyToUse={suggestionViewProperty}
                      selectSuggestionHandler={selectSuggestionHandler}
                      batchSuggestionHandler={batchSuggestionHandler}
                      handleInputBlur={(e) => {
                        let v = e.target.value;
                        if (v) addTag(v);
                      }}
                      onFocus={() => {
                        setFocus(true);
                      }}
                    />
                  </li>
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Styled>
      {helperText ? <HelperText className="bx--form__helper-text" source={helperText} /> : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </FormItem>
  );
};

TagInputTypeahead.defaultProps = {
  id: "tags",
  className: "",
  name: "tags",
  labelText: "Tags",
  title: "title",
  type: "gray",
  namespace: "input-tag",
  inputPlaceHolder: "start typing ...",
  minimumInputSize: 4,
  suggestionsMaximumSize: 15,
  flatSuggestion: false,
  suggestionToString: null,
  suggestionToValue: null,
  suggestionToObject: null,
  suggestionViewProperty: "name",
  value: [],
  getSuggestionsHanlder: () => [],
  handleInputBlur: () => {},
  unique: true,
  validator: () => true,
};

TagInputTypeahead.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  minimumInputSize: PropTypes.number,
  suggestionsMaximumSize: PropTypes.number,
  getSuggestionsHanlder: PropTypes.func,
  flatSuggestion: PropTypes.bool,
  suggestionToString: PropTypes.func,
  suggestionToValue: PropTypes.func,
  suggestionToObject: PropTypes.func,
  suggestionViewProperty: PropTypes.string,
  normalizeTagFunc: PropTypes.func,
  parentSelectSuggestionHandler: PropTypes.func,
  handleInputBlur: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.string,
  namespace: PropTypes.func,
  onChange: PropTypes.func,
  unique: PropTypes.bool,
  validator: PropTypes.func,
};

export default TagInputTypeahead;
