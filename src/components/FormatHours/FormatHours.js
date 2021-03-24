import PropTypes from "prop-types";

const DAY = 24;
const WEEK = 7;
const MONTH = 30;

const pluralize = (count, noun, suffix = "s") => `${count} ${noun}${count !== 1 ? suffix : ""}`;

const FormatHours = ({ append = "", prepend = "", value, verbose = true }) => {
  if (!value || value === "") return null;
  let result = "";
  if (value < DAY) result = pluralize(value, "hour");
  else {
    const days = Math.round(value / DAY);
    if (days > MONTH) result = pluralize(Math.ceil(days / MONTH), "month");
    else if (days > WEEK) result = pluralize(Math.ceil(days / WEEK), "week");
    else result = pluralize(Math.ceil(days), "day");
    if (verbose) result += `  (${pluralize(value, "hour")})`;
  }
  return `${prepend}${result}${append}`;
};

FormatHours.defaultProps = {
  append: "",
  prepend: "",
  value: null,
  verbose: true,
};

FormatHours.propTypes = {
  append: PropTypes.string,
  prepend: PropTypes.string,
  value: PropTypes.any,
  verbose: PropTypes.bool,
};

export default FormatHours;
