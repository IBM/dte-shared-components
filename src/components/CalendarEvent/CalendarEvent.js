import React, { useState } from "react";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";

import { isEmpty } from "../lib/utils";

const CalendarEvent = ({
  className,
  event: { description, url, title, ...rest },
}) => {
  let timeout = null;
  const [tooltip, setTooltip] = useState(false);

  const _onMouseOver = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setTooltip(true);
    }, 150);
  };

  const _onMouseOut = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setTooltip(false);
    }, 750);
  };

  let message = title;

  if (!isEmpty(description))
    message = (
      <React.Fragment>
        {message}
        <p className={tooltip ? "on" : ""}>{description}</p>
      </React.Fragment>
    );
  if (url) message = <Link href={url}>{message}</Link>;

  return (
    <div
      className={className}
      onMouseOver={_onMouseOver}
      onMouseOut={_onMouseOut}
    >
      {message}
    </div>
  );
};

CalendarEvent.defaultProps = {
  className: "calendar-event",
};

export default CalendarEvent;
