import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import styled from "styled-components";

import { Button } from "../Button/Button";
import {
  SkeletonText as CarbonSkeletonText,
  Tooltip,
} from "carbon-components-react";
import { Email20, LogoSlack20 } from "@carbon/icons-react";

import { Mailto } from "../Mailto/Mailto";

const intersperse = (arr, sep = ", ") => {
  if (arr.length === 0) return [];
  return arr.slice(1).reduce(
    function (xs, x) {
      return xs.concat([sep, x]);
    },
    [arr[0]]
  );
};

const Styled = styled.span`
  & .bx--tooltip__label {
    font-size: 0.875rem;
  }
`;

const SkeletonText = styled(CarbonSkeletonText)`
  display: inline-block;
  margin-bottom: 0;
`;

const TooltipBody = styled.div`
  position: relative;
  & h4 {
    margin-right: 5rem;
  }
  & p {
    margin-right: 5rem;
  }
  & img {
    width: 4rem;
    max-height: 4rem;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const TooltipFooter = styled.div`
  margin-top: 1.5rem;
  & .bx--btn {
    padding-right: 3rem;
  }
`;

const TooltipUser = ({ data, children, key, ...rest }) => {
  return (
    <Styled key={`${key}-wrapper`}>
      <Tooltip
        key={`${key}-tooltip`}
        showIcon={false}
        direction="bottom"
        triggerText={
          <a href="#" onClick={() => {}}>
            {children}
          </a>
        }
      >
        <TooltipBody>
          <img
            src={`https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/${data.preferredIdentity}`}
            alt="user profile"
          />
          <h4>{data.nameFull || data.nameDisplay}</h4>
          {data.role && <p>{data.role}</p>}
        </TooltipBody>
        <TooltipFooter className="bx--tooltip__footer">
          {data.preferredIdentity && (
            <Mailto key={key} email={data.preferredIdentity} {...rest}>
              <Button kind="primary" size="small" renderIcon={Email20}>
                Email
              </Button>
            </Mailto>
          )}
          {data.preferredSlackId && (
            <a
              target="_blank"
              href={`https://ibm-dte.slack.com/team/${data.preferredSlackId}`}
              rel="noreferrer"
            >
              <Button kind="secondary" size="small" renderIcon={LogoSlack20}>
                Slack
              </Button>
            </a>
          )}
        </TooltipFooter>
      </Tooltip>
    </Styled>
  );
};

const EmailList = ({
  delimiter,
  list,
  unique,
  obfuscate,
  format,
  isEmail,
  ...rest
}) => {
  if (!list || isEmpty(list)) return null;
  if (typeof list === "string") {
    if (list.includes(delimiter.trim())) {
      list = list
        .split(delimiter.trim())
        .map((o) => o.trim())
        .filter((o) => o && o !== "");
    } else list = [list];
  }
  let emails = unique ? Array.from(new Set([...list])) : [...list];
  if (!emails || emails.length === 0) return null;
  if (format === "markdown")
    return emails.map((e) => `- ${e.name || e}`).join("\n");
  else if (format === "text")
    return emails.map((e) => `${e.name || e}`).join(delimiter);
  else if (format === "short") {
    return intersperse(
      emails.map((e, i) => {
        if (!isEmail((e && e.email) || e)) return (e && e.name) || e;
        return (
          <Mailto
            key={`email-${i}`}
            email={(e && e.name) || e}
            obfuscate={obfuscate}
            {...rest}
          >
            {(e && e.name) || e}
          </Mailto>
        );
      }),
      delimiter
    );
  }
  return (
    <ul>
      {emails.map((e, i) => {
        return (
          <li key={`email-${i}`}>
            <Mailto email={(e && e.name) || e} obfuscate={obfuscate} {...rest}>
              {(e && e.name) || e}
            </Mailto>
          </li>
        );
      })}
    </ul>
  );
};

EmailList.defaultProps = {
  list: [],
  unique: true,
  obfuscate: true,
  format: "list", // list, short, markdown, text
  delimiter: ", ",
};

TooltipUser.propTypes = {
  data: PropTypes.any,
  children: PropTypes.any,
  key: PropTypes.string,
};

EmailList.propTypes = {
  delimiter: PropTypes.string,
  list: PropTypes.any,
  unique: PropTypes.bool,
  obfuscate: PropTypes.bool,
  format: PropTypes.string,
};

export default EmailList;
