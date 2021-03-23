import React from "react";
import Link from "next/link";
import { Tooltip } from "../../index";

import { isEmpty } from "../../methods";

const CalendarAgenda = ({ event: { description, url } = {}, title }) => {
  let message = title;
  if (!isEmpty(description))
    message = <Tooltip tooltipText={description}>{title}</Tooltip>;
  if (url) return <Link href={url}>{message}</Link>;
  return message;
};

export default CalendarAgenda;
