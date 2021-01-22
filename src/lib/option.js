import * as Yup from "yup";
import * as crud from "./crud";

const NAME = "option";

const LIMIT = 1000;

const DEFAULTS = {
  id: null,
  uid: "",
  type: "",
  name: "",
  filter: "",
  abbreviation: "",
  description: "",
  additional: "",
  icon: "",
  colorCode: "",
  status: "Enabled",
  visibility: ["IBMers", "Business Partners", "Customers"],
  weight: 0,
  ripple: false,
};

const CSV_EXPORT_OPTIONS = {
  fields: [
    "id",
    "uid",
    "type",
    "name",
    "filter",
    "abbreviation",
    "description",
    "additional",
    "abbreviation",
    "icon",
    "colorCode",
    "weight",
    "status",
    "ripple",
    "createdAt",
    "updatedAt",
  ],
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    uid: Yup.string().required(),
    type: Yup.string().required().max(200),
    name: Yup.string().required().max(200),
    filter: Yup.string().max(8192).nullable(),
    abbreviation: Yup.string().max(50).nullable(),
    description: Yup.string().max(32768).nullable(),
    additional: Yup.string().max(32768).nullable(),
    icon: Yup.string().max(200).nullable(),
    colorCode: Yup.string().max(25).nullable(),
    weight: Yup.number().nullable(),
    status: Yup.string().max(200).required(),
    ripple: Yup.boolean().nullable(),
  });
  // return Yup.object().shape(SCHEMA);
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

export function getCsvOptions(opts = {}) {
  return { ...CSV_EXPORT_OPTIONS, ...opts };
}

export async function getOptions(type) {
  if (!type) return [];
  const mapper = (o) => {
    return {
      value: o.abbreviation || o.name,
      text: o.name,
      labelText: o.name,
      helperText: o.description || "",
    };
  };
  switch (type.toString().toLowerCase()) {
    case "visibility":
      return await getOptionsByType("Visibility");
    case "status":
    case "statuses":
      return await getOptionsByType("OptionStatus", (o) => {
        return { value: o.abbreviation || o.name, text: o.name };
      });
    case "all":
      var options = await find();
      return {
        visibility: options
          .filter((o) => o.type === "Visibility" && o.status !== "Disabled")
          .map(mapper),
        status: options.filter((o) => o.type === "OptionStatus").map(mapper),
      };
    default:
      return [];
  }
}

export async function getOptionsByType(
  name,
  mapper = (o) => {
    return { labelText: o.name, value: o.abbreviation || o.name, text: o.name };
  },
  enabled = true
) {
  try {
    let options = await findByType(name, enabled);
    return (options && options.map(mapper)) || [];
  } catch (err) {
    console.log("getOptionsByType error:", err.message || err);
    return [];
  }
}

export function search(query = {}, opts = {}) {
  return crud.search(NAME, query, opts);
}

export function findByName(name = "", enabled = true) {
  let query = enabled
    ? `?where={"name":"${name}","status":{"!=":"Disabled"}}`
    : `?where={"name":"${name}"}`;
  return crud.find(NAME, query, { limit: LIMIT });
}

export function findByType(type = "", enabled = true) {
  let query = enabled
    ? `?where={"type":"${type}","status":{"!=":"Disabled"}}`
    : `?where={"type":"${type}"}`;
  return crud.find(NAME, query, { limit: LIMIT });
}

export function find(query) {
  return crud.find(NAME, query, { limit: LIMIT });
}

export function findOne(id) {
  return crud.findOne(NAME, id);
}

export function describe() {
  return crud.describe(NAME);
}

export function validate(payload) {
  return crud.validate(NAME, payload);
}

export function audit(id) {
  return crud.audit(NAME, id);
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
