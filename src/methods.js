import { Remarkable } from "remarkable";

const moment = require("moment");
const TurndownService = require("turndown").default;

const DATEFORMATS = [
  moment.ISO_8601,
  "YYYY-MM-DDTHH:mm:ss.SSSZ",
  "MM/DD/YYYY hh:mm A Z",
  "MM/DD/YYYY hh:mm:ss A Z",
  "YYYY-MM-DD HH:mm:ss",
];

export const ciEquals = (a, b, sensitivity = "base") => {
  return typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, undefined, { sensitivity: sensitivity }) === 0
    : a === b;
};

export const copyToClipboard = (v, el) => {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(v);
    } else if (typeof window !== "undefined" && window.clipboardData) {
      window.clipboardData.setData("text", v);
    } else if (el && typeof document !== "undefined") {
      el.focus();
      el.select();
      document.execCommand("copy");
    } else {
      alert(`Unable to copy: ${v}`);
    }
  } catch (err) {
    console.log("copyToClipboard error", err.message || err);
  }
};

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

export const getItemStyle = (isDragging, draggableStyle) => {
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

export const safeIdName = (text = "") =>
  kebabCase(
    text
      .toString()
      .replace(/[^a-zA-Z0-9-_]/g, " ")
      .replace(/\s\s+/g, " ")
  );

export const getListStyle = (isDraggingOver) => {
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

export const isDate = (value) => {
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return value && regex.test(value) ? true : false;
};

export const isHex = (h) => {
  try {
    return /^#[0-9A-F]{6}$/i.test(h);
  } catch (err) {
    return false;
  }
};

export const isEmail = (data) => {
  const regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
  return data && regex.test(data) ? true : false;
};

export const isExternalUrl = (url) => {
  if (!url || url === "") return false;
  let pattern = /^((http|https|ftp):\/\/)/;
  url = url.toString();
  return pattern.test(url) ? true : false;
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
          //  let entries = Object.entries(value);
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

export const isFunction = (o) => {
  return o && typeof o === "function" ? true : false;
};

export const isTime = (value) => {
  const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
  return value && regex.test(value) ? true : false;
};

export const isString = (o) => {
  return o && typeof o === "string" ? true : false;
};

export const parseDate = (value) => {
  if (moment.isMoment(value)) return value;
  return moment(value, DATEFORMATS);
};

export const json2csv = (data, opts = {}) => {
  try {
    return json2csvParser(data, opts);
  } catch (err) {
    console.log("error while parsing json into csv", err);
  }
};

export const mongoObjectId = function () {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};
