import * as Yup from "yup";
import { Location32, Rocket32, ToolBox32, Map32 } from "@carbon/icons-react";
import * as crud from "./crud";
import { find as getAllOptions, getOptionsByType } from "./option";

const NAME = "journey";

const LIMIT = 250;

const DEFAULTS = {
  id: null,
  name: "",
  synopsis: "",
  description: "",
  cover: "",
  journey: [],
  diagram: "",
  layout: "grid-3",
  numbered: false,
  visibility: ["IBMers"],
  weight: 0,
  status: "Enabled",
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string().required().max(250),
    synopsis: Yup.string().nullable(),
    description: Yup.string().nullable(),
    cover: Yup.string().nullable(),
    journey: Yup.array().nullable(),
    diagram: Yup.string().nullable(),
    layout: Yup.string().nullable(),
    numbered: Yup.boolean().nullable(),
    visibility: Yup.array().nullable(),
    weight: Yup.number().nullable(),
    status: Yup.string().required(),
  });
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
      case "layout":
        return await getOptionsByType("JourneyLayout", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "visibility":
        return await getOptionsByType("Visibility");
      case "status":
      case "statuses":
        return await getOptionsByType("JourneyStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "all":
        var options = opts || (await getAllOptions());
        return {
          status: options
            .filter((o) => o.type === "JourneyStatus" && o.status !== "Disabled")
            .map(mapper),
          layout: options
            .filter((o) => o.type === "JourneyLayout" && o.status !== "Disabled")
            .map(mapper),
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

export function getIcon(name = "") {
  if (!name) return Map32;
  name = name.toString().toLowerCase();
  switch (true) {
    case name.startsWith("first touch"):
      return Location32;
    case name.startsWith("adoption"):
      return Rocket32;
    case name.startsWith("garage starter"):
      return ToolBox32;
    default:
      return Map32;
  }
}

export function getGridLayout(layout) {
  switch (layout) {
    case "grid-2":
      return "bx--col-sm-4 bx--col-md-4 bx--col-lg-8 bx--no-gutter fadein";
    case "grid-4":
      return "bx--col-sm-4 bx--col-md-4 bx--col-lg-4 bx--no-gutter fadein";
    case "grid-3":
    default:
      return "bx--col-sm-4 bx--col-md-4 bx--col-lg-5 bx--col-lg-33 bx--no-gutter fadein";
  }
}

export function find(query) {
  return crud.find(NAME, query, { limit: LIMIT });
}

export function findByOid(oid = "") {
  return crud.search(NAME, {
    query: {
      query_string: {
        fields: ["oid"],
        query: oid,
      },
      terminate_after: LIMIT,
    },
  });
  // return crud.find(NAME, `?where={"oid":"${oid}"}`, { limit: LIMIT });
}

export function findByName(name = "") {
  return crud.search(NAME, {
    query: {
      query_string: {
        fields: ["name"],
        query: name,
      },
      terminate_after: LIMIT,
    },
  });
  // return crud.find(NAME, `?where={"name":"${name}"}`, { limit: LIMIT });
}

export function findByCollection(collection = "") {
  return crud.search(NAME, {
    query: {
      query_string: {
        fields: ["collection"],
        query: collection,
      },
      terminate_after: LIMIT,
    },
  });
  // return crud.find(NAME, `?where={"collection":"${collection}"}`, { limit: LIMIT });
}

export async function findOne(id) {
  let result;
  try {
    result = await crud.findOne(NAME, id);
    if (result) return result;
    result = await findByOid(id);
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
