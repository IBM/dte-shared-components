import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Autosuggest from "react-autosuggest";
import { throttle } from "lodash";

import { FormItem, FormLabel, InlineLoading } from "carbon-components-react";

import { HelperText, InvalidText } from "../../index";

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  & .react-autosuggest__container {
    flex: 1 1 100%;
  }
  & .bx--text-input {
    height: 3rem;
  }
  & div.loading {
    flex: 1 1;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  & .react-autosuggest__container {
    position: relative;
    flex-basis: 100%;
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

const TypeaheadInputText = ({
  id,
  name,
  value,
  labelText,
  helperText,
  invalid,
  invalidText,
  placeHolder,
  min,
  max,
  items,
  itemToValue,
  itemToElement,
  theme,
  wrap,
  className,
  normalizer,
  validator,
  onBlur,
  onChange,
  onFocus,
  onPaste,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value !== inputValue) setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    if (name && onChange && typeof onChange === "function")
      onChange(name, inputValue);
  }, [inputValue]);

  const handleSearch = async ({ value }) => {
    setSuggestions([]);
    if (!value || value.length < min) return;
    setLoading(true);
    try {
      const v = value.trim().toLowerCase();
      const result = await items(v);
      const reduced =
        result && result.length > max ? result.slice(0, max) : result;
      setSuggestions(reduced || []);
    } catch (err) {
      console.log("Error", err.message || err);
    }
    setLoading(false);
  };

  const handleChange = (e, { newValue }) => {
    if (newValue && validator(newValue)) setInputValue(normalizer(newValue));
  };

  const handleBlur = (e) => {
    if (onBlur && typeof onBlur === "function") onBlur(e);
  };

  const handleFocus = (e) => {
    if (onFocus && typeof onFocus === "function") onFocus(e);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let c = e.clipboardData || window.clipboardData || undefined;
    let v = (c && c.getData("Text")) || "";
    if (v && validator(v)) {
      if (onPaste && typeof onPaste === "function") onPaste(e, normalizer(v));
      else setInputValue(normalizer(v));
    }
  };

  const handleSearchThrottled = useRef(
    throttle(handleSearch, 750, { maxWait: 2000 })
  ).current;
  const handleChangeThrottled = useRef(
    throttle(handleChange, 750, { maxWait: 3000 })
  ).current;

  const inputProps = {
    id: id || name,
    name: name || id,
    placeholder: placeHolder,
    value: inputValue,
    onChange: handleChangeThrottled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onPaste: handlePaste,
  };

  if (!wrap)
    return (
      <Row className={`${className} type-ahead-input-component`}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSearchThrottled}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={itemToValue}
          renderSuggestion={itemToElement}
          onSuggestionSelected={(e, { suggestionValue }) => {
            setInputValue(suggestionValue);
          }}
          inputProps={inputProps}
          theme={theme}
          {...rest}
        />
        {loading ? (
          <div className="loading">
            <InlineLoading
              iconDescription="Loading ..."
              status={loading ? "active" : "finished"}
            />
          </div>
        ) : null}
      </Row>
    );

  return (
    <FormItem>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      <Row className={`${className} type-ahead-input-component`}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSearchThrottled}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={itemToValue}
          renderSuggestion={itemToElement}
          onSuggestionSelected={(e, { suggestionValue }) => {
            setInputValue(suggestionValue);
          }}
          inputProps={inputProps}
          theme={theme}
          {...rest}
        />
        {loading ? (
          <div className="loading">
            <InlineLoading
              iconDescription="Loading ..."
              status={loading ? "active" : "finished"}
            />
          </div>
        ) : null}
      </Row>
      {helperText ? (
        <HelperText className="bx--form__helper-text" source={helperText} />
      ) : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </FormItem>
  );
};

TypeaheadInputText.defaultProps = {
  value: "",
  labelText: null,
  helperText: null,
  invalid: false,
  invalidText: null,
  placeHolder: "",
  min: 3,
  max: 50,
  items: () => {
    return [];
  },
  itemToValue: (s) => {
    return s.id || s;
  },
  itemToElement: (s) => {
    return (
      <div>
        {s.name} ({s.id})
      </div>
    );
  },
  normalizer: (v) => v,
  validator: () => true,
  onFocus: null,
  onBlur: null,
  onChange: null,
  onPaste: null,
  theme: {
    container: `react-autosuggest__container`,
    input: "bx--text-input",
    suggestionsContainer: "react-autosuggest__suggestions-container",
    suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
    suggestionsList: "react-autosuggest__suggestions-list",
    suggestion: "react-autosuggest__suggestion",
    suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
  },
  wrap: true,
};

TypeaheadInputText.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  placeHolder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  items: PropTypes.any,
  itemToValue: PropTypes.func,
  itemToElement: PropTypes.func,
  theme: PropTypes.string,
  wrap: PropTypes.bool,
  className: PropTypes.string,
  normalizer: PropTypes.func,
  validator: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onPaste: PropTypes.func,
};

export default TypeaheadInputText;
