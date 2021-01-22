import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import styled from "styled-components";

import { Grid, Row, Column } from "carbon-components-react";

import { Markdown } from "components";

const Styled = styled.span`
  & .leadspace {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: 150px;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.45)
      ),
      url("//dte2.s3.us-east.cloud-object-storage.appdomain.cloud/data04.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    padding-left: 3rem;
    padding-bottom: 2rem;
    margin-top: 2rem;
    & .title {
      padding: 3rem 2rem 1rem 0;
      font-size: 3rem;
    }
    & .description {
      padding: 0 2rem 1rem 0;
      font-size: 1.5rem;
      line-height: 1.75rem;
    }
    & .subtitle:empty,
    & .description:empty {
      display: none;
    }
    & .bx--breadcrumb {
      padding-top: 2em;
    }
    & .bx--breadcrumb-item::after {
      color: #fff;
    }
    & .bx--breadcrumb-item {
      a {
        color: #fff !important;
      }
    }
    & .breadcrumbs + .title {
      padding-top: 1rem;
    }
    & .buttons {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding-top: 2rem;
      .overflow-button {
        text-align: center;
        height: 3rem;
        background: #fff;
      }
    }
    & a {
      text-decoration: none;
      color: #fff;
    }
    & a:hover {
      text-decoration: underline;
    }
    & .bx--label.label {
      display: block;
      color: #fff;
      .bx--tooltip__label {
        color: #fff;
        svg {
          fill: #fff;
        }
      }
    }
    & .bx--modal a {
      color: #161616;
    }
  }
`;

import { isHex } from "../../lib/utils";

const Leadspace = ({
  actions,
  background,
  breadcrumbs,
  buttons,
  title,
  subtitle,
  description,
  markdown,
  children,
  ...rest
}) => {
  let style;
  if (background && background !== "") {
    style = isHex(background)
      ? {
          backgroundColor: `${background}`,
          backgroundImage: "none",
        }
      : {
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        };
  }
  if ((actions && !isEmpty(actions)) || (buttons && !isEmpty(buttons))) {
    return (
      <Styled>
        <Grid {...rest} style={style}>
          <Row condensed>
            <Column lg={10} md={8} sm={4}>
              {breadcrumbs}
              <h1 className="title">{title}</h1>
              {description ? (
                <div className="description">
                  {markdown ? <Markdown source={description} /> : description}
                </div>
              ) : null}
              {children}
            </Column>
            <Column lg={6} md={8} sm={4} className="buttons">
              {buttons}
            </Column>
          </Row>
        </Grid>
      </Styled>
    );
  }
  return (
    <Styled>
      <div {...rest} style={style}>
        {breadcrumbs}
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
        <p className="description">{description}</p>
        {children}
      </div>
    </Styled>
  );
};

Leadspace.defaultProps = {
  title: "",
  description: "",
  className: "leadspace",
  actions: null,
  buttons: null,
  breadcrumbs: null,
  markdown: false,
  favorite: false,
  fullWidth: true,
  help: false,
  problem: false,
  sales: false,
  data: {},
};

Leadspace.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  actions: PropTypes.any,
  background: PropTypes.string,
  buttons: PropTypes.any,
  breadcrumbs: PropTypes.any,
  markdown: PropTypes.bool,
  favorite: PropTypes.bool,
  fullWidth: PropTypes.bool,
  help: PropTypes.bool,
  problem: PropTypes.bool,
  sales: PropTypes.bool,
  data: PropTypes.any,
};

export default Leadspace;
