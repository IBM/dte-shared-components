import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Column, Row, FormLabel } from "carbon-components-react";

import { AutoGrowTextArea, TagInput, Dropdown, Tooltip } from "components";

import { isEmpty } from "lib/utils";

const FOURHOURS = 4;
const ONEDAY = 24;
const ONEWEEK = ONEDAY * 7;
const TWOWEEK = ONEWEEK * 2;
// const ONEMONTH = ONEDAY * 30;

const SalesOpportunity = ({
  errors,
  setFieldValue,
  // setFieldError,
  setFieldTouched,
  touched,
  values,
  // helperText,
  id,
  // invalid,
  // invalidText,
  items,
  label,
  labelText,
  // name,
  // placeholder,
  // value,
  onBlur,
  onFocus,
  onChange,
  // eslint-disable-next-line no-unused-vars
  ...rest
}) => {
  const [purpose, setPurpose] = useState(values.purpose);
  const [customer, setCustomer] = useState(values.customer);
  const [description, setDescription] = useState(values.description);
  const [opportunity, setOpportunity] = useState(values.opportunity || []);
  const [fields, setFields] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [required, setRequired] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [condition, setCondition] = useState("or");
  const [policy, setPolicy] = useState({});
  const [single, setSingle] = useState(false);

  // useEffect(() => {
  //   let idx = -1,
  //     s = false;
  //   if (purpose) {
  //     idx = items && items.findIndex((o) => o.id === purpose || o.text === purpose);
  //   } else if (items && items.length === 1) {
  //     idx = 0;
  //     s = true;
  //   }
  // }, []);

  useEffect(() => {
    let idx = items && items.findIndex((o) => o.id === purpose || o.text === purpose);
    if (items && items[idx]) {
      let t = items[idx].text;
      let f = items[idx].fields;
      let r = items[idx].required;
      let c = items[idx].condition;
      let p = items[idx].policy;
      if (f) setFields(f);
      if (r) setRequired(r);
      if (c) setCondition(c);
      if (p) setPolicy(p);
      if (t) setPurpose(t);
      setSingle(false);
    }
  }, [purpose]);

  useEffect(() => {
    let r1 = FOURHOURS,
      r2 = 0;
    if (policy && policy.reserve && !isEmpty(policy.reserve)) {
      if (!isEmpty(opportunity) && policy.reserve["opportunity"])
        r1 = policy.reserve["opportunity"];
      else if (!isEmpty(customer) && policy.reserve["customer"]) r1 = policy.reserve["customer"];
      else if (!isEmpty(description) && policy.reserve["description"])
        r1 = policy.reserve["description"];
      else if (policy.reserve["*"]) r1 = policy.reserve["*"];
    }
    if (policy && policy.extend && !isEmpty(policy.extend)) {
      if (!isEmpty(opportunity) && policy.extend["opportunity"]) r2 = policy.extend["opportunity"];
      else if (!isEmpty(customer) && policy.extend["customer"]) r2 = policy.extend["customer"];
      else if (!isEmpty(description) && policy.extend["description"])
        r2 = policy.extend["description"];
      else if (policy.extend["*"]) r2 = policy.extend["*"];
    }
    if (onChange && typeof onChange === "function")
      onChange({
        policy,
        purpose,
        customer,
        opportunity,
        description,
        reserveMax: r1,
        extendMax: r2,
      });
    // setFieldValue("reserveMax", r1);
    // setFieldValue("extendMax", r2);
  }, [policy, purpose, customer, opportunity, description]);

  useEffect(() => {
    if (values.purpose !== purpose) setPurpose(values.purpose);
    if (values.customer !== customer) setCustomer(values.customer);
    if (values.opportunity !== opportunity) setOpportunity(values.opportunity);
    if (values.description !== description) setDescription(values.description);
  }, [values]);

  const handleChange = (n, v) => {
    setFieldTouched(n, true);
    setFieldValue(n, v);
  };

  const handleBlur = (e, n) => {
    let name;
    if (n) name = n;
    else if (e && e.target && e.target.name) name = e.target.name;
    else if (e && e.relatedTarget && e.relatedTarget.name) name = e.relatedTarget.name;
    else if (e && e.name) name = e.name;
    if (onBlur) onBlur(e);
    if (name) setFieldTouched(name, true);
  };

  const handleFocus = (e) => {
    if (onFocus) onFocus(e);
  };

  return (
    <>
      <Row>
        <Column lg={16} md={8} sm={4}>
          {labelText ? <FormLabel>{labelText}</FormLabel> : null}
          {single ? (
            <div className="bx--form-item bx--text-input-wrapper">
              {labelText.purpose ? (
                <label htmlFor={id} className="bx--label">
                  {labelText.purpose}
                </label>
              ) : null}
              <div className="bx--text-input__field-wrapper">{purpose}</div>
            </div>
          ) : (
            <Dropdown
              id="purpose"
              key="purpose"
              name="purpose"
              titleText={"Purpose"}
              helperText={`Please select the purpose for this activity`}
              invalidText={errors.purpose}
              invalid={Boolean(touched.purpose && errors.purpose)}
              onChange={(e) => {
                let v = (e && e.selectedItem && e.selectedItem.text) || null;
                handleChange("purpose", v);
                setPurpose(v);
              }}
              onBlur={(e) => handleBlur(e, "purpose")}
              onFocus={handleFocus}
              itemToValue={(i) => (i && i.text ? i.text : i)}
              itemToString={(i) => (i && i.text ? i.text : i)}
              initialSelectedItem={values.purpose}
              items={items}
              value={purpose}
            />
          )}
        </Column>
        {fields && fields.includes("customer") ? (
          <Column lg={8} md={8} sm={4}>
            <TagInput
              id="customer"
              key="customer"
              name="customer"
              value={customer}
              labelText="Customer name(s)"
              inputPlaceHolder="Enter a customer name"
              helperText={`Enter a list of customer names`}
              title="Remove customer"
              type="blue"
              invalidText={errors.customer}
              invalid={Boolean(touched.customer && errors.customer)}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              validator={(v) => v && v.toString().trim() !== ""}
            />
          </Column>
        ) : null}
        {fields && fields.includes("opportunity") ? (
          <Column lg={8} md={8} sm={4}>
            <TagInput
              id="opportunity"
              key="opportunity"
              name="opportunity"
              value={opportunity}
              labelText="Sales Opportunity Number"
              inputPlaceHolder={`Enter an opportunity number(s)`}
              helperText={`With an valid opportunity ID you can extend your reservation.`}
              title="Remove opportunity"
              type="green"
              invalidText={errors.opportunity}
              invalid={Boolean(touched.opportunity && errors.opportunity)}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              validator={(v) => v && v.toString().trim() !== ""}
            />
          </Column>
        ) : null}

        {fields && (fields.includes("customer") || fields.includes("opportunity")) ? (
          <Column lg={16} md={8} sm={4}>
            <Tooltip
              tooltipText={`![ReservationDurationPolicyInfographic](https://dte2.s3.us-east.cloud-object-storage.appdomain.cloud/ReservationDurationPolicyInfographic.png)`}
              markdown={true}
              direction="top"
              align="start">
              <button className="bx--tooltip__trigger bx--tooltip--a11y bx--tooltip__trigger--definition bx--tooltip--bottom bx--tooltip--align-start">
                Entering an opportunity code will allow you to extend in one-week increments after
                this initial request.
              </button>
            </Tooltip>
          </Column>
        ) : null}

        {fields && fields.includes("description") ? (
          <Column lg={16} md={8} sm={4}>
            <AutoGrowTextArea
              id="description"
              key="description"
              value={description}
              labelText="Purpose description"
              placeholder={``}
              helperText={`What are you doing? Why do you need this? What are you trying to accomplish?`}
              invalidText={errors.description}
              invalid={Boolean(touched.description && errors.description)}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </Column>
        ) : null}
      </Row>
    </>
  );
};

SalesOpportunity.defaultProps = {
  items: [
    {
      id: "customer-demo",
      text: "Customer Demo",
      fields: ["customer", "opportunity"],
      required: ["customer", "opportunity"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": TWOWEEK } },
      condition: "or",
    },
    {
      id: "customer-self-service",
      text: "Customer Self-Service",
      fields: ["customer", "opportunity"],
      required: ["customer", "opportunity"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": TWOWEEK } },
      condition: "or",
    },
    {
      id: "development",
      text: "Development",
      fields: ["description"],
      required: ["description"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0 } },
    },
    {
      id: "other",
      text: "Other",
      fields: ["description"],
      required: ["description"],
      policy: { reserve: { "*": FOURHOURS }, extend: { "*": 0 } },
    },
    {
      id: "practice-self-education",
      text: "Practice / Self-Education",
      fields: ["description"],
      required: ["description"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0 } },
    },
    {
      id: "proof-of-concept",
      text: "Proof-of-Concept",
      fields: ["customer", "opportunity"],
      required: ["customer", "opportunity"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": TWOWEEK } },
      condition: "or",
    },
    {
      id: "proof-of-technology",
      text: "Proof-of-Technology",
      fields: ["customer", "opportunity"],
      required: ["customer", "opportunity"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": TWOWEEK } },
      condition: "or",
    },
    {
      id: "service-support",
      text: "Service / Support",
      fields: ["description"],
      required: ["description"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0 } },
    },
    {
      id: "test",
      text: "Test",
      fields: ["description"],
      required: ["description"],
      policy: { reserve: { "*": FOURHOURS }, extend: { "*": 0 } },
    },
    {
      id: "workshop",
      text: "Workshop",
      fields: ["customer", "opportunity", "description"],
      required: ["customer", "opportunity"],
      policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": TWOWEEK } },
      condition: "or",
    },
  ],
  helperText: "",
  labelText: "",
  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
};

SalesOpportunity.propTypes = {
  errors: PropTypes.any,
  setFieldValue: PropTypes.func,
  setFieldError: PropTypes.func,
  setFieldTouched: PropTypes.func,
  touched: PropTypes.bool,
  values: PropTypes.any,
  helperText: PropTypes.string,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  items: PropTypes.any,
  label: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
};

export default SalesOpportunity;
