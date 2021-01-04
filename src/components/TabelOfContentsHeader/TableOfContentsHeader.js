import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Header0 = styled.p`
  padding-bottom: 1rem;
  padding-top: 6rem;
`;

const Header1 = styled.h1`
  padding-bottom: 1rem;
  padding-top: 6rem;
`;

const Header2 = styled.h2`
  padding-bottom: 1rem;
  padding-top: 6rem;
`;

const Header3 = styled.h3`
  padding-bottom: 1rem;
  padding-top: 6rem;
`;

const Header4 = styled.h4`
  padding-bottom: 1rem;
  padding-top: 6rem;
`;

const Header5 = styled.h5`
  padding-bottom: 1rem;
  padding-top: 6rem;
`;

const components = [Header0, Header1, Header2, Header3, Header4, Header5];

const TableOfContentsHeader = ({ size = 4, name = "", children, ...rest }) => {
  const SpecificHeader = components[size];
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <>
      <a name={name} data-title={children} aria-hidden={true} />
      <SpecificHeader {...rest}>{children}</SpecificHeader>
    </>
  );
  /* eslint-enable jsx-a11y/anchor-has-content */
};

TableOfContentsHeader.propTypes = {
  size: PropTypes.number,
  name: PropTypes.number,
  children: PropTypes.any,
};

export default TableOfContentsHeader;
