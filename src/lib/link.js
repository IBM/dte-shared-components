import * as Yup from "yup";
import {
  Archive32,
  Blog32,
  Code32,
  DocumentView32,
  Link32,
  Portfolio32,
  PresentationFile32,
  Roadmap32,
  Run32,
  Screen32,
  Video32,
  VmdkDisk32,
} from "@carbon/icons-react";
import * as crud from "./crud";
import { find as getAllOptions, getOptionsByType } from "./option";

const NAME = "link";

const LIMIT = 250;

const DEFAULTS = {
  id: null,
  oid: null,
  collection: null,
  name: "",
  description: "",
  url: "",
  type: "link",
  duration: "",
  audience: [],
  visibility: ["IBMers"],
  weight: 0,
  status: "Enabled",
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    oid: Yup.string().nullable(),
    name: Yup.string().required().max(255),
    description: Yup.string().nullable(),
    url: Yup.string().required(),
    type: Yup.string().required(),
    duration: Yup.string().nullable(),
    audience: Yup.array().nullable(),
    visibility: Yup.array().nullable(),
    weight: Yup.number().nullable(),
    status: Yup.string().required(),
  });
  // return Yup.object().shape(SCHEMA);
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

// attach this to getters that pull from the db ...
export async function getOptions(type, opts) {
  if (!type) return [];
  const mapper = (o) => {
    return {
      value: o.abbreviation || o.name,
      text: o.name,
      labelText: o.name,
      helperText: o.description || "",
    };
  };
  try {
    switch (type.toString().toLowerCase()) {
      case "status":
      case "statuses":
        return await getOptionsByType("LinkStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "audience":
      case "audiences":
        return await getOptionsByType("Audience");
      case "type":
      case "types":
        return await getOptionsByType("LinkType", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "visibility":
        return await getOptionsByType("Visibility");
      case "all":
        var options = opts || (await getAllOptions());
        return {
          status: options
            .filter((o) => o.type === "LinkStatus" && o.status !== "Disabled")
            .map(mapper),
          audience: options
            .filter((o) => o.type === "Audience" && o.status !== "Disabled")
            .map(mapper),
          type: options.filter((o) => o.type === "LinkType" && o.status !== "Disabled").map(mapper),
          visibility: options
            .filter((o) => o.type === "Visibility" && o.status !== "Disabled")
            .map(mapper),
        };
      default:
        return [];
    }
  } catch (err) {
    return [];
  }
}

export function getIcon(type) {
  switch (type.toString().toLowerCase()) {
    case "document":
      return DocumentView32;
    case "collection":
      return Portfolio32;
    case "vm files":
      return VmdkDisk32;
    case "guided simulation":
      return Screen32;
    case "video":
      return Video32;
    case "hosted demo (Cloud Concierge)":
    case "hosted demo (other)":
    case "hosted demo":
      return Archive32;
    case "blog":
      return Blog32;
    case "presentation":
      return PresentationFile32;
    case "code":
      return Code32;
    case "demo":
      return Run32;
    case "workshop":
      return Roadmap32;
    default:
      return Link32;
  }
}

export function search(query = {}, opts = {}) {
  return crud.search(NAME, query, opts);
}

export function find(query) {
  return crud.find(NAME, query, { limit: LIMIT });
}

export function findByOid(oid = "") {
  return crud.find(NAME, `?where={"oid":"${oid}"}`, { limit: LIMIT });
}

export function findByCollection(collection = "") {
  return crud.find(NAME, `?where={"collection":"${collection}"}`, { limit: LIMIT });
}

export async function findOne(value) {
  let result;
  try {
    result = await crud.findOne(NAME, value);
    if (result) return result;
    result = await findByOid(value);
    if (result && result[0]) return result[0];
    return { error: "not found" };
  } catch (err) {
    return { error: err.message || err };
  }
}

export function describe(opts = {}) {
  return crud.describe(NAME, opts);
}

export function validate(payload, opts = {}) {
  return crud.validate(NAME, payload, opts);
}

export function audit(id, opts = {}) {
  return crud.audit(NAME, id, opts);
}

export function rate(payload, opts = {}) {
  return crud.rate(NAME, payload, opts);
}

export function rating(id, opts = {}) {
  return crud.rating(NAME, id, opts);
}

export function comment(payload, opts = {}) {
  return crud.comment(NAME, payload, opts);
}

export function destroyComment(payload, opts = {}) {
  return crud.destroyComment(NAME, payload, opts);
}

export function comments(id, opts = {}) {
  return crud.comments(NAME, id, opts);
}

export function create(payload, opts = {}) {
  return crud.create(NAME, payload, opts);
}

export function update(payload, opts = {}) {
  return crud.update(NAME, payload, opts);
}

export function createOrUpdate(payload, opts = {}) {
  return crud.createOrUpdate(NAME, payload, opts);
}

export function destroy(id, opts = {}) {
  return crud.destroy(NAME, id, opts);
}
