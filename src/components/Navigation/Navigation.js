import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { Markdown } from "components";

import config from "data/navigation.json";

const Styled = styled.span`
  & .navigation {
    width: 100%;
    background: #000;
    position: -webkit-sticky;
    position: sticky;
    top: 48px;
    z-index: 3000;

    & ul {
      list-style: none;
      display: flex;
      flex-direction: row;
    }

    & li {
      display: flex;
      list-style: none;
      color: #fff;
      & a {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.375rem;
        letter-spacing: 0;
        padding: 13px 1rem 0;
        padding-right: 1rem;
        text-decoration: none;
        line-height: 1;
        color: #c6c6c6;
        white-space: nowrap;
        border-top: 3px solid transparent;
        height: 3rem;
        transition: all 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
      }
      & a:hover {
        background: #353535;
      }
      & a:hover,
      a:active {
        color: #fff;
      }
      & a.selected {
        border-top: 3px solid #0f62fe;
        background: #393939;
        color: #fff;
      }
    }

    @media all and (max-width: 800px) {
      & ul {
        overflow-x: auto;
      }
    }
  }
`;

const Navigation = ({ namespace, ...rest }) => {
  const router = useRouter();

  const navigation = config.links.map((n, i) => {
    return (
      <li key={`${namespace}--menu-${i}`} tabIndex={i + 2}>
        <Link href={n.href}>
          <a className={!n.nomatch && router.pathname === n.href ? "selected" : ""}>
            <Markdown source={n.label} disallowedTypes={["paragraph"]} />
          </a>
        </Link>
      </li>
    );
  });

  return (
    <Styled>
      <header className={`${namespace}`} {...rest}>
        <ul className={`${namespace}--menu`} id={namespace}>
          <li key={`${namespace}--menu-logo`}>
            <Link href={config.logo.href}>
              <a className={`${namespace}--logo`}>
                <Markdown source={config.logo.label} disallowedTypes={["paragraph"]} />
              </a>
            </Link>
          </li>
          {navigation}
        </ul>
      </header>
    </Styled>
  );
};

Navigation.defaultProps = {
  namespace: "navigation",
};

Navigation.propTypes = {
  namespace: PropTypes.string,
};

export default Navigation;
