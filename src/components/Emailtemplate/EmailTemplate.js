import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Column, Form } from "carbon-components-react";

import { Formik } from "formik";
import { truncate } from "lodash";
import styled from "styled-components";

import { Loading, Wysiwyg, TagInput } from "components";

import { templateBody, templateSubject } from "data/emailTemplate";

import { getEmail } from "lib/auth";
import { isBasic } from "lib/collection";
import { isEmail, isEmpty, markdownToHtml } from "lib/utils";

const BASE_URL = process.env.BASE_URL;
const ROOT = "";
const ASSET = "asset";
const COLLECTION = "collection";

const Styled = styled.span`
  & .email-template {
    & .wysiwyg-editor.bx--text-area.rdw-editor-main {
      min-height: 5.5rem;
    }
  }
`;

const updateTemplateSubject = (title) => {
  return templateSubject.replace("$title", title);
};

const directUrl = (collection) => {
  return isBasic(collection)
    ? `${BASE_URL}${ROOT}/${ASSET}/${collection.slug || collection.id}`
    : `${BASE_URL}${ROOT}/${COLLECTION}/${collection.slug || collection.id}`;
};

const updateTemplateBody = (collection = {}, email = "") => {
  return templateBody
    .replace("$title", collection.name)
    .replace("$url", `[click to view asset](${directUrl(collection)})`)
    .replace(
      "$content",
      truncate(collection.synopsis || collection.description || "", { length: 500 })
    )
    .replace("$from", email);
};

const EmailTemplate = ({ collection, onChange, onValidate, toolbar, user = {} }) => {
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    const e = getEmail(user) || "dte@us.ibm.com";
    const n = (collection && collection.name) || "";
    const v = {
      subject: updateTemplateSubject(n),
      to: [],
      html: updateTemplateBody(collection, e),
      from: e,
    };
    setInitialValues(v); // set initial values
    handleUpdate(v);
  }, [collection, user]);

  const handleUpdate = (value) => {
    let values = { ...value };
    if (values.html) values.html = markdownToHtml(values.html);
    if (onChange && typeof onChange === "function") onChange(values);
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.to || values.to.length < 1) {
      errors.to = "Required";
    }
    if (isEmpty(values.html)) {
      errors.html = "Required";
    }
    return errors;
  };

  if (!initialValues) return <Loading />;

  return (
    <Styled>
      <div className="email-template">
        <Formik
          initialValues={initialValues}
          validateOnChange
          validateOnBlur
          validate={handleValidate}>
          {({ values, errors, touched, isValid, handleChange, setFieldValue }) => {
            useEffect(() => {
              onChange(values);
            }, [values]);
            useEffect(() => {
              onValidate ? onValidate(isValid) : "";
            }, [isValid]);
            return (
              <Form onChange={handleChange}>
                <Row style={{ margin: "1rem 0 0" }}>
                  <Column sm={16} md={16} lg={16}>
                    <TagInput
                      name="to"
                      labelText="To"
                      helperText={`Please provide an email recipient list`}
                      placeholder="Enter an email address"
                      value={values.to}
                      invalid={Boolean(touched.to && errors.to)}
                      invalidText={errors.to}
                      title="Remove email"
                      type="blue"
                      onChange={setFieldValue}
                      normalizer={(v) => {
                        return v && v.toString().toLowerCase();
                      }}
                      validator={(v) => {
                        v = v.toString();
                        return v && v !== null && v !== undefined && isEmail(v);
                      }}
                    />
                  </Column>
                </Row>
                <Row style={{ margin: "2rem 0 0" }}>
                  <Column lg={16} md={16} sm={16}>
                    <Wysiwyg
                      id="html"
                      name="html"
                      labelText="Message"
                      helperText="Feel free to customize your message"
                      placeholder="hello there"
                      format="markdown"
                      outputFormat="html"
                      toolbar={toolbar}
                      value={values.html}
                      onChange={(n, v) => setFieldValue(n, v)}
                      invalid={touched.html && errors.html}
                      invalidText={errors.html}
                      rows="20"
                    />
                  </Column>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Styled>
  );
};

EmailTemplate.defaultProps = {
  collection: {},
  toolbar: {
    toolbar: {
      container: [["bold", "italic", "underline"], ["link"]],
    },
  },
  user: {},
};

EmailTemplate.propTypes = {
  collection: PropTypes.any,
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
  toolbar,
  user: PropTypes.any,
};

export default EmailTemplate;
