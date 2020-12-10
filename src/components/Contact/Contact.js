import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button, Row, Column, ToastNotification } from "carbon-components-react";
import { Form, TextInput } from ".";
import { SendAlt32 } from "@carbon/icons-react";

import {
  ButtonSet,
  Notifications,
  InlineLoading,
  InvalidText,
  TagInput,
  TagInputTypeahead,
  Wysiwyg,
} from "./.";

import { send } from "../lib/message";
import { getEmail, getAuthorization } from "../lib/auth";
import { searchByEmail } from "../lib/bluepages";
import { isEmail, isEmpty, toLocaleDateString } from "../lib/utils";

const VALIDATION_SCHEMA = Yup.object().shape({
  to: Yup.string().email("Invalid email").required().max(2048),
  from: Yup.string().email("Invalid email").required().max(1024),
  subject: Yup.string().required().max(1024),
  html: Yup.string().required().max(65536),
});

const TOOLBAR = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};

const Contact = ({ to, subject, html, buttons, additional, user = {}, onSubmit }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [initialValues, setInitialValues] = useState({
    to: to,
    from: getEmail(user),
    subject: subject,
    html: html,
  });

  useEffect(() => {
    setInitialValues({ ...initialValues, from: getEmail(user) });
  }, [user]);

  const addNotification = (title, body, kind) => {
    let now = new Date();
    let caption = toLocaleDateString(now, "lll (Z)");
    let uuid = now.valueOf() + "-" + Math.floor(Math.random() * 100);
    let message =
      kind !== "error" ? (
        <ToastNotification
          key={uuid}
          title={title}
          subtitle={body}
          caption={caption}
          kind={kind}
          onCloseButtonClick={() => deleteNotification(uuid)}
          timeout={5000}
        />
      ) : (
        <ToastNotification
          key={uuid}
          title={title}
          subtitle={body}
          caption={caption}
          kind={kind}
          onCloseButtonClick={() => deleteNotification(uuid)}
        />
      );
    setNotifications((prev) => [...prev, message]);
  };

  const deleteNotification = (uuid) => {
    setNotifications((prev) => prev.filter((x) => x.props.key !== uuid));
  };

  const onKeyDown = (e) => {
    if (
      ((e.charCode || e.keyCode) === 13 || e.key === "Enter") &&
      !["textarea"].includes(e.target.type)
    )
      e.preventDefault();
  };

  const submitHandler = (values, { setSubmitting }) => {
    try {
      send(values, getAuthorization(user));
      addNotification("Message sent", "Thank you for reaching out to us.", "info");
      if (onSubmit && typeof onSubmit === "function") onSubmit(values);
    } catch (err) {
      addNotification("Message error", err.message || err, "error");
    }
    setTimeout(() => {
      setSubmitting(false);
      setHasSubmitted(true);
    }, 750);
    setTimeout(() => {
      setHasSubmitted(false);
    }, 3500);
  };

  return (
    <>
      <Notifications notifications={notifications} />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur={true}
        validateOnChange={false}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={submitHandler}>
        {({
          values,
          dirty,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
          validateField,
          isValid,
          isSubmitting,
        }) => (
          <Form
            onKeyDown={onKeyDown}
            onSubmit={(e) => {
              handleSubmit(e);
              setTimeout(() => {
                if (!isValid) {
                  addNotification(
                    "Error",
                    `Please address the following errors: ${Object.values(errors).join(", ")}`,
                    "error"
                  );
                }
              }, 250);
            }}
            onChange={handleChange}
            onReset={handleReset}
            onBlur={handleBlur}
            className="form">
            {isEmpty(initialValues.to) ? (
              <Row>
                <Column lg={16} md={8} sm={4}>
                  <TagInput
                    name="to"
                    labelText="To"
                    helperText={`Please provide an email address.  If you have multiple recipients press enter to specify additional email addresses.`}
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
            ) : null}
            {isEmpty(initialValues.subject) ? (
              <Row>
                <Column lg={16} md={8} sm={4}>
                  <TextInput
                    name="subject"
                    labelText="Subject"
                    placeholder="Please provide a subject"
                    value={values.subject}
                    invalid={Boolean(touched.subject && errors.subject)}
                    invalidText={errors.subject}
                  />
                </Column>
              </Row>
            ) : null}
            {isEmpty(initialValues.html) ? (
              <Row>
                <Column lg={16} md={8} sm={4}>
                  <Wysiwyg
                    name="html"
                    labelText=""
                    placeholder="Enter your message here"
                    format="markdown"
                    outputFormat="html"
                    toolbar={TOOLBAR}
                    value={values.html}
                    onChange={setFieldValue}
                    invalid={Boolean(touched.html && errors.html)}
                    invalidText={errors.html}
                    rows="5"
                  />
                </Column>
              </Row>
            ) : null}
            {isEmpty(initialValues.from) ? (
              <Row>
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
            {buttons ? (
              <Row>
                <Column lg={10} md={4} sm={2} className="buttongroup condensed">
                  <Button
                    type="submit"
                    kind="primary"
                    disabled={isSubmitting}
                    renderIcon={SendAlt32}>
                    Send
                  </Button>
                  {additional}
                </Column>
                {isSubmitting || hasSubmitted ? (
                  <Column lg={6} md={4} sm={2}>
                    <InlineLoading
                      success={hasSubmitted}
                      icondescription="Active loading indicator"
                      description={hasSubmitted ? "Submission successful" : "Submitting ..."}
                    />
                  </Column>
                ) : null}
              </Row>
            ) : null}
          </Form>
        )}
      </Formik>
    </>
  );
};

Contact.defaultProps = {
  to: [],
  subject: "",
  html: "",
  user: {},
  buttons: true,
  additional: null,
  onSubmit: () => {},
};

export default Contact;
