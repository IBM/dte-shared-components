import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormItem,
  FormLabel,
  RadioButton,
  RadioButtonGroup as CarbonRadioButtonGroup,
} from "carbon-components-react";

import { HelperText, InvalidText } from "../../index";

const RadioButtonGroup = ({
  // eslint-disable-next-line  no-unused-vars
  id,
  name,
  namespace,
  invalid,
  labelText,
  invalidText,
  helperText,
  disabled,
  value = [],
  values,
  scrollable,
  sort,
  filterable,
  filterableClassName,
  filterablePlaceholder,
  ...rest
}) => {
  // eslint-disable-next-line  no-unused-vars
  const [checked, setChecked] = useState(value);
  const [items, setItems] = useState([]);

  useEffect(() => {
    valueToItems();
  }, [sort, values]);

  const valueToItems = () => {
    if (items !== values) {
      let t = sort ? values.sort(sortBy) : values;
      setItems(t);
    }
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

  if (!items || items.length === 0) return null;

  if (disabled)
    return (
      <FormItem {...rest}>
        {labelText ? (
          <FormLabel className="bx--label bx--label--disabled">
            {labelText}
          </FormLabel>
        ) : null}
        {items.map((v, i) => {
          let u = `${namespace}${name}-${i}`;
          let l = v.id || v.value || v.labelText || v;
          let t = v.labelText || v.text || v.value || v;
          v.checked = isChecked(l);
          v.disabled = true;
          return <RadioButton id={u} labelText={t} value={l} key={u} {...v} />;
        })}
        {helperText ? (
          <HelperText
            className="bx--label bx--label-disabled"
            source={helperText}
          />
        ) : null}
      </FormItem>
    );

  return (
    <FormItem>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      {filterable ? (
        <input
          type="text"
          placeholder={filterablePlaceholder}
          className={filterableClassName}
          onChange={filter}
        />
      ) : null}
      <CarbonRadioButtonGroup
        defaultSelected={value}
        className={`${scrollable ? "scrollable" : ""}${
          invalid ? " invalid" : ""
        }`}
        {...rest}
      >
        {items.map((v, i) => {
          let u = `${namespace}${name}-${i}`;
          let l = v.id || v.value || v.labelText || v;
          let t = v.labelText || v.text || v.value || v;
          return <RadioButton id={u} labelText={t} value={l} key={u} />;
        })}
      </CarbonRadioButtonGroup>
      {helperText ? (
        <HelperText className="bx--label" source={helperText} />
      ) : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </FormItem>
  );
};

RadioButtonGroup.defaultProps = {
  id: "radiobuttongroup",
  name: "radiobuttongroup",
  namespace: "",
  labelText: "",
  helperText: "",
  orientation: "vertical", // vertical || horizontal
  labelPosition: "right",
  value: [],
  values: [],
  scrollable: false,
  sort: true,
  filterable: false,
  filterableClassName: "bx--text-input bx--text__input",
  filterablePlaceholder: "Filter list",
};

RadioButtonGroup.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  namespace: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  orientation: PropTypes.string,
  labelPosition: PropTypes.string,
  value: PropTypes.any,
  values: PropTypes.any,
  scrollable: PropTypes.bool,
  sort: PropTypes.bool,
  filterable: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  disabled: PropTypes.bool,
  filterableClassName: PropTypes.string,
  filterablePlaceholder: PropTypes.string,
};

export default RadioButtonGroup;
