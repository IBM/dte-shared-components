import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

let Styled = styled.div`
  &.overflow-menu-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    white-space: wrap;
    & .overflow-menu-item-icon {
      padding-right: 1rem;
    }
    & .overflow-menu-item-content {
      flex: 1 1 100%;
      white-space: wrap !important;
    }
    & .bx--overflow-menu-options__option-content {
      white-space: wrap !important;
    }
  }
`;

const OverflowMenuItemIcon = (props) => {
  const { icon, label, helperText, title } = props;
  return (
    <Styled className="overflow-menu-item">
      <div className="overflow-menu-item-icon">{icon}</div>
      <div
        className="overflow-menu-item-content bx--overflow-menu-options__option-content"
        title={title || helperText || label}>
        {label}
      </div>
    </Styled>
  );
};

OverflowMenuItemIcon.defaultProps = {
  icon: "",
  label: "",
  helperText: "",
  title: "",
};

OverflowMenuItemIcon.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  title: PropTypes.string,
};

export default OverflowMenuItemIcon;
