import * as Yup from "yup";
import { Bookmark32 } from "@carbon/icons-react";
import { merge } from "lodash";
import * as crud from "./crud";

const NAME = "bookmark";
const LIMIT = 500;

const DEFAULTS = {
  id: null,
  name: "",
  description: "",
  url: "",
  weight: 0,
  user: "",
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().required().max(255),
    description: Yup.string().nullable().max(4096),
    url: Yup.string().required(),
    weight: Yup.number().nullable(),
    user: Yup.string().required(),
  });
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

// attach this to getters that pull from the db ...
export async function getOptions(type) {
  if (!type) return [];
  switch (type.toString().toLowerCase()) {
    default:
      return [];
  }
}

export function getIcon(type) {
  switch (type) {
    default:
      return Bookmark32;
  }
}

export function bookmarks(token, opts = {}) {
  if (!token) return [];
  const options = merge(opts, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return crud.get("my/bookmarks", options).catch((err) => {
    console.log("bookmarks error:", err.message);
    return [];
  });
}

export function find(query) {
  return crud.find(NAME, query, { limit: LIMIT });
}

export function findByUser(user = "") {
  return crud.find(NAME, `?where={"user":"${user}"}`, { limit: LIMIT });
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
