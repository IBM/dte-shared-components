import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormItem,
  FormLabel,
  TooltipDefinition,
} from "carbon-components-react";

import { Checkbox } from "../Checkbox/Checkbox";
import { HelperText } from "../HelperText.js/HelperText";
import { InvalidText } from "../InvalidText/InvalidText";

let Styled = styled.div`
  & .checkboxgroup__wrapper {
    width: 100%;
  }
  & .checkboxgroup__wrapper.horizontal {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & .bx--form-item.bx--checkbox-wrapper:first-of-type {
      margin-top: 0;
    }
    & .bx--form-item {
      padding-right: 1.5rem;
      flex: 1 1 auto;
      & .bx--checkbox-label-text {
        white-space: nowrap;
      }
    }
  }
  & .checkboxgroup__wrapper.horizontal-2 {
    & .bx--form-item {
      flex-basis: 50%;
    }
  }
  & .checkboxgroup__wrapper.horizontal-3 {
    & .bx--form-item {
      flex-basis: 33%;
    }
  }
  & .checkboxgroup__wrapper.horizontal-4 {
    & .bx--form-item {
      flex-basis: 25%;
    }
  }
  & .checkboxgroup__wrapper.horizontal-5 {
    & .bx--form-item {
      flex-basis: 20%;
    }
  }

  & .checkboxgroup__wrapper.scrollable {
    max-height: 10rem;
    overflow-y: auto;
  }

  & .checkboxgroup__wrapper.horizontal.scrollable {
    overflow: auto;
  }

  & .checkboxgroup__wrapper.invalid {
    outline: 2px solid #da1e28;
    outline-offset: -2px;
  }
`;

const CheckboxGroup = ({
  id,
  name,
  namespace,
  invalid,
  labelText,
  invalidText,
  helperText,
  disabled,
  layout,
  value = [],
  values,
  onChange,
  scrollable,
  filterable,
  filterableClassName,
  filterablePlaceholder,
  tooltipMessage,
  ...rest
}) => {
  const [checked, setChecked] = useState(value);
  const [items, setItems] = useState(values);

  // useEffect(() => {
  //   if (items !== values) setItems(values);
  // }, [values]);

  const handleCheck = (n, v) => {
    // console.log("handleCheck", n, v);
    if (onChange && typeof onChange === "function") onChange(n, v);
  };

  const isChecked = (v) => {
    return checked && checked.indexOf(v) > -1 ? true : false;
  };

  const sortBy = (a, b) => {
    let av = a.labelText || a.label || a.name || a.text || a;
    let bv = b.labelText || b.label || b.name || b.text || b;
    let aw = a.weight || 0;
    let bw = b.weight || 0;
    return bw - aw || av.localeCompare(bv);
  };

  const filter = (e) => {
    let val = ((e && e.target && e.target.value) || "")
      .toString()
      .toLowerCase();
    if (!val || val === "") setItems(values);
    let temp =
      (values &&
        values.filter((o) => {
          let v = (o.labelText || o.label || o.name || o.text).toLowerCase();
          // console.log("v", v, "val", val, v.indexOf(val));
          return v && v.indexOf(val) > -1;
        })) ||
      [];
    setItems(temp);
  };

  if (disabled)
    return (
      <FormItem {...rest}>
        {labelText ? (
          <FormLabel className="bx--label bx--label--disabled">
            {labelText}
          </FormLabel>
        ) : null}
        {items.sort(sortBy).map((v, i) => {
          let u = `${namespace}${name}-${i}`;
          let l = v.value || v.labelText || v;
          v.checked = isChecked(l);
          v.disabled = true;
          return <Checkbox id={u} name={name} value={l} key={u} {...v} />;
        })}
        {helperText ? (
          <HelperText
            className="bx--label bx--label-disabled"
            source={helperText}
          />
        ) : null}
      </FormItem>
    );

  // if (values && values.length > 0) {
  return values && values.length > 0 ? (
    <FormItem {...rest}>
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
        {filterable ? (
          <input
            type="text"
            placeholder={filterablePlaceholder}
            className={filterableClassName}
            onChange={filter}
          />
        ) : null}
        <div
          className={`checkboxgroup__wrapper ${
            scrollable ? "scrollable" : ""
          } ${layout}${invalid ? " invalid" : ""}`}
        >
          {items.sort(sortBy).map((v, i) => {
            let u = `${namespace}${name}-${i}`;
            let l = v.value || v.labelText || v;
            v.checked = isChecked(l);
            // return <Checkbox id={u} name={name} value={l} key={u} {...v} />;
            return (
              <Checkbox
                id={u}
                name={name}
                value={l}
                key={u}
                onChange={handleCheck}
                {...v}
              />
            );
          })}
        </div>
      </Styled>
      {helperText ? (
        <HelperText className="bx--label" source={helperText} />
      ) : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </FormItem>
  ) : (
    ""
  );
  // } else {
  //   return "";
  // }
};

CheckboxGroup.defaultProps = {
  helperText: "",
  id: "checkboxgroup",
  name: "checkboxgroup",
  namespace: "",
  labelText: "",
  helperText: "",
  layout: "horizontal", // vertical || horizontal
  value: [],
  values: [],
  scrollable: false,
  filterable: false,
  filterableClassName: "bx--text-input bx--text__input",
  filterablePlaceholder: "Filter list",
};

export default CheckboxGroup;
