import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Grid, Row, Column } from "carbon-components-react";

import { TextInput } from "components";
import { getAuthorization, getEmail } from "lib/auth";
import { createOrUpdate } from "lib/bookmark";
import Aux from "../Aux/Aux";

const BookmarkModal = ({
  values = {},
  user = {},
  namespace,
  message,
  modalLabel,
  modalAriaLabel,
  modalHeading,
  primaryButtonText,
  secondaryButtonText,
  onClose,
  ...props
}) => {
  const [email, setEmail] = useState(values);
  const [formValues, setFormValues] = useState(values);

  useEffect(() => {
    if (!formValues.user && user) setEmail(getEmail(user));
  }, [user]);

  useEffect(() => {
    if (!formValues.model && !formValues.url) {
      let v = { ...formValues };
      let u = new URL(window.location.href);
      v.model = namespace;
      v.url = u.pathname + u.search;
      setFormValues(v);
    }
  }, []);

  const onSubmit = () => {
    // console.log('formValues',formValues)
    if (!formValues.user) formValues.user = email;
    createOrUpdate(formValues, getAuthorization(user));
    if (props.onSubmit) props.onSubmit(formValues);
  };

  return (
    <Modal
      className={`${namespace}__form form`}
      iconDescription="Close"
      modalAriaLabel={modalAriaLabel}
      modalHeading={modalHeading}
      modalLabel={modalLabel}
      onBlur={onClose}
      onRequestClose={onClose}
      onRequestSubmit={onSubmit}
      onSecondarySubmit={onClose}
      hasScrollingContent={false}
      hasForm
      open
      passiveModal={false}
      primaryButtonDisabled={false}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      size="md">
      {message ? <div style={{ paddingBottom: "2rem" }}>{message}</div> : null}
      <Grid>
        <Row condensed>
          <Column lg={16} md={4} sm={4}>
            <TextInput
              id="name"
              name="name"
              labelText="Name"
              placeholder="Enter a name for this bookmark"
              value={formValues.name}
              invalidText=""
              invalid=""
              minLength={1}
              maxLength={255}
              onChange={(e) => {
                setFormValues({ ...formValues, name: e.target.value });
              }}
            />
          </Column>
        </Row>
        <Row condensed>
          <Column lg={16} md={8} sm={4}>
            <TextInput
              id="description"
              name="description"
              labelText="Description"
              placeholder="Enter an optional description for this bookmark"
              value={formValues.description}
              invalidText=""
              invalid=""
              maxLength={2048}
              onChange={(e) => {
                setFormValues({ ...formValues, description: e.target.value });
              }}
            />
          </Column>
        </Row>
        <Row condensed>
          <Column lg={16} md={8} sm={4}>
            <TextInput
              id="url"
              name="url"
              labelText="Bookmark url"
              value={formValues.url}
              invalidText=""
              invalid=""
              readOnly
            />
          </Column>
        </Row>
      </Grid>
    </Modal>
  );
};

BookmarkModal.defaultProps = {
  namespace: "modal",
  message: (
    <Aux>
      <p>
        Would you like to save your search as a bookmark? Fill in a name and click{" "}
        <strong>Save</strong>.
      </p>
      <p>If you want to give this bookmark some additional context add a description.</p>
      <p>
        Your bookmarks will be available on the bookmarks page and the homepage for quick access.
      </p>
    <Aux/>
  ),
  modalLabel: "Bookmark",
  modalAriaLabel: "Bookmark",
  modalHeading: "Bookmark this search",
  primaryButtonText: "Save",
  secondaryButtonText: "Cancel",
  onSubmit: () => {},
  onClose: () => {},
};

BookmarkModal.propTypes = {
  namespace: PropTypes.string,
  values: PropTypes.any,
  user: PropTypes.any,
  message: PropTypes.any,
  modalLabel: PropTypes.string,
  modalAriaLabel: PropTypes.string,
  modalHeading: PropTypes.string,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default BookmarkModal;
