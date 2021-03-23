import React from "react";
import { Modal as CarbonModal } from "carbon-components-react";
import styled from "styled-components";

const Modal = styled(CarbonModal)`
  & .bx--modal-header,
  & .bx--modal-content {
    text-align: left;
  }
`;

const ConfirmModal = ({
  children,
  disablePrimaryBtn,
  hasForm,
  namespace,
  message,
  modalLabel,
  modalAriaLabel,
  modalHeading,
  primaryButtonText,
  secondaryButtonText,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal
      className={`${namespace}__form`}
      iconDescription="Close"
      modalAriaLabel={modalAriaLabel}
      modalHeading={modalHeading}
      modalLabel={modalLabel}
      onBlur={onClose}
      onRequestClose={onClose}
      onRequestSubmit={onSubmit}
      onSecondarySubmit={onClose}
      hasScrollingContent={false}
      open
      passiveModal={false}
      primaryButtonDisabled={disablePrimaryBtn ? disablePrimaryBtn : false}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      hasForm={hasForm}
      size="sm"
    >
      <h1>{message}</h1>
      {children || null}
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  namespace: "modal",
  message: "",
  modalLabel: "modal",
  modalAriaLabel: "Confirmation",
  modalHeading: "",
  primaryButtonText: "Yes",
  secondaryButtonText: "No",
  hasForm: false,
  onSubmit: () => {},
  onClose: () => {},
};

export default ConfirmModal;
