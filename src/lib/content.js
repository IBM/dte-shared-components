import * as Yup from "yup";
import * as crud from "./crud";
import { find as getAllOptions, getOptionsByType } from "./option";
import { merge } from "lodash";

const NAME = "content";

const LIMIT = 250;

const DEFAULTS = {
  id: null,
  name: "",
  description: "",
  content: "",
  type: "",
  location: "",
  label: "",
  weight: 0,
  language: "English",
  visibility: ["IBMers", "Business Partners", "Customers"],
  status: "Enabled",
};

const CSV_EXPORT_OPTIONS = {
  fields: [
    "id",
    "name",
    "description",
    "content",
    "type",
    "location",
    "label",
    "weight",
    "status",
    "createdAt",
    "updatedAt",
  ],
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string().required().max(250),
    description: Yup.string().max(32768).nullable(),
    content: Yup.string().nullable(),
    type: Yup.string().max(200).required(),
    location: Yup.string().max(100).nullable(),
    label: Yup.string().max(100).nullable(),
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
  try {
    switch (type.toString().toLowerCase()) {
      case "language":
        return await getOptionsByType("Language");
      case "visibility":
        return await getOptionsByType("Visibility");
      case "status":
      case "statuses":
        return await getOptionsByType("ContentStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "all":
        var options = await getAllOptions();
        return {
          language: options
            .filter((o) => o.type === "Language" && o.status !== "Disabled")
            .map(mapper),
          visibility: options
            .filter((o) => o.type === "Visibility" && o.status !== "Disabled")
            .map(mapper),
          status: options.filter((o) => o.type === "ContentStatus").map(mapper),
        };
      default:
        return [];
    }
  } catch (err) {
    return [];
  }
}

export function search(query = {}, opts = {}) {
  return crud.search(NAME, query, opts);
}

export function findByName(name = "", criteria = {}, opts = {}) {
  criteria.name = name;
  return crud.find(NAME, `?where=${JSON.stringify(criteria)}`, merge({ limit: LIMIT }, opts));
}

export function findByType(type = "", criteria = {}, opts = {}) {
  criteria.type = type;
  return crud.find(NAME, `?where=${JSON.stringify(criteria)}`, merge({ limit: LIMIT }, opts));
}

export function findByLoction(location = "", criteria = {}, opts = {}) {
  criteria.location = location;
  return crud.find(NAME, `?where=${JSON.stringify(criteria)}`, merge({ limit: LIMIT }, opts));
}

export function findByLabel(label = "", criteria = {}, opts = {}) {
  criteria.label = label;
  return crud.find(NAME, `?where=${JSON.stringify(criteria)}`, merge({ limit: LIMIT }, opts));
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
