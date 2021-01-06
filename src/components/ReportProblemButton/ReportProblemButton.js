import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInput, TooltipIcon } from "carbon-components-react";

import { Stethoscope32 } from "@carbon/icons-react";
import { AutoGrowTextArea, ConfirmModal, Form } from "components";

import { trackNav } from "lib/analytics";
import { isLoggedIn, getAuthorization, getEmail } from "lib/auth";
import { send } from "lib/message";

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "dte@us.ibm.com";

const VALIDATION_SCHEMA = Yup.object().shape({
  user: Yup.string().email("Invalid email").required().max(1024),
  notes: Yup.string().required().max(65536),
});

const Button = styled.div`
  margin: 0 0.5rem;
  overflow: hidden;
  cursor: pointer;
  &.dark {
    color: #fff;
    & > svg {
      fill: #fff;
    }
  }
  &.light {
    color: #161616;
    & > svg {
      fill: #161616;
    }
  }
`;

const ReportProblemButton = ({ data, labelText, value, user = {}, theme, ...rest }) => {
  const { asPath = "/" } = useRouter();
  const [model, setModel] = useState();
  const [email, setEmail] = useState(false);
  const [mid, setMid] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) setEmail(getEmail(user));
  }, [user]);

  useEffect(() => {
    let parts = asPath.split("/");
    if (parts && parts.length > 1 && parts[1])
      setModel(parts[1] === "asset" ? "collection" : parts[1]);
    if (parts && parts.length > 1 && parts[2]) setMid(parts[2]);
  }, [asPath]);

  const submitHandler = async (values) => {
    let subject = `[DTE 2.0 Problem] Problem reported with ${values.model} ${values.mid}`;
    let notes = values.notes || "";
    let browser = `<b>Browser codename:</b> ${navigator.appCodeName}<br />`;
    browser += `<b>Browser version:</b> ${navigator.appVersion}<br />`;
    browser += `<b>Cookies enabled</b> ${navigator.cookieEnabled}<br />`;
    browser += `<b>Environment:</b> ${navigator.platform}<br />`;
    browser += `<b>User-agent header:</b> ${navigator.userAgent}<br />`;
    let payload = {
      to: value,
      cc: [SUPPORT_EMAIL],
      from: email,
      subject: subject,
      html: `<p>${subject}<p>
      <p><b>User: ${email || getEmail(user) || ""}</b></p>
      <p>${notes}</p>
      <p><b>URL:</b> ${window.location.href || ""}</p>
      <p>${browser}</p>
      <p><b>Date:</b> ${new Date()}</p>`,
    };
    try {
      // console.log("send", payload);
      await send(payload, getAuthorization(user));
      // send a notification of success
    } catch (err) {
      // send a notification of error
    }
    setShow(false);
  };

  if (!value) return null;
  if (!user || !isLoggedIn(user)) rest.style = { top: "5.5rem" };
  return (
    <>
      {show ? (
        <Formik
          initialValues={{ model: model, mid: mid, notes: "", user: email }}
          validateOnBlur={true}
          validateOnChange={true}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={submitHandler}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset }) => (
            <ConfirmModal
              namespace={`collection_problem`}
              message={`Are you sure you want to report a problem with this ${model}?`}
              modalLabel={null}
              modalAriaLabel={`Report a problem`}
              modalHeading="Report a problem"
              primaryButtonText="Yes"
              secondaryButtonText="No"
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
                <AutoGrowTextArea
                  id="notes"
                  name="notes"
                  labelText="Notes"
                  placeholder="Enter any notes your would like to attach to this problem report."
                  value=""
                  invalid={Boolean(touched.notes && errors.notes)}
                  invalidText={errors.notes ? "Notes is a required field" : null}
                />
                {!user || user.isLoggedIn === false ? (
                  <div style={{ marginTop: "1rem" }}>
                    <TextInput
                      name="user"
                      labelText="From"
                      placeholder="Enter your email address"
                      value={values.user}
                      invalid={Boolean(touched.user && errors.user)}
                      invalidText={errors.user ? "From is a required field" : null}
                      onChange={(e) => {
                        let v = (e && e.target && e.target.value) || "";
                        setEmail(v);
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
          className={theme}
          onClick={() => {
            setShow(true);
            trackNav({ ...data, type: "Button", milestone: "Report a problem" });
          }}
          {...rest}>
          <Stethoscope32 style={{ fill: theme === "dark" ? "#fff" : "#161616" }} />
        </Button>
      </TooltipIcon>
    </>
  );
};

ReportProblemButton.defaultProps = {
  labelText: "Report a problem",
  value: [],
  theme: "dark",
};

ReportProblemButton.propTypes = {
  data: PropTypes.any,
  labelText: PropTypes.string,
  value: PropTypes.any,
  user: PropTypes.any,
  theme: PropTypes.string,
};

export default ReportProblemButton;
