import React, { useState, useEffect } from "react";
import Aux from "../Aux/Aux";
import {
  Modal,
  Row,
  Column,
  TextInput,
  Button,
  Form,
  ToastNotification,
} from "carbon-components-react";
import { Formik } from "formik";
import { Wysiwyg, TagInput, TagInputTypeahead, InvalidText, Loading } from "../../index";
import * as Yup from "yup";

import { templateBody, templateSubject } from "../data/emailTemplate";
import { truncate } from "lodash";
// import { getAuthorization, getEmail } from "../lib/auth";
// import { send } from "../lib/message";
import { initial } from "lodash";
// import { isBasic } from "../../methods";
// import { isEmail, isEmpty, markdownToHtml } from "../lib/utils";

const VALIDATION_SCHEMA = Yup.object().shape({
  to: Yup.string().required().max(2048),
  from: Yup.string().email("Invalid email").required().max(1024),
  subject: Yup.string().required().max(1024),
  html: Yup.string().required().max(65536),
});

const BASE_URL = process.env.BASE_URL;
const ROOT = "";
const ASSET = "asset";
const COLLECTION = "collection";

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
const Share = ({
  namespace,
  message,
  modalLabel,
  modalAriaLabel,
  modalHeading,
  collection,
  onEmail,
  onClose,
  isEmail,
  isEmpty,
  markdownToHtml,
  getAuthorization,
  getEmail,
  send,
  user = {},
}) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = getEmail(user) || "";
    const n = (collection && collection.name) || "";
    const v = {
      subject: updateTemplateSubject(n),
      to: [],
      html: updateTemplateBody(collection, e),
      from: e,
    };
    if (v.html) v.html = markdownToHtml(v.html);
    setInitialValues(v);
  }, [collection, user]);

  const handleSubmit = (values) => {
    let result = send(values, getAuthorization(user));
    setLoading(true);
    if (result && result.statusCode === 202) {
      if (onEmail && typeof onEmail === "function") onEmail();
    }
    if (onClose && typeof onClose === "function") onClose();
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.to || values.to.length < 1) {
      errors.to = "Required";
    }
    if (isEmpty(values.html)) {
      errors.html = "Required";
    }
    if (isEmpty(values.from)) {
      errors.from = "Required";
    }
    return errors;
  };

  const onKeyDown = (e) => {
    if (
      ((e.charCode || e.keyCode) === 13 || e.key === "Enter") &&
      !["textarea"].includes(e.target.type)
    )
      e.preventDefault();
  };

  return (
    <Aux>
      {!initialValues ? (
        <Loading />
      ) : (
        <div className="email-template">
          <Formik
            initialValues={initialValues}
            validateOnChange
            validateOnBlur
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={handleSubmit}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Modal
                className={`${namespace}__form`}
                iconDescription="Close"
                modalAriaLabel={modalAriaLabel}
                modalHeading={modalHeading}
                modalLabel={modalLabel}
                onBlur={onClose}
                onRequestClose={onClose}
                onRequestSubmit={handleSubmit}
                hasScrollingContent={true}
                passiveModal={false}
                primaryButtonText="Send"
                secondaryButtonText="Close"
                primaryButtonDisabled={!isValid || loading}
                open
                hasForm
                size="md">
                <Form
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}>
                  <Row style={{ margin: "1rem 0 0" }}>
                    <Column lg={16} md={8} sm={4}>
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
                        validator={(v) => {
                          v = v.toString();
                          return v && v !== null && v !== undefined && isEmail(v);
                        }}
                      />
                    </Column>
                  </Row>
                  <Row style={{ margin: "2rem 0 0" }}>
                    <Column lg={16} md={8} sm={4}>
                      <Wysiwyg
                        id="html"
                        name="html"
                        labelText="Message"
                        helperText="Feel free to customize your message"
                        placeholder="hello there"
                        format="markdown"
                        outputFormat="html"
                        value={values.html}
                        onChange={(n, v) => setFieldValue(n, v)}
                        invalid={touched.html && errors.html}
                        invalidText={errors.html}
                        rows="20"
                      />
                    </Column>
                  </Row>
                  {isEmpty(initialValues.from) ? (
                    <Row style={{ margin: "2rem 0 0" }}>
                      <Column lg={16} md={8} sm={4}>
                        <TextInput
                          name="from"
                          labelText="From"
                          placeholder="Enter your email address"
                          value={values.from}
                          invalid={Boolean(touched.from && errors.from)}
                          invalidText={errors.from}
                        />
                      </Column>
                    </Row>
                  ) : null}
                </Form>
              </Modal>
            )}
          </Formik>
        </div>
      )}
    <Aux/>
  );
};

Share.defaultProps = {
  namespace: "modal",
  modalLabel: "Share",
  modalAriaLabel: "Share",
  modalHeading: "Share",
  message: "",
  user: {},
  onEmail: () => {},
  onShare: () => {},
  onClose: () => {},
  collection: {},
};

export default Share;
