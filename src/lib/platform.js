import * as Yup from "yup";
import { Link32, Screen32, VmdkDisk32 } from "@carbon/icons-react";
import * as crud from "./crud";
import { isNullOrZero } from "./utils";
import { find as getAllOptions, getOptionsByType } from "./option";
import moment from "moment";

const NAME = "platform";

const LIMIT = 250;

const DEFAULTS = {
  id: null,
  oid: null,
  collection: null,
  name: "",
  description: "",
  infrastructure: "skytap",
  idleRuntimeLimit: 300,
  totalRuntimeLimit: 0,
  timeoutAction: "shutdown",
  autoStart: true,
  smartrdp: true,
  linkPatterns: [],
  links: [],
  regions: [],
  audience: [],
  visibility: ["IBMers"],
  weight: 0,
  status: "Enabled",
};

const EMPTY_COLUMN_VALUE = "";
const DATE_FORMAT = "LLL";

const CSV_EXPORT_OPTIONS = {
  fields: [
    "id",
    "oid",
    "collection",
    "name",
    "description",
    "infrastructure",
    "idleRuntimeLimit",
    "totalRuntimeLimit",
    "timeoutAction",
    "autoStart",
    "smartrdp",
    "linkPatterns",
    "links",
    "regions",
    { label: "visibility", value: (row, field) => row[field.label].join(",") },
    { label: "audience", value: (row, field) => row[field.label].join(",") },
    {
      label: "createdAt",
      value: (row, field) =>
        isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT),
    },
    {
      label: "updatedAt",
      value: (row, field) =>
        isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT),
    },
    "weight",
    "status",
  ],
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    oid: Yup.string().nullable(),
    name: Yup.string().required().max(250),
    description: Yup.string().nullable(),
    infrastructure: Yup.string().required(),
    requestMethod: Yup.string().nullable(),
    cloudTarget: Yup.string().nullable(),
    cloudAccount: Yup.string().nullable(),
    idleRuntimeLimit: Yup.number().nullable(),
    totalRuntimeLimit: Yup.number().nullable(),
    timeoutAction: Yup.string().required(),
    autoStart: Yup.boolean().nullable(),
    smartrdp: Yup.boolean().nullable(),
    linkPatterns: Yup.array().nullable(),
    links: Yup.array().nullable(),
    regions: Yup.array().nullable(),
    audience: Yup.array().nullable(),
    visibility: Yup.array().nullable(),
    duration: Yup.string().nullable(),
    weight: Yup.number().nullable(),
    status: Yup.string().max(200).required(),
  });
  // return Yup.object().shape(SCHEMA);
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

export function getCsvOptions(opts = {}) {
  return { ...CSV_EXPORT_OPTIONS, ...opts };
}

export function sortOptions() {
  return [
    { label: "Best Match", dataField: "_score", sortBy: "desc" },
    { label: "Most recent", dataField: "updatedAt", sortBy: "desc" },
    { label: "Name ascending", dataField: "name.keyword", sortBy: "asc" },
    { label: "Name descending", dataField: "name.keyword", sortBy: "desc" },
  ];
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
      case "infrastructure":
      case "infrastructures":
        return await getOptionsByType("PlatformInfrastructure", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "timeoutaction":
      case "timeoutactions":
        return await getOptionsByType("PlatformTimeoutAction", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "status":
      case "statuses":
        return await getOptionsByType("PlatformStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "audience":
      case "audiences":
        return await getOptionsByType("Audience");
      case "visibility":
        return await getOptionsByType("Visibility");
      case "all":
        var options = opts || (await getAllOptions());
        return {
          visibility: options
            .filter((o) => o.type === "Visibility" && o.status !== "Disabled")
            .map(mapper),
          audience: options
            .filter((o) => o.type === "Audience" && o.status !== "Disabled")
            .map(mapper),
          status: options
            .filter((o) => o.type === "PlatformStatus" && o.status !== "Disabled")
            .map(mapper),
          timeoutaction: options
            .filter((o) => o.type === "PlatformTimeoutAction" && o.status !== "Disabled")
            .map(mapper),
          infrastructure: options
            .filter((o) => o.type === "PlatformInfrastructure" && o.status !== "Disabled")
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
  switch (type) {
    case "anothertype":
      return Link32;
    case "somethingelse":
      return VmdkDisk32;
    default:
      return Screen32;
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

export function findByTemplate(template = "") {
  return crud.search(NAME, {
    query: {
      bool: {
        must: {
          match: { "regions.template": template },
        },
      },
    },
  });
}

export function findByName(name = "") {
  return crud.find(NAME, `?where={"name":"${name}"}`, { limit: LIMIT });
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

export function reindex(id, opts = {}) {
  return crud.reindex(NAME, id, opts);
}
