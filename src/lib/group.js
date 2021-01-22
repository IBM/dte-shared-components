import * as Yup from "yup";
import * as crud from "./crud";
import { getOptionsByType } from "./option";

const NAME = "group";

const LIMIT = 250;

const DEFAULTS = {
  id: null,
  name: "",
  description: "",
  members: [],
  status: "Enabled",
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string().required().max(250),
    description: Yup.string().max(32768).nullable(),
    members: Yup.array().nullable(),
    status: Yup.string().max(200).required(),
  });
  // return Yup.object().shape(SCHEMA);
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

export async function getOptions(type) {
  if (!type) return [];
  try {
    switch (type.toString().toLowerCase()) {
      case "status":
      case "statuses":
        return await getOptionsByType("GroupStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "all":
        return {
          status: await getOptionsByType("GroupStatus", (o) => {
            return { value: o.abbreviation || o.name, text: o.name };
          }),
        };
      default:
        return [];
    }
  } catch (err) {
    return [];
  }
}

export function findByName(name = "") {
  return crud.find(NAME, `?where={"name":"${name}"}`, { limit: LIMIT });
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
