import pako from "pako";
const TurndownService = require("turndown").default;
import fetch from "isomorphic-unfetch";
const moment = require("moment");
const removeMarkdown = require("remove-markdown");
const { kebabCase, omit, isEqual: _isEqual } = require("lodash");

import { Remarkable } from "remarkable";
import * as Yup from "yup";

//import slogans from "data/slogans.json";
import navigation from "data/navigation.json";
import { parse as json2csvParser } from "json2csv";

const DATEFORMATS = [
  moment.ISO_8601,
  "YYYY-MM-DDTHH:mm:ss.SSSZ",
  "MM/DD/YYYY hh:mm A Z",
  "MM/DD/YYYY hh:mm:ss A Z",
  "YYYY-MM-DD HH:mm:ss",
];

const slogans = [
  "You Asked.  We Delivered.",
  "You want more.  We got it.",
  "Rebuilt better, faster, stronger...",
  "Welcome to the future...",
  "Sometimes the sequel is better...",
  "Seeing more is believing more...",
  "Content for you ... by you",
  "Like you remember only better...",
  "Community driven and tech seller focused.",
  "Content by the people, for the people.",
];

const querystring = (params = {}, options = {}) => {
  if (typeof params !== "object") return;
  const { exclude = [], compress = false } = options;
  const keys = Object.keys(omit(params, exclude));
  const encodeAndCompress = (param) => {
    const json = JSON.stringify(param);
    return compress
      ? encodeURIComponent(pako.deflate(json, { to: "string" }))
      : encodeURIComponent(json);
  };
  return keys
    .map((k) => encodeURIComponent(k) + "=" + encodeAndCompress(params[k]))
    .join("&");
};

const language = () => {
  return (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage
  );
};

const isMongoObjectId = (id) => id && id.match(/^[0-9a-fA-F]{24}$/);

const mongoObjectId = function () {
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

const uuid = () => Math.random().toString(36).substr(2, 9);
const uniqueId = (x = 4, j = "-") =>
  [...Array(x).keys()].map(() => uuid()).join(j);

const createMarkup = (html = "") => {
  return {
    __html: html,
  };
};

const isExternalUrl = (url) => {
  if (!url || url === "") return false;
  let pattern = /^((http|https|ftp):\/\/)/;
  url = url.toString();
  return pattern.test(url) ? true : false;
};

const normalizeUrl = (url) => {
  let pattern = /^((http|https|ftp):\/\/)/;
  if (url && url !== "") {
    url = url.toString();
    if (!pattern.test(url) && !url.startsWith("/")) url = "http://" + url;
  }
  return url;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const reorderWithWeight = (list, startIndex, endIndex) => {
  let sorted = reorder(list, startIndex, endIndex);
  for (let i = 0, l = sorted.length || 0; i < l; i++) {
    try {
      sorted[i].weight = i;
    } catch (err) {
      // do nothing
    }
  }
  return sorted;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
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

const getListStyle = (isDraggingOver) => {
  let style = {
    overflow: "hidden",
    background: isDraggingOver ? "#e7e7e7" : "none",
  };
  if (isDraggingOver) style.paddingBottom = "5rem";
  return style;
};

const withNamespace = (namespace, field, index) => {
  if (namespace) {
    if (index !== null && index !== undefined)
      return `${namespace}[${index}].${field}`;
    else return `${namespace}.${field}`;
  } else {
    return `${field}`;
  }
};

const valueWithNamespace = (values, namespace, field, index) => {
  if (!values || !namespace || !field) return null;
  if (
    !values[namespace] ||
    !values[namespace][index] ||
    !values[namespace][index][field]
  )
    return null;
  return values[namespace][index][field];
};

const setValueWithNamespace = (values, namespace, field, index, value) => {
  if (!values || !namespace || !field) return;
  if (
    !values[namespace] ||
    !values[namespace][index] ||
    !values[namespace][index][field]
  )
    return;
  values[namespace][index][field] = value;
  return value;
};

const invalidTextWithNamespace = (errors, namespace, field, index) => {
  if (!errors || !namespace || !field) return false;
  if (index === null || index === undefined) return false;
  if (!errors[namespace] || !errors[namespace][index]) return false;
  return errors[namespace][index][field];
};

const invalidWithNamespace = (errors, touched, namespace, field, index) => {
  if (!errors || !touched || !namespace || !field) return false;
  if (!touched[namespace] || !errors[namespace]) return false;
  if (!touched[namespace][index] || !errors[namespace][index]) return false;
  return Boolean(
    touched[namespace][index][field] && errors[namespace][index][field]
  );
};

const safeSearchName = (text = "") =>
  encodeURIComponent(text || "")
    .toString()
    .trim()
    .replace(/%20/g, "+");

const safeIdName = (text = "") =>
  kebabCase(
    text
      .toString()
      .replace(/[^a-zA-Z0-9-_]/g, " ")
      .replace(/\s\s+/g, " ")
  );

const slugify = (text = "") =>
  kebabCase(
    text
      .toString()
      .replace(/[*+~.()'"!:@]/g, " ")
      .replace(/\s\s+/g, " ")
  );

const baseUrl = (path) => {
  const { origin } = window.location;
  return `${origin}${path}`;
};

const toBoolean = (value) => {
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

const isEqual = (v1, v2) => {
  return _isEqual(v1, v2);
  // if ((!v1 && v2 ) || (v1 && !v2)) return false;
  // return JSON.stringify(v1) === JSON.stringify(v2) ? true : false;
};

const isEmpty = (value) => {
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

const isEmail = (data) => {
  const regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
  return data && regex.test(data) ? true : false;
};

const isEmailList = (data, delim = ",") => {
  if (!data) return false;
  if (Array.isArray(data))
    return data
      .map((o) => o.toString().trim().toLowerCase())
      .some((o) => isEmail(o));
  else {
    const parts = data.toString().split(delim);
    if (!parts || parts.length === 0) return false;
    const list = parts.map((o) => o.toString().trim().toLowerCase());
    return list.some((o) => isEmail(o));
  }
};

const isDate = (value) => {
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return value && regex.test(value) ? true : false;
};

const isHex = (h) => {
  try {
    return /^#[0-9A-F]{6}$/i.test(h);
  } catch (err) {
    return false;
  }
};

const isNullOrFalse = (value) => {
  return value === null || value === undefined || value === false
    ? true
    : false;
};

const isNullOrZero = (value) => {
  return value === null || value === undefined || value == 0 ? true : false;
};

const isTime = (value) => {
  const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
  return value && regex.test(value) ? true : false;
};

const isDateTime = (value) => {
  if (moment.isMoment(value)) return true;
  return moment(value, DATEFORMATS, true).isValid();
};

const parseDate = (value) => {
  if (moment.isMoment(value)) return value;
  return moment(value, DATEFORMATS);
};

const formatDate = (value, format = "LLL") => {
  if (!value) return;
  if (moment.isMoment(value)) return value.format(format);
  return moment(value, DATEFORMATS).format(format);
};

const isAfterDate = (v1, v2 = moment()) => {
  return !isBeforeDate(v1, v2);
};

const isBeforeDate = (v1, v2 = moment()) => {
  if (!isDateTime(v1) || !isDateTime(v2)) return false;
  let d1 = parseDate(v1),
    d2 = parseDate(v2);
  return d1 <= d2;
};

const isEqualDate = (v1, v2 = moment()) => {
  if (!isDateTime(v1) || !isDateTime(v2)) return false;
  let d1 = parseDate(v1),
    d2 = parseDate(v2);
  return d1 === d2;
};

const isBetweenDate = (v1, v2, v3 = moment()) => {
  if (!isDateTime(v1) || !isDateTime(v2) || !isDateTime(v3)) return false;
  let d1 = parseDate(v1),
    d2 = parseDate(v2),
    d3 = parseDate(v3);
  return d1 <= d3 && d3 <= d2;
};

const startOf = (v, t = "day") => {
  return moment(v).startOf(t);
};

const endOf = (v, t = "day") => {
  return moment(v).endOf(t);
};

const roundDateMinutesTo = (date = new Date(), round = 30) => {
  const d = moment(date);
  const r = round - (d.minute() % round);
  return moment(date).add(r, "minutes");
};

const maxDateFromMin = (min = new Date(), max = 4, unit = "hours") => {
  return moment(min).add(max, unit).toDate();
};

const toUTC = (date = new Date()) => {
  return moment.utc(date).toDate();
};

const toLocaleDateString = (date = new Date(), format = "ll") => {
  return moment(date).format(format);
};

const isInt = (value) => {
  if (value === null || value === undefined || value === "") return false;
  return /^-?[0-9]+$/.test(value);
};

const isNumber = (value) => {
  return value % 1 === 0 ? true : false;
};

const isUrl = (value) => {
  const pattern = new RegExp(
    "^(ftps?|https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(value);
  // const regex = /^((ftp|http|http)s?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  // return value && regex.test(value) ? true : false;
};

const clone = (obj = {}) => {
  let result = {};
  try {
    result = JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.log("clone error", err.message || err);
  }
  return result;
};

const isValidOpportunity = async (value) => {
  try {
    return await fetch(`/api/opportunity/${value}`)
      .then((res) => res.json())
      .then((json) => {
        return json && json.isValid === true ? true : false;
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log("validateOpportunity error", error.message || error);
    throw error;
  }
};

const isOpportunityPattern = (value) => {
  const salesConnect = /^\w{2}-\w{6}$/;
  const bpsalesConnect = /^BP1-\w{2}-\w{7}$/;
  const gaia = /^(\w{15,18})$/;
  return value &&
    (salesConnect.test(value) || bpsalesConnect.test(value) || gaia.test(value))
    ? true
    : false;
};

const asyncSome = async (arr, predicate) => {
  for (let a of arr) {
    if (await predicate(a)) return true;
  }
  return false;
};

const asyncEvery = async (arr, predicate) => {
  for (let a of arr) {
    if (!(await predicate(a))) return false;
  }
  return true;
};

const isOpportunity = async (value, every = false) => {
  const validate = async (v) => {
    return (await isValidOpportunity(v)) || isOpportunityPattern(v);
  };
  try {
    if (!value || isEmpty(value)) return false;
    else if (value && Array.isArray(value))
      return every
        ? await asyncEvery(value, async (v) => validate(v))
        : await asyncSome(value, async (v) => validate(v));
    else return value && (await validate(value));
  } catch (err) {
    console.log("isOpportunity", err.message || err);
    return false;
  }
};

const objectToString = (value, joiner = ",") => {
  try {
    if (!value) return null;
    let type = typeof value;
    if (type === "string") return value;
    else if (Array.isArray(value)) return value.join(joiner);
    else return JSON.stringify(value, null, 2);
  } catch (err) {
    return null;
  }
};

const stringToObject = (value, joiner = ",", clean = true) => {
  try {
    // if (!value) return {};
    let type = typeof value;
    if (type === "object") return value;
    else if (value.includes("[") && value.includes("]"))
      return JSON.parse(value);
    else if (value.includes("{") && value.includes("}"))
      return JSON.parse(value);
    else {
      if (clean) value = stripNewlines(value, joiner) || "";
      return value
        .split(joiner)
        .map((v) => v.trim())
        .filter((v) => !isEmpty(v));
    }
  } catch (err) {
    return {};
  }
};

const stripMarkdown = (value, opts = {}) => {
  return removeMarkdown(value, opts);
};

const stripNewlines = (value, subs = "") => {
  if (!value) return;
  let result;
  try {
    result = value.toString().replace(/(\r\n|\r|\n)/g, subs);
  } catch (err) {
    // do nothing
  }
  return result;
};

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const tidy = (obj) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] && typeof obj[k] === "object" && tidy(obj[k])) ||
      (obj[k] === undefined && delete obj[k])
  );
  return obj;
};

const modelToDefaults = (model, ignore = ["id", "createdAt", "updatedAt"]) => {
  if (!model) return {};
  return Object.keys(omit(model, ignore))
    .map((k) => {
      if (model[k].collection) return { [k]: [] };
      if (!model[k].type) return { [k]: null };
      if (model[k].defaultsTo) return { [k]: model[k].defaultsTo };
      if (model[k].type === "json") return { [k]: [] };
      if (model[k].type === "string") return { [k]: "" };
      return { [k]: null };
    })
    .reduce((o, v) => ({ ...o, ...v }), {});
};

const modelToSchema = (model, ignore = ["createdAt", "updatedAt"]) => {
  if (!model) return {};
  let schema = Object.keys(omit(model, ignore))
    .map((k) => {
      let y;
      if (k === "id") {
        y =
          model[k].type === "number"
            ? Yup.number().nullable()
            : Yup.string().nullable();
      } else if (model[k].type === "string") {
        y = Yup.string();
        if (model[k].required) y.required("Required");
        if (model[k].allowNull) y.nullable();
        if (model[k].maxLength) y.max(model[k].maxLength, "Too long");
        if (model[k].minLength) y.min(model[k].minLength, "Too short");
        if (model[k].isEmail) y.email("Invalid email");
        if (model[k].isURL) y.url("Invalid url");
        if (model[k].regex) y.matches(model[k].regex, "Does not match pattern");
      } else if (model[k].type === "number") {
        y = Yup.number();
        if (model[k].required) y.required("Required");
        if (model[k].allowNull) y.nullable();
        if (model[k].max) y.max(model[k].max, "Too many");
        if (model[k].min) y.min(model[k].min, "Not enough");
        if (model[k].isInteger) y.integer("Not an integer");
      } else if (model[k].type === "boolean") {
        y = Yup.boolean().nullable();
      } else if (model[k].type === "json") {
        y = Yup.object().nullable();
      } else if (model[k].collection) {
        y = Yup.array().nullable();
      }
      return { [k]: y };
    })
    .reduce((o, v) => ({ ...o, ...v }), {});
  // console.log("modelToSchema", model, ignore, Object.keys(schema));
  return schema;
};

const scrollTo = (ref, offset = 0) => {
  if (!ref) return;
  if (typeof ref === "string") {
    let element = document && document.getElementById(ref);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  } else if (ref.current) {
    window.scrollTo({
      top: ((ref && ref.current && ref.current.offsetTop) || 0) + offset,
      behavior: "smooth",
    });
  } else if (window) {
    window.scrollTo({
      top: offset || 0,
      behavior: "smooth",
    });
  }
};

const scrollTop = (offset = 0) => {
  if (window)
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
};

const slogan = () => {
  return slogans[Math.round(Math.random() * 1000) % slogans.length];
};

const pageTitle = () => {
  return navigation["logo"]["label"] || "IBM  **DTE 2.0**";
};

const json2csv = (data, opts = {}) => {
  try {
    return json2csvParser(data, opts);
  } catch (err) {
    console.log("error while parsing json into csv", err);
  }
};

const markdownToHtml = (
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

const htmlToMarkdown = (value, opts = {}) => {
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

const copyToClipboard = (v, el) => {
  try {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(v);
    } else if (window && window.clipboardData) {
      window.clipboardData.setData("text", v);
    } else if (el && document) {
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

const remToPixels = (v, defaultsTo = 16) => {
  let result,
    fontSize = defaultsTo;
  if (!v || v === 0) return 0;
  try {
    fontSize =
      (document &&
        document.documentElement &&
        getComputedStyle(document.documentElement).fontSize) ||
      defaultsTo;
    result = v * parseFloat(fontSize);
  } catch (err) {
    // console.log("remToPixels error", err.message || err);
    result = v * defaultsTo;
  }
  return result;
};

module.exports = {
  baseUrl,
  capitalizeFirstLetter,
  copyToClipboard,
  clone,
  createMarkup,
  endOf,
  formatDate,
  getItemStyle,
  getListStyle,
  htmlToMarkdown,
  invalidTextWithNamespace,
  invalidWithNamespace,
  isAfterDate,
  isBeforeDate,
  isBetweenDate,
  isDate,
  isDateTime,
  isEqual,
  isEmpty,
  isEmail,
  isEmailList,
  isEqualDate,
  isExternalUrl,
  isHex,
  isInt,
  isMongoObjectId,
  isNumber,
  isNullOrFalse,
  isNullOrZero,
  isOpportunity,
  isOpportunityPattern,
  isValidOpportunity,
  isUrl,
  isTime,
  language,
  markdownToHtml,
  maxDateFromMin,
  modelToDefaults,
  modelToSchema,
  mongoObjectId,
  move,
  normalizeUrl,
  objectToString,
  pageTitle,
  parseDate,
  querystring,
  remToPixels,
  reorder,
  reorderWithWeight,
  roundDateMinutesTo,
  safeIdName,
  safeSearchName,
  scrollTo,
  scrollTop,
  slogan,
  slugify,
  startOf,
  stringToObject,
  stripMarkdown,
  stripNewlines,
  tidy,
  toBoolean,
  toLocaleDateString,
  toUTC,
  uuid,
  uniqueId,
  valueWithNamespace,
  setValueWithNamespace,
  withNamespace,
  json2csv,
};
