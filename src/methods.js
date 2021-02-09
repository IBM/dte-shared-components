//Methods that can't be imported as a prop and don't have any sensitive information
import { Remarkable } from "remarkable";
const moment = require("moment");
const TurndownService = require("turndown").default;

export const toBoolean = (value) => {
  switch (value) {
    case true:
    case "true":
    case "True":
    case "TRUE":
    case 1:
    case "1":
    case "on":
    case "On":
    case "ON":
    case "yes":
    case "Yes":
    case "YES":
      return true;
    default:
      return false;
  }
};

export const htmlToMarkdown = (value, opts = {}) => {
  const turndownService = new TurndownService(opts);
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => "~~" + content + "~~",
  });
  turndownService.addRule("underline", {
    filter: ["u", "ins"],
    replacement: (content) => "++" + content + "++",
  });
  turndownService.addRule("code", {
    filter: (node) => node && node.className === "ql-syntax",
    replacement: (content) => "```\n" + content + "```",
  });
  turndownService.addRule("sup", {
    filter: ["sup"],
    replacement: (content) => "^" + content + "^",
  });
  turndownService.addRule("sub", {
    filter: ["sub"],
    replacement: (content) => "~" + content + "~",
  });
  turndownService.addRule("paragraph", {
    filter: ["p"],
    replacement: (content) => "\n\n" + content + "\n\n",
  });
  const result = turndownService.turndown(value);
  // console.log("htmlToMarkdown", value, result);
  return result;
};

export const markdownToHtml = (
  value,
  opts = {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    linkTarget: "_blank",
    typographer: true,
  }
) => {
  const md = new Remarkable("full", opts);
  md.core.ruler.enable(["abbr"]);
  md.block.ruler.enable(["footnote", "deflist"]);
  md.inline.ruler.enable([
    "footnote_inline",
    "ins",
    "del",
    "mark",
    "sub",
    "sup",
  ]);
  let result = md.render(value);
  if (result)
    result = result
      .replace(/<ins>/gi, "<u>")
      .replace(/<\/ins>/gi, "</u>")
      .replace(/<del>/gi, "<s>")
      .replace(/<\/del>/gi, "</s>");
  // console.log("markdownToHtml", value, result);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => {
  let style = {
    userSelect: "none",
    ...draggableStyle,
  };
  // if (isDragging) {
  //   style.margin = "0";
  //   style.border = "0";
  // }
  return style;
};

const safeIdName = (text = "") =>
  kebabCase(
    text
      .toString()
      .replace(/[^a-zA-Z0-9-_]/g, " ")
      .replace(/\s\s+/g, " ")
  );

const getListStyle = (isDraggingOver) => {
  let style = {
    overflow: "hidden",
    background: isDraggingOver ? "#e7e7e7" : "none",
  };
  if (isDraggingOver) style.paddingBottom = "5rem";
  return style;
};

export const isBasic = (values = {}, defaultValue = true) => {
  if (!values) return defaultValue;
  if (values && values.simple !== null) return values.simple;
  return values &&
    ((values.links && values.links.length > 0) ||
      (values.platform && values.platform.length > 0)) &&
    !values.url
    ? false
    : defaultValue;
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getWindow = () => {
  return typeof window !== "undefined" ? window : {};
};

export const toLocaleDateString = (date = new Date(), format = "ll") => {
  return moment(date).format(format);
};

const isDate = (value) => {
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return value && regex.test(value) ? true : false;
};

const parseDate = (value) => {
  if (moment.isMoment(value)) return value;
  return moment(value, DATEFORMATS);
};

const isTime = (value) => {
  const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
  return value && regex.test(value) ? true : false;
};

export const isEmpty = (value) => {
  let result,
    type = typeof value;
  switch (type.toLowerCase()) {
    case "null":
    case "undefined":
      result = true;
      break;
    case "boolean":
    case "number":
    case "bigint":
      result = value === undefined || value === null ? true : false;
      break;
    case "symbol":
    case "object":
      try {
        if (Array.isArray(value)) {
          result = !value || value.length === 0 ? true : false;
        } else if (value) {
          let entries = Object.entries(value);
          result = !entries || entries.length === 0 ? true : false;
        } else {
          result = true;
        }
      } catch (err) {
        console.log("isEmpty", type, err.message || err);
        result = true;
      }
      break;
    case "string":
    default:
      result =
        !value || value.trim() === "" || value === undefined || value === null
          ? true
          : false;
      break;
  }
  return result;
};
export const json2csv = (data, opts = {}) => {
  try {
    return json2csvParser(data, opts);
  } catch (err) {
    console.log("error while parsing json into csv", err);
  }
};
