import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Yup from "yup";

import { Formik } from "formik";
import { FormItem, FormLabel, TextInput, TooltipIcon } from "carbon-components-react";
import { Help32 } from "@carbon/icons-react";

import { ConfirmModal, EmailList, Form, Wysiwyg } from "components";

import { trackNav } from "lib/analytics";
import { isLoggedIn, getAuthorization, getEmail } from "lib/auth";
import { isEmpty, isEmail, isEmailList, isUrl } from "lib/utils";
import { send } from "lib/message";

const VALIDATION_SCHEMA = Yup.object().shape({
  to: Yup.string().required().max(2048),
  from: Yup.string().email("Invalid email").required().max(1024),
  subject: Yup.string().required().max(1024),
  html: Yup.string().required().max(65536),
});

const TOOLBAR = {
  toolbar: {
    container: [["bold", "italic", "underline"], ["link"]],
  },
};

const Button = styled.div`
  margin: 0 0.5rem;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
  & > svg {
    fill: #fff;
  }
`;

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "dte@us.ibm.com";

const HelpButton = ({ data, labelText, value, user = {}, ...rest }) => {
  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const [show, setShow] = useState(false);

  const [initialValues, setInitialValues] = useState({
    to: to,
    from: from || getEmail(user),
    subject: `Help request for ${(value && value.name) || ""} ${window.location.href}`,
    html: "",
  });

  useEffect(() => {
    let email = getEmail(user);
    setInitialValues({ ...initialValues, from: email });
    setFrom(email);
  }, [user]);

  useEffect(() => {
    setInitialValues({ ...initialValues, to: to });
  }, [to]);

  const handleClick = () => {
    if (!value) {
      setTo(SUPPORT_EMAIL);
      setShow(true);
    } else if (isUrl(value)) {
      window.open(value);
    } else if (isEmailList(value) || isEmail(value)) {
      setTo(value);
      setShow(true);
    } else {
      setTo(SUPPORT_EMAIL);
      setShow(true);
    }
  };

  const submitHandler = async (values) => {
    let payload = { ...values };
    try {
      // console.log("submitHandler", payload);
      await send(payload, getAuthorization(user));
      // send a notification of success
    } catch (err) {
      // send a notification of error
    }
    setShow(false);
  };

  if (!value) return null;
  if (!user || !isLoggedIn(user)) rest.style = { top: "2rem" };
  return (
    <>
      {show ? (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validateOnBlur={true}
          validateOnChange={false}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitHandler}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
          }) => (
            <ConfirmModal
              namespace={`collection_help`}
              message={`Fill out the form below and click the Send button.`}
              modalLabel={null}
              modalAriaLabel={`Ask for help`}
              modalHeading="Ask for help"
              primaryButtonText="Send"
              secondaryButtonText="Cancel"
              hasForm
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              onClose={() => {
                setShow(false);
              }}>
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                onChange={handleChange}
                onReset={handleReset}
                onBlur={handleBlur}
                className="form">
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <div style={{ marginBottom: "1rem" }}>
                    <EmailList list={values.to} obfuscate={false} format="short" />
                  </div>
                </FormItem>
                {isEmpty(initialValues.subject) ? (
                  <TextInput
                    name="subject"
                    labelText="Subject"
                    placeholder="Please provide a subject"
                    value={values.subject}
                    invalid={Boolean(touched.subject && errors.subject)}
                    invalidText={errors.subject}
                  />
                ) : null}
                {isEmpty(initialValues.html) ? (
                  <div style={{ margin: "1rem 0" }}>
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
                  </div>
                ) : null}
                {!user || user.isLoggedIn === false ? (
                  <div style={{ marginTop: "1rem" }}>
                    <TextInput
                      name="from"
                      labelText="From"
                      placeholder="Enter your email address"
                      value={values.from}
                      invalid={Boolean(touched.from && errors.from)}
                      invalidText={errors.from}
                      onChange={(e) => {
                        let v = (e && e.target && e.target.value) || "";
                        setFrom(v);
                      }}
                    />
                  </div>
                ) : null}
              </Form>
            </ConfirmModal>
          )}
        </Formik>
      ) : null}
      <TooltipIcon tooltipText={labelText}>
        <Button
          onClick={(e) => {
            handleClick(e);
            trackNav({ ...data, type: "Button", milestone: "Ask for help" });
          }}
          {...rest}>
          <Help32 style={{ fill: "#fff" }} />
        </Button>
      </TooltipIcon>
    </>
  );
};

HelpButton.defaultProps = {
  labelText: "Ask for help?",
  value: "/help",
};

HelpButton.propTypes = {
  data: PropTypes.any,
  labelText: PropTypes.string,
  value: PropTypes.any,
  user: PropTypes.any,
};

export default HelpButton;
