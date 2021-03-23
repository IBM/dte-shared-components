import React from "react";
import PropTypes from "prop-types";

import { SkeletonText } from "carbon-components-react";
import { ConfirmModal, Markdown } from "../../index";

const ContentModal = ({
  onClose,
  onSubmit,
  lineCount,
  markdown,
  data,
  ...rest
}) => {
  let content, heading;
  if (!data) content = <SkeletonText lineCount={lineCount} width="100%" />;
  if (data && data.content)
    content = markdown ? <Markdown source={data.content} /> : data.content;
  if (data && data.description) heading = data.description;
  return (
    <ConfirmModal
      namespace={`content_modal`}
      modalLabel={null}
      modalAriaLabel={heading}
      modalHeading={heading}
      onSubmit={onSubmit}
      onClose={onClose}
      {...rest}
    >
      {content}
    </ConfirmModal>
  );
};

ContentModal.defaultProps = {
  lineCount: 3,
  markdown: true,
  primaryButtonText: "Agree",
  secondaryButtonText: "Cancel",
  onClose: () => {},
  onSubmit: () => {},
};

ContentModal.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  lineCount: PropTypes.number,
  markdown: PropTypes.bool,
  data: PropTypes.object,
};

export default ContentModal;
