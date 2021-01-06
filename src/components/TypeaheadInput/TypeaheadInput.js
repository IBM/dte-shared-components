import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormItem, FormLabel, InlineLoading } from "carbon-components-react";
import Autosuggest from "react-autosuggest";
import { debounce } from "lodash";
import { AddAlt20 } from "@carbon/icons-react";
import styled from "styled-components";

import { HelperText, InvalidText, IconButton } from "components";

const Styled = styled.div`
  width: 100%;
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
    flex-basis: 95%;
    & .bx--text-input {
      width: 100%;
      background-color: #fff;
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
  & .react-autosuggest__container.fullwidth {
    flex-basis: 100%;
  }
`;

const TypeaheadInput = ({
  id,
  name,
  value: initialValue = "",
  delimiter,
  labelText,
  helperText,
  invalid,
  invalidText,
  inputPlaceHolder,
  placeHolder,
  inputName,
  minimumInputSize,
  suggestionsMaximumSize,
  getSuggestionsHandler,
  flatSuggestion,
  // eslint-disable-next-line no-unused-vars
  itemToString,
  itemToValue,
  itemToObject,
  suggestionPropertyToUse,
  selectSuggestionHandler,
  batchSuggestionHandler,
  handleInputBlur,
  className,
}) => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
  const [inputBlurred, setInputBlurred] = useState(true);
  const [inputValueState, setInputValueState] = useState(initialValue || "");
  const [suggestionsState, setSuggestionsState] = useState([]);

  const getInputId = () => `auto-suggest-${id || name}`;

  // this is a complete hack, to add keydown event lister on the input
  // componentDidMount
  useEffect(() => {
    if (minimumInputSize <= 0) init();
    document.getElementById(getInputId()).addEventListener("keydown", inputKeyListener);
  }, []);

  const init = async () => {
    try {
      let result = await getSuggestionsHandler("");
      const updatedResult =
        result && result.length > suggestionsMaximumSize
          ? result.slice(0, suggestionsMaximumSize)
          : result;
      setSuggestionsState(updatedResult ? updatedResult : []);
    } catch (err) {
      console.log("Error", err.message || err);
    }
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => {
    if (itemToValue && typeof itemToValue === "function") return itemToValue(suggestion);
    return flatSuggestion ? suggestion : suggestion[suggestionPropertyToUse];
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => {
    if (itemToObject && typeof itemToObject === "function") return itemToObject(suggestion);
    return <div>{flatSuggestion ? suggestion : suggestion[suggestionPropertyToUse]}</div>;
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = async ({ value = "" }) => {
    setSuggestionsState([]);
    if (value.trim().length < minimumInputSize || value.indexOf(",") !== -1) return;
    setInputBlurred(false);
    setFetchingSuggestions(true);
    const inputValue = value.trim().toLowerCase();
    // add timeout incase of api call failed or stalled
    const timerRef = setTimeout(() => {
      setFetchingSuggestions(false);
    }, 10000);
    try {
      let result = await getSuggestionsHandler(inputValue);
      clearTimeout(timerRef);
      setFetchingSuggestions(false);
      const updatedResult =
        result && result.length > suggestionsMaximumSize
          ? result.slice(0, suggestionsMaximumSize)
          : result;
      setSuggestionsState(updatedResult ? updatedResult : []);
    } catch (err) {
      console.log("Error", err.message || err);
    }
  };

  const onSuggestionsFetchRequestedThrottled = useCallback(
    debounce(onSuggestionsFetchRequested, 750, { maxWait: 1250, trailing: true, leading: true }),
    []
  );

  const inputKeyListener = (e) => {
    if (!e) return;
    const val = e && e.target && e.target.value;
    if ((e.key === "Enter" || e.key === "Tab") && val) {
      e.preventDefault();
      e.stopPropagation();
      addEntry(val, true);
    } else if (e.key === "Backspace" && !val) {
      e.preventDefault();
      e.stopPropagation();
      //   removeTag(tags.length - 1);
    } else if (e.key === delimiter && val) {
      let v = val.slice(0, -1);
      addEntry(v, true);
    }
    // if (e.keyCode === 13) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   let v = e && e.target && e.target.value;
    //   if (v) addEntry(v, true);
    // }
  };

  const onChange = (event, { newValue }) => {
    setInputValueState(newValue);
  };

  const onPaste = (e) => {
    e.preventDefault();
    let c = e.clipboardData || window.clipboardData || undefined;
    let v = (c && c.getData("Text")) || "";
    const values = v
      .split(delimiter)
      .map((o) => o && o.toString().trim())
      .filter((o) => o && o !== "");
    if (values && Array.isArray(values) && values.length > 1) batchSuggestionHandler(values);
    else selectSuggestionHandler(values[0], true);
  };

  const addEntry = (value, manualEntry = false) => {
    if (!value || value.length === 0) return;
    setComponentDisabled(true);
    if (manualEntry) {
      const values = value
        .split(delimiter)
        .map((o) => o && o.toString().trim())
        .filter((o) => o && o !== "");
      if (values && Array.isArray(values) && values.length > 1) batchSuggestionHandler(values);
      else selectSuggestionHandler(values[0], true);
    } else selectSuggestionHandler(value, false);
    setInputValueState("");
    setSuggestionsState([]);
    setComponentDisabled(false);
  };
  /*
  const showManualAddButton = () => {
    if (
      !fetchingSuggestions &&
      inputValueState &&
      inputValueState.length >= minimumInputSize &&
      suggestionsState &&
      suggestionsState.length == 0
    ) {
      // show add button
      // show prompt style, by applying hover effect, then settimeout in 500 to undo it.
      return true;
    }
  }; */

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    // add prefix to ids to avoid conflict with Formik functionality
    id: getInputId(),
    name: `auto-suggest-${name}`,
    placeholder: inputPlaceHolder || placeHolder,
    value: inputValueState,
    type: "search",
    disabled: false,
    onChange,
    onPaste,
    onBlur: (e) => {
      setInputBlurred(true);
      handleInputBlur(e);
    },
  };

  if (inputName) {
    inputProps.name = inputName;
  }

  const suggestionInput = (
    <Styled className={className}>
      <Autosuggest
        suggestions={suggestionsState}
        onSuggestionsFetchRequested={onSuggestionsFetchRequestedThrottled}
        onSuggestionsClearRequested={() => setSuggestionsState([])}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={(event, { suggestion }) => addEntry(suggestion, false)}
        shouldRenderSuggestions={(v) => {
          if (minimumInputSize <= 0) return true;
          return v.trim().length > minimumInputSize ? true : false;
        }}
        inputProps={inputProps}
        theme={{
          container: `react-autosuggest__container`, // ${!inputBlurred ? "" : "fullwidth"}`,
          input: "bx--text-input",
          suggestionsContainer: "react-autosuggest__suggestions-container",
          suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
          suggestionsList: "react-autosuggest__suggestions-list",
          suggestion: "react-autosuggest__suggestion",
          suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
        }}
      />

      {/* Fetching status section  */}
      <div
        className={`input-status-section ${
          !inputBlurred &&
          inputValueState &&
          inputValueState.length > 0 &&
          (fetchingSuggestions ||
            (!fetchingSuggestions && suggestionsState && suggestionsState.length > 0))
            ? "input-status-section--visible"
            : ""
        }`}>
        <InlineLoading
          iconDescription="loading data..."
          status={`${fetchingSuggestions ? "active" : "finished"}`}
        />
      </div>
      {/* Add Button  */}
      <div
        className={`input-add-section ${
          !fetchingSuggestions &&
          inputValueState &&
          inputValueState.length >= minimumInputSize &&
          suggestionsState &&
          suggestionsState.length == 0
            ? "input-add-section--visible"
            : ""
        }`}>
        {/* show manual add button if lookup failed to match user input */}
        <IconButton
          disabled={componentDisabled}
          onClick={() => {
            addEntry(inputValueState, true);
          }}
          renderIcon={AddAlt20}
          iconDescription="Add"
          kind="ghost"
          size="small"
        />
      </div>
    </Styled>
  );

  if (!labelText && !helperText) return suggestionInput;
  return (
    <FormItem>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      {suggestionInput}
      {helperText ? <HelperText className="bx--form__helper-text" source={helperText} /> : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </FormItem>
  );
};

TypeaheadInput.defaultProps = {
  getSuggestionsHandler: () => {
    return [];
  },
  className: "type-ahead-input-component",
  inputPlaceHolder: "",
  placeHolder: "",
  minimumInputSize: 3,
  suggestionsMaximumSize: 50,
  flatSuggestion: false,
  suggestionPropertyToUse: "name",
  itemToString: null,
  itemToValue: null,
  itemToObject: null,
  selectSuggestionHandler: () => {},
  batchSuggestionHandler: () => {},
  handleInputBlur: () => {},
  delimiter: ",",
};

TypeaheadInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  delimiter: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  placeHolder: PropTypes.string,
  inputName: PropTypes.string,
  minimumInputSize: PropTypes.number,
  suggestionsMaximumSize: PropTypes.number,
  getSuggestionsHandler: PropTypes.func,
  flatSuggestion: PropTypes.bool,
  itemToString: PropTypes.func,
  itemToValue: PropTypes.func,
  itemToObject: PropTypes.func,
  suggestionPropertyToUse: PropTypes.string,
  selectSuggestionHandler: PropTypes.func,
  batchSuggestionHandler: PropTypes.func,
  handleInputBlur: PropTypes.func,
  className: PropTypes.string,
};

export default TypeaheadInput;
